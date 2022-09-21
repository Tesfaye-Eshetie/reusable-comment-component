import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/reusable-comment-component/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      filename: './sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      injectManifest: {
        globPatterns: ['**/*.{css,html,js}'],
      },
      manifest: {
        name: "Tesfaye's Reusable-Comment-Component",
        short_name: 'Reusable-Comment-Component',
        icons: [
          {
            src: '/images/logo_192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable',
          },
          {
            src: '/images/logo_512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: '/images/logo_1024.png',
            type: 'image/png',
            sizes: '1024x1024',
          },
        ],
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
      },
    }),
  ],
});
