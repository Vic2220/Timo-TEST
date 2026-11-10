/**
 * Catalogue de démonstration.
 * Données FICTIVES inspirées du marché monégasque (quartiers, fourchettes de prix,
 * typologies). À remplacer par un flux CRM / API dans une version de production.
 */
export type Transaction = 'vente' | 'location';
export type Family = 'appartement' | 'villa' | 'bureau-commerce' | 'parking-cave' | 'terrain-immeuble';
export type Illustration =
  | 'sea-terrace' | 'interior' | 'facade' | 'port' | 'office' | 'parking'
  | 'villa' | 'penthouse' | 'new-build' | 'beach' | 'shop' | 'hills';

export interface Listing {
  id: string;
  ref: string;
  transaction: Transaction;
  family: Family;
  type: string;
  title: string;
  district: string;        // slug de quartier (Monaco) ou nom de ville (international)
  city: string;
  country: 'Monaco' | 'France' | 'Italie' | 'États-Unis' | 'Saint-Barthélemy';
  price: number | null;    // € (vente) ou €/mois (location) ; null = prix sur demande
  charges?: number;        // €/mois (location)
  surface: number;         // m²
  terrace?: number;        // m²
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  parkings: number;
  floor?: string;
  features: string[];
  description: string;
  highlights: string[];
  illustration: Illustration;
  featured?: boolean;
  isNew?: boolean;
  date: string;            // ISO
  mixedUse?: boolean;      // usage mixte (habitation + bureau)
  furnished?: boolean;
  seaView?: boolean;
  renovated?: boolean;
}

export const FEATURE_LABELS: Record<string, string> = {
  'vue-mer': 'Vue mer',
  'terrasse': 'Terrasse',
  'parking': 'Parking',
  'cave': 'Cave',
  'concierge': 'Concierge 24h/24',
  'piscine': 'Piscine',
  'salle-de-sport': 'Salle de sport',
  'meuble': 'Meublé',
  'renove': 'Rénové',
  'neuf': 'Programme neuf',
  'usage-mixte': 'Usage mixte',
  'vitrine': 'Vitrine',
  'securite': 'Sécurité',
  'climatisation': 'Climatisation',
  'loi-1235': 'Libre de loi',
  'jardin': 'Jardin',
  'spa': 'Spa & hammam',
  'ascenseur': 'Ascenseur',
  'calme': 'Calme',
  'dernier-etage': 'Dernier étage',
  'loue': 'Loué (investisseur)',
  'flexible': 'Bail flexible',
};

export const FAMILY_LABELS: Record<Family, string> = {
  'appartement': 'Appartements',
  'villa': 'Villas & maisons',
  'bureau-commerce': 'Bureaux & commerces',
  'parking-cave': 'Parkings & caves',
  'terrain-immeuble': 'Immeubles & terrains',
};

