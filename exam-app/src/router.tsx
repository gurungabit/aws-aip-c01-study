import { createHashHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const hashHistory = createHashHistory()

export function getRouter() {
  const router = createRouter({
    routeTree,
    history: hashHistory,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
