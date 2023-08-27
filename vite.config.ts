import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    envPrefix: 'REACT_APP_',
    plugins: [react()],
    server: {
      proxy: {
        '/ocr': {
          target: process.env.REACT_APP_OCR_API_INVOKE,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/ocr/, ''),
        },
        '/api': {
          target: process.env.REACT_APP_GPT_API_INVOKE,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
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
};
