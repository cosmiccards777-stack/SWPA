'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('swpa_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="bg-[#11141c] border border-gray-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Payment Confirmed & Processed
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase font-display">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
            Your payment via PayPal was received successfully. Your order has been automatically transmitted to <strong className="text-white">Inkthreadable UK</strong> for production and dispatch.
          </p>
        </div>

        {order && (
          <div className="border border-gray-800 rounded-2xl bg-[#0a0b0e] p-6 text-left space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-3 gap-2">
              <div>
                <span className="text-gray-400">Order Reference:</span>{' '}
                <strong className="text-amber-400 text-sm font-mono">{order.orderNumber}</strong>
              </div>
              <div>
                <span className="text-gray-400">Amount Paid:</span>{' '}
                <strong className="text-white text-sm">£{Number(order.total).toFixed(2)}</strong>
              </div>
            </div>

            {order.customer && (
              <div>
                <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-1">Delivering To:</h4>
                <p className="text-gray-400 leading-relaxed">
                  {order.customer.fullName}<br />
                  {order.customer.address1} {order.customer.address2 && `, ${order.customer.address2}`}<br />
                  {order.customer.city}, {order.customer.postcode}<br />
                  {order.customer.email}
                </p>
              </div>
            )}

            {order.items && (
              <div className="pt-2 border-t border-gray-800">
                <h4 className="font-bold text-gray-300 uppercase tracking-wider mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((it: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-gray-300">
                      <span>
                        {it.quantity}x {it.title} {it.size && `(${it.size})`}
                      </span>
                      <span className="text-amber-400 font-bold">
                        £{(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs pt-2">
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white uppercase">Automated Fulfillment</h4>
              <p className="text-gray-400 text-[11px] mt-0.5">
                Garments are printed on-demand with Inkthreadable UK and dispatched in 2-4 business days.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white uppercase">PayPal Receipt Sent</h4>
              <p className="text-gray-400 text-[11px] mt-0.5">
                A full receipt has been emailed to you from PayPal confirming your transaction.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-400 text-black font-extrabold uppercase text-xs px-8 py-3.5 rounded-xl hover:bg-amber-300 transition-colors font-display tracking-wider"
          >
            <span>Back to Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
