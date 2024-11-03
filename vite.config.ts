import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // add alias path
  resolve: {
    alias: {
      '@/*': path.resolve(__dirname, './src/*'),
    },
  },
});
