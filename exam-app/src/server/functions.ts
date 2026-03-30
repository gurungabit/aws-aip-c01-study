import { createServerFn } from '@tanstack/react-start'
import { db } from './db'
import { exams, examAnswers } from '../../drizzle/schema'
import { eq, desc, sql } from 'drizzle-orm'
import { getQuestions } from '../data/questions'
import type { ExamVersion } from '../data/questions'

export const createExam = createServerFn({ method: 'POST' })
  .inputValidator((d: { version: number }) => d)
  .handler(async ({ data }) => {
    const version = (data.version || 1) as ExamVersion
    const qs = getQuestions(version)
    const now = new Date().toISOString()
    const result = await db
      .insert(exams)
      .values({
        version,
        startedAt: now,
        totalQuestions: qs.length,
      })
      .returning()
    const exam = result[0]

    // Pre-create answer rows for all questions
    const answerRows = qs.map((q) => ({
      examId: exam.id,
      questionId: q.id,
      selectedAnswers: '[]',
      isCorrect: false,
      submitted: false,
      flagged: false,
    }))
    await db.insert(examAnswers).values(answerRows)

    return exam
  })

export const getExam = createServerFn({ method: 'GET' })
  .inputValidator((d: { examId: number }) => d)
  .handler(async ({ data }) => {
    const exam = await db.query.exams.findFirst({
      where: eq(exams.id, data.examId),
    })
    if (!exam) throw new Error('Exam not found')

    const answers = await db.query.examAnswers.findMany({
      where: eq(examAnswers.examId, data.examId),
    })

    return { exam, answers }
  })

export const saveAnswer = createServerFn({ method: 'POST' })
  .inputValidator(
    (d: {
      examId: number
      questionId: number
      selectedAnswers: string[]
      flagged?: boolean
    }) => d,
  )
  .handler(async ({ data }) => {
    await db
      .update(examAnswers)
      .set({
        selectedAnswers: JSON.stringify(data.selectedAnswers),
        flagged: data.flagged ?? false,
      })
      .where(
        sql`${examAnswers.examId} = ${data.examId} AND ${examAnswers.questionId} = ${data.questionId}`,
      )
  })

export const submitAnswer = createServerFn({ method: 'POST' })
  .inputValidator(
    (d: {
      examId: number
      questionId: number
      selectedAnswers: string[]
      version: number
    }) => d,
  )
  .handler(async ({ data }) => {
    const version = (data.version || 1) as ExamVersion
    const qs = getQuestions(version)
    const question = qs.find((q) => q.id === data.questionId)
    if (!question) throw new Error('Question not found')

    const correctSet = new Set(question.correct)
    const selectedSet = new Set(data.selectedAnswers)
    const isCorrect =
      correctSet.size === selectedSet.size &&
      [...correctSet].every((c) => selectedSet.has(c))

    await db
      .update(examAnswers)
      .set({
        selectedAnswers: JSON.stringify(data.selectedAnswers),
        submitted: true,
        isCorrect,
      })
      .where(
        sql`${examAnswers.examId} = ${data.examId} AND ${examAnswers.questionId} = ${data.questionId}`,
      )

    return { isCorrect }
  })

export const toggleFlag = createServerFn({ method: 'POST' })
  .inputValidator((d: { examId: number; questionId: number; flagged: boolean }) => d)
  .handler(async ({ data }) => {
    await db
      .update(examAnswers)
      .set({ flagged: data.flagged })
      .where(
        sql`${examAnswers.examId} = ${data.examId} AND ${examAnswers.questionId} = ${data.questionId}`,
      )
  })

export const finishExam = createServerFn({ method: 'POST' })
  .inputValidator((d: { examId: number; timeSpentSeconds: number }) => d)
  .handler(async ({ data }) => {
    const exam = await db.query.exams.findFirst({
      where: eq(exams.id, data.examId),
    })
    if (!exam) throw new Error('Exam not found')

    const version = (exam.version || 1) as ExamVersion
    const qs = getQuestions(version)

    const answers = await db.query.examAnswers.findMany({
      where: eq(examAnswers.examId, data.examId),
    })

    const correctCount = answers.filter((a) => a.submitted && a.isCorrect).length
    const total = qs.length
    const pct = total > 0 ? correctCount / total : 0
    const scaledScore = Math.round(100 + pct * 900)

    await db
      .update(exams)
      .set({
        finishedAt: new Date().toISOString(),
        correctCount,
        scaledScore,
        timeSpentSeconds: data.timeSpentSeconds,
      })
      .where(eq(exams.id, data.examId))

    return { scaledScore, correctCount, total }
  })

