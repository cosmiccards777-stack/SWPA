'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090a]/95 backdrop-blur-md border-b border-[#1c1f24] shadow-sm">
      {/* Top Patriot Ribbon Accent */}
      <div className="swpa-patriot-accent w-full" style={{ height: '4px' }} />

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Navigation Menu Items */}
          <div className="flex items-center gap-6">
            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-gray-300 p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo text (compact & sleek) */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl sm:text-2xl font-normal tracking-wider text-white uppercase font-bebas leading-none">
                SWPA <span className="text-[#a7adb5]">MERCH</span>
              </span>
            </Link>

            {/* Desktop Nav - Matching Original */}
            <nav className="hidden md:flex items-center space-x-6 text-xs font-bold tracking-wider font-sans uppercase">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/#t-shirts" className="text-[#c5c9cf] hover:text-white transition-colors">
                T-Shirts
              </Link>
              <Link href="/#hoodies" className="text-[#c5c9cf] hover:text-white transition-colors">
                Hoodies
              </Link>
              <Link href="/#sweatshirts" className="text-[#c5c9cf] hover:text-white transition-colors">
                Sweatshirts
              </Link>
              <Link href="/#joggers" className="text-[#c5c9cf] hover:text-white transition-colors">
                Joggers
              </Link>
              <Link href="/#accessories" className="text-[#c5c9cf] hover:text-white transition-colors">
                Accessories
              </Link>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3.5">
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-[#aeb2b8] border border-[#2d3137] bg-[#101215] px-2.5 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PayPal Protected</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded text-white hover:text-gray-300 transition-all flex items-center gap-1.5"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="bg-[#d71920] text-white font-sans font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#23262a] bg-[#0c0d10] px-4 py-3 space-y-1 text-xs font-bold font-sans uppercase tracking-wider">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            Home
          </Link>
          <Link
            href="/#t-shirts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5c9cf] py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            T-Shirts
          </Link>
          <Link
            href="/#hoodies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5c9cf] py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            Hoodies
          </Link>
          <Link
            href="/#sweatshirts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5c9cf] py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            Sweatshirts
          </Link>
          <Link
            href="/#joggers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5c9cf] py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            Joggers
          </Link>
          <Link
            href="/#accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#c5c9cf] py-2 px-3 rounded hover:bg-[#181a1d]"
          >
            Accessories & Patches
          </Link>
        </div>
      )}
    </header>
  );
}
