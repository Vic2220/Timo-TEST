# SPÉCIFICATION DE DESIGN — Refonte 2026 du site Groupe SMIR (Monaco)

Version 1.0 — 10 novembre 2026
Destinataires : équipe front (HTML/CSS/JS vanilla, sans framework CSS), rédaction, direction.
Statut : prête à implémenter. Toute valeur ci-dessous est normative sauf mention « à valider ».

Conventions de lecture
- Les tokens CSS sont écrits `--nom-du-token` et doivent être déclarés tels quels sur `:root`.
- Les dimensions sont en px pour les composants, en rem pour la typographie (1rem = 16px).
- « Mobile » = viewport < 768px ; « tablette » = 768–1023px ; « desktop » = ≥ 1024px.
- Les textes entre guillemets « » sont les textes définitifs à intégrer (FR). Les autres langues (EN/RU/IT) seront traduites à partir de ces clés.
- Contrastes WCAG : les ratios indiqués ont été calculés avec la formule de luminance relative WCAG 2.x (sRGB) ; ils sont donc exacts pour les couleurs hex données.

---

## 0. Sommaire

1. Positionnement & principes de design
2. Design tokens (couleurs, typographie, espacement, rayons, ombres, motion)
3. Layout (grille, breakpoints, container queries)
4. Architecture d'information & navigation
5. Page d'accueil, section par section
6. Page catalogue (Ventes / Locations)
7. Fiche bien
8. Assistant « Trouvez votre bien »
9. Page Estimation (lead vendeur)
10. Pages contenu (Notre groupe, Services, Vivre à Monaco, Contact)
11. Composants
12. Motion & micro-interactions
13. Accessibilité
14. Illustrations / images génératives
15. Checklist qualité finale
Annexes : A mapping des 25 types · B données fictives · C moteur de scoring · D structure i18n · E schema.org · F `tokens.css` · G wireframes · H paramètres d'URL · I matrice responsive · J ordre de livraison

---

## 1. Positionnement & principes de design

### 1.1 Positionnement

Groupe SMIR est une maison familiale et indépendante, présente à Monaco depuis 1925 (Agence Lorenzi), 1956 (Monte Carlo Immobilier) et réunie en 1990. Le site doit incarner une **autorité tranquille** : on ne crie pas le luxe, on le laisse se lire dans la justesse des proportions, la qualité des informations et la clarté du parcours. Le visiteur international, souvent pressé et sur mobile, doit comprendre en 5 secondes : *qui* (une maison centenaire du Carré d'Or), *quoi* (vendre, acheter, louer, gérer à Monaco), *comment* (chercher, se faire guider, se faire rappeler).

Signature de marque (baseline, à placer dans le hero et le footer) :
« Conseil immobilier à Monaco depuis 1925. »

Ton rédactionnel : vouvoiement, phrases courtes, chiffres précis, zéro superlatif creux (« exceptionnel », « unique » interdits sauf fait vérifiable), vocabulaire du conseil plutôt que de la vente.

### 1.2 Cinq principes de design (normatifs)

1. **Le silence avant l'or.** L'or (`--accent`) est réservé à trois usages : filets/ornements fins, icônes, badges. Jamais de grandes surfaces or, jamais de texte or sur blanc en petite taille. Le bleu Méditerranée (`--primary`) porte l'action ; le crème et le charbon portent tout le reste. Règle chiffrée : l'or ne couvre jamais plus de 2 % de la surface d'un écran.

2. **Une information, un endroit, une fois.** Chaque donnée (prix, surface, quartier, frais) est affichée dans un seul composant canonique (carte de bien, en-tête de fiche, calculateur) et n'est pas répétée en pied de page. Le footer reprend uniquement la navigation primaire et les coordonnées.

3. **Clarté avant décoration.** Pas de slider auto-défilant, pas d'image sans message. Chaque section commence par un titre H2 qui dit ce qu'elle apporte, suivi au plus d'une phrase. Un seul CTA primaire par écran visible ; les CTA secondaires sont en style « ghost ».

4. **Mobile d'abord, pouce d'abord.** Toute action clé (recherche, assistant, estimation, appel, WhatsApp) est accessible en bas d'écran mobile sans scroll. Cibles ≥ 44 × 44 px, gouttières 16 px, pas de hover obligatoire.

5. **Confiance mesurable.** Les preuves sont des faits datés et chiffrés (1925, 1956, 1990, membre de la Chambre Immobilière Monégasque, 6 % + 3 % + TVA affichés noir sur blanc, rappel sous 24 h ouvrées). Chaque formulaire annonce ce qui se passe ensuite et respecte le RGPD de façon visible.

---

## 2. Design tokens

Tous les tokens sont déclarés dans `tokens.css`, importé en premier. Le thème sombre est appliqué (a) automatiquement via `prefers-color-scheme: dark` quand `:root` ne porte pas `data-theme="light"`, (b) explicitement via `:root[data-theme="dark"]`. Un bouton de bascule (section 11.14) écrit `data-theme` et le mémorise en `localStorage` (clé `smir-theme`).

### 2.1 Palette — mode clair (défaut)

| Token | Hex | OKLCH (approx.) | Usage |
|---|---|---|---|
| `--bg` | `#F7F4EE` | oklch(96.5% 0.009 85) | Fond de page (crème chaud) |
| `--bg-2` | `#EFEAE0` | oklch(93.5% 0.013 85) | Sections alternées, bandes |
| `--surface` | `#FFFFFF` | oklch(100% 0 0) | Cartes, panneaux, champs |
| `--surface-2` | `#FBF9F5` | oklch(98% 0.006 85) | Survol de carte, tableaux zébrés |
| `--text` | `#1C1B19` | oklch(21% 0.004 80) | Texte principal (charbon chaud) |
| `--text-2` | `#5E5B55` | oklch(46% 0.008 80) | Texte secondaire, légendes |
| `--text-3` | `#7A766E` | oklch(55% 0.009 80) | Placeholders (jamais pour du contenu) |
| `--border` | `#D9D2C5` | oklch(86% 0.016 80) | Séparateurs décoratifs, contours de carte |
| `--border-strong` | `#86817A` | oklch(59% 0.009 80) | Contours de champs de formulaire (≥ 3:1) |
| `--primary` | `#1E4E7A` | oklch(40% 0.085 250) | Bleu Méditerranée : boutons primaires, liens, focus |
| `--primary-hover` | `#163B5B` | oklch(33% 0.075 250) | Survol / actif |
| `--primary-tint` | `#E3ECF4` | oklch(94% 0.016 250) | Fonds de chips actives, encarts info |
| `--accent` | `#9E7C3A` | oklch(59% 0.09 80) | Or désaturé : filets, icônes, étoiles (≥ 3:1 non-texte) |
| `--accent-text` | `#8A6B2B` | oklch(53% 0.085 80) | Or utilisable en texte ≥ 14 px (4.53:1 sur `--bg`) |
| `--accent-tint` | `#F3E9D3` | oklch(93% 0.03 85) | Fond de badge « À la une », « Nouveau » |
| `--accent-on-tint` | `#5C4718` | oklch(39% 0.07 80) | Texte sur `--accent-tint` |
| `--success` | `#2A6B47` | oklch(46% 0.09 155) | Confirmation, « disponible » |
| `--success-tint` | `#E2F0E7` | — | Fond d'alerte succès |
| `--error` | `#A8321F` | oklch(45% 0.15 30) | Erreurs de champ, « loué/vendu » |
| `--error-tint` | `#F8E4E0` | — | Fond d'alerte erreur |
| `--warning` | `#8A5A12` | — | Avertissements (rare) |
| `--sea-1` | `#2F6E9E` | oklch(50% 0.1 245) | Dégradés d'illustration (bleu lagon) |
| `--sea-2` | `#163B5B` | oklch(33% 0.075 250) | Dégradés d'illustration (bleu profond) |
| `--gold-1` | `#C9A961` | oklch(74% 0.09 85) | Dégradés d'illustration (or clair) |
| `--gold-2` | `#9E7C3A` | — | Dégradés d'illustration (or) |
| `--overlay` | `rgb(28 27 25 / 0.55)` | — | Voile sous modales/sheets |
| `--focus` | `#1E4E7A` | — | Anneau de focus (2 px + offset 2 px) |

### 2.2 Palette — mode sombre

| Token | Hex | Usage / remarque |
|---|---|---|
| `--bg` | `#121311` | Charbon chaud très profond (pas de noir pur) |
| `--bg-2` | `#171815` | Sections alternées |
| `--surface` | `#1B1C19` | Cartes, panneaux |
| `--surface-2` | `#24251F` | Survol, champs |
| `--text` | `#ECE7DC` | Crème (pas de blanc pur) |
| `--text-2` | `#A8A294` | Secondaire |
| `--text-3` | `#86817A` | Placeholders |
| `--border` | `#34352F` | Décoratif |
| `--border-strong` | `#6F6B62` | Contours de champs (3.22:1 sur `--surface`) |
| `--primary` | `#8DBBE4` | Bleu Méditerranée clair : liens, focus, contours |
| `--primary-hover` | `#A9CDEE` | |
| `--primary-solid` | `#2D6AA0` | Fond des boutons primaires (texte blanc 5.71:1) |
| `--primary-tint` | `#1C2E3F` | Fond chips actives |
| `--accent` | `#C9A961` | Or (icônes, filets) |
| `--accent-text` | `#D2B26A` | Or en texte (9.15:1) |
| `--accent-tint` | `#3A311C` | Fond badge |
| `--accent-on-tint` | `#E6CC8A` | Texte badge (8.17:1) |
| `--success` | `#6FC08F` | |
| `--success-tint` | `#1C3326` | |
| `--error` | `#F08A79` | |
| `--error-tint` | `#3D201B` | |
| `--sea-1` / `--sea-2` | `#3E86B8` / `#1C2E3F` | Illustrations |
| `--gold-1` / `--gold-2` | `#E6CC8A` / `#9E7C3A` | Illustrations |
| `--overlay` | `rgb(0 0 0 / 0.65)` | |
| `--focus` | `#8DBBE4` | |

En mode sombre, les boutons primaires utilisent `--primary-solid` en fond avec texte `#FFFFFF` ; les liens et contours utilisent `--primary`.

### 2.3 Vérification des contrastes (calculés)

| Paire | Clair | Sombre | Exigence |
|---|---|---|---|
| Texte principal / fond page | 15.68:1 | 15.11:1 | ≥ 4.5 ✔ |
| Texte principal / surface | 17.21:1 | 13.88:1 | ≥ 4.5 ✔ |
| Texte secondaire / fond page | 6.16:1 | 7.33:1 | ≥ 4.5 ✔ |
| Texte secondaire / surface | 6.77:1 | 6.73:1 | ≥ 4.5 ✔ |
| Texte secondaire / `--bg-2` | 5.64:1 | — | ≥ 4.5 ✔ |
| Placeholder / surface | 4.52:1 | ≥ 4.5 | ✔ (limite, réservé aux placeholders) |
| Or texte `--accent-text` / fond page | 4.53:1 | 9.15:1 | ≥ 4.5 ✔ (taille ≥ 14 px, jamais en light weight) |
| Or icône `--accent` / fond page | 3.54:1 | 8.28:1 | ≥ 3 (non-texte) ✔ |
| Blanc / bouton primaire | 8.66:1 | 5.71:1 | ≥ 4.5 ✔ |
| Bleu lien `--primary` / fond page | 7.89:1 | 9.19:1 | ≥ 4.5 ✔ |
| Texte badge / fond badge (`--accent-on-tint` / `--accent-tint`) | 7.35:1 | 8.17:1 | ✔ |
| Succès / fond | 5.81:1 | 8.53:1 | ✔ |
| Erreur / fond | 6.09:1 | 7.65:1 | ✔ |
| Blanc / fond erreur plein | 6.69:1 | — | ✔ |
| Contour de champ `--border-strong` / surface | 3.86:1 | 3.22:1 | ≥ 3 ✔ |
| Anneau de focus / fond | 7.89:1 | 8.45:1 | ≥ 3 ✔ |
| Crème / charbon (hero sombre) | 15.68:1 | — | ✔ |
| Or clair / charbon (hero sombre) | 8.45:1 | — | ✔ |

Interdits explicites : texte or `#ba8932` (ancien) sur blanc = 3.1:1 → remplacé ; texte blanc sur or ; texte `--text-3` pour du contenu.

### 2.4 Typographie

**Police de titres — Cormorant Garamond** (Google Fonts, variable : graisses 300–700, italique).
Justification : serif éditoriale à fort contraste, dessin garamond contemporain, italique élégante pour les mises en exergue (« depuis 1925 »), **couverture Latin étendu + Cyrillique** (indispensable pour la version RU), rendu excellent en grande taille sur fond crème. Utilisée uniquement ≥ 20 px (jamais pour le corps de texte : x-height faible).
Fallback : `"Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`.

**Police de texte — Manrope** (Google Fonts, variable : graisses 200–800).
Justification : sans géométrique moderne, chiffres clairs (support `tnum` pour les prix et tableaux), **Latin étendu + Cyrillique**, lisibilité à 14–17 px, hauteur d'x généreuse, aspect « warm-modern » cohérent avec le serif.
Fallback : `Manrope, "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

Chargement : `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` ; une seule feuille : `family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap`. Précharger les deux WOFF2 principaux (`rel="preload" as="font"`). `font-display: swap` + `size-adjust` sur les fallbacks pour limiter le CLS (Georgia : `size-adjust: 92%` ; Arial : `size-adjust: 97%`).

**Échelle fluide** (viewport de référence 360 → 1280 px) :

| Token | clamp() | Résultat | Police / graisse / interlignage / lettrage |
|---|---|---|---|
| `--fs-display` | `clamp(2.625rem, 1.75rem + 3.9vw, 4.75rem)` | 42 → 76 px | Cormorant 500, `line-height 1.02`, `letter-spacing -0.01em` |
| `--fs-h1` | `clamp(2.125rem, 1.55rem + 2.55vw, 3.5rem)` | 34 → 56 px | Cormorant 500, lh 1.08, ls -0.005em |
| `--fs-h2` | `clamp(1.75rem, 1.4rem + 1.55vw, 2.625rem)` | 28 → 42 px | Cormorant 500, lh 1.12 |
| `--fs-h3` | `clamp(1.375rem, 1.25rem + 0.55vw, 1.75rem)` | 22 → 28 px | Cormorant 600, lh 1.2 |
| `--fs-h4` | `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)` | 17 → 19 px | Manrope 600, lh 1.3 |
| `--fs-lead` | `clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)` | 17 → 20 px | Manrope 400, lh 1.5 (chapôs) |
| `--fs-body` | `clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)` | 16 → 17 px | Manrope 400, lh 1.6 |
| `--fs-small` | `0.875rem` | 14 px | Manrope 500, lh 1.45 (métadonnées, specs) |
| `--fs-caption` | `0.75rem` | 12 px | Manrope 600, lh 1.35, `letter-spacing 0.06em`, majuscules (sur-titres, badges) |
| `--fs-price` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem)` | 22 → 30 px | Manrope 700, `font-variant-numeric: tabular-nums`, lh 1.1 |

Règles : largeur de mesure du texte courant `max-inline-size: 65ch` ; chapôs `58ch` ; titres `22ch`. Les prix utilisent l'espace fine insécable comme séparateur de milliers (« 4 770 000 € ») et `font-feature-settings: "tnum"`. Les sur-titres (eyebrow) sont en `--fs-caption`, couleur `--accent-text`, précédés d'un filet 24 × 1 px `--accent`.

Hiérarchie sémantique : un seul `h1` par page ; les sections de la home utilisent `h2` ; les cartes utilisent `h3`.

### 2.5 Espacement

Base 4 px. `--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 24px` · `--space-6: 32px` · `--space-7: 48px` · `--space-8: 64px` · `--space-9: 96px` · `--space-10: 128px`.

Espacement fluide des sections : `--section-y: clamp(64px, 5vw + 32px, 128px)` (padding vertical des sections de page) ; `--section-gap-title: clamp(24px, 2vw + 16px, 40px)` (entre un H2 et son contenu).

Gouttières : `--gutter: 16px` (mobile) → `24px` (≥ 768) → `32px` (≥ 1280).

### 2.6 Rayons

`--radius-xs: 4px` (badges, chips carrés) · `--radius-sm: 8px` (champs, boutons) · `--radius-md: 12px` (cartes) · `--radius-lg: 16px` (panneaux, bento) · `--radius-xl: 24px` (bottom sheet, hero image) · `--radius-full: 999px` (pills, avatars, bouton flottant).

### 2.7 Ombres (teintées chaud, jamais noir pur)

- `--shadow-xs: 0 1px 2px rgb(28 27 25 / 0.06)` — champs, chips.
- `--shadow-sm: 0 2px 6px rgb(28 27 25 / 0.07), 0 1px 2px rgb(28 27 25 / 0.05)` — cartes au repos.
- `--shadow-md: 0 8px 24px rgb(28 27 25 / 0.10), 0 2px 6px rgb(28 27 25 / 0.06)` — cartes au survol, dropdowns.
- `--shadow-lg: 0 24px 48px rgb(28 27 25 / 0.16), 0 8px 16px rgb(28 27 25 / 0.08)` — modales, panneau assistant, bottom sheet.
- `--shadow-gold: 0 0 0 1px rgb(158 124 58 / 0.35)` — contour discret des éléments « à la une ».
Mode sombre : remplacer `28 27 25` par `0 0 0` et doubler l'opacité ; ajouter `--border` 1 px sur toutes les surfaces élevées (les ombres sont peu visibles sur charbon).

### 2.8 Motion

Durées : `--dur-fast: 150ms` (hover, focus) · `--dur-base: 220ms` (chips, accordéons, toggles) · `--dur-slow: 360ms` (panneaux, sheets, modales) · `--dur-reveal: 600ms` (reveal au scroll) · `--dur-page: 320ms` (View Transitions).
Easings : `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (entrées) · `--ease-in: cubic-bezier(0.4, 0, 1, 1)` (sorties) · `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (déplacements) · `--ease-spring: linear(0, 0.3 12%, 0.72 28%, 0.95 45%, 1.02 62%, 1)` (bouton flottant, toast).
`@media (prefers-reduced-motion: reduce)` : toutes les durées passent à `1ms`, les translations de reveal sont supprimées (opacité seule), le pulse du bouton assistant et les transitions de page sont désactivés.

### 2.9 Divers

`--z-nav: 50` · `--z-sticky: 40` · `--z-fab: 60` · `--z-sheet: 70` · `--z-modal: 80` · `--z-toast: 90`.
`--nav-h: 64px` (mobile) / `72px` (desktop). `--bottombar-h: 64px` (+ `env(safe-area-inset-bottom)`).
`--container: 1280px` · `--container-wide: 1440px` · `--container-narrow: 760px`.

