import type { Listing } from '../data/listings';
import districts from '../data/districts.json';
import { INTERNATIONAL_PLACES } from '../data/listings';

const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const num = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

export function formatPrice(l: Pick<Listing, 'price' | 'transaction'>): string {
  if (l.price == null) return 'Prix sur demande';
  return l.transaction === 'location' ? `${eur.format(l.price)} / mois` : eur.format(l.price);
}
export function formatEur(n: number): string { return eur.format(n); }
export function formatNum(n: number): string { return num.format(n); }

export function pricePerSqm(l: Listing): string | null {
  if (l.price == null || l.transaction !== 'vente' || !l.surface) return null;
  return `${eur.format(Math.round(l.price / l.surface))} / m²`;
}

export function placeLabel(l: Pick<Listing, 'district' | 'city' | 'country'>): string {
  const d = districts.find((x) => x.slug === l.district);
  if (d) return `${d.name}, Monaco`;
  return INTERNATIONAL_PLACES[l.district] ?? `${l.city}, ${l.country}`;
}

export function districtName(slug: string): string {
  return districts.find((x) => x.slug === slug)?.name ?? INTERNATIONAL_PLACES[slug] ?? slug;
}

export function roomsLabel(l: Listing): string {
  if (l.family === 'parking-cave') return l.type;
  if (l.family === 'bureau-commerce') return l.rooms > 1 ? `${l.rooms} pièces` : l.type;
  if (l.rooms === 1) return 'Studio';
  return `${l.rooms} pièces`;
}

/** Frais d'acquisition à Monaco (achat particulier, barème Chambre Immobilière). */
export function acquisitionCosts(price: number, fees: { notary: number; agency: number; vat: number; deposit: number }) {
  const notary = price * fees.notary;
  const agencyHT = price * fees.agency;
  const agencyVAT = agencyHT * fees.vat;
  const total = price + notary + agencyHT + agencyVAT;
  return { notary, agencyHT, agencyVAT, agency: agencyHT + agencyVAT, deposit: price * fees.deposit, total };
}
