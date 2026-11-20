import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] border-t border-[#23262a] text-[#ffffff] mt-20 text-xs">
      {/* Top trust strip */}
      <div className="border-b border-[#1c1e22] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Truck className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-xs font-sans">UK Tracked Delivery</div>
              <div className="text-[11px] text-[#c5c9cf]">Direct fulfillment via Inkthreadable UK</div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-xs font-sans">PayPal Buyer Protection</div>
              <div className="text-[11px] text-[#c5c9cf]">100% secure transaction protection</div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Lock className="w-6 h-6 text-white flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-xs font-sans">Official Merchandise</div>
              <div className="text-[11px] text-[#c5c9cf]">Authentic South West Patriots Alliance apparel</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded border-2 border-[#555b64] overflow-hidden bg-black p-0.5">
                <img
                  src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
                  alt="SWPA Crest"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-normal text-white uppercase font-bebas tracking-wider">
                SWPA Merch
              </span>
            </div>
            <p className="text-[#ffffff] text-xs leading-relaxed max-w-xs font-medium">
              Black apparel and merchandise featuring the SWPA crest. Stand with steel.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-normal uppercase tracking-wider mb-3 text-2xl font-bebas">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-xs font-semibold uppercase font-sans">
              <li>
                <Link href="/#t-shirts" className="hover:text-[#d71920] transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/#hoodies" className="hover:text-[#d71920] transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/#sweatshirts" className="hover:text-[#d71920] transition-colors">
                  Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/#joggers" className="hover:text-[#d71920] transition-colors">
                  Joggers & Cargo
                </Link>
              </li>
              <li>
                <Link href="/#accessories" className="hover:text-[#d71920] transition-colors">
                  Accessories & Patches
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-normal uppercase tracking-wider mb-3 text-2xl font-bebas">
              PAYMENT & FULFILLMENT
            </h4>
            <p className="text-xs text-[#ffffff] font-medium mb-3 leading-relaxed font-sans">
              We process payments via PayPal for instant funds and zero delays. Every order is automatically routed to Inkthreadable UK for immediate printing.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#181a1b] border-2 border-[#373c44] px-3.5 py-2 rounded text-xs text-white font-bold">
              <span className="italic font-bold font-serif text-sm">PayPal</span>
              <span>• Debit & Credit Cards</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1c1e22] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#c5c9cf] font-semibold gap-2 font-sans">
          <p>© {new Date().getFullYear()} SWPA Merch. All Rights Reserved.</p>
          <p className="uppercase tracking-widest text-white font-bold">Stand with steel.</p>
        </div>
      </div>
    </footer>
  );
}