---

## 3. Layout

### 3.1 Conteneurs

```css
.container        { inline-size: min(100% - 2 * var(--gutter), var(--container)); margin-inline: auto; }
.container-wide   { inline-size: min(100% - 2 * var(--gutter), var(--container-wide)); margin-inline: auto; }
.container-narrow { inline-size: min(100% - 2 * var(--gutter), var(--container-narrow)); margin-inline: auto; }
```
Aucun défilement horizontal autorisé : `html, body { overflow-x: clip }` et toutes les images `max-inline-size: 100%; block-size: auto`.

### 3.2 Grille

Grille 12 colonnes desktop (`grid-template-columns: repeat(12, 1fr)`, `gap: 24px` → `32px` ≥ 1280), 6 colonnes tablette (`gap 20px`), 4 colonnes mobile (`gap 16px`). Pour les listes de cartes, utiliser la grille auto-adaptative : `grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))`.

### 3.3 Breakpoints (mobile-first, `min-width`)

| Nom | Valeur | Usage |
|---|---|---|
| `xs` | 0 | 1 colonne, bottom bar, filtres en sheet |
| `sm` | 480px | Cartes 2 colonnes dans les carrousels, boutons côte à côte |
| `md` | 768px | 2 colonnes, nav desktop encore cachée, gouttière 24 px |
| `lg` | 1024px | Nav desktop, sidebar filtres, 3 colonnes de cartes, bouton assistant flottant |
| `xl` | 1280px | 4 colonnes de cartes (catalogue), gouttière 32 px |
| `2xl` | 1536px | Limite : le contenu ne s'élargit plus, les hero images gagnent en hauteur |

### 3.4 Container queries

Chaque composant réutilisable déclare `container-type: inline-size` sur son parent immédiat (`.card-grid`, `.sidebar`, `.sheet`, `.assistant-panel`). Règles obligatoires :
- `.property-card` : < 320 px de conteneur → specs sur 2 lignes, prix sous le titre ; ≥ 320 px → specs sur 1 ligne ; ≥ 560 px (vue liste) → disposition horizontale image 40 % / contenu 60 %.
- `.bento-item` : < 280 px → icône au-dessus du texte ; ≥ 280 px → icône à gauche.
- `.stat` : < 200 px → chiffre `--fs-h2` ; ≥ 200 px → `--fs-h1`.
- `.assistant-panel` : la largeur du panneau (420 px desktop, 100 vw mobile) pilote la grille d'options (1 ou 2 colonnes) via `@container (min-width: 380px)`.

### 3.5 Hauteurs & zones sûres

Hero : `min-block-size: calc(100svh - var(--nav-h))` sur mobile avec plafond `720px` ; desktop `min-block-size: 640px; max-block-size: 820px`. Toujours utiliser `svh`/`dvh`, jamais `vh` brut. Les éléments fixes en bas (bottom bar, bouton flottant, sheets) ajoutent `padding-bottom: env(safe-area-inset-bottom)`.

---

## 4. Architecture d'information & navigation

### 4.1 Arborescence cible

```
/                          Accueil
/acheter                   Catalogue ventes (Monaco par défaut ; chip « Hors Monaco » pour Côte d'Azur + international)
/louer                     Catalogue locations (même logique)
/bien/{ref}                Fiche bien (ex. /bien/V-168)
/estimation                Parcours vendeur / propriétaire (vendre, louer, gérer, estimer)
/services                  Services (hub) + ancres : #achat #location #gestion #evaluation #residence
/monaco                    Vivre à Monaco (hub scannable) + /monaco/quartiers/{slug}
/groupe                    Notre groupe (histoire 1925 → 2026, équipe, engagements)
/contact                   Contact (carte, horaires, WhatsApp, RDV)
/favoris                   Favoris (localStorage, partage de sélection)
/mentions-legales, /confidentialite, /plan-du-site
```

### 4.2 Mapping depuis l'ancienne navigation

| Ancien | Nouveau |
|---|---|
| Accueil | Logo (lien accueil) |
| Ventes › Studios / 2P / 3P / 4P / +5P / Parkings-Caves / Commerces-Bureaux | **Acheter** (une seule entrée) ; les sous-catégories deviennent les filtres « Famille » + « Pièces » pré-appliqués, accessibles via le méga-menu léger (liens rapides) |
| Locations › idem | **Louer** (idem) |
| International › Ventes / Locations | Chip de périmètre « Monaco / Côte d'Azur / International » dans Acheter et Louer ; lien rapide « International » dans le méga-menu |
| Services › Notre Groupe | **Le Groupe** |
| Services › Achat à Monaco / Locations / Gestion / Évaluation & Conseil | **Services** (page hub avec ancres) ; « Évaluation » renvoie aussi vers /estimation |
| Informations › Vivre à Monaco / Régime fiscal / Devenir résident / Chambre immobilière | **Monaco** (hub « Vivre à Monaco » avec accordéons : fiscalité, résidence, sécurité, quartiers ; la mention Chambre Immobilière passe dans Le Groupe + footer) |
| Contact | CTA **Contact** (bouton) + page /contact |
| Login / Register | Supprimés (aucune fonction visiteur) ; remplacés par « Mes favoris » (localStorage, icône cœur dans la nav) |
| Sélecteur de langue | Conservé, déplacé dans la barre utilitaire (desktop) et le drawer (mobile) |

### 4.3 Barre de navigation desktop (≥ 1024 px)

