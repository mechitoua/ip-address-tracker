import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@/*': path.resolve(__dirname, './src/*'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
    define: {
      'process.env': env,
    },
  };
});
