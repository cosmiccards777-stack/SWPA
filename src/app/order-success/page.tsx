'use client';

export const runtime = 'edge';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, AlertCircle, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // PayPal Order ID
  const { clearCart } = useCart();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const captureAttempted = useRef(false);

  useEffect(() => {
    // If we already have a confirmed order in storage
    const existingOrder = sessionStorage.getItem('swpa_latest_order') || localStorage.getItem('swpa_latest_order');

    if (!token) {
      if (existingOrder) {
        setOrder(JSON.parse(existingOrder));
        setLoading(false);
      } else {
        setError('No active order found. Please return to the store.');
        setLoading(false);
      }
      return;
    }

    if (captureAttempted.current) return;
    captureAttempted.current = true;

    async function completeOrder() {
      try {
        const pendingRaw = sessionStorage.getItem('swpa_pending_order') || localStorage.getItem('swpa_pending_order');
        if (!pendingRaw) {
          if (existingOrder) {
            setOrder(JSON.parse(existingOrder));
            setLoading(false);
            return;
          }
          throw new Error('Order session expired. If your payment was completed on PayPal, your order is being processed.');
        }

        const pending = JSON.parse(pendingRaw);

        // Call server to capture payment and execute server-side verification
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderID: token,
            customerInfo: pending.customer,
            cartItems: pending.items,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to complete payment confirmation');
        }

        const finalOrder = {
          orderNumber: data.orderNumber || `SWPA-${(token || Date.now().toString()).slice(-8)}`,
          customer: pending.customer,
          items: pending.items,
          total: pending.totalPrice,
          fulfillment: data.fulfillment,
        };

        // Clear cart and clean up pending storage
        clearCart();
        sessionStorage.removeItem('swpa_pending_order');
        try {
          localStorage.removeItem('swpa_pending_order');
          localStorage.setItem('swpa_latest_order', JSON.stringify(finalOrder));
        } catch {}
        sessionStorage.setItem('swpa_latest_order', JSON.stringify(finalOrder));

        setOrder(finalOrder);
        setLoading(false);
      } catch (err: any) {
        console.error('Order completion error:', err);
        setError(err.message || 'Payment confirmation failed.');
        setLoading(false);
      }
    }

    completeOrder();
  }, [token, clearCart]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#ffc439] animate-spin mx-auto" />
        <h2 className="text-3xl font-normal text-white uppercase font-bebas tracking-wider">
          CONFIRMING YOUR PAYMENT WITH PAYPAL...
        </h2>
        <p className="text-xs font-semibold text-[#c5c9cf]">
          Please do not refresh or close this window while we verify your payment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600 flex items-center justify-center text-red-400 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-normal text-white uppercase font-bebas tracking-wide">
            ORDER CONFIRMATION ISSUE
          </h2>
          <p className="text-xs text-red-300 max-w-md mx-auto">{error}</p>
        </div>
        <Link
          href="/checkout"
          className="inline-block bg-white text-black font-bebas text-2xl tracking-wider uppercase px-8 py-3 rounded hover:bg-gray-200 transition-colors"
        >
          RETURN TO CHECKOUT
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="bg-[#11141c] border-2 border-[#23262a] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-sans flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Payment Confirmed &amp; Verified</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-normal text-white uppercase font-bebas tracking-wide">
            THANK YOU FOR YOUR ORDER!
          </h1>
          <p className="text-xs sm:text-sm text-[#d1d5db] max-w-md mx-auto font-sans leading-relaxed">
            Your payment via PayPal was received and verified. Your order has been registered for production and tracked dispatch.
          </p>
        </div>

        {order && (
          <div className="border border-[#2d3137] rounded-xl bg-[#0a0b0e] p-6 text-left space-y-4 text-xs font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2d3137] pb-3 gap-2">
              <div>
                <span className="text-[#aeb2b8]">Order Reference:</span>{' '}
                <strong className="text-white text-sm font-mono">{order.orderNumber}</strong>
              </div>
              <div>
                <span className="text-[#aeb2b8]">Amount Paid:</span>{' '}
                <strong className="text-white text-sm font-bold">£{Number(order.total).toFixed(2)}</strong>
              </div>
            </div>

            {order.customer && (
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>Delivering To:</span>
                </h4>
                <p className="text-[#c5c9cf] leading-relaxed">
                  {order.customer.fullName}<br />
                  {order.customer.address1} {order.customer.address2 && `, ${order.customer.address2}`}<br />
                  {order.customer.city}, {order.customer.postcode}<br />
                  {order.customer.email}
                </p>
              </div>
            )}

            {order.items && (
              <div className="pt-2 border-t border-[#2d3137]">
                <h4 className="font-bold text-white uppercase tracking-wider mb-2">Items Ordered:</h4>
                <div className="space-y-2">
                  {order.items.map((it: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-[#c5c9cf]">
                      <span>
                        {it.title} {it.size && `(${it.size})`} × {it.quantity}
                      </span>
                      <span className="text-white font-bold">
                        £{(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black font-bebas text-2xl tracking-wider uppercase px-8 py-3 rounded hover:bg-gray-200 transition-colors shadow-lg"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-white font-bebas text-2xl">Confirming order...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
