import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://drsb8tyzjf.execute-api.eu-west-3.amazonaws.com/dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
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
