import { createFileRoute, Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { DOCS } from '~/data/docs'

export const Route = createFileRoute('/docs/$slug')({
  loader: async ({ params }) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const res = await fetch(`${base}/docs/${params.slug}.md`)
    if (!res.ok) throw new Error(`Could not load doc: ${params.slug}`)
    const text = await res.text()
    const html = await marked(text)
    const meta = DOCS.find((d) => d.slug === params.slug)
    return { html, meta }
  },
  component: DocPage,
})

function DocPage() {
  const { html, meta } = Route.useLoaderData()
  const { slug } = Route.useParams()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-txt-3">
        <Link to="/docs" className="text-accent hover:text-accent-hover transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-txt-2">{meta?.title ?? slug}</span>
      </div>

      <article
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-10 border-t border-accent-border pt-6 flex justify-between items-center">
        <Link to="/docs" className="btn-secondary text-sm">
          &larr; All Docs
        </Link>
      </div>
    </div>
  )
}
