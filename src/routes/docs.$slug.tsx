import { createFileRoute, Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { useEffect, useRef } from 'react'
import { DOCS } from '~/data/docs'

// Generate a heading ID that matches GFM-style anchor links in the TOC
function headingId(text: string): string {
  return text
    .replace(/<[^>]+>/g, '') // strip any HTML tags
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except spaces/hyphens
    .trim()
    .replace(/\s+/g, '-')    // spaces → hyphens
}

export const Route = createFileRoute('/docs/$slug')({
  loader: async ({ params }) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const res = await fetch(`${base}/docs/${params.slug}.md`)
    if (!res.ok) throw new Error(`Could not load doc: ${params.slug}`)
    const text = await res.text()

    // Custom renderer: inject id="" on every heading so TOC anchor links work
    marked.use({
      renderer: {
        heading({ text, depth }) {
          const id = headingId(text)
          return `<h${depth} id="${id}">${text}</h${depth}>\n`
        },
      },
    })

    const html = await marked(text)
    const meta = DOCS.find((d) => d.slug === params.slug)
    return { html, meta }
  },
  component: DocPage,
})

async function renderMermaidDiagrams(container: HTMLElement) {
  const codeBlocks = container.querySelectorAll('pre code.language-mermaid')
  if (codeBlocks.length === 0) return

  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#27272a',
        primaryColor: '#c4b5fd',
        primaryTextColor: '#fafafa',
        primaryBorderColor: 'rgba(196, 181, 253, 0.15)',
        lineColor: '#a1a1aa',
        secondaryColor: '#3f3f46',
        tertiaryColor: '#52525b',
      },
    })

    for (const block of codeBlocks) {
      const pre = block.parentElement
      if (!pre) continue
      const source = block.textContent ?? ''
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
      try {
        const { svg } = await mermaid.render(id, source)
        const wrapper = document.createElement('div')
        wrapper.className = 'mermaid-diagram'
        wrapper.innerHTML = svg
        pre.replaceWith(wrapper)
      } catch (err) {
        console.error('Mermaid render error:', err)
      }
    }
  } catch (err) {
    console.error('Mermaid initialization error:', err)
  }
}

function DocPage() {
  const { html, meta } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (articleRef.current) {
      renderMermaidDiagrams(articleRef.current)
    }
  }, [html])

  // Intercept anchor (#section) clicks so they scroll instead of
  // confusing the hash router into navigating to the homepage.
  useEffect(() => {
    const article = articleRef.current
    if (!article) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href?.startsWith('#')) return
      e.preventDefault()
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    article.addEventListener('click', handleClick)
    return () => article.removeEventListener('click', handleClick)
  }, [html])

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
        ref={articleRef}
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
