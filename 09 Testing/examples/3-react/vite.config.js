import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/vitest.setup.js',
    include: ['**/*.test.{js,ts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
})
