import { createFileRoute, Link } from '@tanstack/react-router'
import { getExam } from '~/server/functions'
import { getQuestions } from '~/data/questions'
import type { ExamVersion } from '~/data/questions'

export const Route = createFileRoute('/results/$id')({
  loader: async ({ params }) => {
    return getExam({ data: { examId: Number(params.id) } })
  },
  component: ResultsPage,
})

const DOMAIN_NAMES: Record<string, string> = {
  D1: 'FM Integration, Data & Compliance',
  D2: 'Implementation & Integration',
  D3: 'Safety, Security & Governance',
  D4: 'Operational Efficiency',
  D5: 'Testing & Troubleshooting',
}

function ResultsPage() {
  const { exam, answers } = Route.useLoaderData()
  const { id } = Route.useParams()
  const version = (exam.version ?? 1) as ExamVersion
  const questions = getQuestions(version)

  const total = questions.length
  const correctCount = answers.filter((a) => a.submitted && a.isCorrect).length
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0
  const scaledScore = exam.scaledScore ?? Math.round(100 + (pct / 100) * 900)
  const pass = scaledScore >= 750

  const mins = exam.timeSpentSeconds ? Math.floor(exam.timeSpentSeconds / 60) : 0
  const secs = exam.timeSpentSeconds ? exam.timeSpentSeconds % 60 : 0

  const domainStats: Record<string, { correct: number; total: number }> = {}
  for (const q of questions) {
    if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0 }
    domainStats[q.domain].total++
    const ans = answers.find((a) => a.questionId === q.id)
    if (ans?.submitted && ans.isCorrect) domainStats[q.domain].correct++
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-center">
      <h1 className="mb-2 text-2xl font-bold text-accent">Exam Complete</h1>
      <p className="text-sm text-txt-3">Version {version}</p>

      <div className={`my-6 text-7xl font-bold ${pass ? 'text-ok' : 'text-bad'}`}>
        {scaledScore}/1000
      </div>

      <p className={`mb-2 text-xl font-semibold ${pass ? 'text-ok' : 'text-bad'}`}>
        {pass ? 'PASS' : 'NEEDS IMPROVEMENT'}
      </p>
      <p className="mb-1 text-txt-2">
        {correctCount} of {total} correct ({pct}%)
      </p>
      <p className="mb-8 text-sm text-txt-3">
        Time: {mins}m {secs}s
      </p>

      <div className="card mb-8 text-left">
        <h2 className="mb-4 text-lg font-semibold text-txt">Domain Breakdown</h2>
        <div className="space-y-3">
          {Object.entries(DOMAIN_NAMES).map(([domain, name]) => {
            const ds = domainStats[domain] || { correct: 0, total: 0 }
            const dp = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0
            const color = dp >= 75 ? 'bg-ok' : dp >= 50 ? 'bg-warn' : 'bg-bad'
            const textColor = dp >= 75 ? 'text-ok' : dp >= 50 ? 'text-warn' : 'text-bad'
            return (
              <div key={domain} className="flex items-center gap-3">
                <span className="w-8 text-xs font-semibold text-accent">{domain}</span>
                <span className="hidden w-48 shrink-0 text-sm text-txt-2 md:block">{name}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${dp}%` }} />
                </div>
                <span className={`w-16 text-right text-sm font-semibold ${textColor}`}>
                  {ds.correct}/{ds.total}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card mb-8 text-left">
        <h2 className="mb-4 text-lg font-semibold text-txt">Question Review</h2>
        <div className="max-h-96 overflow-y-auto space-y-1">
          {questions.map((q, i) => {
            const ans = answers.find((a) => a.questionId === q.id)
            const correct = ans?.submitted && ans.isCorrect
            const icon = correct ? '\u2713' : '\u2717'
            const iconColor = correct ? 'text-ok' : 'text-bad'
            return (
              <Link
                key={q.id}
                to="/review/$id"
                params={{ id }}
                search={{ q: i, filter: 'all' }}
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-surface-2 transition-colors"
              >
                <span className={`text-lg ${iconColor}`}>{icon}</span>
                <span className="text-xs text-txt-3">Q{i + 1}</span>
                <span className="domain-tag text-[10px]">{q.domain}</span>
                <span className="flex-1 truncate text-sm text-txt">
                  {q.text.substring(0, 80)}...
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/" className="btn-secondary">Dashboard</Link>
        <Link to="/review/$id" params={{ id }} search={{ q: 0, filter: 'all' }} className="btn-primary">
          Review All Questions
        </Link>
      </div>
    </div>
  )
}
