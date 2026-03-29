/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'AWS AIP-C01 Practice Exam' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-accent-border bg-base/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link to="/" className="font-heading text-lg font-bold text-accent hover:text-accent-hover transition-colors">
              AWS AIP-C01
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link
                to="/"
                className="text-txt-3 hover:text-txt transition-colors [&.active]:text-accent [&.active]:font-semibold"
                activeOptions={{ exact: true }}
              >
                Dashboard
              </Link>
              <Link
                to="/exam"
                search={{ id: undefined }}
                className="text-txt-3 hover:text-txt transition-colors [&.active]:text-accent [&.active]:font-semibold"
              >
                Exam
              </Link>
            </nav>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  )
}
