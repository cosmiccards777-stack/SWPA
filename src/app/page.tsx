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
          if (selectedCategory === 'Accessories') {
            return (
              p.product_type.toLowerCase() === 'accessories' ||
              p.product_type.toLowerCase() === 'patches' ||
              p.product_type.toLowerCase() === 'snoods & neck gaiters' ||
              p.title.toLowerCase().includes('badge') ||
              p.title.toLowerCase().includes('patch') ||
              p.title.toLowerCase().includes('sticker') ||
              p.title.toLowerCase().includes('bag') ||
              p.title.toLowerCase().includes('keyring') ||
              p.title.toLowerCase().includes('snood')
            );
          }
          return p.product_type.toLowerCase() === selectedCategory.toLowerCase();
        });

  return (
    <div className="space-y-16 pb-24">
      {/* Exact Proportional Hero Section matching Original */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 text-center bg-gradient-to-b from-[#050505] via-[#090b0e] to-[#050505]">
        {/* Subtle radial patriot glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#113f88]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Tri-Color Stacked Ribbon */}
          <div
            className="swpa-patriot-accent mx-auto shadow-md"
            style={{
              width: 'min(330px, 70vw)',
              height: '10px',
              marginBottom: '2rem',
              borderRadius: '1px',
            }}
          />

          {/* Large Steel-Bevelled Crest Frame (Exact Original Dimensions) */}
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

          {/* Headings & Kicker matching Original Spacing */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#c5c9cf] uppercase font-sans">
              SWPA Merchandise
            </p>
            <h1 className="text-5xl sm:text-7xl font-normal text-white uppercase tracking-wider font-bebas leading-tight">
              SWPA MERCH
            </h1>
            <p className="text-sm sm:text-base text-[#d6d7da] font-normal max-w-xl mx-auto leading-relaxed pt-1">
              Black apparel and merchandise featuring the SWPA crest.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="pt-6">
            <a
              href="#categories"
              className="inline-flex items-center justify-center min-h-[50px] px-9 py-3 rounded border border-[#d7d9dd] hover:border-white text-white font-sans text-xs font-extrabold tracking-[0.1em] uppercase transition-all shadow-md bg-gradient-to-b from-[#24272b] to-[#111315] hover:brightness-125"
            >
              Shop categories
            </a>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY (Exact Original Spacing & Proportions) */}
      <section
        id="categories"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
        style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <p className="text-center text-xs font-black tracking-[0.22em] text-[#aeb2b8] uppercase mb-6 font-sans">
          SHOP BY CATEGORY
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: HOODIES */}
          <button
            onClick={() => setSelectedCategory('Hoodies')}
            className="group relative text-left min-h-[180px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
            style={{
              background:
                'linear-gradient(135deg, rgba(215,25,32,.09), transparent 35%), linear-gradient(315deg, rgba(17,63,136,.16), transparent 42%), #101113',
            }}
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" style={{ height: '10px' }} />
            <span className="text-3xl font-normal text-white uppercase font-bebas tracking-wider group-hover:text-white">
              HOODIES
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1 font-sans">Shop black hoodies</span>
          </button>

          {/* Card 2: SWEATSHIRTS */}
          <button
            onClick={() => setSelectedCategory('Sweatshirts')}
            className="group relative text-left min-h-[180px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
            style={{
              background:
                'linear-gradient(135deg, rgba(215,25,32,.09), transparent 35%), linear-gradient(315deg, rgba(17,63,136,.16), transparent 42%), #101113',
            }}
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" style={{ height: '10px' }} />
            <span className="text-3xl font-normal text-white uppercase font-bebas tracking-wider group-hover:text-white">
              SWEATSHIRTS
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1 font-sans">Shop black sweatshirts</span>
          </button>

          {/* Card 3: CARGO & PANTS */}
          <button
            onClick={() => setSelectedCategory('Cargo Trousers')}
            className="group relative text-left min-h-[180px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
            style={{
              background:
                'linear-gradient(135deg, rgba(215,25,32,.09), transparent 35%), linear-gradient(315deg, rgba(17,63,136,.16), transparent 42%), #101113',
            }}
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" style={{ height: '10px' }} />
            <span className="text-3xl font-normal text-white uppercase font-bebas tracking-wider group-hover:text-white">
              CARGO & PANTS
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1 font-sans">Shop stretch cargo & joggers</span>
          </button>

          {/* Card 4: ACCESSORIES */}
          <button
            onClick={() => setSelectedCategory('Accessories')}
            className="group relative text-left min-h-[180px] p-6 rounded-lg border border-[#656b72] hover:border-[#b7bbc1] hover:-translate-y-1 transition-all overflow-hidden shadow-lg flex flex-col justify-end"
            style={{
              background:
                'linear-gradient(135deg, rgba(215,25,32,.09), transparent 35%), linear-gradient(315deg, rgba(17,63,136,.16), transparent 42%), #101113',
            }}
          >
            <div className="swpa-patriot-card-top absolute top-0 left-0 right-0" style={{ height: '10px' }} />
            <span className="text-3xl font-normal text-white uppercase font-bebas tracking-wider group-hover:text-white">
              ACCESSORIES
            </span>
            <span className="text-xs text-[#b9bdc3] mt-1 font-sans">Shop patches, badges & stickers</span>
          </button>
        </div>
      </section>

      {/* Main Catalog & Filter Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2d3137] mb-8 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
              {selectedCategory === 'All' ? 'ALL PRODUCTS' : selectedCategory.toUpperCase()}
            </h2>
            <p className="text-xs font-semibold text-[#aeb2b8] mt-0.5">
              Showing {filteredProducts.length} items • Direct UK print-on-demand fulfillment
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-sans text-xs font-bold uppercase tracking-wide">
            {['All', 'Hoodies', 'Sweatshirts', 'Cargo Trousers', 'Joggers', 'Accessories', 'Bundles'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded uppercase transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-extrabold'
                    : 'bg-[#181a1d] text-gray-300 hover:text-white border border-[#373c44]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Stand with Steel Guarantee Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-xl border border-[#373b43] bg-[#0e1013] p-8 text-center space-y-3">
          <p className="text-xs font-bold text-[#c5c9cf] uppercase tracking-widest font-sans">
            Stand With Steel
          </p>
          <h3 className="text-3xl sm:text-4xl font-normal text-white uppercase font-bebas tracking-wider">
            DIRECT UK PRINTING & FAST TRACKED FULFILLMENT
          </h3>
          <p className="text-xs sm:text-sm text-[#ffffff] font-medium max-w-xl mx-auto leading-relaxed">
            All orders placed on the store are instantly transmitted to Inkthreadable UK for immediate production and tracked UK dispatch. Zero wait times, zero delays.
          </p>
        </div>
      </section>
    </div>
  );
}
