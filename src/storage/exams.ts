import { getDB } from './db'
import type { Exam, ExamAnswer } from './types'
import { getQuestions } from '~/data/questions'
import type { ExamVersion } from '~/data/questions'

// ─── createExam ──────────────────────────────────────────────────────────────

export async function createExam(version: number): Promise<Exam> {
  const db = await getDB()
  const v = (version || 1) as ExamVersion
  const qs = getQuestions(v)
  const now = new Date().toISOString()

  const exam: Omit<Exam, 'id'> = {
    version: v,
    startedAt: now,
    finishedAt: null,
    totalQuestions: qs.length,
    correctCount: 0,
    scaledScore: null,
    timeSpentSeconds: null,
    pausedAt: null,
    pausedSeconds: 0,
  }

  const tx = db.transaction(['exams', 'examAnswers'], 'readwrite')
  const examId = await tx.objectStore('exams').add(exam as Exam)

  const answerStore = tx.objectStore('examAnswers')
  for (const q of qs) {
    await answerStore.add({
      id: 0,
      examId: examId as number,
      questionId: q.id,
      selectedAnswers: '[]',
      isCorrect: false,
      submitted: false,
      flagged: false,
    })
  }
  await tx.done

  return { ...exam, id: examId as number }
}

// ─── getExam ─────────────────────────────────────────────────────────────────

export async function getExam(examId: number): Promise<{ exam: Exam; answers: ExamAnswer[] }> {
  const db = await getDB()
  const exam = await db.get('exams', examId)
  if (!exam) throw new Error('Exam not found')
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)
  return { exam, answers }
}

// ─── getActiveExam ───────────────────────────────────────────────────────────

export async function getActiveExam(): Promise<Exam | undefined> {
  const db = await getDB()
  const all = await db.getAll('exams')
  return all
    .filter((e) => e.finishedAt === null)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0]
}

// ─── saveAnswer ──────────────────────────────────────────────────────────────

export async function saveAnswer(
  examId: number,
  questionId: number,
  selectedAnswers: string[],
): Promise<void> {
  const db = await getDB()
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)
  const answer = answers.find((a) => a.questionId === questionId)
  if (!answer) return
  await db.put('examAnswers', {
    ...answer,
    selectedAnswers: JSON.stringify(selectedAnswers),
  })
}

// ─── submitAnswer ────────────────────────────────────────────────────────────

export async function submitAnswer(
  examId: number,
  questionId: number,
  selectedAnswers: string[],
  version: number,
): Promise<{ isCorrect: boolean }> {
  const v = (version || 1) as ExamVersion
  const qs = getQuestions(v)
  const question = qs.find((q) => q.id === questionId)
  if (!question) throw new Error('Question not found')

  const correctSet = new Set(question.correct)
  const selectedSet = new Set(selectedAnswers)
  const isCorrect =
    correctSet.size === selectedSet.size &&
    [...correctSet].every((c) => selectedSet.has(c))

  const db = await getDB()
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)
  const answer = answers.find((a) => a.questionId === questionId)
  if (!answer) return { isCorrect }

  await db.put('examAnswers', {
    ...answer,
    selectedAnswers: JSON.stringify(selectedAnswers),
    submitted: true,
    isCorrect,
  })

  return { isCorrect }
}

// ─── toggleFlag ──────────────────────────────────────────────────────────────

export async function toggleFlag(
  examId: number,
  questionId: number,
  flagged: boolean,
): Promise<void> {
  const db = await getDB()
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)
  const answer = answers.find((a) => a.questionId === questionId)
  if (!answer) return
  await db.put('examAnswers', { ...answer, flagged })
}

// ─── finishExam ──────────────────────────────────────────────────────────────

export async function finishExam(
  examId: number,
  timeSpentSeconds: number,
): Promise<{ scaledScore: number; correctCount: number; total: number }> {
  const db = await getDB()
  const exam = await db.get('exams', examId)
  if (!exam) throw new Error('Exam not found')

  const version = (exam.version || 1) as ExamVersion
  const qs = getQuestions(version)
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)

  const correctCount = answers.filter((a) => a.submitted && a.isCorrect).length
  const total = qs.length
  const pct = total > 0 ? correctCount / total : 0
  const scaledScore = Math.round(100 + pct * 900)

  await db.put('exams', {
    ...exam,
    finishedAt: new Date().toISOString(),
    correctCount,
    scaledScore,
    timeSpentSeconds,
  })

  return { scaledScore, correctCount, total }
}

