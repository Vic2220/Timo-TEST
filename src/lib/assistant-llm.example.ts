/**
 * POINT D'EXTENSION — brancher un vrai modèle de langage sur l'assistant.
 *
 * L'assistant livré fonctionne sans clé API (règles + scoring, voir `match.ts`).
 * Pour une version « conversationnelle » (question libre → critères structurés),
 * exposez un endpoint serveur (Astro API route, Cloudflare Worker, etc.) qui :
 *   1. reçoit le message libre de l'utilisateur + l'état des critères ;
 *   2. appelle le modèle avec un schéma de sortie JSON = `Criteria` ;
 *   3. renvoie les critères complétés ; le client appelle ensuite `findMatches()`.
 *
 * Ne JAMAIS exposer la clé API côté navigateur. Exemple de contrat :
 *
 *   POST /api/assistant
 *   { "message": "un 3 pièces vue mer à Larvotto, 6 millions max", "criteria": { ... } }
 *   → { "criteria": { "family": "appartement", "minRooms": 3, "districts": ["larvotto"],
 *                      "features": ["vue-mer"], "budgetMax": 6000000, ... } }
 *
 * Le composant `Assistant.astro` contient un hook `window.__assistantResolve`
 * (optionnel) : si cette fonction existe, elle est appelée avec le texte libre
 * et doit renvoyer une Promise<Partial<Criteria>>.
 */
export {};
