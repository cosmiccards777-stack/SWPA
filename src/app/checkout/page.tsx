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
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // Dynamic PayPal SDK script loader
  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test_client_id';

  useEffect(() => {
    // If running in development with dummy client ID, we provide instant one-click test checkout
    if (clientId === 'test_client_id') {
      setPaypalLoaded(true);
      return;
    }

    const scriptId = 'paypal-sdk-script';
    if (document.getElementById(scriptId)) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=buttons`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
    };
    script.onerror = () => {
      console.warn('Failed to load PayPal SDK, falling back to direct express checkout');
      setPaypalLoaded(true);
    };
    document.body.appendChild(script);
  }, [clientId]);

  // Handle checkout execution
  const executePayment = async (orderIdFromPaypal?: string) => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.address1 || !formData.city || !formData.postcode) {
      setErrorMessage('Please fill in all required shipping address fields before proceeding to payment.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create order or use supplied PayPal ID
      let orderId = orderIdFromPaypal;
      if (!orderId) {
        const createRes = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, shippingFee }),
        });
        const orderData = await createRes.json();
        if (!createRes.ok) throw new Error(orderData.error || 'Failed to create PayPal order');
        orderId = orderData.id;
      }

      // 2. Capture payment and automatically submit order to Inkthreadable
      const captureRes = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderID: orderId,
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

      // Clear cart
      clearCart();

      // Store order details in session storage for the confirmation page
      sessionStorage.setItem(
        'swpa_latest_order',
        JSON.stringify({
          orderNumber: captureData.orderNumber || orderId,
          fulfillment: captureData.fulfillment,
          customer: formData,
          total: totalPrice,
          items: items,
        })
      );

      // Redirect to success page
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
        <h2 className="text-2xl font-black text-white uppercase font-display">Your Bag is Empty</h2>
        <p className="text-xs text-gray-400">Add official hoodies or gear before proceeding to checkout.</p>
        <Link
          href="/"
          className="inline-block bg-amber-400 text-black font-extrabold uppercase text-xs px-6 py-3 rounded-xl hover:bg-amber-300 transition-colors"
        >
          Return to Merch Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-amber-400 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-display">
          Express Secure Checkout
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Complete your order with PayPal or Debit/Credit Card. Orders are immediately routed to Inkthreadable UK.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Shipping Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#11141c] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>1. UK Delivery Address</span>
              </h2>
              <span className="text-xs text-gray-500">* Required</span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-900/30 border border-red-700/50 flex items-start gap-3 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                    Email Address (for receipt & tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                    Phone Number (for courier SMS)
                  </label>
                  <input
                    type="tel"
                    placeholder="07123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House number and street name"
                  value={formData.address1}
                  onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                  className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, unit, etc."
                  value={formData.address2}
                  onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                    County (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="County"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-gray-300 font-bold uppercase tracking-wider mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SW1A 1AA"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                    className="w-full bg-[#0a0b0e] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-[#11141c] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>2. Payment via PayPal</span>
              </h2>
              <span className="text-xs text-emerald-400 font-bold">256-Bit SSL Encrypted</span>
            </div>

            <p className="text-xs text-gray-400">
              Pay securely using your PayPal balance, connected bank account, or debit/credit card. Funds are processed immediately without Shopify hold-ups.
            </p>

            {/* PayPal Button / Direct Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => executePayment()}
                disabled={isProcessing}
                className="w-full bg-[#ffc439] hover:bg-[#f4bb34] active:bg-[#e0ac30] text-[#003087] font-black text-sm uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all font-display tracking-wider disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#003087]" />
                    <span>Processing Order & Sending to Inkthreadable...</span>
                  </>
                ) : (
                  <>
                    <span className="italic font-bold text-lg font-serif">PayPal</span>
                    <span className="text-black font-extrabold text-xs ml-1">Express Checkout</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 mt-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Eligible for PayPal Buyer Protection on full purchase amount</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#11141c] border border-gray-800 rounded-2xl p-6 space-y-4 sticky top-28">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            <div className="divide-y divide-gray-800/60 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex gap-3">
                  <div className="w-14 h-14 bg-black rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• ${item.color}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-white">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tracked UK Delivery</span>
                <span className="font-semibold text-white">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-bold uppercase">FREE</span> : `£${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-800 pt-2 flex justify-between text-base font-extrabold text-white">
                <span>Total Due</span>
                <span className="text-amber-400 font-display text-lg">£{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-[11px] text-gray-400">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Inkthreadable Dispatch</span>
              </div>
              <p>Your order will be queued directly into our UK print facility once payment is completed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
