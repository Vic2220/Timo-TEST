# Immo MVP 2026 — refonte moderne d'un site d'agence immobilière (Monaco)

Projet de **refonte 2026** inspiré de la structure du site d'une agence de conseil et d'investissement immobilier à Monaco (groupesmir.com) : même architecture d'information (ventes, locations, international, services, « Vivre à Monaco », le groupe, contact), repensée selon les standards actuels — mobile-first, performance, accessibilité, mode sombre, et un **assistant IA de recherche guidée** qui qualifie le visiteur et le redirige vers les biens qui lui correspondent.

> ⚠️ Démo / concept de refonte non officiel. Les biens, les coordonnées et les témoignages sont **fictifs**. Remplacez `src/data/site.ts` et `src/data/listings.ts` par vos vraies données avant toute mise en ligne.

## Démarrage

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère ./dist (site 100 % statique)
npm run preview
```

Node 20+ requis. Aucune base de données, aucune clé API : le site se déploie sur n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel, Cloudflare Pages, OVH…).

## Mettre le projet dans son propre dépôt GitHub

Ce dossier est autonome. Pour le publier dans un nouveau dépôt (par exemple `immo-mvp-2026`) :

1. Créez un dépôt vide sur GitHub (sans README).
2. Depuis la racine du dépôt `capvic` :

```bash
git subtree split --prefix=immo-mvp-2026 -b immo-mvp-2026
git push https://github.com/<utilisateur>/immo-mvp-2026.git immo-mvp-2026:main
```

Le workflow de déploiement GitHub Pages s'activera automatiquement dans le nouveau dépôt.

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
Dans le dépôt GitHub : **Settings → Pages → Source : GitHub Actions**. Le site sera disponible sur `https://<utilisateur>.github.io/<nom-du-depot>/`.

Pour un nom de domaine personnalisé, définissez `SITE_URL` et `BASE_PATH=/` dans le workflow.

## Structure

```
src/
  data/        site.ts (coordonnées, nav, barème de frais) · listings.ts (catalogue) · districts.json (quartiers)
  lib/         match.ts (moteur de scoring de l'assistant) · format.ts (prix, frais d'acquisition)
  components/  Header, Footer, ListingCard, Filters, Assistant (bouton + panneau), Illustration (SVG), …
  layouts/     Base.astro (SEO, schema.org, thème clair/sombre, view transitions)
  pages/       index, ventes, locations, international, biens/[id], services/*, estimation, vivre-a-monaco, notre-groupe, contact, mentions-legales, 404
  styles/      global.css (design tokens, composants)
public/        robots.txt, llms.txt, favicon
```

## L'assistant « Trouvez votre bien »

Bouton flottant → panneau guidé en 6 étapes (type de bien, projet, budget, taille, quartiers, critères) → résultats scorés et expliqués (« 92 % — vue mer, dans votre budget, Larvotto ») → redirection vers le catalogue pré-filtré, prise de rendez-vous ou estimation (parcours vendeur).

Le moteur (`src/lib/match.ts`) est **déterministe et explicable**, fonctionne hors ligne et sans clé API. Un point d'extension documenté (`src/lib/assistant-llm.example.ts`) permet de brancher un LLM côté serveur pour la saisie en langage naturel.

## Brancher de vraies données

- **Biens** : remplacez le tableau `listings` (ou générez-le depuis votre CRM / flux XML au build).
- **Photos** : les illustrations SVG sont des substituts ; passez une URL d'image dans chaque bien et remplacez `<Illustration>` par `<img>` dans `ListingCard.astro` et `biens/[id].astro`.
- **Formulaires** : les formulaires (contact, estimation, assistant) sont prêts pour un service type Formspree, Netlify Forms ou un endpoint maison (`data-endpoint` dans les composants).

## Licence

Code sous licence MIT. Marques et contenus de tiers restent la propriété de leurs titulaires.
