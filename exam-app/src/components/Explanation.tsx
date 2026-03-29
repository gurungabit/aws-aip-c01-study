/**
 * Renders a question explanation with proper formatting:
 * - Splits on double newlines into paragraphs
 * - Color-codes "X is correct" (green) and "X is wrong" (red)
 * - Each wrong answer in its own visual block
 */
export function Explanation({ html, isCorrect }: { html: string; isCorrect: boolean }) {
  const paragraphs = html
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  const formatParagraph = (p: string) => {
    return p
      .replace(
        /<strong>([^<]*is correct[^<]*)<\/strong>/gi,
        '<strong class="text-ok">$1</strong>',
      )
      .replace(
        /<strong>([^<]*is wrong[^<]*)<\/strong>/gi,
        '<strong class="text-bad/80">$1</strong>',
      )
  }

  const firstParagraph = paragraphs[0] || ''
  const restParagraphs = paragraphs.slice(1)

  return (
    <div className="rounded-2xl border border-accent-border/30 bg-surface/80 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className={`px-5 py-2.5 text-sm font-semibold shrink-0 ${isCorrect ? 'bg-ok-dim text-ok' : 'bg-bad-dim text-bad'}`}>
        {isCorrect ? 'Correct!' : 'Incorrect'}
      </div>

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Correct answer */}
        <div
          className="rounded-xl bg-ok-dim/50 border border-ok-border/30 px-4 py-3 text-sm leading-relaxed text-txt"
          dangerouslySetInnerHTML={{ __html: formatParagraph(firstParagraph) }}
        />

        {/* Why others are wrong */}
        {restParagraphs.map((p, i) => (
          <div
            key={i}
            className="rounded-xl bg-base/50 px-4 py-2.5 text-[13px] leading-relaxed text-txt-2 border border-accent-border/20"
            dangerouslySetInnerHTML={{ __html: formatParagraph(p) }}
          />
        ))}
      </div>
    </div>
  )
}
