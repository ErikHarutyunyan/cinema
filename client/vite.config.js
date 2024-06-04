import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      assets: `${path.resolve(__dirname, './src/assets/')}`,
      app: `${path.resolve(__dirname, './src/app/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      images: `${path.resolve(__dirname, './src/components/Images/')}`,
      data: `${path.resolve(__dirname, './src/data/')}`,
      helpers: `${path.resolve(__dirname, './src/helpers/')}`,
      hooks: `${path.resolve(__dirname, './src/hooks/')}`,
      pages: `${path.resolve(__dirname, './src/pages/')}`,
      public: `${path.resolve(__dirname, './public/')}`,
      router: `${path.resolve(__dirname, './src/router/')}`,
    },
  },
});
