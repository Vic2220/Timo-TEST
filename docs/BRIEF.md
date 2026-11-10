# BRIEF — Refonte 2026 du site Groupe SMIR (Monaco)

## 1. Qui est Groupe SMIR (site actuel : groupesmir.com/fr)
- SAM monégasque, conseil & investissement immobilier de luxe à Monaco + Côte d'Azur + international (Miami, Saint-Barth…).
- Née en 1990 de la fusion de l'Agence Lorenzi (1925) et Monte Carlo Immobilier (1956). Groupe familial, indépendant, membre de la Chambre Immobilière Monégasque.
- Bureaux : « Winter Palace », 4 boulevard des Moulins, Carré d'Or, à deux pas du Casino de Monte-Carlo.
- Équipe internationale, multilingue (site en FR / EN / RU / IT).
- Clients privés & institutionnels, locaux & internationaux. Réseau : notaires, banquiers, fiscalistes, architectes, décorateurs, entreprises de travaux. Accompagnement pour devenir résident monégasque.

## 2. Structure actuelle (navigation)
Accueil · Ventes (Studios / 2 pièces / 3 pièces / 4 pièces / +5 pièces / Parkings-Caves / Commerces-Bureaux) · Locations (idem) · International (Ventes 32 / Locations 20) · Services (Notre Groupe, Achat à Monaco, Locations, Gestion Immobilière, Évaluation & Conseil) · Informations (Vivre à Monaco, Le régime fiscal, Devenir résident, Chambre immobilière) · Contact. Login/Register. Sélecteur de langue.
Footer : coordonnées, mêmes menus répétés, plan du site, © 2026 GROUPE S.M.I.R. - Agence Lorenzi - Monte Carlo Immobilier.

