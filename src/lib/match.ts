/**
 * Moteur de correspondance de l'assistant « Trouvez votre bien ».
 * 100 % côté client, déterministe et explicable : chaque bien reçoit un score
 * (0–100) et une liste de raisons lisibles. Aucun appel réseau, aucune clé API.
 *
 * Point d'extension LLM : voir `src/lib/assistant-llm.example.ts`.
 */
import type { Listing, Family, Transaction } from '../data/listings';

export type Project = 'habiter' | 'investir' | 'louer' | 'vendre';

export interface Criteria {
  project: Project;
  transaction: Transaction;          // dérivé du projet (louer → location, sinon vente)
  family?: Family | 'indecis';
  budgetMin?: number | null;
  budgetMax?: number | null;         // € ou €/mois
  minRooms?: number | null;          // 0 = indifférent
  minSurface?: number | null;
  districts?: string[];              // slugs ; vide = conseillez-moi
  scope?: 'monaco' | 'cote-d-azur' | 'international' | 'tous';
  features?: string[];               // clés de FEATURE_LABELS
  timeline?: 'immediat' | '3-mois' | '6-12-mois' | 'veille';
}

export interface Match {
  listing: Listing;
  score: number;
  reasons: string[];
  warnings: string[];
}

const FAMILY_NEIGHBOURS: Record<Family, Family[]> = {
  'appartement': ['villa'],
  'villa': ['appartement'],
  'bureau-commerce': ['appartement'],  // studios à usage mixte
  'parking-cave': [],
  'terrain-immeuble': ['bureau-commerce'],
};

export function scoreListing(l: Listing, c: Criteria): Match {
  const reasons: string[] = [];
  const warnings: string[] = [];
  let score = 0;
  let max = 0;

  // 1. Transaction (éliminatoire)
  if (l.transaction !== c.transaction) return { listing: l, score: 0, reasons, warnings: ['Type de transaction différent'] };

  // 2. Famille de bien — 30 pts
  max += 30;
  if (!c.family || c.family === 'indecis') { score += 22; }
  else if (l.family === c.family) { score += 30; reasons.push(familyReason(l)); }
  else if (c.family === 'bureau-commerce' && l.mixedUse) { score += 24; reasons.push('Usage mixte : bureau possible'); }
  else if (FAMILY_NEIGHBOURS[c.family]?.includes(l.family)) { score += 10; warnings.push('Type de bien proche de votre demande'); }
  else return { listing: l, score: 0, reasons, warnings: ['Type de bien différent'] };

  // 3. Budget — 25 pts
  max += 25;
  if (l.price == null) { score += 12; warnings.push('Prix sur demande'); }
  else if (c.budgetMax == null && c.budgetMin == null) { score += 20; }
  else {
    const over = c.budgetMax != null ? l.price / c.budgetMax : 0;
    const under = c.budgetMin != null ? l.price / c.budgetMin : 1;
    if ((c.budgetMax == null || l.price <= c.budgetMax) && under >= 1) { score += 25; reasons.push('Dans votre budget'); }
    else if (over > 1 && over <= 1.12) { score += 15; warnings.push(`Légèrement au-dessus du budget (+${Math.round((over - 1) * 100)} %)`); }
    else if (over > 1.12 && over <= 1.3) { score += 6; warnings.push(`Au-dessus du budget (+${Math.round((over - 1) * 100)} %)`); }
    else if (over > 1.3) { return { listing: l, score: 0, reasons, warnings: ['Hors budget'] }; }
    else { score += 18; warnings.push('En dessous de votre budget minimum'); }
  }

  // 4. Localisation — 20 pts
  max += 20;
  const isMonaco = l.country === 'Monaco';
  const isCdA = l.country === 'France' || l.country === 'Italie';
  const scopeOk =
    !c.scope || c.scope === 'tous' ||
    (c.scope === 'monaco' && isMonaco) ||
    (c.scope === 'cote-d-azur' && (isMonaco || isCdA)) ||
    (c.scope === 'international' && !isMonaco);
  if (!scopeOk) return { listing: l, score: 0, reasons, warnings: ['Hors zone recherchée'] };
  if (c.districts && c.districts.length > 0) {
    if (c.districts.includes(l.district)) { score += 20; reasons.push('Dans un quartier souhaité'); }
    else if (isMonaco) { score += 8; warnings.push('Autre quartier de Monaco'); }
    else if (c.scope === 'cote-d-azur' && isCdA) { score += 6; warnings.push('Hors Monaco'); }
    else return { listing: l, score: 0, reasons, warnings: ['Hors des quartiers souhaités'] };
  } else { score += 16; }

  // 5. Taille — 15 pts (pièces + surface)
  max += 15;
  let sizePts = 15;
  if (c.minRooms && l.family !== 'parking-cave') {
    if (l.rooms >= c.minRooms) reasons.push(l.rooms === 1 ? 'Studio' : `${l.rooms} pièces`);
    else if (l.rooms === c.minRooms - 1) { sizePts -= 6; warnings.push('Une pièce de moins que souhaité'); }
    else { sizePts -= 12; warnings.push('Trop petit'); }
  }
  if (c.minSurface) {
    if (l.surface >= c.minSurface) { /* ok */ }
    else if (l.surface >= c.minSurface * 0.85) { sizePts -= 3; warnings.push('Surface un peu juste'); }
    else { sizePts -= 8; warnings.push('Surface insuffisante'); }
  }
  score += Math.max(0, sizePts);

  // 6. Critères — 10 pts, bonus proportionnel
  max += 10;
  if (c.features && c.features.length > 0) {
    const have = c.features.filter((f) => l.features.includes(f));
    score += Math.round((have.length / c.features.length) * 10);
    have.slice(0, 3).forEach((f) => reasons.push(FEATURE_SHORT[f] ?? f));
    const missing = c.features.filter((f) => !l.features.includes(f));
    if (missing.length) warnings.push(`Sans : ${missing.map((f) => (FEATURE_SHORT[f] ?? f).toLowerCase()).join(', ')}`);
  } else { score += 8; }

  // 7. Bonus projet
  if (c.project === 'investir') {
    if (l.features.includes('loue')) { score += 4; reasons.push('Déjà loué : revenu immédiat'); }
    if (l.family === 'parking-cave' || l.family === 'bureau-commerce') { score += 2; }
  }
  if (c.project === 'habiter' && l.family === 'appartement' && (l.seaView || l.terrace)) { score += 2; }
  if (c.timeline === 'immediat' && l.isNew) { score += 1; }

  const pct = Math.min(100, Math.round((score / max) * 100));
  return { listing: l, score: pct, reasons: dedupe(reasons).slice(0, 4), warnings: dedupe(warnings).slice(0, 3) };
}