// ─── getExamHistory ──────────────────────────────────────────────────────────

export async function getExamHistory(): Promise<Exam[]> {
  const db = await getDB()
  const all = await db.getAll('exams')
  return all
    .filter((e) => e.finishedAt !== null)
    .sort((a, b) => (b.finishedAt ?? '').localeCompare(a.finishedAt ?? ''))
}

// ─── getExamStats ────────────────────────────────────────────────────────────

export async function getExamStats(): Promise<{
  totalExams: number
  avgScore: number
  bestScore: number
  domainAvgs: Record<string, number>
}> {
  const db = await getDB()
  const allExams = (await db.getAll('exams')).filter((e) => e.finishedAt !== null)

  if (allExams.length === 0) {
    return { totalExams: 0, avgScore: 0, bestScore: 0, domainAvgs: {} }
  }

  const scores = allExams.map((e) => e.scaledScore ?? 0)
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  const bestScore = Math.max(...scores)

  const examVersionMap = new Map(allExams.map((e) => [e.id, e.version ?? 1]))
  const allAnswers = await db.getAll('examAnswers')
  const submittedAnswers = allAnswers.filter((a) => a.submitted)

  const domainStats: Record<string, { correct: number; total: number }> = {}
  for (const ans of submittedAnswers) {
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
}

// ─── pauseExam ───────────────────────────────────────────────────────────────

export async function pauseExam(examId: number): Promise<void> {
  const db = await getDB()
  const exam = await db.get('exams', examId)
  if (!exam) return
  await db.put('exams', { ...exam, pausedAt: new Date().toISOString() })
}

// ─── resumeExam ──────────────────────────────────────────────────────────────

export async function resumeExam(examId: number): Promise<void> {
  const db = await getDB()
  const exam = await db.get('exams', examId)
  if (!exam || !exam.pausedAt) return
  const pausedDuration = Math.floor((Date.now() - new Date(exam.pausedAt).getTime()) / 1000)
  await db.put('exams', {
    ...exam,
    pausedAt: null,
    pausedSeconds: (exam.pausedSeconds ?? 0) + pausedDuration,
  })
}

// ─── deleteExam ──────────────────────────────────────────────────────────────

export async function deleteExam(examId: number): Promise<void> {
  const db = await getDB()
  const answers = await db.getAllFromIndex('examAnswers', 'by-examId', examId)
  const tx = db.transaction(['exams', 'examAnswers'], 'readwrite')
  for (const a of answers) {
    await tx.objectStore('examAnswers').delete(a.id)
  }
  await tx.objectStore('exams').delete(examId)
  await tx.done
}

// ─── exportData ──────────────────────────────────────────────────────────────

export async function exportData() {
  const db = await getDB()
  const exams = await db.getAll('exams')
  const answers = await db.getAll('examAnswers')
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    exams,
    answers,
  }
}

// ─── importData ──────────────────────────────────────────────────────────────

export async function importData(json: string): Promise<{ imported: number; skipped: number }> {
  const parsed = JSON.parse(json) as { exams: Exam[]; answers: ExamAnswer[] }
  if (!parsed.exams?.length) throw new Error('No exam data found in file')

  const db = await getDB()
  const existing = await db.getAll('exams')
  const existingKeys = new Set(existing.map((e) => `${e.startedAt}_${e.version}`))

  let imported = 0

  for (const exam of parsed.exams) {
    const key = `${exam.startedAt}_${exam.version}`
    if (existingKeys.has(key)) continue

    const oldId = exam.id
    const { id: _id, ...examWithoutId } = exam
    const newExamId = await db.add('exams', {
      ...examWithoutId,
      id: 0,
      pausedAt: exam.pausedAt ?? null,
      pausedSeconds: exam.pausedSeconds ?? 0,
    } as Exam)

    const examAnswerRows = (parsed.answers ?? []).filter((a) => a.examId === oldId)
    for (const a of examAnswerRows) {
      const { id: _aid, ...ansWithoutId } = a
      await db.add('examAnswers', { ...ansWithoutId, id: 0, examId: newExamId as number } as ExamAnswer)
    }

    imported++
  }

  return { imported, skipped: parsed.exams.length - imported }
}