Structure (hauteur 72 px, fond `--bg` à 92 % d'opacité + `backdrop-filter: blur(12px)`, bordure basse 1 px `--border` apparaissant après 24 px de scroll) :

`[Logo 148×40] ····· Acheter · Louer · Estimer · Services · Monaco · Le Groupe ····· [♡ Favoris] [FR ▾] [☾] [Contact →]`

- Entrées : Manrope 500, 15 px, couleur `--text`, padding 8 × 12 px, soulignement animé 1 px `--accent` au survol (scale-x 0 → 1, 150 ms). Entrée active : soulignement permanent `--primary`.
- CTA « Contact » : bouton primaire taille S (section 11.1).
- Logo : monogramme triangle + « GROUPE SMIR » en SVG inline monochrome (`currentColor`), le triangle en `--accent`. Taille 148 × 40 px ; version compacte 40 × 40 (monogramme seul) sous 1024 px.
- Barre utilitaire : pas de barre séparée ; langue, thème et favoris sont des boutons icône 40 × 40 dans la nav.

Méga-menu : **non** (6 entrées suffisent). À la place, un **menu de liens rapides** s'ouvre au survol/focus de « Acheter » et « Louer » seulement : panneau 560 × auto, 2 colonnes, rayon 16 px, ombre `--shadow-md`, délai d'ouverture 120 ms, fermeture au `Escape` et au blur.
  - Colonne 1 « Par famille » : Appartements · Villas & maisons · Bureaux & commerces · Parkings & caves · Immeubles & investissement.
  - Colonne 2 « Par périmètre » : Monaco · Côte d'Azur · International, puis « Voir tout (41 biens) ».
  - Pied : lien ghost « Vous ne savez pas par où commencer ? Laissez-vous guider → » (ouvre l'assistant).

### 4.4 Navigation mobile (< 1024 px)

**Haut** : barre 64 px avec monogramme (lien accueil), titre de page tronqué (optionnel), bouton « Menu » (icône burger 24 px dans cible 44 px, `aria-expanded`).

**Bas : bottom bar fixe** (décision : bottom bar + drawer, pas de bottom bar seule). Hauteur 64 px + safe-area, fond `--surface`, bordure haute 1 px `--border`, 5 cibles égales :

| Position | Icône | Libellé (11 px, Manrope 600) | Action |
|---|---|---|---|
| 1 | maison avec clé | « Acheter » | /acheter |
| 2 | clé | « Louer » | /louer |
| 3 (centre, surélevé) | étincelle dans cercle 52 px, fond `--primary`, icône blanche | « Assistant » | ouvre le bottom sheet assistant |
| 4 | règle/balance | « Estimer » | /estimation |
| 5 | bulle téléphone | « Contact » | ouvre le sheet contact rapide (Appeler · WhatsApp · E-mail · RDV) |

Le bouton central dépasse de 12 px vers le haut (ombre `--shadow-md`, anneau 4 px `--bg`). L'entrée active est en `--primary` avec un point 4 px sous le libellé. La bottom bar se masque (`translateY(100%)`, 220 ms) lors d'un scroll descendant > 80 px et réapparaît au scroll montant ou en fin de page. Elle est masquée quand un sheet/modale est ouvert.

**Drawer** (depuis le bouton Menu) : panneau plein écran glissant depuis la droite (320 ms `--ease-out`), fond `--bg`, liste des 6 entrées en `--fs-h3` Cormorant, puis groupe « Pratique » (Favoris, Langue FR/EN/RU/IT en segmented control, Thème clair/auto/sombre), puis coordonnées (adresse, téléphone cliquable, WhatsApp). Focus piégé, `Escape` ferme, `inert` sur le reste de la page.

### 4.5 Footer

Fond `--text` (charbon) avec texte `--bg` en mode clair ; `--bg-2` en mode sombre. Padding vertical 64 px (mobile) / 96 px (desktop). Grille 4 colonnes desktop, 2 colonnes tablette, 1 colonne mobile (les colonnes de liens deviennent des accordéons sur mobile).

Contenu :
1. **Colonne marque** : logo monochrome crème (triangle or), baseline « Conseil immobilier à Monaco depuis 1925. », puis en 14 px : « Agence Lorenzi (1925) · Monte Carlo Immobilier (1956) · Groupe SMIR (1990) », puis badge texte « Membre de la Chambre Immobilière Monégasque ».
2. **Explorer** : Acheter · Louer · Estimer mon bien · Services · Vivre à Monaco · Le Groupe.
3. **Pratique** : Contact · Prendre rendez-vous · Nous écrire sur WhatsApp · Mentions légales · Confidentialité · Plan du site.
4. **Nous trouver** : « Winter Palace — 4, boulevard des Moulins, 98000 Monaco » · « Du lundi au vendredi, 9 h – 18 h » · téléphone (lien `tel:`) · e-mail · sélecteur de langue (select natif stylé).
Ligne basse (12 px, `--text-2` sur charbon : utiliser `#CFC9BD`, 10.44:1) : « © 2026 Groupe S.M.I.R. — Agence Lorenzi — Monte Carlo Immobilier. SAM au capital de … — RCI … » (valeurs à fournir).

Pas de répétition des sous-menus de catalogue, pas de deuxième plan du site.

---

## 5. Page d'accueil, section par section

Ordre définitif : 5.1 Hero → 5.2 Preuves (bento) → 5.3 Biens à la une → 5.4 Quartiers → 5.5 Services (bento) → 5.6 Parcours vendeur → 5.7 Vivre à Monaco → 5.8 Témoignages → 5.9 CTA final → 5.10 Footer. Alternance de fonds : `--bg`, `--bg-2`, `--bg`, `--bg`, `--bg-2`, `--text` (charbon, section 5.6), `--bg`, `--bg-2`, `--bg`, footer charbon.

Chaque section est un `<section aria-labelledby="…">` avec un sur-titre (eyebrow) + H2 + éventuellement un chapô ; padding `--section-y`.

### 5.1 Hero — proposition de valeur + recherche rapide + assistant

**Objectif** : dire qui nous sommes et offrir trois portes d'entrée (chercher, se faire guider, estimer) sans scroll.

**Composition desktop** : `container-wide`, grille 12 colonnes. Colonnes 1–7 : texte + barre de recherche. Colonnes 8–12 : illustration générative (section 14) dans un cadre 16 px de rayon, ratio 4:5, avec une « carte flottante » (240 × 88 px) ancrée en bas-gauche de l'image affichant un bien exemple (« 3 pièces · Carré d'Or · 4 770 000 € »). Hauteur hero `min 640px`.
**Composition mobile** : illustration ratio 16:10 en haut (hauteur max 220 px), puis texte, puis barre de recherche en mode compact, puis boutons. Pas d'image plein écran.

**Contenu exact** :
- Eyebrow : « Monaco · Côte d'Azur · International »
- H1 (`--fs-display`, Cormorant 500) : « L'immobilier à Monaco, conseillé en famille depuis 1925. »
- Chapô (`--fs-lead`, `--text-2`, max 52ch) : « Achat, location, gestion et estimation. Une maison indépendante du Carré d'Or, membre de la Chambre Immobilière Monégasque. »
- **Barre de recherche rapide** (composant `search-bar`, section 11.6) : pill 64 px de hauteur desktop, fond `--surface`, ombre `--shadow-md`, 4 segments séparés par des filets 1 px `--border` :
  1. Segmented control « Acheter | Louer » (par défaut Acheter).
  2. Select « Type » — « Tous types » (familles de la section 6.2).
  3. Select « Quartier » — « Tout Monaco » + 10 quartiers + « Côte d'Azur » + « International ».
  4. Select « Budget » — fourchettes dynamiques (vente : « Jusqu'à 2 M€ », « 2 – 5 M€ », « 5 – 10 M€ », « Plus de 10 M€ » ; location : « Jusqu'à 3 000 €/mois », « 3 000 – 8 000 €/mois », « Plus de 8 000 €/mois »).
  5. Bouton primaire icône loupe + « Rechercher » (desktop) ; mobile : chaque segment devient une ligne de 48 px dans une carte, bouton pleine largeur.
  Lien sous la barre (14 px, `--text-2`) : « Ou décrivez votre projet en une phrase : » + champ texte simple `« Ex. : 3 pièces vue mer, Larvotto, moins de 6 M€ »` qui alimente le parseur de l'assistant (section 8.9) et ouvre l'assistant à l'étape résultats.
- **Boutons sous la barre** : ghost « ✦ Laissez-vous guider » (ouvre l'assistant, `aria-haspopup="dialog"`) et ghost « Estimer mon bien → » (/estimation). Sur mobile : deux boutons pleine largeur empilés, 8 px d'écart.
- **Ligne de confiance** (14 px, icônes 16 px `--accent`) : « Depuis 1925 · 4, boulevard des Moulins · FR · EN · RU · IT ».

**Comportement** : pas de slider. L'illustration charge en `loading="eager"` + `fetchpriority="high"` (c'est le LCP). Reveal : titre, chapô, barre et boutons en cascade 60 ms (section 12).

### 5.2 Preuves — chiffres clés (bento)

**Objectif** : convertir l'histoire en preuves en 5 secondes.
**Composition** : eyebrow « Une maison, trois dates » ; H2 « Cent ans de Monaco, une seule adresse. » ; grille bento 6 colonnes desktop (`grid-template-areas`), 2 colonnes mobile :

```
desktop (6 col × 2 lignes, gap 16px, hauteur de ligne 180px)
[ 1925  ][ 1956  ][ 1990  ][  MEMBRE CHAMBRE (2 col)   ]
[ 4 LANGUES ][ CARRÉ D'OR (2 col) ][ 24 H (2 col)      ]
```

Tuiles (fond `--surface`, rayon 16 px, padding 24 px, bordure 1 px `--border`) :
1. « 1925 » (Cormorant `--fs-h1`, `--accent-text`) — « Fondation de l'Agence Lorenzi. »
2. « 1956 » — « Création de Monte Carlo Immobilier. »
3. « 1990 » — « Naissance du Groupe SMIR, réunion des deux maisons. »
4. Tuile large, icône sceau : « Membre de la Chambre Immobilière Monégasque » — « Honoraires au barème officiel, procédure encadrée par notaire. »
5. « 4 langues » — « Français, anglais, russe, italien. Une équipe internationale. »
6. Tuile large, mini-plan SVG du Carré d'Or avec point : « Winter Palace, 4 boulevard des Moulins » — « À deux pas du Casino de Monte-Carlo. »
7. Tuile large, fond `--primary-tint` : « Réponse sous 24 h ouvrées » — « Pour toute demande d'estimation ou de visite. »
Les chiffres années s'animent (compteur de 1900 → année, 800 ms, une seule fois, désactivé en reduced-motion).

**Mobile** : 2 colonnes, les tuiles larges passent en `grid-column: span 2`.

### 5.3 Biens à la une

**Objectif** : montrer des biens réels **avec prix** (fin des « prix sur demande » systématiques).
**Composition** : eyebrow « Sélection » ; H2 « Nos biens à la une » ; lien ghost à droite « Voir les 41 ventes → ». Rangée de 4 cartes (desktop), carrousel horizontal à scroll-snap sur mobile et tablette (cartes 82 vw, `scroll-snap-type: x mandatory`, `scroll-padding-inline: 16px`), indicateurs : « 1 / 6 » texte + boutons précédent/suivant 44 px (desktop uniquement).
**Contenu (données fictives inspirées, 6 cartes)** :
1. Badge « À la une » — « Appartement 3 pièces, vue mer » — Carré d'Or — 5 950 000 € — 114 m² · 3 p. · 2 ch. · 1 parking — réf. V-204.
2. « Duplex sur le port » — Port Hercule — 6 500 000 € — 116 m² · 3 p. · 2 ch.
3. « Studio rénové » — Monte-Carlo — 1 580 000 € — 30 m² · 1 p.
4. « Bureaux, immeuble moderne » — Fontvieille — 2 400 000 € — 95 m².
5. Badge « Location » — « Studette rénovée » — Port Hercule — 5 000 €/mois — 28 m².
6. « Villa pieds dans l'eau » — Cap d'Ail (Côte d'Azur) — « Prix sur demande » (autorisé hors Monaco uniquement, et jamais plus d'1 carte sur 6).
Anatomie de carte : section 6.5.
**CTA** : chaque carte est entièrement cliquable (lien sur le titre étendu par pseudo-élément) ; bouton favori indépendant.

### 5.4 Quartiers de Monaco

**Objectif** : permettre une recherche par lieu (inexistante aujourd'hui) et éduquer.
**Composition** : eyebrow « Où vivre » ; H2 « Dix quartiers, dix façons d'habiter Monaco. » ; chapô « Choisissez un quartier pour voir les biens disponibles et ce qui le distingue. »
Desktop : plan stylisé SVG de la Principauté (colonnes 1–6, illustratif, silhouettes des quartiers en aplats `--sea-1`/`--sea-2` avec contours or 1 px, chaque zone est un `<a>` avec `aria-label`) + liste de 10 cartes-lignes (colonnes 7–12, 56 px de haut chacune, nom + une ligne + compte « 8 biens »). Survol d'une ligne = surbrillance de la zone (classe `.is-hot`, remplissage `--gold-1` à 60 %). Mobile : plan masqué, liste en chips défilables 2 lignes puis cartes.
**Contenu (nom — accroche courte — nb biens fictif)** :
- Carré d'Or — « Le cœur de Monte-Carlo : Casino, palaces, boutiques. » — 9
- Monte-Carlo — « Résidentiel, élégant, vues mer. » — 7
- Larvotto — « La plage et les résidences de bord de mer. » — 4
- La Condamine — « Le marché, le port, l'énergie du quotidien. » — 5
- Port Hercule — « Les yachts sous vos fenêtres. » — 3
- Fontvieille — « Quartier moderne sur la mer, bureaux et familles. » — 6
- Monaco-Ville (Le Rocher) — « Ruelles historiques et Palais princier. » — 2
- Moneghetti — « Sur les hauteurs, calme et panoramas. » — 2
- Jardin Exotique — « Vue plongeante sur la Principauté. » — 2
- La Rousse / Saint-Roman — « Tours résidentielles et vue sur l'Italie. » — 1
CTA : chaque ligne → `/acheter?quartier=carre-d-or`. Lien ghost en bas « Comparer les quartiers (temps de trajet, commodités) → » vers /monaco#quartiers.

### 5.5 Services (bento)

**Objectif** : présenter les 5 métiers en une grille scannable.
**Composition** : eyebrow « Ce que nous faisons » ; H2 « Un seul interlocuteur, du premier rendez-vous à la remise des clés. » Bento 4 colonnes desktop (gap 16 px) : tuile 1 en `span 2` ; mobile 1 colonne.
**Tuiles** (icône trait 1.5 px 28 px `--accent`, H3 Cormorant 24 px, texte 15 px `--text-2`, lien « En savoir plus → » 14 px `--primary`) :
1. (large) « Acheter à Monaco » — « Offre écrite, acompte de 10 % chez le notaire, compromis puis acte authentique : nous vous accompagnons à chaque étape, avec des frais annoncés dès le départ. » → /services#achat
2. « Louer » — « Recherche, rédaction du bail, état des lieux et démarches d'installation. » → /services#location
3. « Gérer » — « Baux, loyers, charges, sinistres, syndic : votre patrimoine suivi au quotidien. » → /services#gestion
4. « Évaluer & conseiller » — « Estimation argumentée, analyse de marché, rapport de valeur vénale. » → /estimation
5. « Devenir résident » — « Banque, administration, écoles : notre réseau pour vous installer. » → /services#residence
6. « Investir » — « Rendement locatif, fiscalité, immeubles et programmes neufs. » → /services#investir

### 5.6 Parcours vendeur (estimation)

**Objectif** : capter le lead propriétaire. Fond charbon `--text` (texte crème `--bg`, or `--gold-1`), c'est la seule section sombre de la home en mode clair.
**Composition** : 2 colonnes desktop (texte 5 col / mini-formulaire 6 col décalé d'1 col) ; mobile empilé.
**Contenu** :
- Eyebrow (or) « Propriétaires »
- H2 « Vous vendez, louez ou confiez votre bien ? Parlons-en sous 24 h. »
- Chapô « Pas d'estimation automatique approximative : un conseiller analyse votre bien et vous rappelle avec une valeur argumentée. »
- Liste de 3 étapes (numéros Cormorant 32 px or) : « 1. Décrivez votre bien en 2 minutes » · « 2. Un conseiller vous rappelle sous 24 h ouvrées » · « 3. Vous recevez une estimation argumentée et un plan de mise en marché »
- **Mini-formulaire** (carte `--surface`, rayon 16 px, padding 32 px) : Type (select 5 familles) · Quartier (select) · Surface (number, suffixe « m² ») · bouton primaire pleine largeur « Commencer mon estimation → » (envoie vers /estimation avec les valeurs pré-remplies en query string). Sous le bouton, 12 px : « Gratuit et sans engagement. Vos données restent chez Groupe SMIR. »

### 5.7 « Vivre à Monaco » (teaser)

**Objectif** : éduquer en format scannable, orienter vers le hub.
**Composition** : eyebrow « Vivre à Monaco » ; H2 « Un pays de 2 km² qui change une vie. » ; bande de 5 stats (grille 5 col desktop / 2 col + 1 mobile), chaque stat : chiffre Cormorant `--fs-h2` `--accent-text` + libellé 14 px :
« 2 km² » / « de territoire, entre mer et montagne » · « 36 000 » / « habitants, 120 nationalités » · « 0 % » / « d'impôt sur le revenu pour les résidents (hors ressortissants français) » · « 1 pour 100 » / « policier par habitant, 700 caméras » · « Depuis 1297 » / « la famille Grimaldi, une stabilité unique ».
Puis 3 liens-cartes (icône + titre + 1 ligne) : « Devenir résident » / « Les conditions et les délais, expliqués simplement. » · « Le régime fiscal » / « Ce qui s'applique selon votre nationalité. » · « Les quartiers » / « Trajets, écoles, plages, commodités. » → /monaco#residence, #fiscalite, #quartiers.
Note juridique (12 px, `--text-2`) : « Informations générales, à confirmer avec votre conseil fiscal. »

### 5.8 Témoignages

**Objectif** : preuve sociale crédible, sobre.
**Composition** : eyebrow « Ils nous ont confié leur projet » ; H2 « Des relations qui durent, parfois sur trois générations. » ; 3 cartes (desktop) / carrousel scroll-snap (mobile). Carte : guillemet ouvrant Cormorant 64 px or à 40 % d'opacité, citation Cormorant italique 22 px, puis nom/initiales + contexte 14 px `--text-2`, étoiles 5 × 16 px `--accent` (`aria-label="5 sur 5"`).
**Contenu (fictif, à remplacer par des avis réels avec accord écrit)** :
1. « Nous avons acheté avec l'Agence Lorenzi en 1988, puis vendu avec le Groupe SMIR en 2025. Même exigence, même discrétion. » — M. et Mme B., Monte-Carlo.
2. « Installation, banque, école : tout a été anticipé. Nous avons emménagé six semaines après notre premier appel. » — Famille R., arrivée de Londres.
3. « Gestion locative sans surprise : comptes-rendus clairs, loyers à l'heure. » — Propriétaire investisseur, Fontvieille.
Ligne sous les cartes : « Avis recueillis auprès de clients de l'agence. » Pas de note agrégée inventée.

### 5.9 CTA final / contact

**Objectif** : dernière porte avant le footer, trois canaux.
**Composition** : bande `--bg-2`, carte centrale `container-narrow` (max 760 px), rayon 24 px, fond `--surface`, bordure 1 px `--border`, padding 48 px (mobile 24 px), texte centré.
**Contenu** : H2 « Parlons de votre projet. » ; texte « Au Winter Palace, par téléphone ou sur WhatsApp, en français, anglais, russe ou italien. » ; rangée de 3 boutons (desktop en ligne, mobile empilés) : primaire « Prendre rendez-vous » (/contact#rdv), secondaire « WhatsApp » (icône, lien `https://wa.me/377…`), ghost « +377 … » (`tel:`). Ligne 14 px : « Du lundi au vendredi, 9 h – 18 h · 4, boulevard des Moulins, Monaco ».

### 5.10 Footer

Voir 4.5.

---

## 6. Page catalogue (Ventes / Locations)

URL : `/acheter` et `/louer`. Même gabarit ; `transaction` fixe le libellé et les fourchettes. Tous les filtres sont **synchronisés avec l'URL** (`?famille=appartements&type=penthouse&quartier=larvotto,carre-d-or&prix_max=6000000&surface_min=90&pieces=3&criteres=vue-mer,parking&tri=prix-asc&perimetre=monaco`) pour permettre le partage, l'historique et la pré-filtration par l'assistant.

### 6.1 Structure de page

- En-tête : fil d'Ariane (Accueil › Acheter) ; H1 « 41 biens à vendre à Monaco » (le nombre et le périmètre sont dynamiques : « 12 appartements à vendre, Carré d'Or ») ; chapô 1 ligne « Prix affichés honoraires d'agence inclus. Frais d'acquisition détaillés sur chaque fiche. »
- Barre de périmètre : segmented control « Monaco (41) | Côte d'Azur (6) | International (26) ».
- Desktop (≥ 1024) : sidebar filtres 300 px sticky (`top: calc(var(--nav-h) + 16px)`) à gauche + grille résultats ; ≥ 1280 : 3 colonnes de cartes ; 1024–1279 : 2 colonnes.
- Mobile/tablette : barre d'outils sticky sous la nav (56 px, fond `--bg` 92 % + blur) : bouton « Filtres (3) » (icône réglages, compteur de filtres actifs), bouton « Trier », toggle vue grille/liste (icônes 24 px). Les filtres s'ouvrent dans un **bottom sheet** (section 11.10) à 92 dvh.
- Sous la barre d'outils : rangée de **chips actives** défilable horizontalement.
- Grille de cartes, puis « Charger plus », puis bloc « Vous ne trouvez pas ? » (carte CTA assistant + alerte e-mail).

### 6.2 Regroupement des 25 types en 5 familles + sous-types

| Famille (filtre principal) | Sous-types (filtre secondaire, chips) | Types sources |
|---|---|---|
| **Appartements** | Studio · 2 pièces · 3 pièces · 4 pièces · 5 pièces et + · Duplex · Penthouse / Roof · Loft · Programme neuf | Appartement, Chambre de bonne (→ Studio, libellé « studette »), Duplex, Duplex-roof (→ Penthouse / Roof), Penthouse, Roof, Loft, Meublé (→ critère), Location saisonnière (→ critère), Programme neuf |
| **Villas & maisons** | Villa · Maison de ville · Terrain | Villa, Terrain |
| **Bureaux & commerces** | Bureau · Local commercial / Boutique · Murs commerciaux · Droit au bail · Fonds de commerce · Atelier / Hangar | Bureau, Local commercial, Boutique, Murs loc. commerciaux, Cession de droit au bail, Fonds de commerce, Atelier, Hangar |
| **Parkings & caves** | Parking / Garage / Box · Cave | Parking/Garage/Box, Cave |
| **Immeubles & investissement** | Immeuble entier · Programme neuf · Viager | Immeuble, Programme neuf, Viagers |

« Meublé », « Location saisonnière », « Usage mixte (habitation + bureau) » deviennent des **critères** (cases à cocher), pas des types. Le nombre de pièces n'est proposé que pour la famille Appartements et Villas. Chaque bien a une seule famille, un seul sous-type, et des critères multiples.

### 6.3 Filtres (sidebar desktop / bottom sheet mobile)

Ordre et composants (tous avec `<fieldset><legend>`) :
1. **Périmètre** (segmented control 3 valeurs — déjà dans l'en-tête, répété en sheet mobile).
2. **Famille** : 5 boutons-radio stylés en chips verticales avec compte entre parenthèses (« Appartements (24) »).
3. **Sous-type** (apparaît via `:has(input[name=famille]:checked)`) : chips multi-sélection.
4. **Quartier** : 10 cases à cocher (2 colonnes), chacune avec compte ; lien « Tout cocher / Décocher ».
5. **Budget** : deux champs numériques « Min » et « Max » (suffixe € ou €/mois) + 4 raccourcis chips (« < 2 M€ », « 2–5 M€ », « 5–10 M€ », « > 10 M€ »). Pas de slider double (illisible, inaccessible) ; un seul `<input type=range>` optionnel masqué pour la souris n'est pas retenu.
6. **Surface** : « Min » / « Max » en m² + raccourcis (« < 50 », « 50–100 », « 100–200 », « > 200 »).
7. **Pièces** : chips 1 · 2 · 3 · 4 · 5+ (multi).
8. **Critères** : cases « Vue mer », « Terrasse », « Parking inclus », « Concierge », « Piscine », « Meublé », « Usage mixte », « Neuf / rénové », « Cave ».
9. **Référence** : champ texte « V-204 ».
Pied de sidebar/sheet : bouton ghost « Réinitialiser » + (sheet uniquement) bouton primaire pleine largeur « Voir 12 biens » (compte en direct).
Application : desktop = instantanée (debounce 250 ms, `aria-live="polite"` sur le compteur de résultats) ; mobile = au clic sur « Voir N biens ».

### 6.4 Chips actives, tri, vues

- **Chips actives** : composant chip « removable » (section 11.3) : « Carré d'Or ✕ », « < 6 M€ ✕ », « Vue mer ✕ » ; dernier élément : chip texte « Tout effacer ». Sur desktop, la rangée est au-dessus de la grille ; sur mobile, sous la barre d'outils, défilable (`overflow-x: auto`, `scrollbar-width: none`, dégradé de bord 24 px).
- **Tri** : `<select>` natif stylé, libellé visible « Trier : » — options « Pertinence » (défaut ; biens à la une en premier puis date) · « Prix croissant » · « Prix décroissant » · « Surface décroissante » · « Nouveautés ». Les biens « Prix sur demande » sont toujours en fin de liste pour les tris par prix.
- **Vue** : toggle grille/liste (`role="radiogroup"`), mémorisé en localStorage (`smir-view`). Vue liste = carte horizontale (container query ≥ 560 px) avec description 2 lignes.

### 6.5 Carte de bien — anatomie (composant `property-card`)

Dimensions : largeur fluide (min 280 px), fond `--surface`, bordure 1 px `--border`, rayon 12 px, `overflow: clip`, ombre `--shadow-sm` → `--shadow-md` au survol, `translateY(-2px)` 220 ms.

```
┌───────────────────────────────┐
│ [image 4:3]        [♡ 40px]   │  ← badge en haut-gauche (12px de marge)
│ ● À la une                    │
│                   [1/6 ●●●○○] │  ← compteur photos (si > 1), bas-droite, pill 12px
├───────────────────────────────┤
│ 5 950 000 €            ·V-204 │  ← prix --fs-price, réf 12px --text-3 à droite
│ Appartement 3 pièces, vue mer │  ← H3 Cormorant 22px, 2 lignes max (line-clamp)
│ ◎ Carré d'Or · Monaco         │  ← 14px --text-2, icône épingle 16px
│ 114 m²  ·  3 p.  ·  2 ch.  ·  1 pk │  ← specs 14px Manrope 500, icônes 16px
│ [Vue mer] [Terrasse] [Concierge] │  ← 3 chips max 12px (tags), reste masqué
└───────────────────────────────┘
padding du corps : 16px ; gap vertical : 6px ; specs : gap 12px, séparateur « · »
```

- **Image** : ratio 4:3 (`aspect-ratio: 4 / 3`), `object-fit: cover`, `loading="lazy"` (sauf 3 premières : `eager`), `decoding="async"`, `width`/`height` déclarés, fond skeleton `--bg-2` pendant le chargement. Léger zoom 1.03 au survol (400 ms), désactivé en reduced-motion. Attribut `alt` = titre du bien + quartier.
- **Badge** (haut-gauche) : variantes « À la une » (`--accent-tint` / `--accent-on-tint`), « Nouveau » (`--primary-tint` / `--primary`), « Location » (idem bleu), « Exclusivité » (or), « Sous offre » / « Loué » / « Vendu » (`--error-tint` / `--error`, et image en `filter: grayscale(0.6)`).
- **Favori** : bouton 40 × 40 rond, fond `--surface` à 90 %, cœur 20 px trait ; état actif = cœur plein `--error` + léger scale 1.15 → 1 (spring). `aria-pressed`, libellé « Ajouter aux favoris » / « Retirer des favoris ». Stockage localStorage `smir-favs` (liste de refs). Un toast confirme (« Ajouté à vos favoris · Voir »).
- **Prix** : « 5 950 000 € » ; location « 5 000 €/mois » avec « /mois » en 14 px `--text-2` ; « Prix sur demande » en Manrope 600 18 px `--text-2`. Mention optionnelle sous le prix 12 px : « soit 52 193 €/m² » (vente) — affichée uniquement si surface connue.
- **Titre** : lien étendu (`.property-card a.title::after { position:absolute; inset:0 }`), focus visible sur la carte entière (`:focus-within` → outline 2 px `--focus` offset 2 px).
- **Specs** : surface (icône plan), pièces (icône porte), chambres (icône lit), parkings (icône voiture) ; masquer les valeurs nulles ; pour bureaux : surface + « Bureau » + étage.
- **Tags** : 3 chips 12 px max (`--bg-2`, texte `--text-2`), ordre de priorité : Vue mer › Terrasse › Parking › Concierge › Piscine › Meublé.
- **Vue liste** (≥ 560 px de conteneur) : `grid-template-columns: 40% 1fr`, image ratio 4:3 à gauche, description 2 lignes (`-webkit-line-clamp: 2`) ajoutée sous les specs, bouton ghost « Voir le bien → » à droite en bas.

### 6.6 États

- **Chargement** : 6 skeleton cards (section 11.11) à la même taille, animation shimmer 1.4 s, `aria-busy="true"` sur la grille.
- **Vide** (aucun résultat) : carte centrée (max 520 px), illustration SVG générative « vague + arche » 160 px, H3 « Aucun bien ne correspond à ces critères pour le moment. », texte « Élargissez votre recherche ou laissez-nous vous prévenir dès qu'un bien correspond. », boutons : primaire « Créer une alerte » (ouvre modale alerte : e-mail + consentement), secondaire « Élargir aux quartiers voisins » (retire le filtre quartier), ghost « Me faire conseiller » (assistant). Suggestions de biens proches (3 cartes) sous le bloc si l'assouplissement d'un filtre donne des résultats.
- **Erreur de données** : bandeau `--error-tint` « Le catalogue est momentanément indisponible. Réessayer » (bouton) + téléphone.
- **Fin de liste** : texte « Vous avez vu les 41 biens. » + carte CTA assistant.

### 6.7 Pagination

« Charger plus » (bouton secondaire, pleine largeur sur mobile, 320 px centré sur desktop) par lots de 12 ; libellé « Afficher 12 biens de plus (29 restants) ». Mise à jour de `?page=` dans l'URL pour le retour arrière ; focus déplacé sur la première nouvelle carte. Pas de scroll infini (footer inaccessible, mauvais pour le SEO). Pour > 60 résultats, afficher en plus une pagination numérotée en bas (liens `<a>`, `aria-current="page"`).

### 6.8 Bloc « Vous ne trouvez pas ? » (fin de liste et état vide)

Carte 2 colonnes : « Laissez-vous guider » (assistant, bouton primaire) et « Recevoir les nouveautés » (champ e-mail + case RGPD + bouton « Créer l'alerte »). Texte d'alerte : « Nous vous écrivons uniquement lorsqu'un bien correspond à vos critères. Désinscription en un clic. »

---

## 7. Fiche bien

URL `/bien/{ref}`. Gabarit `container` ; desktop : colonne contenu 8/12 + colonne latérale sticky 4/12 ; mobile : une colonne avec **barre d'action sticky en bas** (remplace la bottom bar de navigation sur cette page).

### 7.1 Galerie

- Desktop : mosaïque 2 lignes × 4 colonnes, hauteur 520 px, gap 8 px, rayon 16 px sur le groupe : image principale `grid-area: 1 / 1 / 3 / 3` (ratio 4:3), 4 vignettes à droite (2 × 2). Bouton « Voir les 12 photos » (secondaire, 40 px, bas-droite de la mosaïque) ouvre la **lightbox** (modale plein écran, fond `rgb(18 19 17 / 0.96)`, flèches 48 px, compteur « 3 / 12 », fermeture `Escape`, swipe sur tactile, `role="dialog"`, focus piégé). Bouton « Plan » (si plan disponible) et « Vidéo » (si disponible) à côté.
- Mobile : carrousel scroll-snap plein largeur, ratio 4:3, compteur pill « 1 / 12 » en bas-droite, boutons favoris et partage superposés en haut-droite (40 px, fond `--surface` 90 %).
- Sans photo (données fictives) : illustration générative seedée par la réf (section 14) + mention « Visuel illustratif — photos sur demande ».

### 7.2 En-tête sticky

Au scroll (après que l'en-tête principal est sorti de l'écran, via `IntersectionObserver`), une barre 64 px apparaît sous la nav (desktop) : [titre tronqué 18 px] · [quartier] ····· [prix `--fs-price` 22 px] [bouton primaire « Demander une visite »] [♡] [partage]. Sur mobile, la **barre sticky basse** (64 px + safe-area) contient : prix (18 px bold) + « voir les frais » (12 px lien) à gauche, bouton primaire « Demander une visite » (flex 1, max 200 px) à droite, et un bouton icône WhatsApp 48 px.

### 7.3 En-tête de fiche (statique, en haut du contenu)

Fil d'Ariane : Accueil › Acheter › Appartements › V-204.
Badges (À la une / Nouveau / Exclusivité). H1 Cormorant `--fs-h1` : « Appartement 3 pièces avec vue mer, Carré d'Or ». Ligne 16 px : « ◎ Carré d'Or, Monaco · Réf. V-204 · Publié le 3 nov. 2026 ».
Prix `--fs-price` 30 px « 5 950 000 € » + sous-ligne 14 px `--text-2` « Honoraires d'agence inclus · 52 193 €/m² ». Location : « 5 000 €/mois » + « Charges 250 €/mois en sus ».
Rangée de specs clés (bande `--bg-2`, rayon 12 px, padding 16 px, 4 à 6 items, icône 20 px + valeur 16 px bold + libellé 12 px) : Surface 114 m² · Pièces 3 · Chambres 2 · Salles de bain 2 · Parking 1 · Étage 7/9.

### 7.4 Description

H2 « Le bien » ; texte 17 px, max 65ch, 5 lignes visibles puis « Lire la suite » (bouton, `aria-expanded`) ; en dessous, « Points forts » : liste 2 colonnes à puces or (✓ 16 px `--accent`) extraite des équipements principaux.

### 7.5 Équipements & services

H2 « Équipements et services » ; grille de chips-cases (icône 20 px + libellé 14 px, fond `--surface`, bordure `--border`, rayon 8 px, 44 px de haut) : Vue mer · Terrasse 28 m² · Concierge 24 h · Piscine · Parking · Cave · Sécurité · Hammam · Salle de sport · Immeuble moderne · Climatisation · Ascenseur. Les équipements absents ne sont pas listés (pas de liste barrée).

### 7.6 Quartier & carte

H2 « Le quartier : Carré d'Or » ; 2 colonnes : à gauche texte 3 lignes + 4 « temps de trajet » (icône + « Casino 3 min à pied », « Plage du Larvotto 10 min », « Gare 12 min », « Aéroport de Nice 30 min en hélicoptère / 45 min en voiture ») ; à droite carte. **Carte** : image statique SVG stylisée du quartier (section 14) avec cercle de 200 m (pas d'adresse exacte, rayon 16 px, `aria-label="Localisation approximative dans le Carré d'Or"`). Point d'extension : conteneur `.map-slot[data-lat][data-lng]` pour brancher une carte interactive (Leaflet/MapLibre) plus tard, chargée uniquement au clic « Afficher la carte interactive » (RGPD, performance). Lien ghost « Découvrir le Carré d'Or → » vers /monaco/quartiers/carre-d-or.

### 7.7 Calcul des frais (vente) / loyer & charges (location)

**Vente** — Composant `cost-calculator`, carte `--surface`, bordure 1 px `--border`, rayon 16 px, padding 24 px, dans la colonne latérale (desktop) ou après la description (mobile). H3 « Budget total estimé ».

| Ligne | Calcul | Exemple (5 950 000 €) |
|---|---|---|
| Prix de vente | P | 5 950 000 € |
| Frais d'enregistrement et de notaire | 6 % × P | 357 000 € |
| Honoraires d'agence | 3 % × P | 178 500 € |
| TVA sur honoraires (20 %) | 0,6 % × P | 35 700 € |
| **Total acquisition** | **P × 1,096** | **6 521 200 €** |
| Acompte à la signature de l'offre (10 %) | 0,10 × P | 595 000 € |

Présentation : tableau 2 colonnes (libellé 14 px `--text-2` / montant 16 px tabular, aligné à droite), ligne total en Manrope 700 18 px avec filet supérieur 1 px `--accent`. Champ optionnel « Et si je proposais : [ 5 700 000 ] € » (input numérique, recalcul en direct, `aria-live="polite"`). Note 12 px : « Barème indicatif de la Chambre Immobilière Monégasque. Droits d'enregistrement susceptibles de varier selon la structure d'acquisition (personne physique, société). » Lien « Comment se déroule un achat à Monaco ? → » (/services#achat). Si « Prix sur demande » : le tableau est remplacé par « Frais d'acquisition : environ 9,6 % du prix (6 % + 3 % + TVA). Demandez le détail. ».

**Location** — H3 « Budget mensuel » : Loyer 5 000 € · Charges 250 € · **Total mensuel 5 250 €** ; puis « À l'entrée » : Dépôt de garantie (3 mois de loyer, paramètre `deposit_months`, à valider) 15 000 € · Honoraires d'agence (paramètre `rental_fee_rate`, valeur par défaut 10 % du loyer annuel HT + TVA 20 %, **à valider avec le barème CIM**) 7 200 € · Total à prévoir à l'entrée. Note : « Montants indicatifs, précisés dans le bail. »

### 7.8 Formulaire de contact court

Colonne latérale (desktop, sous le calculateur) / section « Intéressé par ce bien ? » (mobile). Carte `--surface`, H3 « Demander une visite ou plus d'informations ». Champs (4 max) : Nom complet (requis) · E-mail (requis) · Téléphone (optionnel, indicatif par défaut +377, aide « Nous pouvons vous écrire sur WhatsApp ») · Message (textarea 3 lignes, pré-rempli « Je souhaite visiter le bien V-204. »). Case RGPD requise : « J'accepte que Groupe SMIR me contacte au sujet de ce bien. Données conservées 3 ans, jamais cédées. Politique de confidentialité. » Bouton primaire pleine largeur « Envoyer ma demande ». Sous le bouton : « Réponse sous 24 h ouvrées. » + lien « ou appelez le +377 … ». Message de succès inline (`--success-tint`) : « Merci, votre demande concernant le bien V-204 est bien reçue. Un conseiller vous répond sous 24 h ouvrées. » Le formulaire reste masqué derrière un bouton « Demander une visite » sur mobile tant que l'utilisateur n'a pas cliqué (réduit la longueur de page) ; sur desktop il est visible.

Bloc conseiller : avatar 48 px (initiales sur fond `--primary-tint` si pas de photo ; **jamais de placeholder « John Doe »**), nom, « Conseiller · FR · EN · IT », bouton ghost « Appeler ».

### 7.9 Biens similaires

H2 « Vous aimerez aussi » ; 3 cartes (même famille, même périmètre, prix ±30 %, puis même quartier) ; carrousel scroll-snap sur mobile. Lien « Voir tous les appartements à vendre → ».

### 7.10 Partage

Bouton icône « Partager » (40 px) : utilise `navigator.share` si disponible (titre + prix + URL) ; sinon menu 3 entrées : « Copier le lien » (toast « Lien copié »), « WhatsApp » (`https://wa.me/?text=`), « E-mail » (`mailto:` avec sujet « Bien V-204 — Groupe SMIR »). Bouton « Télécharger la fiche PDF » hors MVP (point d'extension `data-action="pdf"`).

### 7.11 SEO / données

`<script type="application/ld+json">` `RealEstateListing` + `Offer` + `Place` ; `og:image` = première image ; H1 unique ; `<link rel="canonical">`.

---

## 8. Assistant « Trouvez votre bien »

Nom affiché : « Assistant SMIR » (sous-titre « Trouvez votre bien »). Pas de prénom inventé, pas d'avatar humain : une icône « étincelle dans une arche » (monogramme dérivé du triangle du logo). Fonctionne 100 % côté client (règles + scoring, section Annexe C) ; point d'extension LLM documenté en 8.10.

### 8.1 Bouton flottant (desktop ≥ 1024 px uniquement ; sur mobile l'accès est le bouton central de la bottom bar)

- Forme : pill, hauteur 56 px, padding 0 20 px 0 16 px, fond `--primary` (sombre : `--primary-solid`), texte blanc Manrope 600 15 px, icône étincelle 20 px à gauche, rayon `--radius-full`, ombre `--shadow-lg`.
- Libellé : « Trouvez votre bien ». Après 3 ouvertures ou si un parcours est en cours : libellé « Reprendre ma recherche » avec point `--accent` 8 px.
- Position : `position: fixed; right: 24px; bottom: 24px; z-index: var(--z-fab)`. Sur la fiche bien, il remonte à `bottom: 24px` sans conflit (la barre sticky mobile n'existe pas sur desktop).
- États : hover → `translateY(-2px)`, ombre inchangée, fond `--primary-hover` ; focus visible → anneau 2 px `--focus` offset 3 px ; actif (panneau ouvert) → devient un bouton rond 56 px « ✕ » (`aria-label="Fermer l'assistant"`).
- Animation d'attention discrète : 6 s après le chargement, **une seule fois par session**, un anneau (`box-shadow: 0 0 0 0 rgb(30 78 122 / 0.45)`) s'étend à `0 0 0 14px` transparent sur 900 ms (`--ease-out`) ; désactivé en reduced-motion et si l'utilisateur a déjà ouvert l'assistant (localStorage `smir-assistant-seen`). Pas de rebond, pas de bulle de texte surgissante.
- Réduction : sous 1200 px de largeur, le libellé est masqué (bouton rond 56 px, `aria-label` conservé) si une barre sticky est présente.

### 8.2 Panneau

- **Desktop** : panneau latéral droit, largeur 420 px, hauteur `100dvh`, fond `--bg`, bordure gauche 1 px `--border`, ombre `--shadow-lg`, entrée par `translateX(100%) → 0` 360 ms `--ease-out` ; le contenu de page n'est pas recouvert par un voile (l'utilisateur peut continuer à consulter) mais reçoit `inert` uniquement en mode « capture de contact » (étape 8). `role="dialog" aria-modal="false" aria-labelledby="assistant-title"`.
- **Mobile/tablette** : bottom sheet (section 11.10) 92 dvh, poignée 36 × 4 px, voile `--overlay`, `aria-modal="true"`, swipe vers le bas pour fermer (seuil 120 px ou vitesse > 0,5 px/ms).
- **En-tête** (64 px) : icône 24 px `--accent` + « Assistant SMIR » (Manrope 600 16 px) + sous-titre 12 px `--text-2` « Trouvez votre bien en 2 minutes » ; à droite : bouton « Recommencer » (icône 40 px, visible dès l'étape 2) et « Fermer » (40 px).
- **Barre de progression** : sous l'en-tête, 8 segments de 4 px de haut, gap 4 px, segments faits `--primary`, courant `--primary` à 50 %, restants `--border` ; texte masqué `aria-valuenow` via `role="progressbar"` + libellé visuel 12 px à droite « Étape 3 sur 8 ».
- **Corps** : zone scrollable (`overflow-y: auto`, `overscroll-behavior: contain`), padding 20 px, flux de messages. Fin de zone : bouton « Retour » (ghost, icône flèche, 40 px) à gauche, bouton « Passer » (ghost) pour les questions facultatives, bouton primaire « Continuer » à droite quand une sélection multiple est requise ; pour les questions à choix unique, le clic sur une carte avance immédiatement (pas de bouton « Continuer »).
- **Pied** (étape résultats et question libre) : champ de saisie 48 px « Précisez votre recherche… » avec bouton envoyer 40 px ; utilisé par le parseur de règles (8.9).

### 8.3 Messages

- Message assistant : bulle sans fond, icône 20 px à gauche, texte 16 px `--text`, `max-inline-size: 36ch` ; apparition : fondu + translateY 8 px, 220 ms ; quand plusieurs messages s'enchaînent, délai de 300 ms entre eux (pas d'indicateur « tape… » de plus de 600 ms ; aucun faux délai en reduced-motion).
- Réponse utilisateur : chip alignée à droite, fond `--primary-tint`, texte `--primary` (sombre : `--primary-tint` / `--primary`), 14 px, rayon 16 px, padding 8 × 12 px, cliquable pour revenir à cette question (`aria-label="Modifier : Appartement"`).
- Les questions passées restent visibles (fil), la question courante est ancrée en bas par `scrollIntoView({ block: 'end' })`.

### 8.4 Cartes de sélection (option cards)

Grille 2 colonnes (`@container (min-width: 380px)`), 1 colonne sinon ; gap 8 px. Carte : `label` contenant un `input type=radio|checkbox` visuellement masqué (mais focusable), hauteur min 64 px, padding 12 × 14 px, fond `--surface`, bordure 1 px `--border`, rayon 12 px, icône trait 24 px `--accent` à gauche, libellé 15 px Manrope 600, sous-libellé optionnel 12 px `--text-2`. États : hover → bordure `--border-strong` ; focus-visible → anneau `--focus` ; sélectionné (`:has(:checked)`) → bordure 2 px `--primary`, fond `--primary-tint`, coche 16 px en haut-droite. Les options « multi » affichent la coche carrée, les options « single » un point.

### 8.5 Flux de questions — textes définitifs

**Accueil (message 0)**
« Bonjour. Je vous aide à trouver un bien à Monaco ou à préparer la vente du vôtre. Quelques questions suffisent, sans engagement. »

**Q1 — Type (choix unique)** — « Quel type de bien recherchez-vous ? »
- Appartement (icône immeuble) — « Studio à penthouse »
- Villa / Maison (icône maison) — « Monaco, Cap d'Ail, Roquebrune… »
- Bureau / Commerce (icône vitrine) — « Bureaux, boutiques, murs »
- Parking / Cave (icône voiture) — « Places, boxes, caves »
- Je ne sais pas encore (icône boussole) — « Nous vous conseillons »

**Q2 — Projet (choix unique)** — « Quel est votre projet ? »
- Acheter pour y vivre (icône clé)
- Investir (icône courbe) — « Rendement, patrimoine »
- Louer (icône calendrier) — « Résidence, bureau, saisonnier »
- Vendre, louer ou faire gérer mon bien (icône balance) — « Vous êtes propriétaire »
→ Si « Vendre… » : aller directement à 8.7 (flux vendeur).

**Q3 — Budget (choix unique, fourchettes selon Q2)**
Achat/Investir : « Quel budget envisagez-vous ? »
- Jusqu'à 2 M€ · 2 à 5 M€ · 5 à 10 M€ · Plus de 10 M€ · Je préfère ne pas préciser
Location : « Quel loyer mensuel envisagez-vous ? »
- Jusqu'à 3 000 € · 3 000 à 6 000 € · 6 000 à 12 000 € · Plus de 12 000 € · Je préfère ne pas préciser
Si Q1 = Parking/Cave, les fourchettes deviennent : « Jusqu'à 300 000 € · 300 à 600 k€ · Plus de 600 k€ » (achat) ou « Jusqu'à 400 €/mois · 400 à 800 €/mois · Plus » (location).

**Q4 — Surface et pièces (deux lignes de chips, sautée pour Parking/Cave)** — « Quelle taille vous conviendrait ? »
- Pièces (choix unique) : Studio · 2 pièces · 3 pièces · 4 pièces · 5 pièces et plus · Peu importe
- Surface minimale (choix unique) : Moins de 50 m² · 50 à 100 m² · 100 à 200 m² · Plus de 200 m² · Peu importe
Pour Bureau/Commerce : uniquement la surface, libellés identiques.
Bouton « Continuer » (requis car deux sélections).

**Q5 — Quartiers (choix multiple)** — « Avez-vous des quartiers préférés ? Vous pouvez en choisir plusieurs. »
- Carré d'Or · Monte-Carlo · Larvotto · La Condamine · Port Hercule · Fontvieille · Monaco-Ville · Moneghetti · Jardin Exotique · La Rousse / Saint-Roman · Côte d'Azur (hors Monaco) · Conseillez-moi (exclusif, désélectionne les autres)
Chaque carte : nom + sous-libellé « 9 biens » (compte en direct selon Q1–Q3).

**Q6 — Critères (choix multiple, facultatif, bouton « Passer »)** — « Qu'est-ce qui compte le plus pour vous ? »
- Vue mer · Terrasse ou jardin · Parking inclus · Concierge · Piscine · Meublé · Usage mixte (habitation + bureau) · Neuf ou rénové · Calme absolu
Aide 12 px : « Nous classons les biens selon ces critères, sans exclure ceux qui n'en remplissent qu'une partie. »

**Q7 — Délai (choix unique)** — « Dans quel délai souhaitez-vous concrétiser ? »
- Dès que possible · Dans les 3 mois · Dans l'année · Je me renseigne

**Q8 — Contact (facultatif)** — « Souhaitez-vous que nous vous envoyions une sélection personnalisée ? C'est facultatif : vos résultats s'affichent dans tous les cas. »
- Champs : Prénom et nom · E-mail · Téléphone (optionnel) · Préférence de contact : chips « E-mail » / « Téléphone » / « WhatsApp » · Langue : chips FR / EN / RU / IT.
- Case obligatoire pour envoyer : « J'accepte que Groupe SMIR utilise ces informations pour me proposer des biens et me contacter. Conservation 3 ans, aucun transfert à des tiers. Lire la politique de confidentialité. »
- Boutons : primaire « Recevoir ma sélection » · ghost « Voir les résultats sans laisser mes coordonnées ».
- Après envoi : message « Merci, [Prénom]. Votre sélection vous sera envoyée aujourd'hui et un conseiller pourra vous appeler si vous l'avez souhaité. »

### 8.6 Résultats

Message d'introduction (généré par règles) : « Voici les biens qui correspondent le mieux à votre recherche : appartement, 2 à 5 M€, 3 pièces, Carré d'Or ou Larvotto, vue mer. »

Puis 3 à 5 **cartes résultat** (variante compacte de la carte bien, image ratio 16:9, 100 % de largeur du panneau) :
```
┌────────────────────────────────────┐
│ [image 16:9]      ● 92 % de correspondance │ ← pill haut-droite, fond --surface 92 %, texte --success si ≥ 80, --text si 60–79, --text-2 si < 60
├────────────────────────────────────┤
│ 5 950 000 €                         │
│ Appartement 3 pièces, vue mer       │
│ ◎ Carré d'Or · 114 m² · 3 p.        │
│ ✓ Vue mer  ✓ Carré d'Or  ✓ Dans votre budget  ✗ Pas de parking │ ← chips d'explication 12 px
│ [Voir le bien →]   [♡]              │
└────────────────────────────────────┘
```
Le score est expliqué en une phrase sous les chips : « Correspond à 92 % : vue mer, Carré d'Or, dans votre budget. Il manque un parking. » (règle de génération : lister les 3 critères les mieux notés, puis la première pénalité).
Sous les cartes :
- Bouton primaire pleine largeur « Voir les 12 biens correspondants » → `/acheter?...` pré-filtré avec `&tri=pertinence&assistant=1` (le catalogue affiche alors le score sur chaque carte et une chip « Recherche guidée ✕ »).
- Boutons secondaires : « Prendre rendez-vous » (/contact#rdv avec résumé pré-rempli) · « Créer une alerte » (modale e-mail) · « Modifier mes critères » (retour Q1 en conservant les réponses).
- Si Q1 = « Je ne sais pas encore » ou Q5 = « Conseillez-moi » : message préalable « Avec votre budget et votre projet, trois quartiers se détachent : Carré d'Or (prestige, commerces), Larvotto (plage), Fontvieille (moderne, familial). » puis les résultats.

### 8.7 Flux vendeur / propriétaire (Q2 = « Vendre, louer ou faire gérer mon bien »)

Message : « Merci. Pour un propriétaire, le plus utile est une estimation argumentée par un conseiller — nous ne donnons pas de prix automatique. Trois questions pour préparer votre rappel. »
- V1 (choix unique) — « Que souhaitez-vous faire ? » : Vendre · Mettre en location · Confier la gestion · Simplement connaître la valeur
- V2 (choix unique) — « Quel type de bien ? » : Appartement · Villa / Maison · Bureau / Commerce · Parking / Cave · Immeuble
- V3 (choix unique) — « Dans quel quartier ? » : 10 quartiers + Côte d'Azur
- Puis carte de conclusion : « Nous avons de quoi commencer. Terminez votre demande en 2 minutes : un conseiller vous rappelle sous 24 h ouvrées. » Bouton primaire « Continuer vers l'estimation → » (vers `/estimation?projet=vendre&type=appartement&quartier=larvotto`, étape 2 pré-remplie), ghost « Plutôt être rappelé maintenant » (ouvre le sheet contact rapide avec champ téléphone unique).

### 8.8 États

- **Chargement** (calcul du scoring > 300 ms ou chargement du JSON catalogue) : 3 skeleton cards résultat + message « Je compare vos critères aux 41 biens disponibles… ».
- **Aucun résultat** (score max < 40 ou 0 bien dans la famille) : message « Aucun bien ne correspond à l'ensemble de vos critères aujourd'hui. Voici ce que je vous propose : » + 3 cartes : « Élargir aux quartiers voisins » (relance avec Q5 vide), « Être prévenu des nouveautés » (alerte), « Parler à un conseiller » (RDV). Montrer tout de même les 3 meilleurs biens sous « Les plus proches de votre recherche » si score ≥ 25.
- **Erreur** (JSON indisponible, exception) : message `--error-tint` « Je n'arrive pas à charger le catalogue pour le moment. Vous pouvez réessayer ou nous appeler au +377 … » + boutons « Réessayer » / « Appeler ». Les réponses sont conservées (sessionStorage `smir-assistant-state`).
- **Reprise** : si un état existe en sessionStorage, message d'ouverture « Reprenons où nous en étions : étape 4 sur 8. » + bouton « Recommencer ».
- **Hors ligne** : même traitement que l'erreur avec libellé « Vous semblez hors ligne. ».

### 8.9 Entrée en langage naturel (règles, sans API)

Le champ libre (hero et pied du panneau) passe par un parseur de règles (regex + dictionnaires FR/EN) qui pré-remplit Q1–Q6 : nombres suivis de « pièces/p/rooms » → pièces ; « m² / m2 / sqm » → surface ; « M€ / M / millions / k€ / €/mois » → budget ; noms de quartiers et alias (« Golden Square » → Carré d'Or, « Rocher » → Monaco-Ville) ; mots-clés critères (« vue mer / sea view », « terrasse », « parking / garage », « meublé / furnished », « neuf / rénové ») ; verbes (« louer / rent » → location, « vendre / sell / estimation » → vendeur). Ce qui n'est pas reconnu déclenche la question correspondante. Message de confirmation : « J'ai compris : appartement, 3 pièces, Larvotto, moins de 6 M€, vue mer. Je complète avec deux questions. »

### 8.10 Point d'extension LLM (documenté, hors MVP)

Interface `AssistantEngine { parse(text) → Partial<Criteria>; explain(property, criteria) → string; nextQuestion(state) → Question }`. L'implémentation par défaut `RulesEngine` est synchrone ; une implémentation `LLMEngine` asynchrone pourra remplacer `parse` et `explain` via `window.SMIR.assistant.use(engine)`. Les états de chargement/erreur décrits en 8.8 sont déjà prévus pour une latence réseau. Aucune donnée de contact n'est envoyée à un modèle ; seules les réponses Q1–Q7 le seraient.

### 8.11 Accessibilité spécifique

Ouverture : focus sur l'en-tête du panneau ; `Escape` ferme (sauf saisie en cours dans un champ → première pression vide le champ, seconde ferme) ; `aria-live="polite"` sur la zone des messages ; chaque groupe d'options est un `fieldset` avec `legend` = texte de la question ; la progression est annoncée (« Étape 3 sur 8 ») ; retour clavier `Alt + ←` documenté dans un `title`. Fermeture : focus rendu au bouton déclencheur.

---

## 9. Page Estimation (lead vendeur)

URL `/estimation`. Gabarit `container-narrow` (760 px), fond `--bg`. H1 « Estimez votre bien avec un conseiller. » ; chapô « Aucun prix automatique : nous analysons votre bien et vous rappelons sous 24 h ouvrées avec une valeur argumentée. Gratuit, sans engagement. »

Ligne de confiance sous le chapô (icônes 16 px or) : « Membre de la Chambre Immobilière Monégasque » · « Depuis 1925 » · « Données confidentielles ».

### 9.1 Structure multi-étapes

Un seul `<form>` avec 4 `<fieldset>` affichés un à un ; stepper horizontal en haut (4 pastilles 32 px reliées par un filet ; faite = coche sur `--primary`, courante = anneau `--primary`, à venir = `--border`), libellés 12 px sous les pastilles : « Votre bien » · « Ses atouts » · « Votre projet » · « Vos coordonnées ». Barre de progression supplémentaire `role="progressbar"`. Sauvegarde automatique en sessionStorage (`smir-estimation`) ; reprise proposée au retour.

Navigation : boutons « Retour » (ghost) et « Continuer » (primaire) alignés à droite, pleine largeur sur mobile (deux boutons empilés, le primaire en premier). Validation à la sortie de chaque étape ; erreurs inline (section 11.2) ; le focus va sur le premier champ en erreur.

### 9.2 Étape 1 — Votre bien

- Type (cartes de sélection 5 familles, choix unique, requis).
- Quartier (select 10 quartiers + « Côte d'Azur » + « Autre », requis) + champ « Adresse ou résidence (facultatif) ».
- Surface habitable (number, suffixe m², requis, aide « Surface loi Carrez ou approximative ») ; Surface terrasse/jardin (number, facultatif).
- Pièces · Chambres (steppers − / + 44 px).
- Étage (select : Rez-de-chaussée, 1 à 20+, « Dernier étage » case) ; Ascenseur (oui/non).
- État général (chips : Neuf / rénové · Bon état · À rafraîchir · À rénover).

### 9.3 Étape 2 — Ses atouts

Cases à cocher en grille 2 colonnes : Vue mer · Vue port · Terrasse · Jardin · Parking (nombre) · Cave · Concierge · Piscine · Immeuble récent · Climatisation · Loué actuellement (si coché : champ « Loyer mensuel actuel »). Champ libre « Autre information utile » (textarea, 500 caractères, compteur). Zone « Ajouter des photos ou un plan (facultatif) » : drop zone 120 px pointillée, 5 fichiers max 10 Mo, aperçus 72 px ; **hors MVP côté serveur** : en MVP, les fichiers sont listés mais un texte indique « Vous pourrez aussi les envoyer par WhatsApp après notre rappel. »

### 9.4 Étape 3 — Votre projet

- Objectif (cartes choix unique) : Vendre · Louer · Faire gérer · Connaître la valeur.
- Délai (chips) : Dès que possible · 3 mois · 6 mois · Plus tard.
- « Avez-vous déjà une idée de prix ? » (facultatif, number, aide « Nous en discuterons ; ce n'est pas un engagement. »).
- « Le bien est-il déjà confié à une autre agence ? » (oui / non / je ne souhaite pas répondre).

### 9.5 Étape 4 — Vos coordonnées

Civilité (chips facultatives) · Prénom · Nom · E-mail · Téléphone (requis ; sélecteur d'indicatif simple +377 / +33 / +39 / +44 / +7 / autre) · Préférence : E-mail / Téléphone / WhatsApp · Créneau préféré (chips : Matin · Après-midi · Indifférent) · Langue (FR / EN / RU / IT).
Case requise : « J'accepte d'être contacté par Groupe SMIR au sujet de l'estimation de mon bien. Mes données sont conservées 3 ans et ne sont jamais cédées. Politique de confidentialité. »
Bouton primaire « Demander mon estimation ». Texte sous le bouton : « Un conseiller vous rappelle sous 24 h ouvrées. Aucun prix n'est généré automatiquement. »
Champ anti-spam honeypot masqué + délai minimal 3 s.

### 9.6 Confirmation

Page/état `--success-tint` : illustration SVG (arche + coche), H2 « Merci, votre demande est bien enregistrée. » ; récapitulatif en carte (type, quartier, surface, objectif) ; « Prochaine étape : un conseiller vous appelle sous 24 h ouvrées (lundi–vendredi, 9 h – 18 h). » ; boutons : secondaire « Ajouter à mon agenda » (fichier .ics « Rappel Groupe SMIR », facultatif), ghost « Découvrir comment se déroule une vente à Monaco → » (/services#vente). Pas de prix, pas de fourchette.

### 9.7 Colonne de réassurance (desktop, à droite, 320 px ; mobile : sous le formulaire)

Carte « Ce que comprend notre estimation » : liste ✓ « Analyse des ventes comparables récentes », « Visite et rapport écrit de valeur vénale », « Stratégie de commercialisation et frais détaillés », « Confidentialité absolue ». Carte conseiller (initiales, « Service Évaluation & Conseil », bouton « Appeler »). Mini-FAQ accordéon (3 questions) : « Est-ce gratuit ? », « Dois-je signer un mandat ? », « Combien de temps prend une vente à Monaco ? ».

---

## 10. Pages contenu

Gabarit commun : hero court (H1 + chapô + illustration 16:9 max 320 px de haut), sommaire latéral sticky « Sur cette page » (desktop, liste de liens d'ancre, `aria-current` mis à jour par IntersectionObserver), contenu en `container-narrow` pour le texte et `container` pour les grilles, CTA final 5.9.

### 10.1 Notre groupe (/groupe)

- H1 « Trois maisons, une famille, un siècle à Monaco. » ; chapô « Le Groupe SMIR réunit depuis 1990 l'Agence Lorenzi, fondée en 1925, et Monte Carlo Immobilier, créée en 1956. Indépendants, membres de la Chambre Immobilière Monégasque, nous conseillons des clients privés et institutionnels, à Monaco et à l'international. »
- **Timeline** verticale (mobile) / horizontale (desktop ≥ 1024, 4 jalons sur un filet 1 px `--accent`, nœuds 12 px or) :
  - 1925 — « L'Agence Lorenzi ouvre à Monaco. » — 2 lignes : « L'une des premières agences de la Principauté, au service des familles monégasques et des premiers résidents étrangers. »
  - 1956 — « Naissance de Monte Carlo Immobilier. » — « Les années Grace Kelly : Monaco attire une clientèle internationale, Monte Carlo Immobilier l'accompagne. »
  - 1990 — « Les deux maisons fusionnent : le Groupe SMIR est né. » — « Conseil et investissement immobilier, de Monaco à la Côte d'Azur, puis à Miami et Saint-Barthélemy. »
  - 2026 — « Une nouvelle génération, les mêmes valeurs. » — « Recherche guidée, estimation sur rendez-vous, transparence des frais : nous modernisons sans rien céder à la discrétion. »
  Chaque jalon : année en Cormorant `--fs-h1` `--accent-text`, titre H3, texte 15 px, illustration SVG 4:3 (section 14, thème « époque »).
- **Équipe** : grille de cartes 4 colonnes (desktop) : avatar 96 px rond (initiales sur dégradé mer si pas de photo), nom, rôle, langues (drapeaux interdits : codes « FR · EN · RU »), bouton ghost « Écrire ». Jamais de placeholder.
- **Engagements** (bento 3 tuiles) : « Indépendance » · « Barème de la Chambre Immobilière » · « Confidentialité ».
- **Réseau** : liste de 6 chips-icônes : Notaires · Banquiers · Fiscalistes · Architectes · Décorateurs · Entreprises de travaux, texte « Nous coordonnons les intervenants de votre projet. »
- **International** : 3 cartes : Côte d'Azur · Miami · Saint-Barthélemy, chacune avec compte de biens et lien catalogue filtré.

### 10.2 Services (/services)

H1 « Nos services » ; chapô « Acheter, louer, gérer, évaluer, s'installer : un interlocuteur unique et des étapes claires. » Sommaire en onglets ancrés (tabs, section 11.12, défilables sur mobile) : Achat · Vente · Location · Gestion · Évaluation · Devenir résident · Investir.

Chaque section (ancre `#achat`, `#vente`, …) suit le même gabarit : H2 ; chapô 2 lignes ; **« Comment ça se passe »** en stepper vertical numéroté (numéros Cormorant 28 px or) ; **« Ce que vous payez »** en encart `--bg-2` ; FAQ accordéon 3–5 questions ; CTA ghost.

Contenu #achat :
- Étapes : 1 « Définition du projet et sélection des biens » · 2 « Visites et offre d'achat écrite, avec acompte de 10 % versé chez le notaire » · 3 « Compromis de vente » · 4 « Acte authentique et remise des clés ».
- Encart : « Frais d'enregistrement et de notaire : 6 % du prix · Honoraires d'agence : 3 % + TVA 20 % (barème de la Chambre Immobilière Monégasque) · Acompte : 10 % à l'offre. » + mini calculateur (même composant que 7.7, prix saisi par l'utilisateur, valeur initiale 3 000 000 €).
Contenu #vente : étapes « Estimation argumentée » · « Mandat et plan de commercialisation » · « Visites qualifiées » · « Négociation, compromis, acte » ; encart « Honoraires au barème, à la charge définie au mandat. » ; CTA « Estimer mon bien ».
Contenu #location : « Recherche ciblée » · « Dossier et rédaction du bail » · « État des lieux et remise des clés » · « Démarches d'installation (abonnements, administration) ».
Contenu #gestion : deux colonnes « Gestion locative » (baux, loyers, charges, comptes-rendus trimestriels, rappels, sinistres, abonnements) et « Syndic de copropriété » (assemblées générales, inspections, travaux, comptabilité, fournisseurs, optimisation des coûts) ; encart « Honoraires de gestion : sur devis, selon le nombre de lots. ».
Contenu #evaluation : « Estimation argumentée, analyse de marché, rapport de valeur vénale pour vente, succession, banque ou arbitrage. » ; CTA « Demander une estimation ».
Contenu #residence : étapes « Logement (bail ≥ 12 mois ou achat) » · « Ouverture d'un compte bancaire à Monaco » · « Dossier de carte de résident » · « Installation » ; note « Démarches décrites à titre indicatif ; nous vous orientons vers les conseils compétents. »
Contenu #investir : 3 tuiles « Rendement locatif » · « Immeubles et murs commerciaux » · « Programmes neufs » ; texte 12 px « Les performances passées ne préjugent pas des performances futures. »

### 10.3 Vivre à Monaco (/monaco)

H1 « Vivre à Monaco » ; chapô « L'essentiel pour décider, en chiffres et en réponses courtes. »
- **Bande de 6 chiffres** (grille 3 × 2 desktop, 2 × 3 mobile) : « 2 km² » · « 36 000 habitants » · « 120 nationalités » · « ~40 banques » · « 1 policier pour 100 habitants » · « 700 caméras » (libellés en 14 px sous chaque chiffre).
- **Sections en accordéons** (ouverts un à un, `details/summary` stylés, section 11.7), chaque réponse ≤ 120 mots + liste à puces :
  - « Pourquoi Monaco est-il stable ? » — monarchie constitutionnelle, Grimaldi depuis 1297, économie sans dette.
  - « Quelle fiscalité pour un résident ? » (`#fiscalite`) — pas d'impôt sur le revenu pour les résidents (sauf ressortissants français, convention de 1963), pas d'impôt sur la fortune ni sur les plus-values immobilières pour les particuliers, droits de succession réduits en ligne directe ; TVA alignée sur la France ; avertissement « à confirmer avec votre conseil ».
  - « Comment devenir résident ? » (`#residence`) — logement, ressources, casier judiciaire, délai indicatif ; lien services#residence.
  - « Quelle sécurité au quotidien ? » — chiffres police/caméras.
  - « Écoles, santé, transports ? » — liste courte (écoles internationales, CHPG, héliport, gare TGV, aéroport de Nice à 30 km).
- **Quartiers** (`#quartiers`) : grille de 10 cartes 3 colonnes (desktop) : illustration 16:9 générative, nom H3, 1 phrase, 3 chips « Plage 5 min », « Casino 3 min », « Gare 12 min », compte de biens, lien « Voir les biens ». Page détail `/monaco/quartiers/{slug}` : même structure + tableau « Temps de trajet » (à pied / voiture) + « Commodités » + 6 biens du quartier.
- CTA de fin : « Vous envisagez de vous installer ? Parlons-en. » → /contact.

### 10.4 Contact (/contact)

H1 « Nous rencontrer » ; 2 colonnes desktop (formulaire 7/12, infos 5/12), mobile : infos d'abord (téléphone/WhatsApp en haut), formulaire ensuite.
- **Carte infos** : adresse « Winter Palace, 4 boulevard des Moulins, 98000 Monaco » + bouton ghost « Itinéraire » (lien vers une carte externe, `rel="noopener"`), horaires « Lundi – vendredi : 9 h – 18 h · Samedi sur rendez-vous », téléphone (`tel:`), e-mail, bouton secondaire « WhatsApp » (icône, `https://wa.me/377…?text=Bonjour, je souhaite…`), langues « FR · EN · RU · IT ».
- **Carte** : SVG stylisé du Carré d'Or (section 14) avec repère sur le Winter Palace et 3 repères « Casino 3 min », « Métropole », « Jardins ». Bouton « Afficher la carte interactive » (chargement différé, consentement).
- **Formulaire** (`#rdv`) : Objet (chips : Acheter · Louer · Vendre / estimer · Gestion · Autre) · Nom · E-mail · Téléphone · Message · Créneau souhaité (date + chips matin/après-midi, facultatif) · RGPD · bouton « Envoyer ». Pré-remplissage par query string depuis l'assistant (`?objet=acheter&resume=…`). Succès : « Merci, nous vous répondons sous 24 h ouvrées. »
- Bloc « Préférez-vous être rappelé ? » : champ téléphone + bouton « Me rappeler » (lead minimal).

### 10.5 Favoris (/favoris)

H1 « Vos favoris » ; sous-titre « Enregistrés sur cet appareil. Envoyez-vous la liste pour la retrouver ailleurs. » Grille de cartes de biens (6.5) avec bouton « Retirer ». Barre d'actions : « Partager ma sélection » (Web Share / copie d'un lien `?refs=V-204,V-188`) · « Recevoir par e-mail » (modale : e-mail + RGPD) · « Demander une visite groupée » (/contact avec refs pré-remplies). État vide : illustration + « Vous n'avez pas encore de favori. Touchez le cœur sur un bien pour le retrouver ici. » + bouton « Voir les biens à vendre ».

### 10.6 Page 404 et erreurs

404 : `container-narrow`, illustration « arche vide » 240 px, H1 « Cette page n'existe plus. », texte « Le bien a peut-être été vendu ou l'adresse a changé. », barre de recherche compacte (11.6 mobile), 3 liens : Acheter · Louer · Contact. Si l'URL correspond à un ancien motif `/fr/ventes/...`, afficher « Vous cherchiez nos ventes ? → Voir les biens à vendre ». 500 : même gabarit, texte « Une erreur est survenue de notre côté. Réessayez dans quelques instants ou appelez-nous au +377 … ».

### 10.7 Microcopy — table de référence (FR)

| Contexte | Texte |
|---|---|
| Bouton recherche hero | « Rechercher » |
| Bouton assistant | « Trouvez votre bien » / « Reprendre ma recherche » |
| Bouton estimation | « Estimer mon bien » |
| CTA fiche | « Demander une visite » |
| CTA catalogue vide | « Créer une alerte » |
| Favori | « Ajouter aux favoris » / « Retirer des favoris » |
| Toast favori | « Ajouté à vos favoris » + action « Voir » |
| Toast lien | « Lien copié » |
| Succès formulaire | « Merci, votre demande est bien reçue. Un conseiller vous répond sous 24 h ouvrées. » |
| Erreur réseau | « L'envoi n'a pas abouti. Vérifiez votre connexion ou appelez-nous. » |
| RGPD (courte) | « J'accepte que Groupe SMIR me contacte au sujet de ma demande. Données conservées 3 ans, jamais cédées. » |
| Prix sur demande | « Prix sur demande » |
| Loyer | « 5 000 €/mois » + « charges 250 €/mois en sus » |
| Charger plus | « Afficher 12 biens de plus (29 restants) » |
| Fin de liste | « Vous avez vu les 41 biens. » |
| Compteur filtres | « Voir 12 biens » |
| Réinitialiser | « Réinitialiser » / « Tout effacer » |
| Chip assistant | « Recherche guidée » |
| Skip link | « Aller au contenu » |
| Thème | « Thème : automatique / clair / sombre » |
| Horaires | « Du lundi au vendredi, 9 h – 18 h » |
| Délai | « Réponse sous 24 h ouvrées » |

Règles : pas de point d'exclamation ; pas de « Cliquez ici » ; verbes à l'infinitif sur les boutons, sauf formules de politesse (« Laissez-vous guider ») ; nombres avec espace fine insécable ; « € » précédé d'une espace insécable.

---

## 11. Composants

Tous les composants sont des classes BEM-light (`.btn`, `.btn--primary`, `.btn--sm`) écrites en CSS natif avec nesting ; aucune dépendance. Chaque composant déclare ses états `:hover`, `:focus-visible`, `:active`, `:disabled`/`[aria-disabled]`. Le focus visible est **toujours** : `outline: 2px solid var(--focus); outline-offset: 2px; border-radius: inherit` (jamais `outline: none` sans remplacement).

### 11.1 Boutons

| Variante | Fond | Texte | Bordure | Hover | Actif |
|---|---|---|---|---|---|
| Primaire | `--primary` (sombre : `--primary-solid`) | `#FFFFFF` | aucune | `--primary-hover`, `translateY(-1px)` | `translateY(0)`, fond `--primary-hover` |
| Secondaire | `--surface` | `--primary` | 1.5 px `--primary` | fond `--primary-tint` | fond `--primary-tint`, bordure `--primary-hover` |
| Ghost | transparent | `--primary` | aucune ; soulignement 1 px à 40 % | soulignement 100 %, fond `--primary-tint` à 50 % | — |
| Or (rare : « À la une », favoris) | `--accent-tint` | `--accent-on-tint` | 1 px `--accent` à 40 % | bordure `--accent` | — |
| Danger (confirmation suppression) | `--error` | blanc | — | assombri 8 % | — |

Tailles : S = hauteur 40 px, padding 0 14 px, 14 px Manrope 600 ; M (défaut) = 48 px, 0 20 px, 15 px ; L = 56 px, 0 28 px, 16 px (hero, sheets). Rayon `--radius-sm` (8 px) ; variante `.btn--pill` rayon full pour le bouton flottant et la barre de recherche. Icône 20 px, gap 8 px. Largeur min 44 px ; sur mobile `.btn--block` = 100 %. `disabled` : opacité 0.5, `cursor: not-allowed`, pas de hover. État chargement : `.is-loading` → texte remplacé par spinner 20 px (bordure 2 px, rotation 800 ms), `aria-busy="true"`, largeur figée.

Bouton icône : 40 × 40 (nav, cartes) ou 44 × 44 (mobile), rond ou rayon 8 px, `aria-label` obligatoire.

### 11.2 Champs de formulaire

- Conteneur `.field` : libellé au-dessus (14 px Manrope 600, `--text`), aide 12 px `--text-2` sous le champ, erreur 12 px `--error` avec icône 14 px, `aria-describedby` reliant aide + erreur.
- Input/select/textarea : hauteur 48 px (textarea min 96 px), padding 0 14 px, fond `--surface`, bordure 1 px `--border-strong`, rayon 8 px, texte 16 px (jamais moins : évite le zoom iOS), placeholder `--text-3`. Hover : bordure `--text-2`. Focus : bordure `--primary` + anneau 3 px `--primary-tint` (`box-shadow: 0 0 0 3px`). Erreur : bordure `--error` + anneau `--error-tint`. Désactivé : fond `--bg-2`, texte `--text-2`.
- Suffixes/préfixes (« € », « m² », « +377 ») : `.field__affix` 14 px `--text-2` en position absolue, padding ajusté.
- Select : natif avec chevron SVG 16 px en `background-image` ; `appearance: none`.
- Case à cocher / radio : 20 × 20, bordure 1.5 px `--border-strong`, rayon 4 px (radio : rond), coché : fond `--primary` + coche blanche ; zone cliquable = tout le label (min 44 px de haut).
- Segmented control (`role="radiogroup"`) : conteneur fond `--bg-2`, rayon 8 px, padding 3 px ; segment 40 px de haut, texte 14 px 600 ; actif = fond `--surface`, ombre `--shadow-xs`, texte `--text` ; inactif `--text-2`.
- Stepper (− / +) : boutons 44 × 44, valeur au centre 16 px tabular ; `inputmode="numeric"`.
- Validation : à la perte de focus (blur) puis en continu après la première erreur ; messages : « Veuillez indiquer votre e-mail. », « Cette adresse e-mail semble incorrecte. », « Veuillez accepter la politique de confidentialité pour continuer. ».

### 11.3 Chips

- Filtre (sélectionnable, `input` masqué) : hauteur 36 px (mobile 40 px), padding 0 12 px, 14 px Manrope 500, fond `--surface`, bordure 1 px `--border-strong`, rayon full. Sélectionné : fond `--primary-tint`, bordure `--primary`, texte `--primary`, coche 14 px. Hover : bordure `--text-2`.
- Active/removable (`button`) : même taille, fond `--primary-tint`, texte `--primary`, icône ✕ 14 px à droite dans une zone 24 px ; `aria-label="Retirer le filtre Carré d'Or"`.
- Tag (informatif, dans les cartes) : hauteur 24 px, padding 0 8 px, 12 px, fond `--bg-2`, texte `--text-2`, rayon 4 px.

### 11.4 Cartes

Base `.card` : fond `--surface`, bordure 1 px `--border`, rayon 12 px, padding 16 px (mobile) / 24 px (desktop), ombre `--shadow-sm`. Variantes : `.card--property` (6.5), `.card--bento` (rayon 16 px, padding 24 px, min-height 180 px), `.card--result` (8.6), `.card--testimonial`, `.card--cta` (fond `--bg-2`, sans ombre). Cartes cliquables : `:hover { box-shadow: var(--shadow-md); transform: translateY(-2px) }`, `:focus-within { outline }` ; les liens internes secondaires (favori) ont `position: relative; z-index: 1` pour passer au-dessus du lien étendu.

### 11.5 Badges

Hauteur 24 px, padding 0 10 px, 12 px Manrope 600 majuscules `letter-spacing 0.06em`, rayon 4 px, point 6 px optionnel à gauche. Variantes : `--accent-tint`/`--accent-on-tint` (À la une, Exclusivité) ; `--primary-tint`/`--primary` (Nouveau, Location) ; `--error-tint`/`--error` (Vendu, Loué, Sous offre) ; `--success-tint`/`--success` (Disponible). Sur image : fond `--surface` à 92 % + texte de la variante.

### 11.6 Barre de recherche rapide (hero)

Desktop : conteneur pill 64 px, fond `--surface`, ombre `--shadow-md`, grid `auto 1fr 1fr 1fr auto` ; chaque segment est un `button`/`select` de 64 px de haut avec libellé 11 px majuscule `--text-2` au-dessus de la valeur 15 px 600 ; séparateurs `--border`. Bouton « Rechercher » : primaire L pill, icône loupe. Tablette : 2 lignes. Mobile : carte rayon 16 px, chaque segment devient une ligne 52 px avec chevron, bouton pleine largeur sous les segments.

### 11.7 Accordéon

`<details class="acc">` + `<summary>` : hauteur min 56 px, padding 16 px 0, titre 17 px Manrope 600, chevron 20 px tournant 180° (220 ms), filet inférieur 1 px `--border`. Contenu : padding 0 0 20 px, 16 px, max 65ch. Animation d'ouverture : `grid-template-rows: 0fr → 1fr` sur un wrapper (220 ms) ; `name="faq"` pour l'ouverture exclusive quand souhaité. Focus visible sur le summary.

### 11.8 Toast

Position : bas-centre (mobile, au-dessus de la bottom bar : `bottom: calc(var(--bottombar-h) + 16px)`) / bas-droite desktop (`right: 96px` pour ne pas couvrir le bouton flottant). Largeur max 400 px, padding 12 × 16 px, fond `--text` (crème en sombre : `--surface` + bordure), texte 14 px `--bg`, rayon 8 px, ombre `--shadow-lg`, icône 20 px (succès `--success`, erreur `--error`), action optionnelle (lien ghost « Voir »), fermeture ✕. Durée 4 s (8 s si action), pause au survol/focus. Entrée : translateY(16px) + fondu 220 ms spring ; `role="status"` (`aria-live="polite"`) ; erreurs : `role="alert"`. Pile maximale : 3.

### 11.9 Modale / dialog

`<dialog>` natif : largeur `min(100% - 32px, 560px)`, rayon 16 px, padding 24 px (mobile) / 32 px, fond `--surface`, ombre `--shadow-lg`, `::backdrop` `--overlay` + `backdrop-filter: blur(4px)`. En-tête : H2 22 px Cormorant + bouton fermer 40 px ; pied : boutons alignés à droite (primaire à droite). Focus piégé natif, `Escape` ferme, clic sur le backdrop ferme (sauf formulaire modifié → confirmation). Ouverture : scale 0.96 → 1 + fondu 220 ms. Usages : lightbox (variante plein écran sans padding), alerte e-mail, confirmation.

### 11.10 Bottom sheet (mobile)

`<dialog class="sheet">` ancré en bas : largeur 100 %, hauteur `auto` (max 92 dvh), rayon 24 px 24 px 0 0, poignée 36 × 4 px `--border` centrée à 8 px du haut, en-tête 56 px (titre 17 px 600 + bouton fermer), corps scrollable, pied sticky avec bouton primaire pleine largeur (+ safe-area). Entrée : translateY(100%) → 0, 360 ms `--ease-out` ; fermeture au swipe (Pointer Events, seuil 120 px), au backdrop, à `Escape`. Le `body` reçoit `overflow: hidden` pendant l'ouverture (`scrollbar-gutter: stable` pour éviter le saut).

### 11.11 Skeleton

Blocs `--bg-2` avec dégradé animé (`linear-gradient(90deg, transparent, rgb(255 255 255 / 0.5), transparent)` ; sombre : blanc à 0.06), `background-size: 200% 100%`, animation 1.4 s linéaire infinie, désactivée en reduced-motion (fond statique). Formes : image 4:3, ligne titre 60 % × 20 px, ligne 40 % × 14 px, 3 pastilles 48 × 14 px. `aria-hidden="true"` sur les skeletons ; le conteneur porte `aria-busy`.

### 11.12 Tabs

`role="tablist"` horizontal : onglets 48 px de haut, padding 0 16 px, 15 px 600 `--text-2`, actif `--text` + barre inférieure 2 px `--primary` ; navigation ←/→ clavier, `aria-selected`, `aria-controls`. Mobile : défilable, dégradés de bord. Variante « ancres » (page Services) : les onglets sont des liens `<a href="#…">` avec `aria-current`.

### 11.13 Stat / chiffre clé

Chiffre Cormorant `--fs-h1` (ou `--fs-h2` sous 200 px de conteneur), `--accent-text`, `font-variant-numeric: lining-nums`, libellé 14 px `--text-2` max 24ch. Le chiffre est dans un `<strong>` avec `aria-label` complet quand abrégé (« 36 000 habitants »).

### 11.14 Bascule de thème

Bouton icône 40 px à 3 états cycliques (Auto → Clair → Sombre), icônes soleil/lune/demi-cercle, `aria-label="Thème : automatique"`. Écrit `data-theme` sur `<html>` et `localStorage.smir-theme` ; script inline en `<head>` (< 300 octets) pour appliquer le thème avant le premier rendu (pas de flash). `color-scheme: light dark` déclaré sur `:root` pour les contrôles natifs.

### 11.15 Sélecteur de langue

`<select>` natif stylé (desktop, 40 px) / segmented control (drawer mobile). Options affichées dans leur langue : « Français », « English », « Русский », « Italiano ». Change l'attribut `lang` et la préfixe d'URL (`/en/…`). Les liens `hreflang` sont dans le `<head>`.

### 11.16 Fil d'Ariane

14 px `--text-2`, séparateur chevron 12 px, dernier élément `aria-current="page"` en `--text` ; sur mobile seul le parent immédiat est affiché (« ‹ Acheter »). `<nav aria-label="Fil d'Ariane">` + schema.org `BreadcrumbList`.

### 11.17 Avatars

Rond 48 px (fiche) / 96 px (équipe), image `object-fit: cover` ou initiales (Manrope 600, 16/28 px, blanc) sur dégradé `--sea-1 → --sea-2`. Jamais d'image stock de personne.

---

## 12. Motion & micro-interactions

Principe : chaque mouvement a une fonction (orienter, confirmer, hiérarchiser) ; durée ≤ 360 ms sauf reveal ; rien ne boucle en continu sauf les skeletons.

Liste exhaustive autorisée :
1. **Reveal au scroll** : éléments `[data-reveal]` démarrent à `opacity: 0; translate: 0 16px` et passent à `opacity: 1; translate: 0 0` (600 ms `--ease-out`) quand ils entrent à 15 % dans le viewport (`IntersectionObserver`, `rootMargin: 0 0 -10% 0`, une seule fois). Dans un groupe `[data-reveal-group]`, délai de 60 ms par enfant (max 6 enfants, puis simultané). Implémentation préférée quand supportée : `animation-timeline: view()` avec `animation-range: entry 0% entry 30%`, fallback IO. Sans JS : tout est visible (classe `.js` sur `<html>` conditionne les états initiaux).
2. **Hover carte de bien** : `translateY(-2px)` + ombre `--shadow-md` (220 ms) ; image `scale(1.03)` (400 ms). Pas de hover sur tactile (`@media (hover: hover)`).
3. **Soulignement nav** : `scale-x` 0 → 1 depuis la gauche, 150 ms.
4. **Boutons** : primaire `translateY(-1px)` au hover, `scale(0.98)` à l'actif (100 ms).
5. **Favori** : cœur `scale(1) → 1.25 → 1` (300 ms spring) et remplissage ; toast.
6. **Chips/filtres** : changement de fond/bordure 150 ms ; le compteur de résultats fait un fondu 150 ms (`aria-live`).
7. **Accordéon** : `grid-template-rows` 220 ms + rotation chevron.
8. **Panneaux** (assistant, drawer, sheet, modale) : translation/scale 360 ms `--ease-out`, sortie 220 ms `--ease-in`.
9. **Barre de progression assistant** : largeur de segment 220 ms.
10. **Compteurs** (1925 / 36 000) : incrément sur 800 ms, une seule fois, `requestAnimationFrame`.
11. **Transitions de page (View Transitions)** : `@view-transition { navigation: auto }` ; fondu croisé 320 ms par défaut ; `view-transition-name: property-image-{ref}` sur l'image de carte et l'image principale de fiche pour un morphing carte → fiche ; `view-transition-name: site-header` pour figer la nav. Fallback : navigation classique.
12. **Bouton flottant** : anneau d'attention unique (8.1).
13. **Skeleton shimmer** : 1.4 s.
14. **Toast** : entrée spring, sortie fondu 150 ms.
15. **Scroll-snap** des carrousels : `scroll-behavior: smooth` (désactivé en reduced-motion).

Interdits : parallaxe, auto-play, animations de texte lettre par lettre, curseurs personnalisés, loaders plein écran, effets « glow » or.

`@media (prefers-reduced-motion: reduce)` : toutes les transitions → `transition-duration: 1ms`, `animation-duration: 1ms`, `animation-iteration-count: 1`, reveal sans translation, View Transitions désactivées (`::view-transition-group(*) { animation: none }`), scroll smooth désactivé, compteurs affichés directement.

---

## 13. Accessibilité (WCAG 2.2 AA) — checklist concrète

Structure
- [ ] `<html lang="fr">` (puis `en`, `ru`, `it`) ; `dir="ltr"` ; `<meta name="viewport" content="width=device-width, initial-scale=1">` sans `maximum-scale`.
- [ ] Skip link « Aller au contenu » premier élément focusable, visible au focus (bouton primaire 48 px en haut-gauche, `top: 8px; left: 8px`), cible `#main` avec `tabindex="-1"`.
- [ ] Landmarks : un `<header>`, un `<nav aria-label="Principale">`, un `<main id="main">`, un `<footer>`, `<nav aria-label="Fil d'Ariane">`, `<nav aria-label="Pied de page">` ; bottom bar `<nav aria-label="Navigation rapide">`.
- [ ] Un seul `h1` par page ; hiérarchie sans saut ; sections avec `aria-labelledby`.
- [ ] Titres de page `<title>` distincts : « Appartement 3 pièces vue mer, Carré d'Or — Groupe SMIR ».

Clavier & focus
- [ ] Tout est atteignable au clavier dans l'ordre visuel ; aucun `tabindex > 0`.
- [ ] Focus visible 2 px `--focus` offset 2 px sur tous les éléments interactifs (critère 2.4.11 : jamais masqué par les barres sticky → `scroll-padding-top: calc(var(--nav-h) + 16px)` et `scroll-padding-bottom: var(--bottombar-h)`).
- [ ] Modales/sheets/drawer : focus piégé, `Escape`, retour du focus au déclencheur, `inert` sur le reste.
- [ ] Carrousels : boutons précédent/suivant accessibles, pas de contrôle au seul swipe ; `aria-roledescription="carrousel"`, items `aria-label="2 sur 6"`.
- [ ] Menu de liens rapides : ouverture au clic/Enter aussi (pas seulement au survol), fermeture `Escape`.

Cibles & gestes
- [ ] Cibles ≥ 44 × 44 px sur mobile, ≥ 40 px desktop avec espacement ≥ 8 px (critère 2.5.8 minimum 24 px respecté partout).
- [ ] Aucune action uniquement par glissement (swipe de sheet doublé par un bouton fermer ; carrousels doublés par boutons).
- [ ] Pas d'interaction déclenchée au seul survol (menu rapide aussi au focus/clic).

Contenu & formulaires
- [ ] Contrastes : texte ≥ 4.5:1, grand texte et UI ≥ 3:1 (tableau 2.3) ; vérification automatique (axe) en CI.
- [ ] Les informations ne reposent jamais sur la seule couleur (badges avec texte, erreurs avec icône + texte, score avec chiffre).
- [ ] Chaque champ a un `<label>` visible ; aide/erreur reliées par `aria-describedby` ; erreurs annoncées (`aria-live="assertive"` sur le résumé d'erreurs en haut du formulaire + focus) ; `autocomplete` renseigné (`name`, `email`, `tel`).
- [ ] Les champs requis sont indiqués par le texte « (requis) » dans le label, pas seulement un astérisque.
- [ ] Les selects/segmented/chips sont des contrôles natifs (`input`) stylés, jamais des `div` cliquables.
- [ ] Images : `alt` descriptif (titre + quartier) ; illustrations décoratives `alt=""` ; SVG inline informatifs avec `<title>` + `role="img"`.
- [ ] Textes redimensionnables à 200 % sans perte ; mise en page tenue à 320 px de large (reflow 1.4.10) ; `text-spacing` tolérant.
- [ ] Prix et chiffres lisibles par lecteur d'écran (espaces insécables fines, pas de « M€ » sans équivalent : `aria-label="5 950 000 euros"`).
- [ ] Liens explicites (« Voir le bien V-204 » via texte masqué, jamais « cliquez ici »).

Mouvement & préférences
- [ ] `prefers-reduced-motion` (section 12), `prefers-color-scheme`, `prefers-contrast: more` (bordures `--border` → `--border-strong`, suppression des fonds translucides), `forced-colors: active` (contours via `outline`, icônes en `currentColor`).
- [ ] Aucune animation > 5 s, aucun clignotement.

Assistant
- [ ] `role="dialog"`, titre, progression annoncée, `fieldset/legend`, `aria-live` polite sur les messages, explication du score en texte.

Tests
- [ ] Parcours complets (recherche, fiche, formulaire, assistant, estimation) validés au clavier seul, avec VoiceOver iOS et NVDA Firefox ; Lighthouse accessibilité ≥ 95 ; axe sans violation critique.

---

## 14. Illustrations / images (direction « lumière méditerranéenne »)

Faute de photos, toutes les images sont des **SVG génératifs** produits côté build (script Node, sortie `.svg` optimisées + fallback `.png`/`.webp` pour `og:image`) et, pour les visuels de carte, un composant `<svg>` inline rendu à la volée depuis une graine (`seed` = référence du bien, ex. « V-204 »). Même graine = même image, pour la cohérence entre carte, fiche et assistant.

### 14.1 Grammaire visuelle

- **Fond** : dégradé 2 ou 3 arrêts tirés parmi `--sea-2 → --sea-1 → #CFE3F0` (ciel/mer) ou `#F3E9D3 → --gold-1 → --gold-2` (pierre/or au couchant), angle 160–200°, grain SVG (`feTurbulence baseFrequency 0.8`, opacité 0.06) pour éviter l'effet plat.
- **Lignes architecturales** : 3 à 7 arcs en plein cintre (référence aux arcades art déco du Winter Palace et de la façade actuelle), traits 1 px `--gold-1` à 70 %, ou `--bg` à 40 % sur fonds sombres ; espacement harmonique (rayons × 1.25). Pas de remplissage.
- **Horizon** : une ligne fine à 62 % de la hauteur, avec un reflet dégradé sous elle (bande 8 % de hauteur, opacité 0.25).
- **Soleil/lune** : disque 6–10 % de la largeur, `--gold-1` à 85 %, positionné sur une grille 1/3.
- **Silhouettes** : optionnelles, 1 à 3 rectangles verticaux arrondis (immeubles) ou un triangle doux (Rocher), opacité 0.18, couleur du fond assombrie.
- **Variation par famille** : Appartements → arcs + silhouettes ; Villas → horizon bas + pins (3 cercles irréguliers) ; Bureaux → grille orthogonale fine 24 px ; Parkings → chevrons ; Immeubles → façade de 4 × 6 fenêtres.
- **Variation par quartier** : teinte dominante (Carré d'Or : or ; Larvotto : lagon ; Port Hercule : bleu profond ; Fontvieille : bleu-vert ; Rocher : pierre).
- Toujours `preserveAspectRatio="xMidYMid slice"`, `viewBox` 1200 × 900 (4:3) ou 1600 × 900 (16:9).

### 14.2 Ratios et tailles

| Usage | Ratio | Tailles rendues (largeur) | Format |
|---|---|---|---|
| Hero accueil (desktop) | 4:5 | 560 / 720 / 960 px | SVG inline (LCP sans requête) |
| Hero accueil (mobile) | 16:10 | 360 / 480 / 720 px | SVG inline |
| Carte de bien | 4:3 | 320 / 480 / 640 px | SVG inline seedé |
| Fiche : image principale | 4:3 | 800 / 1200 / 1600 px | SVG → `<picture>` webp pour og |
| Fiche : vignettes | 4:3 | 240 / 360 px | SVG |
| Résultat assistant | 16:9 | 380 / 760 px | SVG inline |
| Quartier (carte/hub) | 16:9 | 400 / 800 px | SVG |
| Timeline / services | 4:3 | 320 / 640 px | SVG |
| Open Graph | 1.91:1 | 1200 × 630 px | PNG/WebP généré au build |
| Favicon / app icon | 1:1 | 32, 180, 512 px | SVG + PNG (monogramme triangle or sur charbon) |

Poids cible : < 12 Ko par SVG inline (pas de filtre lourd en liste : le grain n'est appliqué que sur les visuels ≥ 800 px). Les SVG inline de liste ont `aria-hidden="true"` + `alt` porté par un `<img>` vide masqué ou `role="img" aria-label`.

### 14.3 Plans stylisés (quartiers, contact)

Un seul fichier `monaco-map.svg` (viewBox 1000 × 600) : tracé simplifié de la côte et des 10 quartiers en formes douces (rayon 12 px), remplissage `--sea-2` à 12 %, contour 1 px `--gold-2`, nom en Manrope 12 px ; chaque quartier est un `<a>`/`<g>` identifiable (`id="q-larvotto"`). Variante « focus » : le quartier courant en `--gold-1` à 50 % et les autres à 8 %. Repère : pastille 12 px `--primary` + halo 24 px. **Non géographique précis** : mentionner « plan schématique » en légende.

### 14.4 Icônes

Set unique trait 1.5 px, 24 × 24, coins arrondis, `stroke="currentColor"`, en sprite SVG `<symbol>` (≈ 40 icônes : clé, maison, immeuble, vitrine, voiture, cave, boussole, étincelle, loupe, cœur, partage, téléphone, WhatsApp, e-mail, position, plan, porte, lit, bain, terrasse, vague (vue mer), concierge, piscine, sécurité, hammam, haltère, ascenseur, climatisation, calendrier, horloge, chevron, croix, coche, filtre, grille, liste, soleil, lune, globe, flèche). Pas de FontAwesome, pas de font d'icônes.

---

## 15. Checklist qualité finale (validation de l'implémentation)

Technique
- [ ] HTML sémantique, CSS natif (nesting, `:has()`, container queries, `clamp()`), JS vanilla en modules ; aucun framework CSS ; aucune dépendance runtime externe hors Google Fonts.
- [ ] `tokens.css` contient tous les tokens des sections 2.1–2.9 ; aucun hex en dur ailleurs (`grep "#[0-9a-f]{6}"` hors tokens et SVG = 0).
- [ ] Thème sombre : `prefers-color-scheme` + `data-theme`, script anti-flash, `color-scheme`.
- [ ] Encodage UTF-8 vérifié sur toutes les pages (aucun « Ã© ») ; aucune notice serveur ; aucune 404 dans la nav ; aucun placeholder « John Doe ».
- [ ] i18n : toutes les chaînes dans `locales/fr.json` (clés, pas de texte en dur) ; `lang` et `hreflang` corrects ; prix formatés via `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })`.
- [ ] Données : `data/properties.json` (fictif, 41 ventes Monaco + 21 locations + international) avec famille/sous-type/quartier/critères/coordonnées approximatives ; `data/districts.json`.
- [ ] Schema.org : `Organization` (+ `foundingDate: 1925`), `RealEstateListing`, `BreadcrumbList`, `FAQPage` (Vivre à Monaco) ; `sitemap.xml`, `robots.txt`, `llms.txt` ; `og:*`/`twitter:*`.

Performance (mobile, 4G lente, Lighthouse)
- [ ] LCP < 2,0 s (hero SVG inline, polices préchargées, pas de hero bitmap) ; CLS < 0,05 (dimensions d'images, `size-adjust`) ; INP < 200 ms (filtres debounce, scoring en `requestIdleCallback` ou worker si > 50 ms).
- [ ] CSS total < 60 Ko non compressé ; JS initial < 40 Ko ; assistant chargé en `import()` différé au premier clic/au `idle`.
- [ ] Images lazy hors écran, `decoding="async"`, `fetchpriority="high"` sur le LCP uniquement.
- [ ] Score Lighthouse ≥ 95 Performance / 100 Accessibilité / 100 Bonnes pratiques / 100 SEO sur Accueil, Catalogue, Fiche.

Design
- [ ] Mise en page tenue à 320, 360, 390, 768, 1024, 1280, 1536 px sans scroll horizontal ; gouttière 16 px mobile.
- [ ] Surface d'or ≤ 2 % par écran ; jamais de texte or < 14 px ni sur blanc en `--accent` (seul `--accent-text` est autorisé en texte).
- [ ] Un seul CTA primaire visible par écran ; hero avec H1, chapô, barre de recherche, assistant, estimation visibles sans scroll sur desktop ; sur mobile, H1 + barre compacte visibles avant le pli (≤ 100 svh).
- [ ] Toutes les cartes de biens affichent un prix (sauf ≤ 1/6 « Prix sur demande » hors Monaco).
- [ ] Typographie : Cormorant uniquement ≥ 20 px ; corps 16–17 px ; mesures ≤ 65ch ; prix en tabular-nums.
- [ ] Mode sombre revu visuellement sur toutes les pages (ombres remplacées par bordures, illustrations assombries).

Parcours (tests manuels)
- [ ] Recherche hero → catalogue pré-filtré → fiche → formulaire envoyé → toast/succès.
- [ ] Assistant complet (8 étapes) → résultats avec scores expliqués → catalogue pré-filtré avec chip « Recherche guidée » ; flux vendeur → /estimation pré-remplie ; reprise après fermeture ; états vide/erreur simulés.
- [ ] Estimation 4 étapes → confirmation sans prix ; validation des erreurs ; sauvegarde/reprise.
- [ ] Favoris persistants ; partage (Web Share et fallback) ; alerte e-mail.
- [ ] Navigation mobile : bottom bar masquée au scroll descendant, drawer, sheets de filtres et de contact.
- [ ] Langues : bascule FR → EN conserve la page courante et les filtres.

Accessibilité
- [ ] Checklist section 13 entièrement cochée ; audit axe + test lecteurs d'écran consigné.

RGPD
- [ ] Chaque formulaire : finalité, durée (3 ans), absence de cession, lien politique ; case non pré-cochée ; aucun tracker tiers sans consentement ; cartes interactives chargées à la demande ; données assistant en sessionStorage uniquement, favoris en localStorage, rien d'autre.

---

## Annexe A — Mapping complet des 25 types sources

| Type source | Famille | Sous-type | Critère ajouté |
|---|---|---|---|
| Appartement | Appartements | selon pièces (Studio / 2P / 3P / 4P / 5P+) | — |
| Chambre de bonne | Appartements | Studio (libellé « Studette ») | — |
| Duplex | Appartements | Duplex | — |
| Duplex-roof | Appartements | Penthouse / Roof | Terrasse |
| Penthouse | Appartements | Penthouse / Roof | — |
| Roof | Appartements | Penthouse / Roof | Terrasse |
| Loft | Appartements | Loft | — |
| Meublé | Appartements | selon pièces | Meublé |
| Location saisonnière | Appartements (Louer) | selon pièces | Meublé + Saisonnier |
| Programme neuf | Appartements ou Immeubles & investissement (selon lot/immeuble) | Programme neuf | Neuf |
| Villa | Villas & maisons | Villa | — |
| Terrain | Villas & maisons | Terrain | — |
| Bureau | Bureaux & commerces | Bureau | — |
| Local commercial | Bureaux & commerces | Local commercial / Boutique | — |
| Boutique | Bureaux & commerces | Local commercial / Boutique | — |
| Murs loc. commerciaux | Bureaux & commerces | Murs commerciaux | — |
| Cession de droit au bail | Bureaux & commerces | Droit au bail | — |
| Fonds de commerce | Bureaux & commerces | Fonds de commerce | — |
| Atelier | Bureaux & commerces | Atelier / Hangar | — |
| Hangar | Bureaux & commerces | Atelier / Hangar | — |
| Parking/Garage/Box | Parkings & caves | Parking / Garage / Box | — |
| Cave | Parkings & caves | Cave | — |
| Immeuble | Immeubles & investissement | Immeuble entier | — |
| Viagers | Immeubles & investissement | Viager | — |
| (usage mixte, signalé dans les titres) | — | — | Usage mixte |

## Annexe B — Jeu de données fictif minimal (structure `properties.json`)

```json
{
  "ref": "V-204",
  "transaction": "vente",
  "perimeter": "monaco",
  "family": "appartements",
  "subtype": "3-pieces",
  "title": "Appartement 3 pièces avec vue mer",
  "district": "carre-d-or",
  "price": 5950000,
  "price_on_request": false,
  "charges_monthly": null,
  "surface": 114,
  "surface_terrace": 28,
  "rooms": 3,
  "bedrooms": 2,
  "bathrooms": 2,
  "parkings": 1,
  "floor": 7,
  "floors_total": 9,
  "criteria": ["vue-mer", "terrasse", "parking", "concierge", "securite", "ascenseur"],
  "condition": "renove",
  "featured": true,
  "published_at": "2026-11-03",
  "description": "…",
  "images": [],
  "geo": { "lat": 43.740, "lng": 7.428, "precision": 200 }
}
```
Quartiers (`districts.json`) : `slug`, `name`, `tagline`, `tint`, `travel: [{to, walk_min, drive_min}]`, `amenities: []`.

## Annexe C — Moteur de scoring (règles, 100 points)

| Dimension | Points | Règle |
|---|---|---|
| Famille / type | 25 | Même famille : 25 ; « Je ne sais pas » : 15 pour toute famille résidentielle ; sinon 0 (bien exclu si score famille = 0 et Q1 renseigné) |
| Budget | 25 | Dans la fourchette : 25 ; ≤ 10 % au-dessus : 15 ; ≤ 20 % : 8 ; « Prix sur demande » : 10 ; sinon 0 |
| Quartier | 15 | Dans la sélection : 15 ; quartier adjacent (table d'adjacence) : 8 ; « Conseillez-moi » : 10 ; sinon 0 |
| Pièces / surface | 15 | Pièces exactes : 8, ±1 : 4 ; surface ≥ min : 7, ≥ 90 % du min : 3 |
| Critères | 15 | 15 × (critères satisfaits / critères demandés) ; aucun critère demandé : 15 |
| Fraîcheur / à la une | 5 | Publié < 30 j : 3 ; à la une : 2 |

Seuils : ≥ 80 « Excellente correspondance » (`--success`), 60–79 « Bonne correspondance », 40–59 « À considérer », < 40 masqué (sauf fallback 8.8). Explication = libellés des 3 dimensions les mieux notées (phrases du dictionnaire : « vue mer », « Carré d'Or », « dans votre budget », « 3 pièces », « publié cette semaine ») + première dimension à 0 (« il manque un parking », « légèrement au-dessus de votre budget »).

## Annexe D — Structure i18n

`locales/{fr,en,ru,it}.json` ; clés hiérarchiques (`nav.buy`, `home.hero.title`, `assistant.q1.title`, `assistant.q1.options.apartment`) ; pluriels via `Intl.PluralRules` ; dates via `Intl.DateTimeFormat` ; URLs localisées (`/acheter` ↔ `/en/buy`) dans `routes.json`. La police Cormorant Garamond et Manrope couvrent le cyrillique ; vérifier les titres RU (plus longs : +25 %) sur les cartes à 2 lignes (`line-clamp`).

## Annexe E — Schema.org (extraits)

- `Organization` : `name: "Groupe SMIR"`, `alternateName: ["Agence Lorenzi", "Monte Carlo Immobilier"]`, `foundingDate: "1990"`, `address` (Winter Palace, 4 boulevard des Moulins, 98000 Monaco), `memberOf: "Chambre Immobilière Monégasque"`, `availableLanguage: ["fr","en","ru","it"]`.
- `RealEstateListing` : `name`, `url`, `datePosted`, `offers: { price, priceCurrency: "EUR", availability }`, `about: { @type: "Apartment", floorSize: { value: 114, unitCode: "MTK" }, numberOfRooms: 3 }`, `address.addressLocality: "Monaco"`.
- `FAQPage` sur /monaco et /services.

## Annexe F — `tokens.css` (squelette à copier)

```css
:root {
  color-scheme: light dark;

  /* Couleurs — clair */
  --bg: #F7F4EE;            --bg-2: #EFEAE0;
  --surface: #FFFFFF;       --surface-2: #FBF9F5;
  --text: #1C1B19;          --text-2: #5E5B55;        --text-3: #7A766E;
  --border: #D9D2C5;        --border-strong: #86817A;
  --primary: #1E4E7A;       --primary-hover: #163B5B; --primary-solid: #1E4E7A; --primary-tint: #E3ECF4;
  --accent: #9E7C3A;        --accent-text: #8A6B2B;   --accent-tint: #F3E9D3;   --accent-on-tint: #5C4718;
  --success: #2A6B47;       --success-tint: #E2F0E7;
  --error: #A8321F;         --error-tint: #F8E4E0;
  --warning: #8A5A12;
  --sea-1: #2F6E9E;         --sea-2: #163B5B;
  --gold-1: #C9A961;        --gold-2: #9E7C3A;
  --overlay: rgb(28 27 25 / 0.55);
  --focus: var(--primary);
  --shadow-rgb: 28 27 25;

  /* Typographie */
  --font-display: "Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --font-body: Manrope, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --fs-display: clamp(2.625rem, 1.75rem + 3.9vw, 4.75rem);
  --fs-h1: clamp(2.125rem, 1.55rem + 2.55vw, 3.5rem);
  --fs-h2: clamp(1.75rem, 1.4rem + 1.55vw, 2.625rem);
  --fs-h3: clamp(1.375rem, 1.25rem + 0.55vw, 1.75rem);
  --fs-h4: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --fs-lead: clamp(1.0625rem, 1rem + 0.35vw, 1.25rem);
  --fs-body: clamp(1rem, 0.97rem + 0.15vw, 1.0625rem);
  --fs-small: 0.875rem;
  --fs-caption: 0.75rem;
  --fs-price: clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem);

  /* Espacement */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px; --space-5: 24px;
  --space-6: 32px; --space-7: 48px; --space-8: 64px; --space-9: 96px; --space-10: 128px;
  --section-y: clamp(64px, 5vw + 32px, 128px);
  --section-gap-title: clamp(24px, 2vw + 16px, 40px);
  --gutter: 16px;

  /* Rayons */
  --radius-xs: 4px; --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px; --radius-xl: 24px; --radius-full: 999px;

  /* Ombres */
  --shadow-xs: 0 1px 2px rgb(var(--shadow-rgb) / 0.06);
  --shadow-sm: 0 2px 6px rgb(var(--shadow-rgb) / 0.07), 0 1px 2px rgb(var(--shadow-rgb) / 0.05);
  --shadow-md: 0 8px 24px rgb(var(--shadow-rgb) / 0.10), 0 2px 6px rgb(var(--shadow-rgb) / 0.06);
  --shadow-lg: 0 24px 48px rgb(var(--shadow-rgb) / 0.16), 0 8px 16px rgb(var(--shadow-rgb) / 0.08);
  --shadow-gold: 0 0 0 1px rgb(158 124 58 / 0.35);

  /* Motion */
  --dur-fast: 150ms; --dur-base: 220ms; --dur-slow: 360ms; --dur-reveal: 600ms; --dur-page: 320ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: linear(0, 0.3 12%, 0.72 28%, 0.95 45%, 1.02 62%, 1);

  /* Layout */
  --container: 1280px; --container-wide: 1440px; --container-narrow: 760px;
  --nav-h: 64px; --bottombar-h: 64px;
  --z-nav: 50; --z-sticky: 40; --z-fab: 60; --z-sheet: 70; --z-modal: 80; --z-toast: 90;
}

@media (min-width: 768px)  { :root { --gutter: 24px; } }
@media (min-width: 1024px) { :root { --nav-h: 72px; } }
@media (min-width: 1280px) { :root { --gutter: 32px; } }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #121311; --bg-2: #171815; --surface: #1B1C19; --surface-2: #24251F;
    --text: #ECE7DC; --text-2: #A8A294; --text-3: #86817A;
    --border: #34352F; --border-strong: #6F6B62;
    --primary: #8DBBE4; --primary-hover: #A9CDEE; --primary-solid: #2D6AA0; --primary-tint: #1C2E3F;
    --accent: #C9A961; --accent-text: #D2B26A; --accent-tint: #3A311C; --accent-on-tint: #E6CC8A;
    --success: #6FC08F; --success-tint: #1C3326; --error: #F08A79; --error-tint: #3D201B;
    --sea-1: #3E86B8; --sea-2: #1C2E3F; --gold-1: #E6CC8A; --gold-2: #9E7C3A;
    --overlay: rgb(0 0 0 / 0.65); --focus: var(--primary); --shadow-rgb: 0 0 0;
  }
}
:root[data-theme="dark"] {
  --bg: #121311; --bg-2: #171815; --surface: #1B1C19; --surface-2: #24251F;
  --text: #ECE7DC; --text-2: #A8A294; --text-3: #86817A;
  --border: #34352F; --border-strong: #6F6B62;
  --primary: #8DBBE4; --primary-hover: #A9CDEE; --primary-solid: #2D6AA0; --primary-tint: #1C2E3F;
  --accent: #C9A961; --accent-text: #D2B26A; --accent-tint: #3A311C; --accent-on-tint: #E6CC8A;
  --success: #6FC08F; --success-tint: #1C3326; --error: #F08A79; --error-tint: #3D201B;
  --sea-1: #3E86B8; --sea-2: #1C2E3F; --gold-1: #E6CC8A; --gold-2: #9E7C3A;
  --overlay: rgb(0 0 0 / 0.65); --focus: var(--primary); --shadow-rgb: 0 0 0;
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 1ms; --dur-base: 1ms; --dur-slow: 1ms; --dur-reveal: 1ms; --dur-page: 1ms; }
}

body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-size: var(--fs-body); line-height: 1.6; }
h1, h2, h3, .display { font-family: var(--font-display); font-weight: 500; text-wrap: balance; }
.price { font-variant-numeric: tabular-nums; font-weight: 700; font-size: var(--fs-price); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

## Annexe G — Wireframes de référence (ASCII)

Accueil, desktop ≥ 1280 (chaque ligne ≈ 80 px) :
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]        Acheter  Louer  Estimer  Services  Monaco  Le Groupe   ♡ FR ☾ [Contact] │
├──────────────────────────────────────────────────────────────────────────────┤
│ MONACO · CÔTE D'AZUR · INTERNATIONAL                 ┌────────────────────┐  │
│ L'immobilier à Monaco,                               │                    │  │
│ conseillé en famille depuis 1925.                    │   illustration     │  │
│ Achat, location, gestion et estimation. Une maison   │   4:5 générative   │  │
│ indépendante du Carré d'Or…                          │                    │  │
│ ┌──────────────────────────────────────────────┐     │ ┌──────────────┐   │  │
│ │ Acheter|Louer │ Type ▾ │ Quartier ▾ │ Budget ▾ │ 🔍 Rechercher │     │ │3 p · Carré  │   │  │
│ └──────────────────────────────────────────────┘     │ │d'Or 4,77 M€ │   │  │
│ Ou décrivez votre projet : [________________]        └─┴──────────────┴───┘  │
│ [✦ Laissez-vous guider]  [Estimer mon bien →]                                │
│ Depuis 1925 · 4, bd des Moulins · FR EN RU IT                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ UNE MAISON, TROIS DATES — Cent ans de Monaco, une seule adresse.             │
│ [1925][1956][1990][ Membre Chambre Immobilière ]                             │
│ [4 langues][ Winter Palace, plan ][ Réponse sous 24 h ]                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ SÉLECTION — Nos biens à la une                        Voir les 41 ventes →   │
│ [carte][carte][carte][carte]                                     ‹ 1/6 ›     │
├──────────────────────────────────────────────────────────────────────────────┤
│ OÙ VIVRE — Dix quartiers…        │ Carré d'Or ·········· 9 biens ›           │
│ [ plan SVG Monaco ]              │ Monte-Carlo ·········· 7 biens ›          │
│                                  │ …                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ CE QUE NOUS FAISONS — bento [Acheter (large)][Louer][Gérer]                  │
│                             [Évaluer][Devenir résident][Investir]            │
├──────────────────────────────────────────────────────────────────────────────┤
│ ▓▓ PROPRIÉTAIRES (fond charbon) ▓▓                                           │
│ Vous vendez, louez ou confiez… │ ┌ Type ▾ / Quartier ▾ / Surface __ m² ┐     │
│ 1. 2. 3.                       │ │ [Commencer mon estimation →]        │     │
├──────────────────────────────────────────────────────────────────────────────┤
│ VIVRE À MONACO — 2 km² · 36 000 · 0 % · 1/100 · 1297   [Résident][Fiscal][Quartiers] │
├──────────────────────────────────────────────────────────────────────────────┤
│ TÉMOIGNAGES — [“…”][“…”][“…”]                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│            ┌ Parlons de votre projet. [RDV][WhatsApp][+377…] ┐               │
├──────────────────────────────────────────────────────────────────────────────┤
│ ▓▓ FOOTER : marque | Explorer | Pratique | Nous trouver ▓▓                   │
└──────────────────────────────────────────────────────────────────────────────┘
                                                        (✦ Trouvez votre bien) ← flottant
```

Accueil, mobile 390 px :
```
┌──────────────────────┐
│ [◭]   Groupe SMIR  ≡ │ 64
│ [ illustration 16:10 ]│ ≤220
│ MONACO · CÔTE D'AZUR │
│ L'immobilier à       │
│ Monaco, conseillé en │
│ famille depuis 1925. │
│ Achat, location…     │
│ ┌──────────────────┐ │
│ │ Acheter | Louer  │ │
│ │ Type        Tous ›│ │
│ │ Quartier    Tout ›│ │
│ │ Budget       —   ›│ │
│ │ [  Rechercher   ] │ │
│ └──────────────────┘ │
│ [✦ Laissez-vous guider]│
│ [Estimer mon bien →] │
│ …sections empilées…  │
├──────────────────────┤
│ Acheter Louer (✦) Estimer Contact │ 64 + safe-area
└──────────────────────┘
```

Fiche bien, desktop :
```
│ Accueil › Acheter › Appartements › V-204                                      │
│ ┌──────────────┬──────┬──────┐  ┌──────────────────────────────┐              │
│ │   image      │ vign │ vign │  │ 5 950 000 €  52 193 €/m²     │ ← colonne   │
│ │   4:3        ├──────┼──────┤  │ Budget total estimé          │   sticky    │
│ │              │ vign │ vign │  │ 6 % … 3 % … TVA … 6 521 200 €│   4/12      │
│ └──────────────┴──────┴──────┘  │ [Demander une visite]        │             │
│ H1 Appartement 3 pièces…        │ Nom / E-mail / Tél / Msg     │             │
│ ◎ Carré d'Or · V-204 · 3 nov.   │ ☐ RGPD  [Envoyer]            │             │
│ [114 m²][3 p.][2 ch.][2 sdb][1 pk][7e] │ Conseiller · Appeler  │             │
│ Le bien … Lire la suite         └──────────────────────────────┘             │
│ Équipements et services [chips]                                               │
│ Le quartier : Carré d'Or  [texte + trajets] [carte SVG]                       │
│ Vous aimerez aussi [carte][carte][carte]                                      │
```

## Annexe H — Paramètres d'URL du catalogue

| Paramètre | Valeurs | Défaut | Source UI |
|---|---|---|---|
| `perimetre` | `monaco` · `cote-d-azur` · `international` | `monaco` | Segmented en-tête |
| `famille` | `appartements` · `villas` · `bureaux` · `parkings` · `immeubles` | — | Filtre famille / menu rapide |
| `type` | sous-types (liste, virgule) | — | Chips sous-type |
| `quartier` | slugs (liste) | — | Cases quartier / section 5.4 |
| `prix_min`, `prix_max` | entiers (€ ou €/mois) | — | Champs budget / raccourcis |
| `surface_min`, `surface_max` | entiers m² | — | Champs surface |
| `pieces` | `1,2,3,4,5` (5 = 5+) | — | Chips pièces |
| `criteres` | `vue-mer,terrasse,parking,concierge,piscine,meuble,mixte,neuf,cave` | — | Cases critères |
| `ref` | `V-204` | — | Champ référence |
| `tri` | `pertinence` · `prix-asc` · `prix-desc` · `surface-desc` · `nouveautes` | `pertinence` | Select tri |
| `vue` | `grille` · `liste` | `grille` | Toggle |
| `page` | entier | 1 | Charger plus |
| `assistant` | `1` | — | Depuis l'assistant : affiche scores + chip « Recherche guidée » |
| `refs` | liste de refs | — | Partage de favoris |

Règles : les paramètres vides sont retirés de l'URL ; l'ordre est canonique (ordre du tableau) ; `history.replaceState` pour les filtres, `pushState` pour « Charger plus » et le tri.

## Annexe I — Matrice responsive par gabarit

| Gabarit / élément | Mobile < 768 | Tablette 768–1023 | Desktop ≥ 1024 | ≥ 1280 |
|---|---|---|---|---|
| Navigation | Top bar 64 px + bottom bar + drawer | idem | Nav 72 px, 6 entrées + CTA, menu rapide | idem |
| Assistant | Bouton central bottom bar → bottom sheet 92 dvh | idem | Bouton flottant pill → panneau latéral 420 px | idem |
| Hero | Illustration 16:10 ≤ 220 px, barre en carte verticale | Illustration 16:10, barre sur 2 lignes | 7/12 texte + 5/12 illustration 4:5, barre pill 64 px | idem, `container-wide` |
| Bento preuves | 2 colonnes, tuiles larges `span 2` | 3 colonnes | 6 colonnes × 2 lignes | idem |
| Biens à la une | Carrousel scroll-snap 82 vw | Carrousel 2,2 cartes visibles | 4 cartes en ligne | 4 cartes |
| Quartiers | Chips défilables + liste | Liste 2 colonnes | Plan SVG 6/12 + liste 6/12 | idem |
| Services bento | 1 colonne | 2 colonnes | 4 colonnes, tuile 1 `span 2` | idem |
| Catalogue | Barre d'outils sticky 56 px, filtres en sheet, 1 colonne | 2 colonnes, filtres en sheet | Sidebar 300 px sticky + 2 colonnes | Sidebar + 3 colonnes |
| Carte de bien | Verticale, specs 1 ligne (≥ 320 px conteneur) | Verticale | Verticale ; vue liste horizontale ≥ 560 px | idem |
| Fiche bien | Carrousel 4:3 plein largeur, barre sticky basse | Mosaïque 2 colonnes, colonne latérale sous le contenu | Mosaïque 520 px + colonne sticky 4/12 | idem |
| Calculateur frais | Après la description | idem | Colonne latérale | idem |
| Estimation | 1 colonne, stepper compact (pastilles sans libellés, libellé courant seul) | 1 colonne, stepper complet | Formulaire 760 px + colonne réassurance 320 px | idem |
| Pages contenu | Sommaire masqué (remplacé par chips d'ancres défilables) | Sommaire masqué | Sommaire sticky à gauche 240 px | idem |
| Timeline | Verticale, filet à gauche | Verticale | Horizontale 4 jalons | idem |
| Footer | 1 colonne, accordéons | 2 colonnes | 4 colonnes | idem |
| Toast | Bas-centre au-dessus de la bottom bar | Bas-centre | Bas-droite, décalé du bouton flottant | idem |
| Modale | `min(100% - 32px, 560px)` | idem | idem | idem |

## Annexe J — Ordre de livraison recommandé (MVP)

1. `tokens.css`, reset, typographie, composants de base (boutons, champs, chips, cartes, badges, toast, dialog, sheet, skeleton) + page de démonstration des composants (`/styleguide`, non indexée) validée en clair et en sombre.
2. Gabarit global : nav desktop, top bar + bottom bar + drawer mobile, footer, skip link, bascule de thème, sélecteur de langue (FR seul actif).
3. Données fictives (`properties.json`, `districts.json`) + générateur SVG seedé.
4. Catalogue (filtres, URL, chips, tri, vues, états, charger plus) et carte de bien.
5. Fiche bien (galerie, sticky, calculateur, formulaire, similaires, partage, schema.org).
6. Accueil (10 sections) avec View Transitions carte → fiche.
7. Assistant (règles + scoring + parseur + états + capture RGPD) chargé en différé.
8. Estimation (4 étapes, sauvegarde, confirmation).
9. Pages contenu (Groupe, Services, Monaco, Contact, Favoris, 404).
10. Audit : Lighthouse, axe, lecteurs d'écran, checklist section 15 ; puis EN/RU/IT.

— Fin de la spécification —
