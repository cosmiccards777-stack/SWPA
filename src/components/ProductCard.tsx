import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isBundle = product.product_type.toLowerCase().includes('bundle');

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col rounded-lg bg-[#111315] border border-[#2b2e33] hover:border-[#737981] transition-all duration-200 overflow-hidden shadow-md"
    >
      {/* Product Image */}
      <div className="aspect-square w-full bg-[#08090a] p-4 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {isBundle && (
          <span className="absolute top-2.5 left-2.5 bg-[#c8102e] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
            Bundle
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[10px] font-extrabold text-[#737981] uppercase tracking-wider block">
            {product.vendor || 'SWPA Merch'}
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:underline line-clamp-2 leading-snug mt-0.5">
            {product.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-[#1d1f22] flex items-baseline justify-between">
          <span className="text-sm sm:text-base font-black text-white font-display">
            £{product.startingPrice}
          </span>
          <span className="text-[11px] text-[#737981] font-medium">
            {product.variants.length > 1 ? `${product.variants.length} Options` : 'In Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}
