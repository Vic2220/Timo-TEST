import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Remplacer `site` par le domaine de production (et `base` si déployé dans un sous-dossier GitHub Pages).
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (p) => !/\/(favoris|mentions-legales)\//.test(p) })],
  // Anciennes URL du site d'origine → nouvelles pages (SEO)
  redirects: {
    '/fr': '/', '/fr/ventes-monaco': '/acheter/', '/fr/locations-monaco': '/louer/', '/fr/international': '/acheter/?zone=international',
    '/fr/notre-groupe': '/groupe/', '/fr/achats-monaco': '/services/#achat', '/fr/locations': '/services/#location',
    '/fr/gestion-immobilier': '/services/#gestion', '/fr/evaluation-conseil': '/estimation/', '/fr/vivre-a-monaco': '/monaco/', '/fr/nos-services': '/services/',
    '/international': '/acheter/?zone=international',
  },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  i18n: { defaultLocale: 'fr', locales: ['fr'], routing: { prefixDefaultLocale: false } },
});
