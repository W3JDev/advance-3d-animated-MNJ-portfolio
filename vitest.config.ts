import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    css: false,
    include: ['src/test/**/*.{test,spec}.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text','html']
    }
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './components'),
      '@': path.resolve(__dirname, './'),
    }
  }
});
