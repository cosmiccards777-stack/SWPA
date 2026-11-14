'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, totalPrice, clearCart } = useCart();

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executePayment = async () => {
    if (!formData.fullName || !formData.email || !formData.address1 || !formData.city || !formData.postcode) {
      setErrorMessage('Please fill in all required shipping address fields before proceeding to payment.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const createRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingFee }),
      });
      const orderData = await createRes.json();
      if (!createRes.ok) throw new Error(orderData.error || 'Failed to create PayPal order');

      const captureRes = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderID: orderData.id,
          customerInfo: {
            ...formData,
            countryCode: 'GB',
          },
          cartItems: items,
        }),
      });

      const captureData = await captureRes.json();
      if (!captureRes.ok) {
        throw new Error(captureData.error || 'Failed to capture payment');
      }

      clearCart();

      sessionStorage.setItem(
        'swpa_latest_order',
        JSON.stringify({
          orderNumber: captureData.orderNumber || orderData.id,
          fulfillment: captureData.fulfillment,
          customer: formData,
          total: totalPrice,
          items: items,
        })
      );

      router.push('/order-success');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Payment could not be completed. Please try again.');
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
          Complete your order with PayPal or Debit/Credit Card. Orders are immediately routed to Inkthreadable UK.
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
              <div className="p-4 rounded bg-red-950 border border-red-700 flex items-start gap-3 text-white text-xs font-bold">
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
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
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
                <Lock className="w-5 h-5 text-emerald-400" />
                <span>2. PAYMENT VIA PAYPAL</span>
              </h2>
              <span className="text-xs font-bold text-emerald-400 uppercase">256-Bit SSL Encrypted</span>
            </div>

            <p className="text-xs font-medium text-white font-sans">
              Pay securely using your PayPal balance, connected bank account, or debit/credit card. Funds are processed immediately without Shopify hold-ups.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => executePayment()}
                disabled={isProcessing}
                className="w-full bg-[#ffc439] hover:bg-[#f4bb34] text-[#003087] font-bebas text-2xl tracking-wider uppercase py-4 rounded flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#003087]" />
                    <span className="font-sans text-sm font-bold">Processing Order & Sending to Inkthreadable...</span>
                  </>
                ) : (
                  <>
                    <span className="italic font-bold font-serif text-xl">PayPal</span>
                    <span>EXPRESS CHECKOUT</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-white mt-3 font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Eligible for PayPal Buyer Protection on full purchase amount</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141618] border-2 border-[#33373e] rounded-xl p-6 space-y-4 sticky top-28">
            <h3 className="text-2xl font-normal text-white uppercase font-bebas tracking-wider border-b border-[#2d3137] pb-3">
              ORDER SUMMARY ({items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'})
            </h3>

            <div className="divide-y divide-[#2d3137] max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex gap-3">
                  <div className="w-14 h-14 bg-[#0a0b0d] rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 font-sans">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    <div className="text-[11px] font-semibold text-[#c5c9cf] mt-0.5">
                      Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• ${item.color}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-normal text-white font-bebas">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#2d3137] pt-3 space-y-2 text-xs font-sans">
              <div className="flex justify-between text-[#c5c9cf] font-semibold">
                <span>Subtotal</span>
                <span className="font-bold text-white">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#c5c9cf] font-semibold">
                <span>Tracked UK Delivery</span>
                <span className="font-bold text-white">
                  {shippingFee === 0 ? <span className="text-emerald-400 uppercase font-black">FREE</span> : `£${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#2d3137] pt-2 flex justify-between text-base font-bold text-white">
                <span>TOTAL DUE</span>
                <span className="text-2xl font-normal text-white font-bebas tracking-wide">
                  £{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#0a0b0d] border border-[#2d3137] space-y-1 text-xs text-[#ffffff] font-medium font-sans">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Inkthreadable Dispatch</span>
              </div>
              <p className="text-[11px]">Your order will be queued directly into our UK print facility once payment is completed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