export const getExamHistory = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.query.exams.findMany({
      where: sql`${exams.finishedAt} IS NOT NULL`,
      orderBy: [desc(exams.finishedAt)],
    })
  },
)

export const getExamStats = createServerFn({ method: 'GET' }).handler(
  async () => {
    const allExams = await db.query.exams.findMany({
      where: sql`${exams.finishedAt} IS NOT NULL`,
    })

    if (allExams.length === 0) {
      return { totalExams: 0, avgScore: 0, bestScore: 0, domainAvgs: {} }
    }

    const scores = allExams.map((e) => e.scaledScore ?? 0)
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    const bestScore = Math.max(...scores)

    // Calculate per-domain averages across all exams
    // We need to look up questions per exam version
    const allAnswers = await db.query.examAnswers.findMany({
      where: sql`${examAnswers.submitted} = 1`,
    })

    // Build a map of examId -> version
    const examVersionMap = new Map<number, number>()
    for (const e of allExams) {
      examVersionMap.set(e.id, e.version ?? 1)
    }

    const domainStats: Record<string, { correct: number; total: number }> = {}
    for (const ans of allAnswers) {
      const ver = (examVersionMap.get(ans.examId) || 1) as ExamVersion
      const qs = getQuestions(ver)
      const q = qs.find((qq) => qq.id === ans.questionId)
      if (!q) continue
      if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0 }
      domainStats[q.domain].total++
      if (ans.isCorrect) domainStats[q.domain].correct++
    }

    const domainAvgs: Record<string, number> = {}
    for (const [domain, stats] of Object.entries(domainStats)) {
      domainAvgs[domain] = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    }

    return { totalExams: allExams.length, avgScore, bestScore, domainAvgs }
  },
)

export const getActiveExam = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.query.exams.findFirst({
      where: sql`${exams.finishedAt} IS NULL`,
      orderBy: [desc(exams.startedAt)],
    })
  },
)

export const deleteExam = createServerFn({ method: 'POST' })
  .inputValidator((d: { examId: number }) => d)
  .handler(async ({ data }) => {
    await db.delete(examAnswers).where(eq(examAnswers.examId, data.examId))
    await db.delete(exams).where(eq(exams.id, data.examId))
  })

export const exportData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const allExams = await db.query.exams.findMany()
    const allAnswers = await db.query.examAnswers.findMany()
    return { version: 1, exportedAt: new Date().toISOString(), exams: allExams, answers: allAnswers }
  },
)

export const importData = createServerFn({ method: 'POST' })
  .inputValidator((d: { json: string }) => d)
  .handler(async ({ data }) => {
    const parsed = JSON.parse(data.json) as {
      exams: (typeof exams.$inferSelect)[]
      answers: (typeof examAnswers.$inferSelect)[]
    }

    if (!parsed.exams?.length) throw new Error('No exam data found in file')

    // Get existing exam IDs to avoid duplicates (match on startedAt + version)
    const existing = await db.query.exams.findMany()
    const existingKeys = new Set(existing.map((e) => `${e.startedAt}_${e.version}`))

    let imported = 0
    for (const exam of parsed.exams) {
      const key = `${exam.startedAt}_${exam.version}`
      if (existingKeys.has(key)) continue // skip duplicate

      const [newExam] = await db.insert(exams).values({
        version: exam.version ?? 1,
        startedAt: exam.startedAt,
        finishedAt: exam.finishedAt,
        totalQuestions: exam.totalQuestions,
        correctCount: exam.correctCount,
        scaledScore: exam.scaledScore,
        timeSpentSeconds: exam.timeSpentSeconds,
      }).returning()

      const examAnswerRows = parsed.answers
        .filter((a) => a.examId === exam.id)
        .map((a) => ({
          examId: newExam.id,
          questionId: a.questionId,
          selectedAnswers: a.selectedAnswers,
          isCorrect: a.isCorrect,
          submitted: a.submitted,
          flagged: a.flagged,
        }))

      if (examAnswerRows.length > 0) {
        await db.insert(examAnswers).values(examAnswerRows)
      }
      imported++
    }

    return { imported, skipped: parsed.exams.length - imported }
  })
