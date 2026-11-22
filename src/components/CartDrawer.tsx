'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { PayPalLogo } from '@/components/PayPalLogo';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    totalPrice,
    freeShippingThreshold,
    amountNeededForFreeShipping,
  } = useCart();

  if (!isDrawerOpen) return null;

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111315] border-l border-[#2b2e33] text-white flex flex-col shadow-2xl">
          {/* Top Patriot Ribbon Accent */}
          <div className="swpa-patriot-accent w-full" />

          {/* Header */}
          <div className="p-4 border-b border-[#23262a] flex items-center justify-between bg-[#181a1b]">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black uppercase tracking-wider font-display">Your Cart</h2>
              <span className="text-xs bg-white text-black font-extrabold px-2 py-0.5 rounded">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#202326] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-[#141618] px-4 py-3 border-b border-[#23262a]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Truck className="w-4 h-4 text-white" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-white">£{amountNeededForFreeShipping.toFixed(2)}</strong> for{' '}
                    <strong className="text-white">Free UK Delivery</strong>
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold">You qualify for FREE UK Delivery!</span>
                )}
              </span>
              <span className="text-gray-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#202326] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-sm font-bold text-gray-300 uppercase">Your cart is empty</p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-2 inline-block bg-white text-black text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded hover:bg-gray-200 transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg bg-[#181a1b] border border-[#2b2e33] relative"
                >
                  <div className="w-16 h-16 bg-[#08090a] rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 pr-6">{item.title}</h4>
                      <div className="text-[11px] text-[#737981] mt-0.5 flex flex-wrap gap-2">
                        {item.size && <span>Size: <strong className="text-gray-300">{item.size}</strong></span>}
                        {item.color && <span>Colour: <strong className="text-gray-300">{item.color}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#373b43] bg-[#0e1013] rounded">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 hover:text-white text-gray-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 hover:text-white text-gray-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-white">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2.5 right-2.5 text-gray-500 hover:text-red-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#23262a] bg-[#141618] space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="font-bold text-white">
                    {shippingFee === 0 ? <span className="text-emerald-400 uppercase">FREE</span> : `£${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#23262a] pt-2 flex justify-between text-sm font-black text-white">
                  <span>Total</span>
                  <span className="text-base">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full h-[46px] bg-[#FFC439] hover:bg-[#F4BB34] active:bg-[#E0A82E] transition-all rounded-full flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-center gap-1.5 pointer-events-none">
                    <span className="text-[14px] font-semibold text-[#2C2E2F] font-sans">
                      Checkout with
                    </span>
                    <PayPalLogo height={20} className="h-5" />
                  </div>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737981]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted 256-Bit SSL & PayPal Protection</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
