import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import dotenv from 'dotenv';

import { localConfig } from '../../config.local.ts';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    server: {
      port: localConfig.sdkDevPort,
    },
    plugins: [],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `sdk.js`,
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