export function findMatches(all: Listing[], c: Criteria, limit = 6): Match[] {
  return all
    .map((l) => scoreListing(l, c))
    .filter((m) => m.score >= MATCH_THRESHOLD)
    .sort((a, b) => b.score - a.score || (b.listing.featured ? 1 : 0) - (a.listing.featured ? 1 : 0))
    .slice(0, limit);
}

/**
 * URL du catalogue en mode « recherche guidée » : seuls les filtres durs (famille, zone)
 * sont passés ; le catalogue relit les critères en sessionStorage, score chaque bien et
 * masque ceux sous le seuil, pour rester cohérent avec le nombre annoncé par l'assistant.
 */
export function criteriaToQuery(c: Criteria): string {
  const p = new URLSearchParams();
  if (c.family && c.family !== 'indecis') p.set('famille', c.family);
  if (c.scope && c.scope !== 'tous') p.set('zone', c.scope);
  return p.toString();
}
export const MATCH_THRESHOLD = 35;

function familyReason(l: Listing): string {
  switch (l.family) {
    case 'appartement': return l.type;
    case 'villa': return 'Villa / maison';
    case 'bureau-commerce': return l.type;
    case 'parking-cave': return l.type;
    default: return l.type;
  }
}
const FEATURE_SHORT: Record<string, string> = {
  'vue-mer': 'Vue mer', terrasse: 'Terrasse', parking: 'Parking', concierge: 'Concierge', piscine: 'Piscine',
  meuble: 'Meublé', renove: 'Rénové', neuf: 'Neuf', 'usage-mixte': 'Usage mixte', jardin: 'Jardin', calme: 'Calme',
};
function dedupe<T>(a: T[]): T[] { return Array.from(new Set(a)); }
