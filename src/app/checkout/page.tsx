'use client';

export const runtime = 'edge';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  ShieldCheck,
  Truck,
  Lock,
  ArrowLeft,
  ShoppingBag,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PayPalLogo } from '@/components/PayPalLogo';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasCanceled = searchParams.get('canceled') === 'true';

  const { items, totalPrice, shippingFee } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    wasCanceled ? 'PayPal payment was canceled. No funds were taken. You can try again below.' : null
  );

  const executePayment = async () => {
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.address1.trim() || !formData.city.trim() || !formData.postcode.trim()) {
      setErrorMessage('Please fill in all required shipping address fields before proceeding to payment.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Save customer info and cart items in session storage
      sessionStorage.setItem(
        'swpa_pending_order',
        JSON.stringify({
          customer: {
            ...formData,
            countryCode: 'GB',
          },
          items: items,
          shippingFee: shippingFee,
          totalPrice: totalPrice,
        })
      );

      // 2. Request verified PayPal order creation from server
      const createRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const orderData = await createRes.json();
      if (!createRes.ok || !orderData.approveUrl) {
        throw new Error(orderData.error || 'Failed to initialize PayPal order');
      }

      // 3. Redirect customer to official PayPal approval page
      window.location.href = orderData.approveUrl;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment initialization failed. Please check your connection and try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-4xl font-normal text-white uppercase font-bebas tracking-wider">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-sm font-semibold text-[#d1d5db]">Add official hoodies or gear before proceeding to checkout.</p>
        <Link
          href="/"
          className="inline-block bg-white text-black font-bebas text-2xl tracking-wider uppercase px-8 py-3 rounded hover:bg-gray-200 transition-colors"
        >
          RETURN TO MERCH STORE
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c5c9cf] hover:text-white transition-colors mb-3 uppercase font-sans"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-4xl sm:text-5xl font-normal text-white uppercase font-bebas tracking-wide">
          EXPRESS SECURE CHECKOUT
        </h1>
        <p className="text-xs font-semibold text-[#ffffff] mt-1 font-sans">
          Complete your order with PayPal or Debit/Credit Card. Orders are prepared immediately for tracked UK dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#141618] border-2 border-[#33373e] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d3137] pb-4">
              <h2 className="text-2xl font-normal text-white uppercase tracking-wider font-bebas flex items-center gap-2">
                <Truck className="w-5 h-5 text-white" />
                <span>1. UK DELIVERY ADDRESS</span>
              </h2>
              <span className="text-xs font-bold text-[#c5c9cf] uppercase">* Required</span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded bg-red-950/80 border border-red-600 flex items-start gap-3 text-white text-xs font-bold">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-white font-bold uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-bold uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-white font-bold uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="07123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold uppercase tracking-wider mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House number and street name"
                  value={formData.address1}
                  onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-white font-bold uppercase tracking-wider mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                  value={formData.address2}
                  onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-bold uppercase tracking-wider mb-1">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-white font-bold uppercase tracking-wider mb-1">
                    County
                  </label>
                  <input
                    type="text"
                    placeholder="County"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-white font-bold uppercase tracking-wider mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SW1A 1AA"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full bg-[#0a0b0d] border border-[#454a52] rounded px-4 py-3 text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-[#141618] border-2 border-[#33373e] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d3137] pb-4">
              <h2 className="text-2xl font-normal text-white uppercase tracking-wider font-bebas flex items-center gap-2">
                <Lock className="w-5 h-5 text-white" />
                <span>2. PAYMENT VIA PAYPAL</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected</span>
              </span>
            </div>

            <p className="text-xs text-[#d1d5db] font-sans leading-relaxed">
              Pay securely using your PayPal balance, connected bank account, or debit/credit card. Funds are processed immediately without holds.
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={executePayment}
                disabled={isProcessing}
                className="w-full h-[52px] bg-[#FFC439] hover:bg-[#F4BB34] active:bg-[#E0A82E] rounded-full font-bold flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2 text-sm font-sans text-[#2C2E2F]">
                    <Loader2 className="w-5 h-5 animate-spin text-[#003087]" />
                    <span>Connecting securely to PayPal...</span>
                  </span>
                ) : (
                  <div className="flex items-center justify-center gap-2 pointer-events-none">
                    <span className="text-[15px] font-semibold text-[#2C2E2F] font-sans">
                      Pay with
                    </span>
                    <PayPalLogo height={24} className="h-6" />
                  </div>
                )}
              </button>

              <div className="text-[11px] text-center text-[#aeb2b8] flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Eligible for PayPal Buyer Protection on full purchase amount</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#141618] border-2 border-[#33373e] rounded-xl p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="text-2xl font-normal text-white uppercase tracking-wider font-bebas border-b border-[#2d3137] pb-4">
              ORDER SUMMARY
            </h2>

            {/* Item List */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="w-16 h-16 rounded bg-[#0a0b0d] border border-[#2d3137] p-1 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white line-clamp-1">{item.title}</h4>
                    <p className="text-[#aeb2b8] mt-0.5">
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && `Colour: ${item.color}`}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[#c5c9cf]">Qty: {item.quantity}</span>
                      <span className="text-white font-bold">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-[#2d3137] pt-4 space-y-2 text-xs font-sans">
              <div className="flex justify-between text-[#c5c9cf]">
                <span>Items Subtotal:</span>
                <span className="text-white font-bold">£{(totalPrice - shippingFee).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#c5c9cf]">
                <span>Tracked UK Shipping:</span>
                <span className="text-white font-bold">
                  {shippingFee === 0 ? 'FREE' : `£${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#2d3137] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase">Total Due:</span>
                <span className="text-3xl font-normal text-white font-bebas">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Stand with Steel pledge */}
            <div className="rounded-lg bg-[#0c0d10] border border-[#2d3137] p-3 text-[11px] text-[#c5c9cf] space-y-1">
              <span className="text-white font-bold block uppercase font-sans">Stand With Steel</span>
              <p>Your order is printed, hand-finished, and dispatched tracked across the UK.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-white font-bebas text-2xl">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
