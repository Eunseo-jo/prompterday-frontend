import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  envPrefix: 'REACT_APP_',
  plugins: [react()],
  server: {
    proxy: {
      '/ocr': {
        target: 'https://e7nd31pts4.apigw.ntruss.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/ocr/, ''),
      },
    },
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
