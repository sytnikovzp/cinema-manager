/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/default */
import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(dirname, '../'));

  console.log('Loaded from .env variables: ', env);

  return {
    envPrefix: 'CINEMA_',
    plugins: [react(), envCompatible({ path: '../' })],
    resolve: {
      alias: {
        '@': path.resolve(dirname, '.'),
      },
    },
    server: {
      host: true,
      open: true,
      port: parseInt(env.VITE_PORT) || 3000,
      strictPort: true,
    },
  };
});
