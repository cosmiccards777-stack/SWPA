export const runtime = 'edge';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLECTIONS, getCollection, getCollectionProducts } from '@/data/collections';
import CollectionView from '@/components/CollectionView';

interface Props {
  params: { slug: string };
}

// Pre-render every collection page at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCollection(params.slug);
  if (!c) return {};
  return {
    title: `${c.title} | SWPA Merch`,
    description: c.description,
  };
}

export default function CollectionPage({ params }: Props) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const products = getCollectionProducts(collection.slug);
  const showTypeFilter = ['all', 'mens', 'womens'].includes(collection.slug);

  return (
    <div className="pb-24">
      {/* Collection header */}
      <section className="relative overflow-hidden border-b border-[#1c1f24] bg-gradient-to-b from-[#050505] via-[#0b0d11] to-[#050505]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#113f88]/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="text-[11px] font-semibold uppercase tracking-wider text-[#8f959d] font-sans mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#c5c9cf]">{collection.title}</span>
          </nav>
          <div className="swpa-patriot-accent mb-5" style={{ width: '120px', height: '6px' }} />
          <h1 className="text-5xl sm:text-6xl font-normal text-white uppercase tracking-wider font-bebas leading-none">
            {collection.title}
          </h1>
          <p className="mt-3 text-sm text-[#c5c9cf] max-w-2xl font-sans">{collection.description}</p>
        </div>
      </section>

      {/* Sibling collection links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none font-sans text-[11px] font-bold uppercase tracking-wider">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full border transition-colors ${
                c.slug === collection.slug
                  ? 'bg-[#c8102e] border-[#c8102e] text-white'
                  : 'border-[#373c44] text-[#c5c9cf] hover:text-white hover:border-white'
              }`}
            >
              {c.navLabel}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <CollectionView products={products} showTypeFilter={showTypeFilter} />
      </section>
    </div>
  );
}
