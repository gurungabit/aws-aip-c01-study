/// <reference types="vite/client" />
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '~/styles/app.css'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-accent-border bg-bg/90 backdrop-blur-xl">
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
            <Link
              to="/docs"
              className="text-txt-3 hover:text-txt transition-colors [&.active]:text-accent [&.active]:font-semibold"
            >
              Docs
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}
