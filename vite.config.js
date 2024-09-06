import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
    include: [
      /\.js$/,
      /\.ts$/,
      /\.tsx$/,
    ],
    exclude: [
      /node_modules/,
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
});
