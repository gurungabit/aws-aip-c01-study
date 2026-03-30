import { createFileRoute, Link } from '@tanstack/react-router'
import { DOCS } from '~/data/docs'

export const Route = createFileRoute('/docs/')({
  component: DocsPage,
})

function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-accent">Study Docs</h1>
        <p className="text-sm text-txt-2">Reference notes for the AWS AIP-C01 exam. Click any doc to read it in-app.</p>
      </div>

      <div className="space-y-3">
        {DOCS.map((doc) => (
          <Link
            key={doc.slug}
            to="/docs/$slug"
            params={{ slug: doc.slug }}
            className="card block hover:border-accent/50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-dim text-accent group-hover:bg-accent group-hover:text-base transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-txt group-hover:text-accent transition-colors">{doc.title}</p>
                <p className="mt-0.5 text-sm text-txt-3">{doc.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
