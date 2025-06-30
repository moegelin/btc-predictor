import { defineConfig } from 'vitest/config'; // ✅ jetzt kennt er `test`
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@server': path.resolve(__dirname, 'src/server'),
      '@test': path.resolve(__dirname, 'src/test'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@server': path.resolve(__dirname, 'src/server'),
      '@test': path.resolve(__dirname, 'src/test'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    },
  },
});
