import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CARD_BG =
  'linear-gradient(135deg, rgba(215,25,32,.09), transparent 35%), linear-gradient(315deg, rgba(17,63,136,.16), transparent 42%), #101113';

const GENDER_CARDS = [
  { slug: 'mens', title: "MEN'S", sub: "Shop men's & unisex apparel", handle: 'awdis-college-hoodie-black-night-patrol-hoodie-mens' },
  { slug: 'womens', title: "WOMEN'S", sub: "Shop women's fit apparel", handle: 'awdis-college-hoodie-7691-7691' },
];

const CATEGORY_CARDS = [
  { slug: 'tees', title: 'TEES & POLOS', sub: 'Crest tees & polo shirts' },
  { slug: 'hoodies', title: 'HOODIES', sub: 'Pullover & zip-up hoodies' },
  { slug: 'bottoms', title: 'JOGGERS & CARGO', sub: 'Joggers & stretch cargos' },
  { slug: 'accessories', title: 'ACCESSORIES', sub: 'Badges, patches & stickers' },
];

export default function HomePage() {
  const imageFor = (handle: string) => PRODUCTS.find((p) => p.handle === handle)?.featuredImage;

  // Featured: a hand-picked mix across men's, women's and categories
  const FEATURED_HANDLES = [
    'original-swpa-night-patrol-hoodie',
    'awdis-college-hoodie-swpa-womens-night-patrol-hoodie',
    'swpa-classic-t-shirt',
    'swpa-womens-embroidered-polo-shirt-black-pink',
    'swpa-printed-zip-up-hoodie',
    'swpa-womens-fitted-t-shirt',
    'swpa-printed-cuffed-joggers',
    'awdis-sweatshirt-7033-7185',
  ];
  const featured = FEATURED_HANDLES.map((h) => PRODUCTS.find((p) => p.handle === h)).filter(
    (p): p is (typeof PRODUCTS)[number] => Boolean(p)
  );

  return (
    <div className="space-y-20 pb-24">
      {/* Immediate redirect for legacy bookmark / cache hash URLs */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window === 'undefined') return;
              var h = (window.location.hash || '').toLowerCase().replace('#', '');
              var map = {
                'mens': '/collections/mens',
                "men's": '/collections/mens',
                'womens': '/collections/womens',
                "women's": '/collections/womens',
                'hoodies': '/collections/hoodies',
                'hoodie': '/collections/hoodies',
                'tees': '/collections/tees',
                't-shirts': '/collections/tees',
                't-shirt': '/collections/tees',
                'sweatshirts': '/collections/sweatshirts',
                'sweatshirt': '/collections/sweatshirts',
                'joggers': '/collections/bottoms',
                'jogger': '/collections/bottoms',
                'cargo': '/collections/bottoms',
                'cargo-trousers': '/collections/bottoms',
                'cargo-joggers': '/collections/bottoms',
                'bottoms': '/collections/bottoms',
                'accessories': '/collections/accessories',
                'all': '/collections/all'
              };
              if (map[h]) {
                window.location.replace(map[h]);
              }
            })();
          `,
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4 text-center bg-gradient-to-b from-[#050505] via-[#090b0e] to-[#050505]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#113f88]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="swpa-patriot-accent mx-auto shadow-md"
            style={{ width: 'min(330px, 70vw)', height: '10px', marginBottom: '2rem', borderRadius: '1px' }}
          />

          <div
            className="mx-auto rounded-xl p-2.5 sm:p-3 border border-[#737981] shadow-2xl flex items-center justify-center overflow-hidden bg-black"
            style={{
              width: 'min(520px, 86vw)',
              aspectRatio: '1 / 1',
              background: 'linear-gradient(145deg, #1d1f22, #08090a 50%, #2b2e33)',
              boxShadow: '0 0 0 1px rgba(255,255,255,.12) inset, 0 22px 60px rgba(0,0,0,.6)',
              marginBottom: '2rem',
            }}
          >
            <img
              src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
              alt="Southwest Patriots Alliance crest"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              className="bg-black rounded-lg"
              loading="eager"
            />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#c5c9cf] uppercase font-sans">
              SWPA Merchandise
            </p>
            <h1 className="text-5xl sm:text-7xl font-normal text-white uppercase tracking-wider font-bebas leading-tight">
              SWPA MERCH
            </h1>
            <p className="text-sm sm:text-base text-[#d6d7da] max-w-xl mx-auto leading-relaxed pt-1">
              Black apparel and merchandise featuring the SWPA crest.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center min-h-[50px] px-9 py-3 rounded border border-[#d7d9dd] hover:border-white text-white font-sans text-xs font-extrabold tracking-[0.1em] uppercase transition-all shadow-md bg-gradient-to-b from-[#24272b] to-[#111315] hover:brightness-125"
            >
              Shop all
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[50px] px-9 py-3 rounded border border-[#3a3f46] hover:border-white text-[#c5c9cf] hover:text-white font-sans text-xs font-extrabold tracking-[0.1em] uppercase transition-all"
            >
              Shop categories
            </a>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <p className="text-center text-xs font-black tracking-[0.22em] text-[#aeb2b8] uppercase mb-6 font-sans">
          SHOP BY CATEGORY
        </p>

        {/* Men's / Women's */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {GENDER_CARDS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative min-h-[240px] sm:min-h-[300px] rounded-lg border border-[#656b72] hover:border-[#b7bbc1] transition-all overflow-hidden shadow-lg flex items-end"
              style={{ background: CARD_BG }}
            >
              <div className="swpa-patriot-card-top absolute top-0 left-0 right-0 z-10" style={{ height: '10px' }} />
              {imageFor(c.handle) && (
                <img
                  src={imageFor(c.handle)}
                  alt=""
                  className="absolute right-0 bottom-0 h-full w-[55%] object-contain p-6 opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="relative p-6">
                <span className="block text-4xl sm:text-5xl font-normal text-white uppercase font-bebas tracking-wider">
                  {c.title}
                </span>
                <span className="block text-xs text-[#b9bdc3] mt-1 font-sans">{c.sub}</span>
                <span className="inline-block mt-4 text-[11px] font-extrabold uppercase tracking-wider text-white border-b-2 border-[#c8102e] pb-0.5 font-sans">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Product categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORY_CARDS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group relative text-left min-h-[160px] sm:min-h-[180px] p-5 sm:p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
              style={{ background: CARD_BG }}
            >
              <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" style={{ height: '10px' }} />
              <span className="text-2xl sm:text-3xl font-normal text-white uppercase font-bebas tracking-wider">
                {c.title}
              </span>
              <span className="text-xs text-[#b9bdc3] mt-1 font-sans">{c.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between pb-4 border-b border-[#2d3137] mb-8">
          <h2 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
            Featured
          </h2>
          <Link
            href="/collections/all"
            className="text-xs font-extrabold uppercase tracking-wider text-[#c5c9cf] hover:text-white font-sans"
          >
            View all {PRODUCTS.length} products →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Guarantee bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#373b43] bg-[#0e1013] p-8 text-center space-y-3">
          <p className="text-xs font-bold text-[#c5c9cf] uppercase tracking-widest font-sans">Stand With Steel</p>
          <h3 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
            DIRECT UK PRINTING &amp; FAST TRACKED FULFILLMENT
          </h3>
          <p className="text-xs sm:text-sm text-white font-medium max-w-xl mx-auto leading-relaxed">
            All orders placed on the store are instantly transmitted to Inkthreadable UK for immediate production and
            tracked UK dispatch.
          </p>
        </div>
      </section>
    </div>
  );
}
