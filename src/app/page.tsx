'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

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
    <div className="space-y-12 pb-16">
      {/* Authentic Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 text-center border-b border-[#2b2e33] bg-gradient-to-b from-[#0e1013] via-[#08090a] to-[#050505]">
        {/* Radial ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#113f88]/20 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Stacked Patriot Accent Bar */}
          <div className="swpa-patriot-accent w-64 max-w-full mx-auto shadow-md" />

          {/* Authentic Steel-Framed SWPA Crest */}
          <div className="w-52 sm:w-64 aspect-square mx-auto p-2.5 rounded-xl border-2 border-[#555b64] bg-gradient-to-br from-[#1d1f22] via-[#08090a] to-[#2b2e33] shadow-2xl">
            <img
              src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
              alt="Southwest Patriots Alliance crest"
              className="w-full h-full object-contain bg-black rounded-lg"
              loading="eager"
            />
          </div>

          {/* Headings in Bold Bebas Neue */}
          <div className="space-y-2">
            <p className="text-sm font-bold tracking-[0.25em] text-[#e5e7eb] uppercase">
              SWPA Merchandise
            </p>
            <h1 className="text-5xl sm:text-7xl font-normal text-white uppercase tracking-wider font-bebas leading-none">
              SWPA MERCH
            </h1>
            <p className="text-base sm:text-lg text-[#ffffff] font-medium max-w-xl mx-auto leading-relaxed">
              Black apparel and merchandise featuring the SWPA crest.
            </p>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[52px] px-10 py-3 rounded border border-white text-white bg-gradient-to-b from-[#2d3137] to-[#141618] hover:bg-[#343942] font-bebas text-2xl tracking-wider uppercase transition-all shadow-lg"
            >
              Shop categories
            </a>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 scroll-mt-24">
        <p className="text-center text-sm font-bold tracking-[0.25em] text-[#e5e7eb] uppercase mb-6 font-sans">
          SHOP BY CATEGORY
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: HOODIES */}
          <button
            onClick={() => setSelectedCategory('Hoodies')}
            className="group relative text-left min-h-[175px] p-6 rounded-lg border-2 border-[#454a52] hover:border-white bg-[#141618] hover:bg-[#1a1c20] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              HOODIES
            </span>
            <span className="text-xs font-semibold text-[#d1d5db] mt-1 font-sans">Shop black hoodies</span>
          </button>

          {/* Card 2: SWEATSHIRTS & POLOS */}
          <button
            onClick={() => setSelectedCategory('Sweatshirts')}
            className="group relative text-left min-h-[175px] p-6 rounded-lg border-2 border-[#454a52] hover:border-white bg-[#141618] hover:bg-[#1a1c20] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              SWEATSHIRTS
            </span>
            <span className="text-xs font-semibold text-[#d1d5db] mt-1 font-sans">Shop black sweatshirts</span>
          </button>

          {/* Card 3: CARGO & PANTS */}
          <button
            onClick={() => setSelectedCategory('Cargo Trousers')}
            className="group relative text-left min-h-[175px] p-6 rounded-lg border-2 border-[#454a52] hover:border-white bg-[#141618] hover:bg-[#1a1c20] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              CARGO & PANTS
            </span>
            <span className="text-xs font-semibold text-[#d1d5db] mt-1 font-sans">Shop stretch cargo & joggers</span>
          </button>

          {/* Card 4: ACCESSORIES & PATCHES */}
          <button
            onClick={() => setSelectedCategory('Accessories')}
            className="group relative text-left min-h-[175px] p-6 rounded-lg border-2 border-[#454a52] hover:border-white bg-[#141618] hover:bg-[#1a1c20] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" />
            <span className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              ACCESSORIES
            </span>
            <span className="text-xs font-semibold text-[#d1d5db] mt-1 font-sans">Shop patches, badges & stickers</span>
          </button>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2d3137] mb-6 gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              {selectedCategory === 'All' ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
            </h2>
            <p className="text-xs font-semibold text-[#d1d5db] mt-0.5">
              Showing {filteredProducts.length} items • Direct UK print-on-demand fulfillment
            </p>
          </div>

          {/* Filter Pills in Bebas Neue */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-bebas text-lg tracking-wider">
            {['All', 'Hoodies', 'Sweatshirts', 'Cargo Trousers', 'Joggers', 'Accessories', 'Bundles'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded uppercase transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-[#181a1d] text-white hover:bg-[#25282d] border border-[#373c44]'
                }`}
              >
                {cat}
              </button>
            ))}
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-xl border-2 border-[#373b43] bg-[#111316] p-8 text-center space-y-3">
          <p className="text-sm font-bold text-[#e5e7eb] uppercase tracking-widest font-sans">
            Stand With Steel
          </p>
          <h3 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
            DIRECT UK PRINTING & FAST TRACKED FULFILLMENT
          </h3>
          <p className="text-sm text-[#ffffff] font-medium max-w-xl mx-auto leading-relaxed">
            All orders placed on the store are instantly transmitted to Inkthreadable UK for immediate production and tracked UK dispatch. Zero wait times, zero delays.
          </p>
        </div>
      </section>
    </div>
  );
}
