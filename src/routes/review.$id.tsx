import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getExam } from '~/storage'
import { getQuestions } from '~/data/questions'
import type { ExamVersion } from '~/data/questions'
import { Explanation } from '~/components/Explanation'

export const Route = createFileRoute('/review/$id')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: search.q !== undefined ? Number(search.q) : 0,
    filter: ((search.filter as string) || 'all') as string | undefined,
  }),
  loader: async ({ params }) => {
    return getExam(Number(params.id))
  },
  component: ReviewPage,
})

function ReviewPage() {
  const { exam, answers } = Route.useLoaderData()
  const { id } = Route.useParams()
  const { q: initialQ, filter: initialFilter } = Route.useSearch()
  const version = (exam.version ?? 1) as ExamVersion
  const questions = getQuestions(version)

  const [filter, setFilter] = useState(initialFilter ?? 'all')
  const [currentIdx, setCurrentIdx] = useState(initialQ)

  const answerMap = new Map(answers.map((a) => [a.questionId, a]))

  const filteredQuestions = questions.filter((q) => {
    const ans = answerMap.get(q.id)
    if (filter === 'incorrect') return ans?.submitted && !ans.isCorrect
    if (filter === 'correct') return ans?.submitted && ans.isCorrect
    if (filter === 'flagged') return ans?.flagged
    if (filter === 'unanswered') return !ans?.submitted
    if (filter.startsWith('D')) return q.domain === filter
    return true
  })

  const hasResults = filteredQuestions.length > 0
  const safeIdx = hasResults ? Math.min(currentIdx, filteredQuestions.length - 1) : 0
  const q = hasResults ? filteredQuestions[safeIdx] : null

  const ans = q ? answerMap.get(q.id) : undefined
  const selected: string[] = ans ? JSON.parse(ans.selectedAnswers) : []

  const goTo = (idx: number) => { setCurrentIdx(idx); window.scrollTo(0, 0) }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/results/$id" params={{ id }} className="text-sm text-accent hover:text-accent-hover">
          &larr; Results
        </Link>
        <span className="text-sm text-txt-2">
          <span className="rounded-full bg-accent-dim px-2 py-0.5 text-xs font-medium text-accent mr-2">V{version}</span>
          {hasResults ? `${safeIdx + 1} of ${filteredQuestions.length}` : `0 of 0`}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'incorrect', label: 'Incorrect' },
          { key: 'correct', label: 'Correct' },
          { key: 'flagged', label: 'Flagged' },
          { key: 'unanswered', label: 'Unanswered' },
          { key: 'D1', label: 'D1' },
          { key: 'D2', label: 'D2' },
          { key: 'D3', label: 'D3' },
          { key: 'D4', label: 'D4' },
          { key: 'D5', label: 'D5' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key); setCurrentIdx(0) }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-accent text-bg'
                : 'bg-surface-2 text-txt-2 hover:bg-surface-3'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-1 justify-center">
        {filteredQuestions.map((fq, i) => {
          const a = answerMap.get(fq.id)
          const correct = a?.submitted && a.isCorrect
          let cls = 'w-7 h-7 rounded-lg text-xs flex items-center justify-center cursor-pointer transition-all border '
          if (i === safeIdx) cls += 'border-accent text-accent font-bold bg-accent-dim '
          else if (correct) cls += 'border-ok-border bg-ok-dim text-ok '
          else if (a?.submitted && !a.isCorrect) cls += 'border-bad-border bg-bad-dim text-bad '
          else if (a?.flagged) cls += 'border-warn-border bg-warn-dim text-warn '
          else cls += 'border-accent-border/50 bg-surface text-txt-3 '
          return (
            <button key={fq.id} className={cls} onClick={() => goTo(i)}>
              {a?.flagged ? '!' : questions.indexOf(fq) + 1}
            </button>
          )
        })}
      </div>

      {!hasResults ? (
        <div className="card mb-4 flex flex-col items-center justify-center py-16 text-center">
          <p className="text-txt-3 text-sm">No questions match this filter.</p>
        </div>
      ) : q && (
        <>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-start mb-4">
          {/* Question + Options card */}
          <div className="card xl:flex-1 xl:min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <span className="domain-tag">{q.domainName}</span>
              <span className="text-xs text-txt-3">
                Q{questions.indexOf(q) + 1}
                {ans?.flagged && <span className="ml-2 text-warn">Flagged</span>}
              </span>
            </div>

            <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-txt">
              {q.text}
            </p>

            {q.multi && (
              <p className="mb-3 text-sm italic text-accent">Select {q.correct.length === 2 ? 'TWO' : q.correct.length === 3 ? 'THREE' : q.correct.length} answers</p>
            )}

            <div className="space-y-2">
              {[...q.options].sort((a, b) => a.letter.localeCompare(b.letter)).map((opt) => {
                const isCorrect = q.correct.includes(opt.letter)
                const wasSelected = selected.includes(opt.letter)
                let cls = 'flex items-start gap-3 rounded-xl border-2 p-3 '
                if (isCorrect) cls += 'border-ok-border bg-ok-dim '
                else if (wasSelected) cls += 'border-bad-border bg-bad-dim '
                else cls += 'border-accent-border/30 opacity-40 '

                return (
                  <div key={opt.letter} className={cls}>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isCorrect
                          ? 'bg-ok text-bg'
                          : wasSelected
                            ? 'bg-bad text-bg'
                            : 'bg-surface-2 text-txt-2'
                      }`}
                    >
                      {opt.letter}
                    </span>
                    <span className="text-sm leading-relaxed">
                      {opt.text}
                      {wasSelected && !isCorrect && (
                        <span className="ml-2 text-xs text-bad">(Your answer)</span>
                      )}
                      {wasSelected && isCorrect && (
                        <span className="ml-2 text-xs text-ok">(Your answer - Correct)</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Explanation panel — side-by-side on xl screens */}
          <div className="xl:w-[420px] xl:shrink-0 xl:sticky xl:top-20">
            <Explanation html={q.explanation} isCorrect={ans?.isCorrect ?? false} />
          </div>
        </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <button onClick={() => goTo(safeIdx - 1)} disabled={!hasResults || safeIdx === 0} className="btn-secondary">
          Previous
        </button>
        <button
          onClick={() => goTo(safeIdx + 1)}
          disabled={!hasResults || safeIdx >= filteredQuestions.length - 1}
          className="btn-primary text-sm"
        >
          Next
        </button>
      </div>
    </div>
  )
}
