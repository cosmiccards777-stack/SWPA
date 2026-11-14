import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] border-t border-[#23262a] text-[#a7adb5] mt-20 text-xs">
      {/* Top trust strip */}
      <div className="border-b border-[#1c1e22] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Truck className="w-5 h-5 text-white flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-[11px]">UK Tracked Delivery</div>
              <div className="text-[10px] text-[#737981]">Direct fulfillment via Inkthreadable UK</div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-[11px]">PayPal Buyer Protection</div>
              <div className="text-[10px] text-[#737981]">100% secure transaction protection</div>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Lock className="w-5 h-5 text-white flex-shrink-0" />
            <div>
              <div className="text-white font-bold uppercase text-[11px]">Official Merchandise</div>
              <div className="text-[10px] text-[#737981]">Authentic South West Patriots Alliance apparel</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded border border-[#737981] overflow-hidden bg-black p-0.5">
                <img
                  src="https://cdn.shopify.com/s/files/1/1020/0249/1776/files/swpa-crest.jpg?v=1789637394"
                  alt="SWPA Crest"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-black text-white uppercase font-display tracking-wider">
                SWPA Merch
              </span>
            </div>
            <p className="text-[#888e96] text-[11px] leading-relaxed max-w-xs">
              Black apparel and merchandise featuring the SWPA crest. Stand with steel.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-xs">Categories</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/#hoodies" className="hover:text-white transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/#sweatshirts" className="hover:text-white transition-colors">
                  Sweatshirts
                </Link>
              </li>
              <li>
                <Link href="/#cargo-joggers" className="hover:text-white transition-colors">
                  Cargo & Joggers
                </Link>
              </li>
              <li>
                <Link href="/#accessories" className="hover:text-white transition-colors">
                  Badges, Patches & Stickers
                </Link>
              </li>
              <li>
                <Link href="/#bundles" className="hover:text-white transition-colors">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-xs">Payment & Fulfillment</h4>
            <p className="text-[11px] text-[#888e96] mb-3 leading-relaxed">
              We process payments via PayPal for instant funds and zero delays. Every order is automatically routed to Inkthreadable UK for immediate printing.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#181a1b] border border-[#2b2e33] px-3 py-1.5 rounded text-[11px] text-white font-semibold">
              <span className="italic font-bold font-serif">PayPal</span>
              <span>• Debit & Credit Cards</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1c1e22] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#656b72] gap-2">
          <p>© {new Date().getFullYear()} SWPA Merch. All Rights Reserved.</p>
          <p>Stand with steel.</p>
        </div>
      </div>
    </footer>
  );
}
