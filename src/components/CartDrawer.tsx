'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
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
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1017] border-l border-[#1f242e] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#1f242e] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black uppercase tracking-wider font-display">Your Bag</h2>
              <span className="text-xs bg-amber-400/20 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-[#141720] px-5 py-3 border-b border-[#1f242e]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Truck className="w-4 h-4 text-amber-400" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <span className="text-amber-400 font-bold">£{amountNeededForFreeShipping.toFixed(2)}</span> for{' '}
                    <span className="font-bold text-white">Free UK Delivery</span>
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold">You qualify for FREE UK Delivery!</span>
                )}
              </span>
              <span className="text-gray-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-900 flex items-center justify-center text-gray-600">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-300">Your bag is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Browse our collection of official Night Patrol hoodies and accessories.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-4 inline-block bg-amber-400 text-black text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#13161f] border border-[#1f242e] relative group"
                >
                  <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 pr-6">{item.title}</h4>
                      <div className="text-[11px] text-gray-400 mt-1 flex flex-wrap gap-2">
                        {item.size && <span>Size: <strong className="text-gray-200">{item.size}</strong></span>}
                        {item.color && <span>Color: <strong className="text-gray-200">{item.color}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-700 bg-gray-900 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-amber-400 text-gray-400 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-amber-400 text-gray-400 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-amber-400">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#1f242e] bg-[#0c0e13] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>UK Tracked Shipping</span>
                  <span className="font-semibold text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 uppercase font-bold">FREE</span>
                    ) : (
                      `£${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t border-gray-800 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-amber-400 text-base">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-black font-extrabold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all font-display text-sm"
                >
                  <span>Proceed to PayPal Express Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
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