## 3. Page d'accueil actuelle (ordre)
1. Hero slider plein écran (photo architecture/ciel) sans titre ni CTA.
2. Bandeau or.
3. « Nos services » : 6 tuiles texte (Notre groupe, Achats à Monaco, Locations à Monaco, Gestion immobilière, Évaluations & conseils, Vivre à Monaco) + « En savoir plus ».
4. Sidebar « RECHERCHE » : Pays (Monaco/International), À vendre/À louer, Nb pièces, Type de produit (liste de 25 types !), sliders Surface (0–350+) et Prix (0–10M+), bouton Rechercher.
5. 3 biens « à la une » (Villa Saint-Barth, Appartement Miami, Villa Cap d'Ail) – tous « Prix sur demande ».
6. Footer.

## 4. Catalogue (données réelles observées, à transformer en données fictives inspirées)
- 41 ventes Monaco, 21 locations Monaco, 32 ventes + 20 locations international.
- Types : Appartement, Villa, Parking/Garage/Box, Bureau, Local commercial, Cave, Atelier, Boutique, Cession de droit au bail, Chambre de bonne, Duplex, Duplex-roof, Fonds de commerce, Hangar, Immeuble, Location saisonnière, Loft, Meublé, Murs loc. commerciaux, Penthouse, Programme neuf, Roof, Terrain, Viagers.
- Quartiers de Monaco : Carré d'Or, Monte-Carlo, Fontvieille, La Condamine, Larvotto, Monaco-Ville (Le Rocher), Jardin Exotique, Moneghetti, La Rousse / Saint-Roman, Port Hercule.
- Fourchettes de prix observées (vente) : parking 450 000 € (13,5 m²) ; studio 1,58–2,1 M€ (30–44 m²) ; 2 pièces 2,7 M€ (83 m²) ; 3 pièces 4,77–5,95 M€ (95–114 m²) ; duplex vue port 6,5 M€ (116 m²) ; bureaux 0,9–6,45 M€ ; droit au bail 350–450 k€ ; fonds de commerce 655 k€. Villas Côte d'Azur et international : prix sur demande.
- Locations : parking 350 €/mois ; bureaux 1 600–9 500 €/mois ; studette rénovée Port Hercule 5 000 €/mois ; 6 pièces 440 m² vue panoramique prix sur demande.
- Fiche bien : titre, type, quartier, prix, surface, pièces, chambres, salles de bain, parkings, réf. (V-xxx / L-xxx), description, « services proposés » (vue mer, concierge, piscine, terrasse, parking, sécurité, hammam, salle de gym, immeuble moderne…), formulaire « plus d'informations », partage, biens similaires.
- Tri : prix, date. Vue liste / grille.

## 5. Contenus éditoriaux à reprendre (réécrits, plus courts, mieux hiérarchisés)
- Achats à Monaco : procédure (offre d'achat écrite + acompte 10 % chez le notaire → compromis → acte authentique). Budget : frais d'enregistrement & notaire 6 % ; honoraires d'agence 3 % + TVA 20 % (barème Chambre Immobilière) ; acompte 10 %.
- Locations : assistance rédaction du bail, démarches, état des lieux.
- Gestion immobilière : gestion administrative (baux, loyers, charges, compte-rendus, rappels, sinistres, syndic, abonnements) ; gestion de copropriétés / syndic (AG, inspections, travaux, comptabilité, fournisseurs, optimisation des coûts).
- Évaluation & conseil : estimation argumentée + analyse de marché ; rapport d'estimation ; valeur vénale.
- Vivre à Monaco : 2 km², 36 000 habitants, 120 nationalités, monarchie constitutionnelle, Grimaldi depuis 1297, stabilité ; économie sans dette ; fiscalité attractive ; ~40 banques ; sécurité (1 policier / 100 hab., 700 caméras) ; qualité de vie mer/montagne ; devenir résident.

## 6. Identité visuelle actuelle
- Or #ba8932 (accent principal), navy bleu nuit (logo), gris #74777c / #4d4f52, fonds #f1f3f6, bordeaux #751814 (secondaire).
- Typo : Lustria (serif, titres), Raleway + Open Sans. Logo : monogramme triangle doré « GROUPE SMIR — REAL ESTATE INVESTMENT ».
- Style : luxe classique, mais exécution datée (Bootstrap 3, sliders, FontAwesome).

## 7. Défauts constatés (à corriger absolument)
- Notice PHP affichée en haut de page ; encodage UTF-8 cassé (Ã©) sur les listes ; page « Nos services » en 404 ; fiche bien avec agent placeholder « John Doe, Manhattan ».
- Hero sans message, sans proposition de valeur ni CTA. Aucune preuve sociale, aucun chiffre clé mis en avant (1925 / 1956 / 1990 ne sont pas exploités).
- Recherche : 25 types de biens en liste plate, sliders peu lisibles, pas de recherche par quartier, pas de recherche en langage naturel, images de liste non chargées (lazy-load cassé).
- Biens « à la une » tous en « prix sur demande » → zéro information.
- Mobile non pensé (menus déroulants multiples). Pas de mode sombre, pas d'accessibilité (contrastes or/blanc faibles).
- Aucun parcours « estimation en ligne », aucune capture de lead qualifiée, aucun contenu pour investisseur (rendement, fiscalité) hors textes longs.
- Login/Register inutiles pour le visiteur.

## 8. Objectifs produit du MVP 2026
Persona cible : (a) acheteur/investisseur international HNWI ; (b) locataire (résident, cadre, société cherchant bureau) ; (c) propriétaire voulant vendre / louer / faire gérer / faire estimer.
En se mettant à la place d'une agence immobilière, le site doit :
1. Capturer et qualifier des leads (recherche guidée IA, estimation, alertes, prise de RDV).
2. Rendre le catalogue lisible et filtrable (quartier, type regroupé, budget, surface, pièces, critères : vue mer, terrasse, parking, concierge, piscine, usage mixte).
3. Rassurer (histoire 1925→2026, membre Chambre Immobilière, équipe, process clair, frais transparents).
4. Éduquer (Vivre à Monaco, fiscalité, devenir résident, procédure d'achat) en format scannable.
5. Être rapide, mobile-first, accessible (WCAG AA), multilingue-ready (FR par défaut, structure i18n).

## 9. Fonction « Assistant IA » (demande explicite)
Mini bouton flottant « Assistant » → panneau conversationnel guidé :
- Q1 « Quel type de bien recherchez-vous ? » (sélection : Appartement · Villa / Maison · Bureau / Commerce · Parking / Cave · Je ne sais pas encore)
- Q2 projet : Acheter pour y vivre · Investir (rendement) · Louer · Vendre / faire estimer / faire gérer mon bien
- Q3 budget (fourchettes adaptées vente/location) ; Q4 surface / pièces ; Q5 quartier(s) préférés ou « conseillez-moi » ; Q6 critères (vue mer, terrasse, parking, concierge, meublé, usage mixte, neuf/rénové) ; Q7 délai ; Q8 contact optionnel (email/tel/WhatsApp) avec consentement RGPD.
- Résultat : score de correspondance par bien (moteur de scoring côté client, explicable : « correspond à 92 % — vue mer, Carré d'Or, dans votre budget ») + redirection vers la page catalogue pré-filtrée + proposition de RDV / alerte. Pour un vendeur : redirection vers l'estimation.
- Doit fonctionner sans clé API (règles + scoring), avec un point d'extension documenté pour brancher un LLM plus tard.

## 10. Tendances 2026 à intégrer (synthèse de recherche)
- Mobile-first, performance (Core Web Vitals), accessibilité (WebAIM : 84 % des sites ont des contrastes insuffisants → on fait mieux).
- Esthétique « quiet luxury » / warm-modern : palette sobre (crème, charbon, or désaturé, bleu Méditerranée), serif éditorial pour les titres + sans-serif géométrique pour le corps, beaucoup d'air.
- Bento grid pour services/chiffres clés ; cartes immersives ; micro-interactions sobres ; scroll-driven reveals légers (respect prefers-reduced-motion).
- IA : assistant de recherche guidé, recommandations, réponse 24/7, qualification de leads ; estimation guidée sans prix automatique (collecte → RDV).
- Dark mode natif ; View Transitions ; container queries ; :has() ; CSS nesting ; pas de framework lourd.
- Contenu lisible par les agents IA (schema.org RealEstateListing / Organization, sitemap, llms.txt).
- Cartes/quartiers : guides de quartier, temps de trajet, commodités.
- CTA clairs et peu nombreux ; prise de RDV ; WhatsApp ; formulaires courts ; RGPD.
