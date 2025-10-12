import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://riocordas.com.br',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
