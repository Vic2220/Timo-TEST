/**
 * Configuration centrale du site.
 * ⚠️ Projet de refonte (démo) : les coordonnées ci-dessous sont des valeurs
 * de substitution à remplacer par celles de l'agence avant toute mise en ligne.
 */
export const site = {
  name: 'Groupe SMIR',
  legalName: 'Groupe S.M.I.R. SAM',
  tagline: 'Conseil & investissement immobilier à Monaco depuis 1925',
  description:
    "Groupe familial indépendant né de l'Agence Lorenzi (1925) et de Monte Carlo Immobilier (1956) : vente, location, gestion et estimation de biens de prestige à Monaco et sur la Côte d'Azur.",
  url: 'https://example.com',
  locale: 'fr-MC',
  languages: [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'it', label: 'Italiano' },
    { code: 'ru', label: 'Русский' },
  ],
  address: {
    line1: 'Winter Palace — 4, boulevard des Moulins',
    line2: 'MC 98000 Monaco',
    district: "Carré d'Or, à deux pas du Casino de Monte-Carlo",
    mapsQuery: '4 boulevard des Moulins, 98000 Monaco',
  },
  phone: { display: '+377 00 00 00 00', href: 'tel:+37700000000' },
  whatsapp: { display: 'WhatsApp', href: 'https://wa.me/37700000000' },
  email: 'contact@exemple.mc',
  hours: [
    { days: 'Lundi – Vendredi', time: '9h00 – 12h30 · 14h00 – 18h00' },
    { days: 'Samedi', time: 'Sur rendez-vous' },
  ],
  memberships: ['Chambre Immobilière Monégasque'],
  founded: { lorenzi: 1925, monteCarloImmobilier: 1956, group: 1990 },
  fees: {
    notary: 0.06,        // frais d'enregistrement et de notaire (achat particulier)
    agency: 0.03,        // honoraires d'agence, barème Chambre Immobilière
    vat: 0.20,           // TVA sur les honoraires
    deposit: 0.10,       // acompte à l'offre d'achat
  },
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
};

export const nav = [
  { label: 'Acheter', href: '/acheter/', menu: 'acheter' },
  { label: 'Louer', href: '/louer/', menu: 'louer' },
  { label: 'Estimer', href: '/estimation/' },
  { label: 'Services', href: '/services/' },
  { label: 'Monaco', href: '/monaco/' },
  { label: 'Le Groupe', href: '/groupe/' },
];

export const footerNav = [
  {
    title: 'Explorer',
    links: [
      { label: 'Acheter', href: '/acheter/' },
      { label: 'Louer', href: '/louer/' },
      { label: 'Estimer mon bien', href: '/estimation/' },
      { label: 'Services', href: '/services/' },
      { label: 'Vivre à Monaco', href: '/monaco/' },
      { label: 'Le Groupe', href: '/groupe/' },
    ],
  },
  {
    title: 'Pratique',
    links: [
      { label: 'Contact', href: '/contact/' },
      { label: 'Prendre rendez-vous', href: '/contact/#rdv' },
      { label: 'Nous écrire sur WhatsApp', href: 'https://wa.me/37700000000', external: true },
      { label: 'Mentions légales', href: '/mentions-legales/' },
      { label: 'Confidentialité', href: '/mentions-legales/#confidentialite' },
      { label: 'Plan du site', href: '/plan-du-site/' },
    ],
  },
];
