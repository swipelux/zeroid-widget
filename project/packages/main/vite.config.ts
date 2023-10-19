import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import dotenv from 'dotenv';
import { localConfig } from '../../config.local';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    server: {
      port: localConfig.mainDevPort,
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    define: {
      'process.env': dotenv.config({ path: `../../.env.${mode || 'dev'}` })
        .parsed,
    },
  });
};
