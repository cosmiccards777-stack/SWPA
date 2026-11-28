import { PRODUCTS, Product } from './products';

export type CategoryKey = 'tees' | 'hoodies' | 'bottoms' | 'accessories';
export type Gender = 'mens' | 'womens' | 'unisex';

/** Which product category a product belongs to (based on its product type). */
export function getCategory(p: Product): CategoryKey {
  const type = p.product_type.toLowerCase();
  if (type.includes('hoodie')) return 'hoodies';
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
    description: 'The full SWPA range — apparel, accessories and car stickers.',
    filter: () => true,
  },
  {
    slug: 'mens',
    title: "Men's",
    navLabel: "Men's",
    description: "Men's and unisex SWPA apparel — Night Patrol hoodies, classic hoodies and crest tees.",
    // Men's = men's-cut + unisex apparel. Never women's-cut garments.
    filter: (p) => getCategory(p) !== 'accessories' && getGender(p) !== 'womens',
  },
  {
    slug: 'womens',
    title: "Women's",
    navLabel: "Women's",
    description: "Women's-fit SWPA apparel — Lioness Edition hoodies and fitted crest tees.",
    // Women's = women's-cut garments only.
    filter: (p) => getGender(p) === 'womens',
  },
  {
    slug: 'tees',
    title: 'T-Shirts',
    navLabel: 'T-Shirts',
    description: 'Crest T-shirts in men\'s, unisex and women\'s fitted cuts.',
    filter: (p) => getCategory(p) === 'tees',
  },
  {
    slug: 'hoodies',
    title: 'Hoodies',
    navLabel: 'Hoodies',
    description: 'Heavyweight pullover hoodies featuring the SWPA crest.',
    filter: (p) => getCategory(p) === 'hoodies',
  },
  // Bottoms (Joggers & Cargo) temporarily paused pending Inkthreadable DTF placement key confirmation
  {
    slug: 'accessories',
    title: 'Accessories',
    navLabel: 'Accessories',
    description: 'Pitch-black SWPA snoods, car stickers, keyrings and tote bags.',
    filter: (p) => getCategory(p) === 'accessories',
  },
];

/** Order of links in the main navigation. */
export const NAV_SLUGS = ['mens', 'womens', 'tees', 'hoodies', 'accessories'];

export const ALIASES: Record<string, string> = {
  't-shirts': 'tees',
  't-shirt': 'tees',
  'tee': 'tees',
  'men': 'mens',
  'women': 'womens',
  'bottoms': 'all',
  'joggers': 'all',
  'jogger': 'all',
  'cargo': 'all',
  'cargos': 'all',
  'cargo-trousers': 'all',
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
  tees: 'T-Shirts',
  hoodies: 'Hoodies',
  bottoms: 'Joggers & Cargo',
  accessories: 'Accessories',
};
