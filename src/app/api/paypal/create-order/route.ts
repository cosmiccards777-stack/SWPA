import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';
import { PRODUCTS } from '@/data/products';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // SERVER-SIDE PRICE VALIDATION (prevents price tampering exploits)
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const quantity = Math.floor(Number(item.quantity));
      if (!quantity || quantity < 1 || quantity > 50) {
        return NextResponse.json({ error: 'Invalid item quantity' }, { status: 400 });
      }

      // Look up genuine product and variant in server catalog
      const product = PRODUCTS.find((p) => p.id === Number(item.productId));
      const variant = product?.variants.find((v) => v.id === Number(item.variantId));

      if (!product || !variant) {
        return NextResponse.json(
          { error: `Item "${item.title || 'unknown'}" could not be verified in store catalog` },
          { status: 400 }
        );
      }

      const canonicalPrice = parseFloat(variant.price);
      if (isNaN(canonicalPrice) || canonicalPrice <= 0) {
        return NextResponse.json({ error: 'Invalid product pricing' }, { status: 500 });
      }

      subtotal += canonicalPrice * quantity;

      validatedItems.push({
        name: `${product.title} - ${variant.title}`.substring(0, 127),
        unit_amount: canonicalPrice,
        quantity: quantity,
        sku: variant.sku || 'SWPA-ITEM',
      });
    }

    // Server-enforced shipping logic (£50 threshold for free delivery, otherwise £4.99)
    const shipping = subtotal >= 50.0 ? 0.0 : 4.99;

    // Detect site origin dynamically
    const host = req.headers.get('host') || 'swpamerch.uk';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = `${proto}://${host}`;

    const order = await createPayPalOrder({
      amount: subtotal,
      currency: 'GBP',
      items: validatedItems,
      shipping: shipping,
      origin: origin,
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error('PayPal create-order API error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
