'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Flame, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0a0b0e]/90 border-b border-[#1f242e]">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black text-xs font-bold py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 fill-black" />
        <span>Official SWPA Store — Free UK Delivery On Orders Over £60</span>
        <Flame className="w-3.5 h-3.5 fill-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-xl tracking-tighter shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              SW
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-wider text-white flex items-center gap-1.5 uppercase font-display">
                SWPA <span className="text-amber-400">Merch</span>
              </div>
              <div className="text-[10px] text-gray-400 tracking-widest uppercase">
                Official UK Store
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
            <Link
              href="/"
              className="text-gray-300 hover:text-amber-400 transition-colors uppercase"
            >
              All Merch
            </Link>
            <Link
              href="/#hoodies"
              className="text-gray-300 hover:text-amber-400 transition-colors uppercase"
            >
              Hoodies
            </Link>
            <Link
              href="/#sweatshirts"
              className="text-gray-300 hover:text-amber-400 transition-colors uppercase"
            >
              Sweatshirts
            </Link>
            <Link
              href="/#cargo-joggers"
              className="text-gray-300 hover:text-amber-400 transition-colors uppercase"
            >
              Cargo & Joggers
            </Link>
            <Link
              href="/#accessories"
              className="text-gray-300 hover:text-amber-400 transition-colors uppercase"
            >
              Patches & Stickers
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400 border border-gray-800 bg-gray-900/60 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PayPal Buyer Protection</span>
            </div>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center gap-2"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Bag
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black font-black text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#0d0f14] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium py-2 px-3 rounded hover:bg-gray-800"
          >
            All Products
          </Link>
          <Link
            href="/#hoodies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium py-2 px-3 rounded hover:bg-gray-800"
          >
            Night Patrol Hoodies
          </Link>
          <Link
            href="/#sweatshirts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium py-2 px-3 rounded hover:bg-gray-800"
          >
            Sweatshirts
          </Link>
          <Link
            href="/#cargo-joggers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium py-2 px-3 rounded hover:bg-gray-800"
          >
            Cargo Trousers & Joggers
          </Link>
          <Link
            href="/#accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-200 font-medium py-2 px-3 rounded hover:bg-gray-800"
          >
            Patches, Badges & Stickers
          </Link>
        </div>
      )}
    </header>
  );
}
