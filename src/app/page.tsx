'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ShieldCheck, Truck, Flame, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.product_type.toLowerCase() === selectedCategory.toLowerCase());

  // Flagship hoodie for the spotlight
  const flagshipHoodie = PRODUCTS.find((p) => p.handle.includes('original-swpa-night-patrol-hoodie')) || PRODUCTS[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10121a] via-[#0b0c10] to-[#08090c] pt-12 pb-20 border-b border-[#1f242e]">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black tracking-widest uppercase">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>2026 Official Collection — Direct UK Dispatch</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase font-display leading-[0.95]">
                WEAR THE CREST. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                  DEFEND THE PATROL.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Official premium-grade apparel for South West Patriots. Engineered from heavyweight 280-350 GSM ringspun cotton, high-density crest embroidery, and custom tailored durability.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#catalog"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold uppercase tracking-wider text-xs font-display hover:brightness-110 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href={`/products/${flagshipHoodie.handle}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141722] hover:bg-[#1a1f2e] border border-gray-700 text-white font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Night Patrol Hoodie</span>
                </Link>
              </div>

              {/* Key Specs Row */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-white text-sm font-black font-display">280 GSM+</div>
                  <div className="text-[11px] text-gray-400">Ringspun Cotton</div>
                </div>
                <div>
                  <div className="text-white text-sm font-black font-display">100% SECURE</div>
                  <div className="text-[11px] text-gray-400">PayPal Express</div>
                </div>
                <div>
                  <div className="text-white text-sm font-black font-display">INKTHREADABLE</div>
                  <div className="text-[11px] text-gray-400">Direct UK Print</div>
                </div>
              </div>
            </div>

            {/* Right Hero Product Feature */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#181b26] to-[#0d0f16] border border-[#2b3140] p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-4 right-4 bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>

                <div className="flex-1 flex items-center justify-center my-4">
                  <img
                    src={flagshipHoodie.featuredImage}
                    alt={flagshipHoodie.title}
                    className="max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="bg-[#11131c]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {flagshipHoodie.product_type}
                  </div>
                  <div className="text-white font-extrabold text-sm line-clamp-1 mt-0.5">
                    {flagshipHoodie.title}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-black text-white font-display">
                      £{flagshipHoodie.startingPrice}
                    </span>
                    <Link
                      href={`/products/${flagshipHoodie.handle}`}
                      className="bg-amber-400 text-black text-xs font-black uppercase px-4 py-2 rounded-lg hover:bg-amber-300 transition-colors"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#1f242e] pb-6">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              Official Merch Store
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide uppercase font-display">
              All Products & Apparel
            </h2>
          </div>

          <div className="text-xs text-gray-400 font-medium">
            Showing <strong className="text-white">{filteredProducts.length}</strong> items • All prices include direct UK fulfillment
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'bg-[#12141c] text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Spotlight Feature: Night Patrol Tech Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#121520] via-[#161a27] to-[#121520] border border-[#232938] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Direct Print-On-Demand Automation
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white uppercase font-display leading-tight">
                BUILT WITH INKTHREADABLE UK QUALITY STANDARDS
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Every order placed on this store is transmitted immediately to Inkthreadable UK for immediate printing, quality check, and direct tracked dispatch. No delays, no inventory hold-ups.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-white uppercase">Double Fabric Hood</div>
                  <div className="text-gray-400">Self-color drawcord and twin needle stitching</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="font-bold text-white uppercase">Kangaroo Pouch</div>
                  <div className="text-gray-400">Reinforced pocket with earphone cord feed</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/products/${flagshipHoodie.handle}`}
                  className="inline-flex items-center gap-2 bg-amber-400 text-black font-extrabold uppercase text-xs px-6 py-3.5 rounded-xl hover:bg-amber-300 transition-colors font-display tracking-wider"
                >
                  <span>Order Flagship Hoodie</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={flagshipHoodie.featuredImage}
                alt="SWPA Flagship Hoodie"
                className="max-h-[380px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
