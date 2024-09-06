import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx',  // Tell esbuild to treat .js files as JSX
    },
    include: [
      /\.js$/, // Process .js files with JSX syntax
    ],
    exclude: [
      /node_modules/, // Exclude node_modules
    ],
  },
});
