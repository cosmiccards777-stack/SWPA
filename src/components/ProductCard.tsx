import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { ArrowUpRight, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isHoodie = product.product_type.toLowerCase().includes('hoodie');
  const isBundle = product.product_type.toLowerCase().includes('bundle');
  const variantCount = product.variants.length;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group relative flex flex-col rounded-2xl bg-[#11131a] border border-[#1f242e] hover:border-amber-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
    >
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isHoodie && (
          <span className="inline-flex items-center gap-1 bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
            <Flame className="w-3 h-3 fill-black" />
            Night Patrol
          </span>
        )}
        {isBundle && (
          <span className="inline-flex items-center bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
            Save Bundle
          </span>
        )}
        <span className="bg-black/70 backdrop-blur-md text-gray-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-white/10">
          {product.product_type}
        </span>
      </div>

      {/* Image Container */}
      <div className="aspect-[4/5] w-full bg-[#0a0b0e] relative overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
          <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
            <span>{variantCount} {variantCount === 1 ? 'Option' : 'Sizes & Colors'}</span>
            <span>•</span>
            <span className="text-emerald-400">In Stock</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">From</div>
            <div className="text-base font-extrabold text-amber-400 font-display">
              £{product.startingPrice}
            </div>
          </div>

          <span className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
