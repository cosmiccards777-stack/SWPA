'use client';

import React, { useMemo, useState } from 'react';
import { Product } from '@/data/products';
import { CATEGORY_LABELS, CategoryKey, getCategory } from '@/data/collections';
import ProductCard from '@/components/ProductCard';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface Props {
  products: Product[];
  /** Show the "type" chips (useful on Men's / Women's / All). */
  showTypeFilter?: boolean;
}

export default function CollectionView({ products, showTypeFilter = false }: Props) {
  const [sort, setSort] = useState<SortKey>('featured');
  const [type, setType] = useState<CategoryKey | 'all'>('all');

  const typesPresent = useMemo(() => {
    const order: CategoryKey[] = ['tees', 'hoodies', 'sweatshirts', 'bottoms', 'accessories'];
    const set = new Set(products.map(getCategory));
    return order.filter((t) => set.has(t));
  }, [products]);

  const visible = useMemo(() => {
    let list = type === 'all' ? products : products.filter((p) => getCategory(p) === type);
    const price = (p: Product) => parseFloat(p.startingPrice) || 0;
    if (sort === 'price-asc') list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === 'price-desc') list = [...list].sort((a, b) => price(b) - price(a));
    if (sort === 'name') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, sort, type]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-8 border-b border-[#2d3137]">
        {showTypeFilter && typesPresent.length > 1 ? (
          <div className="flex flex-wrap gap-2 font-sans text-xs font-bold uppercase tracking-wide">
            {(['all', ...typesPresent] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3.5 py-1.5 rounded transition-colors ${
                  type === t
                    ? 'bg-white text-black'
                    : 'bg-[#181a1d] text-gray-300 hover:text-white border border-[#373c44]'
                }`}
              >
                {t === 'all' ? 'All' : CATEGORY_LABELS[t]}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs font-semibold text-[#aeb2b8] font-sans">
            {visible.length} {visible.length === 1 ? 'product' : 'products'}
          </p>
        )}

        <label className="flex items-center gap-2 text-xs font-semibold text-[#aeb2b8] font-sans">
          {showTypeFilter && typesPresent.length > 1 && (
            <span className="mr-2">{visible.length} products</span>
          )}
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-[#181a1d] border border-[#373c44] text-white rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-white"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-[#aeb2b8] py-20 font-sans">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
