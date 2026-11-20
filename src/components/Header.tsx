'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { NAV_SLUGS, getCollection } from '@/data/collections';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  ...NAV_SLUGS.map((slug) => ({ label: getCollection(slug)!.navLabel, href: `/collections/${slug}` })),
];

export default function Header() {
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090a]/95 backdrop-blur-md border-b border-[#1c1f24] shadow-sm">
      <div className="swpa-patriot-accent w-full" style={{ height: '4px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-gray-300 p-1"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-normal tracking-wider text-white uppercase font-bebas leading-none">
                SWPA <span className="text-[#a7adb5]">MERCH</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[11px] xl:text-xs font-bold tracking-wider font-sans uppercase">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive(item.href) ? 'text-white' : 'text-[#aeb3ba] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-[#c8102e]" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-[#aeb2b8] border border-[#2d3137] bg-[#101215] px-2.5 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PayPal Protected</span>
            </div>

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

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[#23262a] bg-[#0c0d10] px-4 py-3 space-y-1 text-xs font-bold font-sans uppercase tracking-wider">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2.5 px-3 rounded hover:bg-[#181a1d] ${
                isActive(item.href) ? 'text-white bg-[#181a1d] border-l-2 border-[#c8102e]' : 'text-[#c5c9cf]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
