import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from 'path';

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3100',
          changeOrigin: true,
          secure: env.VITE_DEV !== 'true', // إذا كنت في dev => secure: false
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
