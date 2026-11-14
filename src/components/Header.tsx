'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#141618] border-b border-[#2d3137] shadow-lg">
      {/* Top Patriot Ribbon Accent */}
      <div className="swpa-patriot-accent w-full" />

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gray-300 p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-lg border-2 border-[#555b64] overflow-hidden bg-black p-0.5 flex-shrink-0 group-hover:border-white transition-colors shadow">
              <img
                src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
                alt="SWPA Crest"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-normal tracking-wider text-white uppercase font-bebas leading-none">
                SWPA <span className="text-[#e2e4e8]">MERCH</span>
              </div>
              <div className="text-[11px] text-[#c0c5cc] font-semibold tracking-widest uppercase mt-0.5">
                Official Merchandise
              </div>
            </div>
          </Link>

          {/* Desktop Nav in Bebas Neue - Crisp, Bold, Clear */}
          <nav className="hidden md:flex items-center space-x-8 text-xl font-normal font-bebas tracking-wider">
            <Link href="/" className="text-white hover:text-[#d71920] transition-colors uppercase">
              HOME
            </Link>
            <Link href="/#hoodies" className="text-[#e5e7eb] hover:text-white transition-colors uppercase">
              HOODIES
            </Link>
            <Link href="/#mens" className="text-[#e5e7eb] hover:text-white transition-colors uppercase">
              MEN&apos;S
            </Link>
            <Link href="/#womens" className="text-[#e5e7eb] hover:text-white transition-colors uppercase">
              WOMEN&apos;S
            </Link>
            <Link href="/#accessories" className="text-[#e5e7eb] hover:text-white transition-colors uppercase">
              ACCESSORIES
            </Link>
            <Link href="/#bundles" className="text-[#e5e7eb] hover:text-white transition-colors uppercase">
              BUNDLES
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-white border border-[#40454e] bg-[#0b0c0e] px-3.5 py-2 rounded">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PayPal Protected</span>
            </div>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative px-4 py-2.5 rounded bg-[#272b32] hover:bg-[#343942] border border-[#4b515b] text-white transition-all flex items-center gap-2.5 font-bebas text-lg tracking-wider"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="hidden sm:inline">CART</span>
              {totalItems > 0 && (
                <span className="bg-[#d71920] text-white font-sans font-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2d3137] bg-[#141618] px-4 py-4 space-y-2 text-xl font-bebas tracking-wider">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            HOME
          </Link>
          <Link
            href="/#hoodies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#e5e7eb] py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            HOODIES
          </Link>
          <Link
            href="/#mens"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#e5e7eb] py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            MEN&apos;S
          </Link>
          <Link
            href="/#womens"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#e5e7eb] py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            WOMEN&apos;S
          </Link>
          <Link
            href="/#accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#e5e7eb] py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            ACCESSORIES & PATCHES
          </Link>
          <Link
            href="/#bundles"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#e5e7eb] py-2 px-3 rounded hover:bg-[#202326] uppercase"
          >
            BUNDLES
          </Link>
        </div>
      )}
    </header>
  );
}
