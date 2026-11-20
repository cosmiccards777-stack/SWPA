import { PRODUCTS, Product } from './products';

export type CategoryKey = 'tees' | 'hoodies' | 'sweatshirts' | 'bottoms' | 'accessories';
export type Gender = 'mens' | 'womens' | 'unisex';

/** Which product category a product belongs to (based on its product type). */
export function getCategory(p: Product): CategoryKey {
  const type = p.product_type.toLowerCase();
  if (type.includes('hoodie')) return 'hoodies';
  if (type.includes('sweatshirt')) return 'sweatshirts';
  if (type.includes('t-shirt') || type.includes('polo')) return 'tees';
  if (type.includes('jogger') || type.includes('cargo') || type.includes('trouser')) return 'bottoms';
  return 'accessories';
}

/**
 * Who a garment is cut for.
 * NOTE: "women's" contains the substring "men's", so we must match "women" first
 * and use a word boundary for "men".
 */
export function getGender(p: Product): Gender {
  const title = p.title.toLowerCase().replace(/[’‘]/g, "'");
  const type = p.product_type.toLowerCase();
  if (/\bwomen/.test(title) || /\blioness\b/.test(title) || /\bwomen/.test(type)) return 'womens';
  if (getCategory(p) === 'accessories') return 'unisex';
  if (/\bmen'?s\b/.test(title) || /\bmen'?s\b/.test(type)) return 'mens';
  return 'unisex';
}

export interface Collection {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
  filter: (p: Product) => boolean;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'all',
    title: 'All Products',
    navLabel: 'Shop All',
    description: 'The full SWPA range — apparel, accessories, badges, patches and stickers.',
    filter: () => true,
  },
  {
    slug: 'mens',
    title: "Men's",
    navLabel: "Men's",
    description: "Men's and unisex SWPA apparel — hoodies, tees, polos, sweatshirts, joggers and cargos.",
    // Men's = men's-cut + unisex apparel. Never women's-cut garments.
    filter: (p) => getCategory(p) !== 'accessories' && getGender(p) !== 'womens',
  },
  {
    slug: 'womens',
    title: "Women's",
    navLabel: "Women's",
    description: "Women's-fit SWPA apparel — Lioness hoodies, fitted tees, embroidered polos and cargos.",
    // Women's = women's-cut garments only.
    filter: (p) => getGender(p) === 'womens',
  },
  {
    slug: 'tees',
    title: 'Tees & Polos',
    navLabel: 'Tees & Polos',
    description: 'Crest T-shirts and embroidered polo shirts.',
    filter: (p) => getCategory(p) === 'tees',
  },
  {
    slug: 'hoodies',
    title: 'Hoodies',
    navLabel: 'Hoodies',
    description: 'Heavyweight pullover and zip-up hoodies featuring the SWPA crest.',
    filter: (p) => getCategory(p) === 'hoodies',
  },
  {
    slug: 'sweatshirts',
    title: 'Sweatshirts',
    navLabel: 'Sweatshirts',
    description: 'Classic crew-neck sweatshirts with the SWPA crest.',
    filter: (p) => getCategory(p) === 'sweatshirts',
  },
  {
    slug: 'bottoms',
    title: 'Joggers & Cargo',
    navLabel: 'Joggers & Cargo',
    description: 'Logo joggers, leg-print joggers, cuffed joggers and stretch cargo trousers.',
    filter: (p) => getCategory(p) === 'bottoms',
  },
  {
    slug: 'accessories',
    title: 'Accessories',
    navLabel: 'Accessories',
    description: 'Pin badges, sew-on patches, car stickers, snoods, keyrings and bags.',
    filter: (p) => getCategory(p) === 'accessories',
  },
];

/** Order of links in the main navigation. */
export const NAV_SLUGS = ['mens', 'womens', 'tees', 'hoodies', 'sweatshirts', 'bottoms', 'accessories'];

export const ALIASES: Record<string, string> = {
  't-shirts': 'tees',
  't-shirt': 'tees',
  'tee': 'tees',
  'men': 'mens',
  'women': 'womens',
  'joggers': 'bottoms',
  'jogger': 'bottoms',
  'cargo': 'bottoms',
  'cargos': 'bottoms',
  'cargo-trousers': 'bottoms',
};

export function getCollection(slug: string): Collection | undefined {
  const normalized = ALIASES[slug.toLowerCase()] || slug.toLowerCase();
  return COLLECTIONS.find((c) => c.slug === normalized);
}

export function getCollectionProducts(slug: string): Product[] {
  const c = getCollection(slug);
  return c ? PRODUCTS.filter(c.filter) : [];
}

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  tees: 'Tees & Polos',
  hoodies: 'Hoodies',
  sweatshirts: 'Sweatshirts',
  bottoms: 'Joggers & Cargo',
  accessories: 'Accessories',
};
