import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  base: '/aws-aip-c01-study/',
  plugins: [
    TanStackRouterVite({
      routesDirectory: 'src/routes',
      generatedRouteTree: 'src/routeTree.gen.ts',
    }),
    tailwindcss(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
})
