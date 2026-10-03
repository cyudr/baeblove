import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables with custom prefixes
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'baepass_', 'bae_']);

  // Toggle for site password protection (1 = enabled, 0 = disabled)
  const baepassKey = process.env.baepass_Key ?? env.baepass_Key ?? '0';

  // Collect all passwords configured via variables starting with bae_Key
  const baeKeys: Record<string, string> = {};
  for (const [key, val] of Object.entries(process.env)) {
    if (key.startsWith('bae_Key') && val) {
      baeKeys[key] = val;
    }
  }
  for (const [key, val] of Object.entries(env)) {
    if (key.startsWith('bae_Key') && val) {
      baeKeys[key] = val;
    }
  }

  return {
    envPrefix: ['VITE_', 'baepass_', 'bae_'],
    define: {
      __BAEPASS_KEY__: JSON.stringify(baepassKey),
      __BAE_KEYS__: JSON.stringify(baeKeys),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
