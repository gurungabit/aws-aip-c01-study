import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import { getExam, getActiveExam, saveAnswer, submitAnswer, toggleFlag, finishExam, pauseExam, resumeExam } from '~/storage'
import { getQuestions } from '~/data/questions'
import type { ExamVersion } from '~/data/questions'
import { ConfirmModal } from '~/components/ConfirmModal'
import { Explanation } from '~/components/Explanation'
import { shuffleQuestions } from '~/utils/shuffle'

export const Route = createFileRoute('/exam')({
  validateSearch: (search: Record<string, unknown>) => ({
    id: search.id !== undefined ? Number(search.id) : undefined,
  }),
  loaderDeps: ({ search }) => ({ id: search.id }),
  loader: async ({ deps }) => {
    const examId = deps.id
    if (!examId || isNaN(examId)) {
      const active = await getActiveExam()
      if (active) return getExam(active.id)
      return null
    }
    return getExam(examId)
  },
  component: ExamPage,
})

interface AnswerState {
  selected: string[]
  submitted: boolean
  isCorrect: boolean
  flagged: boolean
}

function ExamPage() {
  const data = Route.useLoaderData()
  const navigate = useNavigate()

  if (!data) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h2 className="mb-3 text-xl font-semibold text-txt">No Active Exam</h2>
        <p className="mb-6 text-sm text-txt-2">Start a new exam from the dashboard.</p>
        <Link to="/" className="btn-primary">Go to Dashboard</Link>
      </div>
    )
  }

  const { exam, answers: dbAnswers } = data
  const examId = exam.id
  const version = (exam.version ?? 1) as ExamVersion
  const questions = shuffleQuestions(getQuestions(version), examId)

  const [currentQ, setCurrentQ] = useState(0)
  const [answerMap, setAnswerMap] = useState<Record<number, AnswerState>>(() => {
    const map: Record<number, AnswerState> = {}
    for (const a of dbAnswers) {
      map[a.questionId] = {
        selected: JSON.parse(a.selectedAnswers),
        submitted: a.submitted,
        isCorrect: a.isCorrect,
        flagged: a.flagged,
      }
    }
    return map
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [paused, setPaused] = useState(!!exam.pausedAt)
  const [pausedSecs, setPausedSecs] = useState(exam.pausedSeconds ?? 0)
  const [pausedAtMs, setPausedAtMs] = useState(exam.pausedAt ? new Date(exam.pausedAt).getTime() : 0)

  const TOTAL_SECONDS = 180 * 60
  const examStartMs = new Date(exam.startedAt).getTime()

  const getEffectiveElapsed = () => {
    const wallElapsed = Math.floor((Date.now() - examStartMs) / 1000)
    const currentPauseDuration = paused && pausedAtMs ? Math.floor((Date.now() - pausedAtMs) / 1000) : 0
    return wallElapsed - pausedSecs - currentPauseDuration
  }
  const [elapsed, setElapsed] = useState(getEffectiveElapsed)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setElapsed(getEffectiveElapsed())
    }, 1000)
    return () => clearInterval(interval)
  }, [examStartMs, paused, pausedSecs, pausedAtMs])

  const remaining = Math.max(0, TOTAL_SECONDS - elapsed)
  const hours = Math.floor(remaining / 3600)
  const mins = Math.floor((remaining % 3600) / 60)
  const secs = remaining % 60
  const timerStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  useEffect(() => {
    if (remaining <= 0 && !paused) handleFinish()
  }, [remaining, paused])

  const handlePause = useCallback(async () => {
    setPaused(true)
    setPausedAtMs(Date.now())
    await pauseExam(examId)
  }, [examId])

  const handleResume = useCallback(async () => {
    const addedPause = pausedAtMs ? Math.floor((Date.now() - pausedAtMs) / 1000) : 0
    const newPausedSecs = pausedSecs + addedPause
    setPaused(false)
    setPausedSecs(newPausedSecs)
    setPausedAtMs(0)
    setElapsed(Math.floor((Date.now() - examStartMs) / 1000) - newPausedSecs)
    await resumeExam(examId)
  }, [examId, pausedAtMs, pausedSecs, examStartMs])

  const q = questions[currentQ]
  const ans = answerMap[q.id] || { selected: [], submitted: false, isCorrect: false, flagged: false }

  const handleSelect = useCallback(async (letter: string) => {
    if (ans.submitted) return
    setAnswerMap((prev) => {
      const current = prev[q.id] || { selected: [], submitted: false, isCorrect: false, flagged: false }
      let newSelected: string[]
      if (q.multi) {
        const idx = current.selected.indexOf(letter)
        if (idx >= 0) newSelected = current.selected.filter((l) => l !== letter)
        else if (current.selected.length < q.correct.length) newSelected = [...current.selected, letter]
        else return prev
      } else {
        newSelected = [letter]
      }
      saveAnswer(examId, q.id, newSelected)
      return { ...prev, [q.id]: { ...current, selected: newSelected } }
    })
  }, [q.id, q.multi, ans.submitted, examId])

  const handleSubmit = useCallback(async () => {
    if (ans.selected.length === 0) return
    const result = await submitAnswer(examId, q.id, ans.selected, version, q.correct)
    setAnswerMap((prev) => ({
      ...prev,
      [q.id]: { ...prev[q.id], submitted: true, isCorrect: result.isCorrect },
    }))
  }, [q.id, ans.selected, examId, version, q.correct])

  const handleFlag = useCallback(async () => {
    const newFlagged = !ans.flagged
    setAnswerMap((prev) => ({
      ...prev,
      [q.id]: { ...prev[q.id], flagged: newFlagged },
    }))
    await toggleFlag(examId, q.id, newFlagged)
  }, [q.id, ans.flagged, examId])

  const handleFinish = async () => {
    await finishExam(examId, elapsed)
    navigate({ to: '/results/$id', params: { id: String(examId) } })
  }

  const goTo = (idx: number) => { setCurrentQ(idx); window.scrollTo(0, 0) }
  const next = () => { if (currentQ < questions.length - 1) goTo(currentQ + 1) }
  const prev = () => { if (currentQ > 0) goTo(currentQ - 1) }

  const submittedCount = Object.values(answerMap).filter((a) => a.submitted).length
  const correctCount = Object.values(answerMap).filter((a) => a.submitted && a.isCorrect).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 pb-24 sm:pb-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-txt-2">
          <span className="rounded-full bg-accent-dim px-2 py-0.5 text-xs font-medium text-accent mr-2">V{version}</span>
          Score: {correctCount}/{submittedCount} answered
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={paused ? handleResume : handlePause}
            className={`btn-icon ${paused ? 'border-ok-border text-ok hover:bg-ok-dim' : 'text-txt-3 hover:text-warn hover:border-warn-border'}`}
            title={paused ? 'Resume' : 'Pause'}
          >
            {paused ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
              </svg>
            )}
            {paused ? 'Resume' : 'Pause'}
          </button>
          <span className={`font-mono text-lg ${paused ? 'text-warn' : remaining < 600 ? 'text-bad' : 'text-info'}`}>
            {paused ? `${timerStr} ⏸` : timerStr}
          </span>
        </div>
      </div>

      <div className="mb-4 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowNav(!showNav)}
          className="mb-2 flex w-full items-center justify-center gap-1 text-xs text-txt-3 sm:hidden"
        >
          <span>Q{currentQ + 1}/{questions.length}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform ${showNav ? 'rotate-180' : ''}`}>
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
        <div className={`${showNav ? 'flex' : 'hidden'} sm:flex flex-wrap gap-1 justify-center`}>
          {questions.map((qq, i) => {
            const a = answerMap[qq.id]
            let cls = 'w-7 h-7 rounded-lg text-xs flex items-center justify-center cursor-pointer transition-all border '
            if (i === currentQ) cls += 'border-accent text-accent font-bold bg-accent-dim '
            else if (a?.submitted && a.isCorrect) cls += 'border-ok-border bg-ok-dim text-ok '
            else if (a?.submitted && !a.isCorrect) cls += 'border-bad-border bg-bad-dim text-bad '
            else if (a?.flagged) cls += 'border-warn-border bg-warn-dim text-warn '
            else if (a?.selected.length) cls += 'border-accent-border bg-surface-2 text-txt-2 '
            else cls += 'border-accent-border/50 bg-surface text-txt-3 '
            return (
              <button key={qq.id} className={cls} onClick={() => { goTo(i); setShowNav(false) }}>
                {a?.flagged ? '!' : i + 1}
              </button>
            )
          })}
        </div>
      </div>

      <div className={`mb-4 ${ans.submitted ? 'flex flex-col xl:flex-row gap-4 xl:items-start' : ''}`}>
        <div className={`card ${ans.submitted ? 'xl:flex-1 xl:min-w-0' : ''}`}>
          <div className="mb-4 flex items-center justify-between">
            <span className="domain-tag">{q.domainName}</span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFlag}
                className={`btn-icon ${ans.flagged ? 'border-warn-border bg-warn-dim text-warn' : 'text-txt-3 hover:text-warn hover:border-warn-border'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 11.75V3.24a.75.75 0 0 0-.994-.709 6.448 6.448 0 0 1-4.993-.441 7.948 7.948 0 0 0-5.27-.706L3.5 2.051V2.75Z" />
                </svg>
                {ans.flagged ? 'Flagged' : 'Flag'}
              </button>
              <span className="text-xs text-txt-3">
                Q{currentQ + 1}/{questions.length}
              </span>
            </div>
          </div>

          <p className="mb-4 sm:mb-6 whitespace-pre-line text-sm sm:text-base leading-relaxed text-txt">
            {q.text}
          </p>

          {q.multi && (
            <p className="mb-3 text-sm italic text-accent">Select {q.correct.length === 2 ? 'TWO' : q.correct.length === 3 ? 'THREE' : q.correct.length} answers</p>
          )}

          <div className="space-y-2">
            {[...q.options].sort((a, b) => a.letter.localeCompare(b.letter)).map((opt) => {
              let cls = 'flex items-start gap-3 rounded-xl border-2 p-3 transition-all cursor-pointer '
              if (ans.submitted) {
                cls += 'cursor-default '
                if (q.correct.includes(opt.letter)) cls += 'border-ok-border bg-ok-dim '
                else if (ans.selected.includes(opt.letter)) cls += 'border-bad-border bg-bad-dim '
                else cls += 'border-accent-border/30 opacity-40 '
              } else if (ans.selected.includes(opt.letter)) {
                cls += 'border-accent bg-accent-dim '
              } else {
                cls += 'border-accent-border hover:border-accent/40 hover:bg-surface-2 '
              }

              return (
                <div key={opt.letter} className={cls} onClick={() => handleSelect(opt.letter)}>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      ans.submitted && q.correct.includes(opt.letter)
                        ? 'bg-ok text-bg'
                        : ans.submitted && ans.selected.includes(opt.letter)
                          ? 'bg-bad text-bg'
                          : ans.selected.includes(opt.letter)
                            ? 'bg-accent text-bg'
                            : 'bg-surface-2 text-txt-2'
                    }`}
                  >
                    {opt.letter}
                  </span>
                  <span className="text-sm leading-relaxed">{opt.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {ans.submitted && (
          <div className="xl:w-[420px] xl:shrink-0 xl:sticky xl:top-20">
            <Explanation html={q.explanation} isCorrect={ans.isCorrect} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-accent-border bg-bg/95 backdrop-blur-sm px-4 py-3 sm:static sm:border-0 sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0">
        <div className="flex items-center justify-between gap-2">
          <button onClick={prev} disabled={currentQ === 0} className="btn-secondary min-w-0 px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">
            Prev
          </button>
          <div className="flex gap-2">
            {!ans.submitted && (
              <button onClick={handleSubmit} disabled={ans.selected.length === 0} className="btn-primary px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm">
                Submit
              </button>
            )}
            {ans.submitted && currentQ < questions.length - 1 && (
              <button onClick={next} className="btn-primary px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm">Next</button>
            )}
            {!ans.submitted && currentQ < questions.length - 1 && (
              <button onClick={next} className="btn-secondary px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">Skip</button>
            )}
          </div>
          <button onClick={() => setShowConfirm(true)} className="btn-secondary text-bad border-bad-border px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm">
            Finish
          </button>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Finish Exam?"
        message={`${submittedCount} of ${questions.length} questions answered.\n${questions.length - submittedCount} unanswered questions will be marked incorrect.`}
        confirmLabel="Submit Exam"
        cancelLabel="Continue Exam"
        onConfirm={handleFinish}
        onCancel={() => setShowConfirm(false)}
      />

      {paused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-sm">
          <div className="card max-w-sm text-center animate-in">
            <div className="mb-4 text-5xl">⏸</div>
            <h2 className="mb-2 text-xl font-bold text-txt">Exam Paused</h2>
            <p className="mb-1 text-sm text-txt-2">Time remaining</p>
            <p className="mb-6 font-mono text-3xl text-warn">{timerStr}</p>
            <button onClick={handleResume} className="btn-primary px-10 py-3">
              Resume Exam
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
