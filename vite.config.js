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
        short_name: 'Reusable-Comment-Component',
        name: "Tesfaye's Reusable-Comment-Component",
        icons: [
          {
            src: '/images/logo.png',
            type: 'image/png',
            sizes: '1024x1024',
          },
          {
            src: '/images/favicon.ico',
            type: 'image/ico',
            sizes: '100X77',
          },
        ],
        start_url: '/reusable-comment-component/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
    }),
  ],
});
