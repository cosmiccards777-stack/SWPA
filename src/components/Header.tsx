'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#181a1b] border-b border-[#2a2d30] shadow-md">
      {/* Top Patriot Ribbon Accent */}
      <div className="swpa-patriot-accent w-full" />

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg border border-[#737981] overflow-hidden bg-black p-0.5 flex-shrink-0 group-hover:border-white transition-colors shadow-md">
              <img
                src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
                alt="SWPA Crest"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-display leading-none">
                SWPA <span className="text-[#c5c9cf]">MERCH</span>
              </div>
              <div className="text-[10px] text-[#a7adb5] tracking-widest uppercase mt-0.5 font-medium">
                Official Merchandise
              </div>
            </div>
          </Link>

          {/* Desktop Nav - Matching Original Exactly */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-bold tracking-wide">
            <Link href="/" className="text-white hover:text-[#d71920] transition-colors uppercase">
              Home
            </Link>
            <Link href="/#hoodies" className="text-gray-300 hover:text-white transition-colors uppercase">
              Hoodies
            </Link>
            <Link href="/#mens" className="text-gray-300 hover:text-white transition-colors uppercase">
              Men&apos;s
            </Link>
            <Link href="/#womens" className="text-gray-300 hover:text-white transition-colors uppercase">
              Women&apos;s
            </Link>
            <Link href="/#accessories" className="text-gray-300 hover:text-white transition-colors uppercase">
              Accessories
            </Link>
            <Link href="/#bundles" className="text-gray-300 hover:text-white transition-colors uppercase">
              Bundles
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-300 border border-[#3b3f46] bg-[#101113] px-3 py-1.5 rounded-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PayPal Protected</span>
            </div>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-lg bg-[#24272b] border border-[#3b3f46] text-white hover:border-gray-400 transition-all flex items-center gap-2"
              aria-label="View bag"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="bg-[#d71920] text-white font-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2a2d30] bg-[#121415] px-4 py-4 space-y-2 text-sm font-bold">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Home
          </Link>
          <Link
            href="/#hoodies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Hoodies
          </Link>
          <Link
            href="/#mens"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Men&apos;s
          </Link>
          <Link
            href="/#womens"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Women&apos;s
          </Link>
          <Link
            href="/#accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Accessories & Patches
          </Link>
          <Link
            href="/#bundles"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-300 py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            Bundles
          </Link>
        </div>
      )}
    </header>
  );
}