export const listings: Listing[] = [
  // ───────────────────────── VENTES MONACO ─────────────────────────
  {
    id: 'v-301', ref: 'V-301', transaction: 'vente', family: 'appartement', type: 'Penthouse',
    title: 'Penthouse en duplex avec rooftop — vue à 180° sur la baie',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 24500000, surface: 265, terrace: 140, rooms: 5, bedrooms: 4, bathrooms: 4, parkings: 3, floor: 'Derniers étages',
    features: ['vue-mer', 'terrasse', 'parking', 'cave', 'concierge', 'dernier-etage', 'climatisation', 'ascenseur'],
    description: "Au sommet d'une résidence emblématique du Carré d'Or, ce penthouse en duplex déploie 265 m² habitables prolongés par un rooftop privatif de 140 m² avec jacuzzi. Réception traversante, cuisine Bulthaup, suite parentale avec dressing et vue panoramique de l'Italie au Cap d'Ail.",
    highlights: ['Rooftop privatif 140 m²', '3 places de parking', 'Rénovation signée architecte'],
    illustration: 'penthouse', featured: true, date: '2026-10-28', seaView: true, renovated: true,
  },
  {
    id: 'v-302', ref: 'V-302', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: 'Grand 3 pièces entièrement rénové — face au Port Hercule',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 5950000, surface: 114, terrace: 12, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 1, floor: '4e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'cave', 'concierge', 'renove', 'climatisation', 'ascenseur'],
    description: "Directement sur le tracé du Grand Prix, ce 3 pièces a été intégralement repensé : séjour ouvert sur une loggia face aux yachts, deux chambres en suite, matériaux nobles (pierre de Bourgogne, chêne). Immeuble bourgeois avec concierge.",
    highlights: ['Vue port & Rocher', 'Rénové en 2025', 'Cave et parking inclus'],
    illustration: 'port', featured: true, isNew: true, date: '2026-11-02', seaView: true, renovated: true,
  },
  {
    id: 'v-303', ref: 'V-303', transaction: 'vente', family: 'appartement', type: 'Duplex',
    title: 'Duplex de caractère — vue Port Hercule, Monaco-Ville',
    district: 'monaco-ville', city: 'Monaco', country: 'Monaco',
    price: 6500000, surface: 116, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 0, floor: '2e et 3e étages',
    features: ['vue-mer', 'calme', 'renove', 'climatisation'],
    description: "Rare sur Le Rocher : un duplex de 116 m² dans une maison de village restaurée, avec poutres apparentes et terrasse-tropézienne dominant le Port Hercule. Réservé aux acquéreurs remplissant les conditions d'accès à Monaco-Ville.",
    highlights: ['Secteur protégé du Rocher', 'Terrasse tropézienne', 'Charges très faibles'],
    illustration: 'facade', date: '2026-09-12', seaView: true, renovated: true,
  },
  {
    id: 'v-304', ref: 'V-304', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: 'Bel appartement 3 pièces — Le Pétrel, La Condamine',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 4770000, surface: 95, terrace: 8, rooms: 3, bedrooms: 2, bathrooms: 1, parkings: 0, floor: '6e étage',
    features: ['terrasse', 'concierge', 'ascenseur', 'cave'],
    description: "Dans une résidence avec concierge, à deux minutes du marché de La Condamine et de la gare, 3 pièces lumineux en étage élevé avec balcon. Idéal première acquisition ou pied-à-terre.",
    highlights: ['Étage élevé', 'À 3 min de la gare', 'Possibilité parking en sus'],
    illustration: 'interior', date: '2026-08-20',
  },
  {
    id: 'v-305', ref: 'V-305', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: 'Charmant 2 pièces — Villa Monique, aperçu mer',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 1580000, surface: 35, rooms: 2, bedrooms: 1, bathrooms: 1, parkings: 0, floor: 'Dernier étage',
    features: ['dernier-etage', 'loi-1235', 'calme'],
    description: "Au dernier étage d'un immeuble bourgeois, à quelques pas de l'ascenseur public menant au Port, ce 2 pièces lumineux bénéficie d'une terrasse commune aux copropriétaires. Charges très faibles, libre de loi : parfait pour vivre ou investir.",
    highlights: ['Libre de loi', 'Charges faibles', 'Terrasse commune'],
    illustration: 'facade', date: '2026-07-04',
  },
  {
    id: 'v-306', ref: 'V-306', transaction: 'vente', family: 'appartement', type: 'Studio',
    title: 'Spacieux studio rénové — Westmacott, proche Casino',
    district: 'monte-carlo', city: 'Monaco', country: 'Monaco',
    price: 1650000, surface: 44, rooms: 1, bedrooms: 0, bathrooms: 1, parkings: 0, floor: '3e étage',
    features: ['renove', 'concierge', 'ascenseur', 'calme', 'climatisation'],
    description: "Résidence centrale avec concierge, à quelques pas du Casino et de la gare. Studio de 44 m² entièrement rénové, très lumineux et calme, offrant de beaux volumes.",
    highlights: ['44 m² : grand pour un studio', 'Rénové', 'Concierge'],
    illustration: 'interior', isNew: true, date: '2026-11-05', renovated: true,
  },
  {
    id: 'v-307', ref: 'V-307', transaction: 'vente', family: 'appartement', type: 'Studio',
    title: 'Studio usage mixte avec loggia — Le Montaigne, Carré d\'Or',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 2100000, surface: 30, terrace: 5, rooms: 1, bedrooms: 0, bathrooms: 1, parkings: 0, floor: '5e étage',
    features: ['usage-mixte', 'terrasse', 'concierge', 'securite', 'ascenseur'],
    description: "Le Montaigne est une résidence très prestigieuse avec conciergerie 24h/24, à quelques pas du Casino de Monte-Carlo et du centre commercial Le Métropole. Ce studio à usage mixte permet d'y domicilier une activité professionnelle.",
    highlights: ['Usage mixte (bureau possible)', 'Carré d\'Or', 'Conciergerie 24h/24'],
    illustration: 'interior', date: '2026-06-15', mixedUse: true,
  },
  {
    id: 'v-308', ref: 'V-308', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: '4 pièces familial avec grande terrasse — Larvotto',
    district: 'larvotto', city: 'Monaco', country: 'Monaco',
    price: 9800000, surface: 148, terrace: 45, rooms: 4, bedrooms: 3, bathrooms: 3, parkings: 2, floor: '7e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'cave', 'concierge', 'piscine', 'securite', 'ascenseur'],
    description: "À 100 mètres de la plage du Larvotto, dans une résidence avec piscine et concierge, 4 pièces familial ouvert sur une terrasse de 45 m² plein sud. Trois chambres en suite, double parking.",
    highlights: ['Terrasse 45 m² plein sud', 'Résidence avec piscine', 'Double parking'],
    illustration: 'sea-terrace', featured: true, date: '2026-10-10', seaView: true,
  },
  {
    id: 'v-309', ref: 'V-309', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: 'Appartement 2 pièces — Villa Mignon, La Condamine',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 2700000, surface: 83, rooms: 2, bedrooms: 1, bathrooms: 2, parkings: 0, floor: '1er étage',
    features: ['usage-mixte', 'calme', 'ascenseur'],
    description: "Dans un bel immeuble bourgeois du quartier recherché de La Condamine, à quelques pas de la gare et des commerces, grand 2 pièces de 83 m² à usage mixte, à rafraîchir selon vos goûts.",
    highlights: ['83 m² à usage mixte', 'Immeuble bourgeois', 'Potentiel de valorisation'],
    illustration: 'facade', date: '2026-05-22', mixedUse: true,
  },
  {
    id: 'v-310', ref: 'V-310', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: '3 pièces vue mer dans tour avec services — Saint-Roman',
    district: 'la-rousse-saint-roman', city: 'Monaco', country: 'Monaco',
    price: 7200000, surface: 128, terrace: 22, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 1, floor: '21e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'piscine', 'salle-de-sport', 'concierge', 'securite', 'climatisation'],
    description: "Au 21e étage d'une tour résidentielle avec piscine, salle de sport et conciergerie, 3 pièces traversant offrant une vue mer imprenable jusqu'à l'Italie. Proche du Country Club et de l'International School.",
    highlights: ['Vue mer 21e étage', 'Piscine & salle de sport', 'Proche écoles internationales'],
    illustration: 'sea-terrace', date: '2026-09-30', seaView: true,
  },
  {
    id: 'v-311', ref: 'V-311', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: 'Appartement 2 pièces vue Rocher — Jardin Exotique',
    district: 'jardin-exotique', city: 'Monaco', country: 'Monaco',
    price: 2350000, surface: 62, terrace: 10, rooms: 2, bedrooms: 1, bathrooms: 1, parkings: 1, floor: '9e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'calme', 'ascenseur'],
    description: "Sur les hauteurs de la Principauté, 2 pièces en étage élevé avec balcon offrant une vue spectaculaire sur le Rocher et la mer. Résidence calme avec parking.",
    highlights: ['Vue Rocher & mer', 'Parking inclus', 'Prix au m² attractif'],
    illustration: 'hills', date: '2026-08-02', seaView: true,
  },
  {
    id: 'v-312', ref: 'V-312', transaction: 'vente', family: 'appartement', type: 'Programme neuf',
    title: 'Programme neuf — 3 pièces avec terrasse, livraison 2027',
    district: 'fontvieille', city: 'Monaco', country: 'Monaco',
    price: 8400000, surface: 120, terrace: 30, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 2, floor: '5e étage',
    features: ['neuf', 'terrasse', 'parking', 'cave', 'piscine', 'concierge', 'securite', 'climatisation'],
    description: "Dans une nouvelle résidence de standing en front de mer à Fontvieille, 3 pièces sur plan avec terrasse de 30 m², finitions haut de gamme au choix, piscine, spa et conciergerie. Livraison prévue fin 2027.",
    highlights: ['Neuf, finitions au choix', 'Front de mer', 'Livraison 2027'],
    illustration: 'new-build', isNew: true, date: '2026-11-08',
  },
  {
    id: 'v-313', ref: 'V-313', transaction: 'vente', family: 'villa', type: 'Villa',
    title: 'Villa Belle Époque avec jardin — Moneghetti',
    district: 'moneghetti', city: 'Monaco', country: 'Monaco',
    price: 18900000, surface: 310, terrace: 60, rooms: 7, bedrooms: 5, bathrooms: 4, parkings: 2,
    features: ['jardin', 'vue-mer', 'terrasse', 'parking', 'calme', 'piscine'],
    description: "Rarissime : une villa Belle Époque de 310 m² sur un jardin de 400 m² avec piscine, à flanc de colline à Moneghetti. Hauteurs sous plafond, moulures d'origine, vue mer depuis les étages.",
    highlights: ['Jardin 400 m² avec piscine', 'Architecture Belle Époque', 'Vue mer'],
    illustration: 'villa', featured: true, date: '2026-10-01', seaView: true,
  },
  {
    id: 'v-314', ref: 'V-314', transaction: 'vente', family: 'bureau-commerce', type: 'Bureau',
    title: 'Grand bureau avec 2 parkings — Boulevard d\'Italie',
    district: 'monte-carlo', city: 'Monaco', country: 'Monaco',
    price: 5405000, surface: 147, rooms: 5, bedrooms: 0, bathrooms: 1, parkings: 2, floor: '2e étage',
    features: ['parking', 'ascenseur', 'climatisation', 'securite'],
    description: "Plateau de bureaux de 147 m² divisé en 5 pièces, dans un immeuble récent du boulevard d'Italie, avec deux places de parking. Convient à un family office, un cabinet ou une société de gestion.",
    highlights: ['147 m² divisibles', '2 parkings', 'Immeuble récent'],
    illustration: 'office', date: '2026-09-05',
  },
  {
    id: 'v-315', ref: 'V-315', transaction: 'vente', family: 'bureau-commerce', type: 'Bureau',
    title: 'Bureau ou local commercial avec vitrine — Botticelli, Fontvieille',
    district: 'fontvieille', city: 'Monaco', country: 'Monaco',
    price: 901000, surface: 23, rooms: 1, bedrooms: 0, bathrooms: 1, parkings: 0, floor: 'Rez-de-chaussée',
    features: ['vitrine', 'securite', 'loue'],
    description: "À proximité du centre commercial de Fontvieille, local de 23 m² doté d'une grande vitrine. Actuellement loué (rendement net d'environ 2,3 %) jusqu'au 30/09/2026 : un investissement sécurisé.",
    highlights: ['Loué : investisseur', 'Grande vitrine', 'Fontvieille Village'],
    illustration: 'shop', date: '2026-04-18',
  },
  {
    id: 'v-316', ref: 'V-316', transaction: 'vente', family: 'bureau-commerce', type: 'Cession de droit au bail',
    title: 'Droit au bail — Carré d\'Or, boulevard Princesse Charlotte',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 450000, surface: 70, rooms: 2, bedrooms: 0, bathrooms: 1, parkings: 0, floor: 'Rez-de-chaussée',
    features: ['vitrine'],
    description: "Locaux commerciaux en plein cœur du Carré d'Or, avec possibilité de changement de destination pour toute activité hors métiers de bouche. Loyer actuel : 2 062 € + 52 € de charges par mois.",
    highlights: ['Emplacement n°1', 'Loyer modéré', 'Toutes activités hors bouche'],
    illustration: 'shop', date: '2026-03-10',
  },
  {
    id: 'v-317', ref: 'V-317', transaction: 'vente', family: 'bureau-commerce', type: 'Fonds de commerce',
    title: 'Fonds de commerce sur deux niveaux — Boulevard d\'Italie',
    district: 'monte-carlo', city: 'Monaco', country: 'Monaco',
    price: 655000, surface: 75, rooms: 2, bedrooms: 0, bathrooms: 1, parkings: 0, floor: 'RDC + sous-sol',
    features: ['vitrine'],
    description: "Fonds de commerce d'environ 75 m² dans le quartier commerçant du boulevard d'Italie, proche de la place des Moulins. Pièce principale avec vitrine et réserve en sous-sol. Loyer actuel environ 2 200 €/mois.",
    highlights: ['Quartier commerçant', 'Deux niveaux', 'Loyer contenu'],
    illustration: 'shop', date: '2026-02-26',
  },
  {
    id: 'v-318', ref: 'V-318', transaction: 'vente', family: 'parking-cave', type: 'Parking',
    title: 'Place de parking — Monte-Carlo Palace, à deux pas du Casino',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 450000, surface: 13.5, rooms: 0, bedrooms: 0, bathrooms: 0, parkings: 1, floor: 'Sous-sol -2',
    features: ['securite', 'concierge'],
    description: "Place de parking sécurisée dans un immeuble de grand standing avec service de conciergerie, à quelques pas du Casino de Monte-Carlo. Un actif rare et liquide dans le Carré d'Or.",
    highlights: ['Carré d\'Or', 'Immeuble sécurisé', 'Actif liquide'],
    illustration: 'parking', date: '2026-06-30',
  },
  {
    id: 'v-319', ref: 'V-319', transaction: 'vente', family: 'parking-cave', type: 'Parking',
    title: 'Deux places de parking en enfilade — Fontvieille',
    district: 'fontvieille', city: 'Monaco', country: 'Monaco',
    price: 520000, surface: 26, rooms: 0, bedrooms: 0, bathrooms: 0, parkings: 2, floor: 'Sous-sol -1',
    features: ['securite'],
    description: "Deux emplacements de parking en enfilade dans une résidence sécurisée de Fontvieille, à proximité immédiate du centre commercial et du port.",
    highlights: ['2 places', 'Résidence sécurisée', 'Proche port'],
    illustration: 'parking', date: '2026-05-05',
  },
  {
    id: 'v-320', ref: 'V-320', transaction: 'vente', family: 'terrain-immeuble', type: 'Immeuble',
    title: 'Immeuble de rapport entièrement loué — La Condamine',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: null, surface: 820, rooms: 14, bedrooms: 0, bathrooms: 0, parkings: 0,
    features: ['loue', 'vitrine'],
    description: "Immeuble bourgeois R+5 d'environ 820 m² comprenant deux commerces en pied d'immeuble et douze appartements, entièrement loué. Dossier complet (baux, état locatif, diagnostics) remis sur signature d'un accord de confidentialité.",
    highlights: ['Entièrement loué', 'Commerces + 12 logements', 'Dossier sur NDA'],
    illustration: 'facade', date: '2026-01-20',
  },

  // ───────────────────────── LOCATIONS MONACO ─────────────────────────
  {
    id: 'l-401', ref: 'L-401', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: 'Studette entièrement rénovée face au Port Hercule — Shangri-La',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 5000, charges: 250, surface: 36, rooms: 1, bedrooms: 1, bathrooms: 1, parkings: 0, floor: '3e étage',
    features: ['vue-mer', 'renove', 'meuble', 'climatisation', 'concierge'],
    description: "Face au Port Hercule, sur le tracé du Grand Prix, studette entièrement rénovée avec aménagements sur mesure et prestations soignées. Livrée meublée et équipée.",
    highlights: ['Vue port', 'Meublée & rénovée', 'Adresse mythique'],
    illustration: 'port', featured: true, isNew: true, date: '2026-11-06', seaView: true, furnished: true, renovated: true,
  },
  {
    id: 'l-402', ref: 'L-402', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: '6 pièces panoramique en location saisonnière — Monte-Carlo',
    district: 'monte-carlo', city: 'Monaco', country: 'Monaco',
    price: null, surface: 440, terrace: 90, rooms: 6, bedrooms: 5, bathrooms: 5, parkings: 5, floor: 'Derniers étages',
    features: ['vue-mer', 'terrasse', 'parking', 'meuble', 'concierge', 'piscine', 'spa', 'securite'],
    description: "Appartement d'exception de 440 m² avec vue panoramique, cinq suites, terrasse de 90 m² et cinq parkings, proposé en location saisonnière meublée pour le Grand Prix, le Yacht Show ou la saison estivale.",
    highlights: ['Location saisonnière', '5 suites', 'Grand Prix & Yacht Show'],
    illustration: 'penthouse', date: '2026-10-15', seaView: true, furnished: true,
  },
  {
    id: 'l-403', ref: 'L-403', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: '2 pièces meublé avec terrasse — Larvotto',
    district: 'larvotto', city: 'Monaco', country: 'Monaco',
    price: 7800, charges: 400, surface: 68, terrace: 15, rooms: 2, bedrooms: 1, bathrooms: 1, parkings: 1, floor: '5e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'meuble', 'piscine', 'concierge', 'climatisation'],
    description: "À deux pas de la plage, 2 pièces meublé avec goût, terrasse vue mer, dans une résidence avec piscine et concierge. Parking inclus. Disponible immédiatement.",
    highlights: ['Vue mer', 'Piscine', 'Parking inclus'],
    illustration: 'sea-terrace', isNew: true, date: '2026-11-01', seaView: true, furnished: true,
  },
  {
    id: 'l-404', ref: 'L-404', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: '3 pièces familial non meublé — Fontvieille',
    district: 'fontvieille', city: 'Monaco', country: 'Monaco',
    price: 9500, charges: 500, surface: 110, terrace: 18, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 1, floor: '2e étage',
    features: ['terrasse', 'parking', 'cave', 'concierge', 'calme'],
    description: "Dans une résidence familiale calme de Fontvieille, 3 pièces non meublé avec terrasse, cave et parking. À proximité des écoles, du centre commercial et du port.",
    highlights: ['Non meublé', 'Proche écoles', 'Cave + parking'],
    illustration: 'interior', date: '2026-09-18',
  },
  {
    id: 'l-405', ref: 'L-405', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: 'Studio meublé rénové — Jardin Exotique',
    district: 'jardin-exotique', city: 'Monaco', country: 'Monaco',
    price: 2900, charges: 150, surface: 28, rooms: 1, bedrooms: 0, bathrooms: 1, parkings: 0, floor: '4e étage',
    features: ['meuble', 'renove', 'calme', 'ascenseur'],
    description: "Studio entièrement rénové et meublé, lumineux et calme, dans une résidence des hauteurs de Monaco. Idéal pour un premier logement en Principauté.",
    highlights: ['Loyer accessible', 'Meublé & rénové', 'Calme'],
    illustration: 'hills', date: '2026-10-22', furnished: true, renovated: true,
  },
  {
    id: 'l-406', ref: 'L-406', transaction: 'location', family: 'appartement', type: 'Appartement',
    title: '4 pièces avec vue mer dans tour avec services — Saint-Roman',
    district: 'la-rousse-saint-roman', city: 'Monaco', country: 'Monaco',
    price: 16500, charges: 900, surface: 165, terrace: 30, rooms: 4, bedrooms: 3, bathrooms: 3, parkings: 2, floor: '18e étage',
    features: ['vue-mer', 'terrasse', 'parking', 'piscine', 'salle-de-sport', 'concierge', 'securite', 'climatisation'],
    description: "Grand 4 pièces en étage élevé, vue mer, dans une tour avec piscine, salle de sport et sécurité 24h/24. Deux parkings. Proche du Country Club et des écoles internationales.",
    highlights: ['Vue mer', 'Services de la tour', '2 parkings'],
    illustration: 'sea-terrace', date: '2026-08-28', seaView: true,
  },
  {
    id: 'l-407', ref: 'L-407', transaction: 'location', family: 'bureau-commerce', type: 'Bureau',
    title: 'Bureau meublé en centre d\'affaires — Fontvieille',
    district: 'fontvieille', city: 'Monaco', country: 'Monaco',
    price: 1600, charges: 0, surface: 12, rooms: 1, bedrooms: 0, bathrooms: 0, parkings: 0, floor: '3e étage',
    features: ['meuble', 'flexible', 'securite', 'climatisation'],
    description: "Bureau meublé et équipé dans un centre d'affaires de standing : contrats flexibles (6 ou 12 mois), accès 24h/7j, internet, salles de réunion et lounges dans trois centres (Fontvieille, Jardin Exotique, Carré d'Or).",
    highlights: ['Bail flexible 6/12 mois', 'Tout inclus', 'Domiciliation possible'],
    illustration: 'office', date: '2026-10-05', furnished: true,
  },
  {
    id: 'l-408', ref: 'L-408', transaction: 'location', family: 'bureau-commerce', type: 'Bureau',
    title: 'Bureau 25 m² pour domiciliation de société — Saint-Roman',
    district: 'la-rousse-saint-roman', city: 'Monaco', country: 'Monaco',
    price: 5290, charges: 0, surface: 25, rooms: 1, bedrooms: 0, bathrooms: 0, parkings: 0, floor: '1er étage',
    features: ['flexible', 'securite', 'climatisation'],
    description: "Dans un immeuble proche du Monte-Carlo Country Club et de l'International School of Monaco, bureau de 25 m² aux prestations exclusives, permettant la domiciliation de sociétés et l'embauche de salariés.",
    highlights: ['Domiciliation de société', 'Embauche possible', 'Prestations exclusives'],
    illustration: 'office', date: '2026-09-25',
  },
  {
    id: 'l-409', ref: 'L-409', transaction: 'location', family: 'bureau-commerce', type: 'Bureau',
    title: 'Bureau duplex avec vitrine — Carré d\'Or',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 9500, charges: 350, surface: 85, rooms: 3, bedrooms: 0, bathrooms: 1, parkings: 0, floor: 'RDC + mezzanine',
    features: ['vitrine', 'climatisation', 'securite'],
    description: "Bureau en duplex de 85 m² avec vitrine sur rue dans le Carré d'Or : un emplacement de choix pour une galerie, un cabinet ou un showroom de marque.",
    highlights: ['Vitrine Carré d\'Or', 'Duplex 85 m²', 'Showroom possible'],
    illustration: 'shop', date: '2026-07-20',
  },
  {
    id: 'l-410', ref: 'L-410', transaction: 'location', family: 'bureau-commerce', type: 'Local commercial',
    title: 'Local commercial avec vitrine — El Palacio, La Condamine',
    district: 'la-condamine', city: 'Monaco', country: 'Monaco',
    price: 3000, charges: 120, surface: 35, rooms: 1, bedrooms: 0, bathrooms: 1, parkings: 0, floor: 'Rez-de-chaussée',
    features: ['vitrine'],
    description: "Au rez-de-chaussée de l'immeuble El Palacio, local en bon état doté d'une vitrine, utilisable en bureau ou en boutique.",
    highlights: ['Vitrine', 'Bureau ou boutique', 'Quartier animé'],
    illustration: 'shop', date: '2026-06-10',
  },
  {
    id: 'l-411', ref: 'L-411', transaction: 'location', family: 'parking-cave', type: 'Parking',
    title: 'Place de parking — Château Amiral, Saint-Roman',
    district: 'la-rousse-saint-roman', city: 'Monaco', country: 'Monaco',
    price: 350, charges: 0, surface: 8, rooms: 0, bedrooms: 0, bathrooms: 0, parkings: 1, floor: 'Sous-sol',
    features: ['securite'],
    description: "Grande place de parking au Château Amiral, au cœur du quartier Larousse / Saint-Roman.",
    highlights: ['Grande place', 'Résidence sécurisée'],
    illustration: 'parking', date: '2026-10-30',
  },
  {
    id: 'l-412', ref: 'L-412', transaction: 'location', family: 'parking-cave', type: 'Cave',
    title: 'Très grande cave — Carré d\'Or',
    district: 'carre-d-or', city: 'Monaco', country: 'Monaco',
    price: 2000, charges: 0, surface: 14.6, rooms: 0, bedrooms: 0, bathrooms: 0, parkings: 0, floor: 'Sous-sol',
    features: ['securite'],
    description: "Très grande cave (3,4 m × 4,3 m) dans un joli immeuble bourgeois en plein cœur du Carré d'Or. Idéale pour du stockage sécurisé.",
    highlights: ['14,6 m²', 'Immeuble bourgeois', 'Stockage sécurisé'],
    illustration: 'parking', date: '2026-09-02',
  },

  // ───────────────────────── INTERNATIONAL ─────────────────────────
  {
    id: 'i-501', ref: 'V-501', transaction: 'vente', family: 'villa', type: 'Villa',
    title: 'Villa contemporaine pieds dans l\'eau — Cap d\'Ail',
    district: 'cap-d-ail', city: 'Cap d\'Ail', country: 'France',
    price: 14500000, surface: 380, terrace: 200, rooms: 8, bedrooms: 5, bathrooms: 5, parkings: 4,
    features: ['vue-mer', 'piscine', 'jardin', 'terrasse', 'parking', 'securite', 'spa'],
    description: "À cinq minutes de Monaco, villa contemporaine de 380 m² sur un terrain de 1 500 m² en bord de mer, piscine à débordement, pool house, accès direct au sentier du littoral. Garage pour 4 véhicules.",
    highlights: ['Accès direct mer', 'Piscine à débordement', '5 min de Monaco'],
    illustration: 'villa', featured: true, date: '2026-10-18', seaView: true,
  },
  {
    id: 'i-502', ref: 'V-502', transaction: 'vente', family: 'villa', type: 'Villa',
    title: 'Villa resplendissante vue mer — Saint-Barthélemy',
    district: 'gustavia', city: 'Gustavia', country: 'Saint-Barthélemy',
    price: null, surface: 450, terrace: 300, rooms: 9, bedrooms: 6, bathrooms: 6, parkings: 3,
    features: ['vue-mer', 'piscine', 'jardin', 'terrasse', 'parking', 'securite', 'meuble'],
    description: "Sur les hauteurs de Gustavia, villa de 450 m² avec six suites, piscine, spa et vue sur la baie. Proposée à la vente ou en location saisonnière de prestige.",
    highlights: ['6 suites', 'Vue baie de Gustavia', 'Vente ou location'],
    illustration: 'beach', date: '2026-09-08', seaView: true, furnished: true,
  },
  {
    id: 'i-503', ref: 'V-503', transaction: 'vente', family: 'appartement', type: 'Programme neuf',
    title: 'Résidence de très haut standing — Sunny Isles Beach, Miami',
    district: 'sunny-isles', city: 'Miami', country: 'États-Unis',
    price: 8900000, surface: 377, terrace: 80, rooms: 4, bedrooms: 3, bathrooms: 4, parkings: 2, floor: '45e étage',
    features: ['neuf', 'vue-mer', 'piscine', 'salle-de-sport', 'spa', 'concierge', 'securite', 'terrasse', 'parking'],
    description: "Dans un nouveau complexe de deux tours de 62 étages géré par une grande marque hôtelière, résidence de 377 m² avec trois chambres, terrasse face à l'océan, et plus de 6 500 m² d'équipements (piscines, spa, beach club, salle de sport).",
    highlights: ['Développement neuf', 'Front de mer Atlantique', 'Services hôteliers'],
    illustration: 'new-build', featured: true, date: '2026-08-14', seaView: true,
  },
  {
    id: 'i-504', ref: 'V-504', transaction: 'vente', family: 'appartement', type: 'Appartement',
    title: '3 pièces vue mer avec jardin — Beausoleil, limite Monaco',
    district: 'beausoleil', city: 'Beausoleil', country: 'France',
    price: 1850000, surface: 92, terrace: 60, rooms: 3, bedrooms: 2, bathrooms: 2, parkings: 1,
    features: ['vue-mer', 'jardin', 'terrasse', 'parking', 'renove'],
    description: "À la frontière de Monaco, à 8 minutes à pied du Casino, 3 pièces rénové en rez-de-jardin avec 60 m² d'extérieur et vue mer. Parking inclus. Une alternative judicieuse aux prix de la Principauté.",
    highlights: ['8 min à pied du Casino', 'Jardin 60 m²', 'Prix France'],
    illustration: 'hills', isNew: true, date: '2026-11-04', seaView: true, renovated: true,
  },
  {
    id: 'i-505', ref: 'L-505', transaction: 'location', family: 'villa', type: 'Villa',
    title: 'Villa avec piscine en location à l\'année — Roquebrune-Cap-Martin',
    district: 'roquebrune', city: 'Roquebrune-Cap-Martin', country: 'France',
    price: 12000, charges: 600, surface: 240, terrace: 120, rooms: 6, bedrooms: 4, bathrooms: 3, parkings: 3,
    features: ['vue-mer', 'piscine', 'jardin', 'terrasse', 'parking', 'calme'],
    description: "À dix minutes de Monaco, villa familiale de 240 m² avec piscine, jardin méditerranéen et vue mer, proposée en location à l'année, non meublée.",
    highlights: ['10 min de Monaco', 'Piscine & jardin', 'Location à l\'année'],
    illustration: 'villa', date: '2026-10-08', seaView: true,
  },
  {
    id: 'i-506', ref: 'V-506', transaction: 'vente', family: 'appartement', type: 'Penthouse',
    title: 'Penthouse avec terrasse sur le port — Sanremo',
    district: 'sanremo', city: 'Sanremo', country: 'Italie',
    price: 2400000, surface: 160, terrace: 110, rooms: 4, bedrooms: 3, bathrooms: 2, parkings: 1, floor: 'Dernier étage',
    features: ['vue-mer', 'terrasse', 'parking', 'dernier-etage', 'climatisation'],
    description: "À 40 minutes de Monaco, penthouse de 160 m² au dernier étage d'un immeuble du front de mer de Sanremo, terrasse de 110 m² avec vue sur le port et le casino. Garage.",
    highlights: ['Terrasse 110 m²', 'Vue port de Sanremo', '40 min de Monaco'],
    illustration: 'penthouse', date: '2026-07-11', seaView: true,
  },
];

export const INTERNATIONAL_PLACES: Record<string, string> = {
  'cap-d-ail': "Cap d'Ail, Côte d'Azur",
  'beausoleil': "Beausoleil, Côte d'Azur",
  'roquebrune': "Roquebrune-Cap-Martin, Côte d'Azur",
  'sanremo': 'Sanremo, Ligurie',
  'gustavia': 'Gustavia, Saint-Barthélemy',
  'sunny-isles': 'Sunny Isles Beach, Miami',
};
