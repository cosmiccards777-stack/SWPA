import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col rounded-lg bg-[#141618] border-2 border-[#33373e] hover:border-white transition-all duration-200 overflow-hidden shadow-md"
    >
      {/* Product Image */}
      <div className="aspect-square w-full bg-[#0a0b0d] p-4 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[11px] font-bold text-[#c5c9cf] uppercase tracking-wider block font-sans">
            {product.vendor || 'SWPA Merch'}
          </span>
          <h3 className="text-base font-bold text-white group-hover:text-gray-200 line-clamp-2 leading-tight mt-1 font-sans">
            {product.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-[#2d3137] flex items-baseline justify-between">
          <span className="text-2xl font-normal text-white font-bebas tracking-wide">
            £{product.startingPrice}
          </span>
          <span className="text-xs text-[#d1d5db] font-semibold font-sans">
            {product.variants.length > 1 ? `${product.variants.length} Options` : 'In Stock'}
          </span>
        </div>
      </div>
    </Link>
  );
}
