export interface SEOData {
  title: string;
  description: string;
  ogImage: string;
  schema: 'Person' | 'CreativeWork';
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL; // Netlify specific
  if (process.env.URL) return process.env.URL; // Netlify/General
  return 'https://constanzaschwartz.com';
};

export const BASE_URL = getBaseUrl().replace(/\/$/, '');



export const PAGE_SEO: Record<string, SEOData> = {
  home: {
    title: 'Constanza Schwartz',
    description: 'Sitio oficial de la artista multidisciplinaria',
    ogImage: '/og/og-home-copy.jpg',
    schema: 'Person',
  },
  profile: {
    title: 'Constanza Schwartz | Artista Multidisciplinaria',
    description: 'Artista multidisciplinaria contemporánea que explora la relación entre materia, percepción y espacio',
    ogImage: '/og/og-profile.jpg',
    schema: 'Person',
  },
  contact: {
    title: 'Contacto | Constanza Schwartz',
    description: 'Contacto',
    ogImage: '/og/og-contact.jpg',
    schema: 'Person',
  },
};

export const PROJECT_SEO: Record<string, SEOData> = {
  'mas-alla-del-infinito': {
    title: 'Más Allá Del Infinito | Constanza Schwartz',
    description: 'Muestra individual multisensorial 2024 . Ungallery',
    ogImage: '/og/og-project-mas-alla-del-infinito.jpg',
    schema: 'CreativeWork',
  },
  'eco-al-infinito': {
    title: 'Eco Al Infinito | Constanza Schwartz',
    description: 'Obra Site-Specific 2026 . Lumina Office / Estudio Mario Roberto Alvarez',
    ogImage: '/og/og-project-eco-al-infinito.jpg',
    schema: 'CreativeWork',
  },
  'design-week-mexico': {
    title: 'Design Week Mexico | Constanza Schwartz',
    description: 'Exposición de la obra “Ensayo de Espejismo” en Design Week Mexico 2025. Pabellón Inédito',
    ogImage: '/og/og-project-design-week-mexico.jpg',
    schema: 'CreativeWork',
  },
  'mutek': {
    title: 'Mutek | Constanza Schwartz',
    description: 'Sideshow 2025 en MUTEK . Artlab + Comité357',
    ogImage: '/og/og-project-mutek.jpg',
    schema: 'CreativeWork',
  },
  'silvestre-y-la-naranja-alterego': {
    title: 'Silvestre y La Naranja “Alterego” | Constanza Schwartz',
    description: 'Videoclips y Visualizers 2025 para Silvestre y La Naranja.',
    ogImage: '/og/og-project-silvestre-y-la-naranja-alterego.jpg',

    schema: 'CreativeWork',
  },
  // Alias for alterego slug if it differs
  'alterego': {
    title: 'Silvestre y La Naranja “Alterego” | Constanza Schwartz',
    description: 'Videoclips y Visualizers 2025 para Silvestre y La Naranja.',
    ogImage: '/og/og-project-silvestre-y-la-naranja-alterego.jpg',

    schema: 'CreativeWork',
  },
};
