import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transform } from 'esbuild'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      plugins: [
        {
          name: 'treat-js-files-as-jsx',
          async transform(code, id) {
            if (!id.endsWith('.js')) return null
            if (id.includes('node_modules')) return null
            // Check if file contains JSX syntax
            if (!code.includes('jsx') && !code.includes('<')) return null
            
            // Use esbuild to transform JSX in .js files
            const result = await transform(code, {
              loader: 'jsx',
              jsx: 'automatic',
              jsxDev: false,
              sourcemap: true,
            })
            return {
              code: result.code,
              map: result.map || null,
            }
          },
        },
      ],
    },
  },
})
