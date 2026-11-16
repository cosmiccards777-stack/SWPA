import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingFee } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.price) * Number(it.quantity),
      0
    );

    const shipping = Number(shippingFee) || 0;

    const order = await createPayPalOrder({
      amount: subtotal,
      currency: 'GBP',
      items: items.map((it: any) => ({
        name: it.title,
        unit_amount: Number(it.price),
        quantity: Number(it.quantity),
        sku: it.sku || 'SWPA-ITEM',
      })),
      shipping: shipping,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error('PayPal create-order API error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
