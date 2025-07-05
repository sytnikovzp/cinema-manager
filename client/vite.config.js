/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
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
    server: {
      host: true,
      open: true,
      port: parseInt(env.VITE_PORT) || 3000,
      strictPort: true,
    },
  };
});
