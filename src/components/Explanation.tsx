/**
 * Renders a question explanation as a list:
 * - Splits on "<strong>X is wrong</strong>" boundaries
 * - First item (correct answer) gets green highlight
 * - Wrong answers rendered as a list with letter badges
 */
export function Explanation({ html, isCorrect }: { html: string; isCorrect: boolean }) {
  // Split right before each "<strong>X is wrong" to get [correctPart, ...wrongParts]
  const parts = html
    .split(/(?=<strong>\s*[A-Z]\s+is wrong)/i)
    .map((s) => s.trim())
    .filter(Boolean)

  const colorize = (p: string) =>
    p
      .replace(
        /<strong>([^<]*is correct[^<]*)<\/strong>/gi,
        '<strong class="text-ok">$1</strong>',
      )
      .replace(
        /<strong>([^<]*is wrong[^<]*)<\/strong>/gi,
        '<strong class="text-bad/80">$1</strong>',
      )

  const getLetter = (p: string): string | null => {
    const m = p.match(/<strong>\s*([A-Z])\s+is\s+wrong/i)
    return m ? m[1] : null
  }

  const correctPart = parts[0] || ''
  const wrongParts = parts.slice(1)

  return (
    <div className="rounded-2xl border border-accent-border/30 bg-surface/80 overflow-hidden h-full flex flex-col">
      <div className={`px-5 py-2.5 text-sm font-semibold shrink-0 ${isCorrect ? 'bg-ok-dim text-ok' : 'bg-bad-dim text-bad'}`}>
        {isCorrect ? 'Correct!' : 'Incorrect'}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div
          className="rounded-xl bg-ok-dim/50 border border-ok-border/30 px-4 py-3 text-sm leading-relaxed text-txt"
          dangerouslySetInnerHTML={{ __html: colorize(correctPart) }}
        />

        {wrongParts.length > 0 && (
          <ul className="space-y-2">
            {wrongParts.map((p, i) => {
              const letter = getLetter(p)
              return (
                <li key={i} className="flex gap-3 rounded-xl bg-base/50 px-4 py-2.5 border border-accent-border/20">
                  {letter && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bad-dim text-xs font-bold text-bad mt-0.5">
                      {letter}
                    </span>
                  )}
                  <div
                    className="text-[13px] leading-relaxed text-txt-2 min-w-0"
                    dangerouslySetInnerHTML={{ __html: colorize(p) }}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
