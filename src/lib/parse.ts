/**
 * Parseur en langage naturel (règles, FR/EN) → critères partiels de l'assistant.
 * Ex. : « 3 pièces vue mer à Larvotto, moins de 6 M€ » →
 *   { family:'appartement', minRooms:3, features:['vue-mer'], districts:['larvotto'], budgetMax:6000000 }
 */
import type { Criteria } from './match';

const DISTRICT_ALIASES: Array<[RegExp, string]> = [
  [/carr[ée]\s*d'?or|golden\s*square|casino|monte[\s-]*carlo\s*centre/i, 'carre-d-or'],
  [/monte[\s-]*carlo/i, 'monte-carlo'],
  [/larvotto|plage/i, 'larvotto'],
  [/condamine|port\s*hercule|port\b|harbou?r/i, 'la-condamine'],
  [/fontvieille/i, 'fontvieille'],
  [/rocher|monaco[\s-]*ville|old\s*town|vieille\s*ville/i, 'monaco-ville'],
  [/jardin\s*exotique|exotic\s*garden/i, 'jardin-exotique'],
  [/moneghetti/i, 'moneghetti'],
  [/rousse|saint[\s-]*roman|st[\s-]*roman|country\s*club/i, 'la-rousse-saint-roman'],
];
const FEATURE_ALIASES: Array<[RegExp, string]> = [
  [/vue\s*mer|sea\s*view|face\s*(à\s*la\s*)?mer|ocean/i, 'vue-mer'],
  [/terrasse|terrace|balcon|balcony|jardin|garden/i, 'terrasse'],
  [/parking|garage|box\b/i, 'parking'],
  [/concierge|conciergerie|doorman/i, 'concierge'],
  [/piscine|pool/i, 'piscine'],
  [/meubl|furnish/i, 'meuble'],
  [/usage\s*mixte|mixed[\s-]*use|bureau\s*à\s*domicile|home\s*office/i, 'usage-mixte'],
  [/neuf|r[ée]nov|new\s*build|renovat/i, 'renove'],
  [/calme|quiet/i, 'calme'],
];

export function parseQuery(text: string): Partial<Criteria> & { seller?: boolean } {
  const t = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const out: Partial<Criteria> & { seller?: boolean } = {};
  if (!t) return out;

  // Transaction / projet
  if (/\b(vendre|vends|estim|valeur de mon|sell|valuation|faire g[ée]rer|gestion de mon)/i.test(t)) out.seller = true;
  if (/\b(louer|location|loyer|rent|lease|\/\s*mois|par mois|per month|pcm)\b/i.test(t)) { out.transaction = 'location'; out.project = 'louer'; }
  else if (/\b(investir|investissement|rendement|invest|yield|rapport)\b/i.test(t)) { out.transaction = 'vente'; out.project = 'investir'; }
  else if (/\b(acheter|achat|acqu[ée]rir|buy|purchase|vivre|habiter)\b/i.test(t)) { out.transaction = 'vente'; out.project = 'habiter'; }

  // Famille
  if (/\b(villa|maison|house)\b/i.test(t)) out.family = 'villa';
  else if (/\b(bureau|bureaux|office|commerce|boutique|local|shop|fonds|murs)\b/i.test(t)) out.family = 'bureau-commerce';
  else if (/\b(parking|garage|box|cave|cellar)\b/i.test(t) && !/\b(appartement|apartment|studio|pi[èe]ces?|flat|penthouse|duplex)\b/i.test(t)) out.family = 'parking-cave';
  else if (/\b(immeuble|building|terrain|land|viager)\b/i.test(t)) out.family = 'terrain-immeuble';
  else if (/\b(appartement|appart|apartment|flat|studio|studette|penthouse|duplex|loft|pi[èe]ces?|rooms?|bedrooms?|chambres?)\b/i.test(t)) out.family = 'appartement';

  // Pièces
  const rooms = t.match(/(\d)\s*(?:p\b|pi[èe]ces?|pieces?|rooms?)/i);
  if (rooms) out.minRooms = Math.min(6, parseInt(rooms[1], 10));
  else if (/\bstudio|studette\b/i.test(t)) out.minRooms = 1;
  const beds = t.match(/(\d)\s*(?:ch\b|chambres?|bedrooms?|bed)/i);
  if (beds && !rooms) out.minRooms = Math.min(6, parseInt(beds[1], 10) + 1);

  // Surface
  const surf = t.match(/(\d{2,4})\s*(?:m²|m2|sqm|m\b)/i);
  if (surf) out.minSurface = parseInt(surf[1], 10);

  // Budget : « 6 M€ », « 6 millions », « 2,5M », « 800 k€ », « 5000 €/mois », « 3 000 € »
  const money = t.replace(/\s/g, '').match(/(\d+(?:[.,]\d+)?)(m€|m\b|millions?|mio|k€|k\b|000€|€|eur|euros?)/i) || t.match(/(\d+(?:[.,]\d+)?)\s*(m€|millions?|mio|k€|k)\b/i);
  if (money) {
    const n = parseFloat(money[1].replace(',', '.'));
    const unit = money[2].toLowerCase();
    let value = n;
    if (/^m/.test(unit)) value = n * 1_000_000;
    else if (/^k/.test(unit)) value = n * 1_000;
    else if (unit === '000€') value = n * 1_000;
    const isMax = /\b(moins de|max|maximum|jusqu|under|below|<)/i.test(t) || true;
    if (value > 0) { if (isMax) out.budgetMax = Math.round(value); }
    if (out.transaction === undefined && value < 50_000) { out.transaction = 'location'; out.project = 'louer'; }
  }

  // Quartiers
  const districts = DISTRICT_ALIASES.filter(([re]) => re.test(t)).map(([, slug]) => slug);
  if (districts.length) out.districts = Array.from(new Set(districts));
  if (/c[ôo]te d'?azur|cap d'?ail|beausoleil|roquebrune|menton|nice|cannes|antibes|sanremo|italie|italy/i.test(t)) out.scope = 'cote-d-azur';
  if (/miami|saint[\s-]*barth|st[\s-]*barth|international|[ée]tranger|abroad/i.test(t)) out.scope = 'international';

  // Critères (sur le texte débarrassé des noms de quartiers : « Jardin Exotique » ≠ jardin)
  let tf = t; DISTRICT_ALIASES.forEach(([re]) => { tf = tf.replace(re, ' '); });
  const features = FEATURE_ALIASES.filter(([re]) => re.test(tf)).map(([, f]) => f);
  if (features.length) out.features = Array.from(new Set(features));

  return out;
}
