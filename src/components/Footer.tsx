import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Lock, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07080a] border-t border-[#1a1e27] text-gray-400 mt-24">
      {/* Trust Guarantee Bar */}
      <div className="border-b border-[#161922] bg-[#0c0e13]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-3">
            <Truck className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Fast UK Dispatch</h4>
            <p className="text-[11px] text-gray-400 mt-1">Tracked delivery direct to your door</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">PayPal Protected</h4>
            <p className="text-[11px] text-gray-400 mt-1">Full buyer protection on every order</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <Lock className="w-6 h-6 text-amber-400 mb-2" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">256-Bit SSL Security</h4>
            <p className="text-[11px] text-gray-400 mt-1">Encrypted checkout with fraud prevention</p>
          </div>
          <div className="flex flex-col items-center p-3">
            <RotateCcw className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Quality Guaranteed</h4>
            <p className="text-[11px] text-gray-400 mt-1">Heavyweight ring-spun cotton finish</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-400 flex items-center justify-center font-black text-black text-sm">
                SW
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase font-display">
                SWPA Merch
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Official South West Patriots apparel and supporters merchandise. Premium craftsmanship, high-density embroidery, and direct UK fulfillment.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Shop Collections</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#hoodies" className="hover:text-amber-400 transition-colors">
                  Night Patrol Hoodies
                </Link>
              </li>
              <li>
                <Link href="/#sweatshirts" className="hover:text-amber-400 transition-colors">
                  Sweatshirts & Joggers
                </Link>
              </li>
              <li>
                <Link href="/#cargo-joggers" className="hover:text-amber-400 transition-colors">
                  Stretch Cargo Trousers
                </Link>
              </li>
              <li>
                <Link href="/#accessories" className="hover:text-amber-400 transition-colors">
                  Embroidered Patches & Badges
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-gray-400">Track Order (via email tracking)</span>
              </li>
              <li>
                <span className="text-gray-400">UK Standard Delivery (2-4 business days)</span>
              </li>
              <li>
                <span className="text-gray-400">Size & Fit Inquiries</span>
              </li>
              <li>
                <span className="text-gray-400">Returns & Exchanges</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Payment Methods</h4>
            <p className="text-xs text-gray-400 mb-4">
              We process payments exclusively via PayPal and all major debit & credit cards for maximum buyer protection.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-300">
              <span className="bg-[#141720] border border-gray-800 px-3 py-1.5 rounded">PayPal</span>
              <span className="bg-[#141720] border border-gray-800 px-3 py-1.5 rounded">Visa / Mastercard</span>
              <span className="bg-[#141720] border border-gray-800 px-3 py-1.5 rounded">PayPal Pay in 3</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1e27] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} SWPA Merch. All Rights Reserved. Fulfilled in the United Kingdom.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
