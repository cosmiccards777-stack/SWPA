'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => {
          if (selectedCategory === "Men's") {
            return p.title.toLowerCase().includes("men's") || p.product_type.toLowerCase().includes('hoodie');
          }
          if (selectedCategory === "Women's") {
            return p.title.toLowerCase().includes("women") || p.product_type.toLowerCase().includes("women");
          }
          return p.product_type.toLowerCase() === selectedCategory.toLowerCase();
        });

  return (
    <div className="space-y-12">
      {/* Authentic Original Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 text-center border-b border-[#2b2e33] bg-gradient-to-b from-[#0e1013] via-[#08090a] to-[#050505]">
        {/* Radial ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#113f88]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Stacked Patriot Accent Bar */}
          <div className="swpa-patriot-accent w-64 max-w-full mx-auto shadow-md" />

          {/* Authentic Steel-Framed SWPA Crest */}
          <div className="w-48 sm:w-64 aspect-square mx-auto p-2.5 rounded-xl border border-[#737981] bg-gradient-to-br from-[#1d1f22] via-[#08090a] to-[#2b2e33] shadow-2xl">
            <img
              src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
              alt="Southwest Patriots Alliance crest"
              className="w-full h-full object-contain bg-black rounded-lg"
              loading="eager"
            />
          </div>

          {/* Headings Matching Original Exactly */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#c5c9cf] uppercase">
              SWPA Merchandise
            </p>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight font-display">
              SWPA MERCH
            </h1>
            <p className="text-sm sm:text-base text-[#d6d7da] max-w-xl mx-auto leading-relaxed">
              Black apparel and merchandise featuring the SWPA crest.
            </p>
          </div>

          {/* Action button matching original */}
          <div className="pt-2">
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[50px] px-8 py-3 rounded border border-[#d7d9dd] text-white bg-gradient-to-b from-[#24272b] to-[#111315] hover:bg-[#202327] hover:border-white font-extrabold tracking-wider uppercase text-xs transition-all shadow-lg"
            >
              Shop categories
            </a>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY - Original 4-Tile Layout */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <p className="text-center text-xs font-black tracking-[0.25em] text-[#aeb2b8] uppercase mb-6">
          SHOP BY CATEGORY
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: HOODIES */}
          <button
            onClick={() => setSelectedCategory('Hoodies')}
            className="group relative text-left min-h-[170px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] bg-gradient-to-br from-[#101113] to-[#0a0b0d] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-2xl font-black text-white uppercase font-display tracking-wide group-hover:text-white">
              HOODIES
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1">Shop black hoodies</span>
          </button>

          {/* Card 2: SWEATSHIRTS & POLOS */}
          <button
            onClick={() => setSelectedCategory('Sweatshirts')}
            className="group relative text-left min-h-[170px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] bg-gradient-to-br from-[#101113] to-[#0a0b0d] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-2xl font-black text-white uppercase font-display tracking-wide group-hover:text-white">
              SWEATSHIRTS
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1">Shop black sweatshirts</span>
          </button>

          {/* Card 3: CARGO & JOGGERS */}
          <button
            onClick={() => setSelectedCategory('Cargo Trousers')}
            className="group relative text-left min-h-[170px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] bg-gradient-to-br from-[#101113] to-[#0a0b0d] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-2xl font-black text-white uppercase font-display tracking-wide group-hover:text-white">
              CARGO & PANTS
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1">Shop stretch cargo & joggers</span>
          </button>

          {/* Card 4: ACCESSORIES & PATCHES */}
          <button
            onClick={() => setSelectedCategory('Accessories')}
            className="group relative text-left min-h-[170px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] bg-gradient-to-br from-[#101113] to-[#0a0b0d] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-2xl font-black text-white uppercase font-display tracking-wide group-hover:text-white">
              ACCESSORIES
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1">Shop patches, badges & stickers</span>
          </button>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2b2e33] mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-display">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <p className="text-xs text-[#aeb2b8] mt-0.5">
              Showing {filteredProducts.length} items • Direct UK print-on-demand fulfillment
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('Hoodies')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Hoodies'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Hoodies
            </button>
            <button
              onClick={() => setSelectedCategory('Sweatshirts')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Sweatshirts'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Sweatshirts
            </button>
            <button
              onClick={() => setSelectedCategory('Cargo Trousers')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Cargo Trousers'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Cargo
            </button>
            <button
              onClick={() => setSelectedCategory('Joggers')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Joggers'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Joggers
            </button>
            <button
              onClick={() => setSelectedCategory('Accessories')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Accessories'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => setSelectedCategory('Bundles')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCategory === 'Bundles'
                  ? 'bg-white text-black'
                  : 'bg-[#181a1b] text-gray-300 hover:text-white border border-[#2b2e33]'
              }`}
            >
              Bundles
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Stand with Steel Guarantee Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl border border-[#373b43] bg-[#0e1013] p-8 text-center space-y-3">
          <p className="text-xs font-bold text-[#c5c9cf] uppercase tracking-widest">
            Stand With Steel
          </p>
          <h3 className="text-2xl font-black text-white uppercase font-display">
            Direct UK Printing & Fast Tracked Fulfillment
          </h3>
          <p className="text-xs text-[#a7adb5] max-w-xl mx-auto leading-relaxed">
            All orders placed on the store are instantly transmitted to Inkthreadable UK for immediate production and tracked UK dispatch. Zero wait times, zero delays.
          </p>
        </div>
      </section>
    </div>
  );
}
