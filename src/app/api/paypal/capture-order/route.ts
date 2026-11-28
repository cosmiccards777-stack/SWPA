import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { submitOrderToInkthreadable } from '@/lib/inkthreadable';
import { PRODUCTS } from '@/data/products';
import { sendOrderConfirmationEmail, sendAdminOrderAlertEmail } from '@/lib/email';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderID, customerInfo, cartItems } = body;

    if (!orderID || typeof orderID !== 'string' || orderID.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid PayPal Order ID' }, { status: 400 });
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart items missing from capture payload' }, { status: 400 });
    }

    // 1. Calculate expected server-side total to prevent amount spoofing
    let expectedSubtotal = 0;
    const validatedFulfillmentItems = [];

    for (const item of cartItems) {
      const quantity = Math.floor(Number(item.quantity));
      if (!quantity || quantity < 1) {
        return NextResponse.json({ error: 'Invalid item quantity' }, { status: 400 });
      }

      const product = PRODUCTS.find((p) => p.id === Number(item.productId));
      const variant = product?.variants.find((v) => v.id === Number(item.variantId));

      if (!product || !variant) {
        return NextResponse.json({ error: 'Item verification failed' }, { status: 400 });
      }

      const canonicalPrice = parseFloat(variant.price);
      expectedSubtotal += canonicalPrice * quantity;

      const rawMockup = variant.featured_image?.src || product.featuredImage || '';
      const absoluteMockup = rawMockup.startsWith('/')
        ? `https://swpamerch.uk${rawMockup}`
        : rawMockup || undefined;

      validatedFulfillmentItems.push({
        handle: product.handle,
        sku: variant.sku || 'SWPA-ITEM',
        quantity: quantity,
        title: product.title,
        size: variant.option2 || variant.option1 || null,
        color: variant.option1 || null,
        price: canonicalPrice,
        mockup: absoluteMockup,
      });
    }

    const expectedShipping = expectedSubtotal >= 60.0 ? 0.0 : 4.99;
    const expectedTotal = (expectedSubtotal + expectedShipping).toFixed(2);

    // 2. Capture the payment directly with PayPal Orders v2 API
    const captureResult = await capturePayPalOrder(orderID.trim());

    // 3. Strict verification of PayPal capture status
    if (captureResult.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: `Payment not completed. Status from PayPal: ${captureResult.status}` },
        { status: 400 }
      );
    }

    // 4. Verify captured amount and currency
    const purchaseUnit = captureResult.purchase_units?.[0];
    const captureDetails = purchaseUnit?.payments?.captures?.[0];
    const capturedValue = captureDetails?.amount?.value || purchaseUnit?.amount?.value;
    const capturedCurrency = captureDetails?.amount?.currency_code || purchaseUnit?.amount?.currency_code;

    if (capturedCurrency !== 'GBP') {
      return NextResponse.json(
        { error: `Invalid currency. Expected GBP but received ${capturedCurrency}` },
        { status: 400 }
      );
    }

    // Enforce amount match (within 0.02 for penny rounding tolerance)
    if (Math.abs(parseFloat(capturedValue) - parseFloat(expectedTotal)) > 0.02) {
      console.error(
        `[SECURITY WARNING] Captured amount mismatch! PayPal captured £${capturedValue}, expected £${expectedTotal}`
      );
      return NextResponse.json(
        { error: 'Payment amount mismatch. Order flagged for review.' },
        { status: 400 }
      );
    }

    // 5. Extract customer shipping info (from customer form with PayPal fallback)
    const paypalShipping = purchaseUnit?.shipping;
    const shipping = {
      fullName: (customerInfo?.fullName || paypalShipping?.name?.full_name || 'Valued Customer').trim(),
      address1: (customerInfo?.address1 || paypalShipping?.address?.address_line_1 || '').trim(),
      address2: (customerInfo?.address2 || paypalShipping?.address?.address_line_2 || '').trim(),
      city: (customerInfo?.city || paypalShipping?.address?.admin_area_2 || '').trim(),
      county: (customerInfo?.county || paypalShipping?.address?.admin_area_1 || '').trim(),
      postcode: (customerInfo?.postcode || paypalShipping?.address?.postal_code || '').trim(),
      countryCode: (customerInfo?.countryCode || paypalShipping?.address?.country_code || 'GB').trim(),
      phone: (customerInfo?.phone || '').trim(),
      email: (customerInfo?.email || captureResult.payer?.email_address || '').trim(),
    };

    if (!shipping.address1 || !shipping.city || !shipping.postcode || !shipping.email) {
      return NextResponse.json({ error: 'Shipping details incomplete' }, { status: 400 });
    }

    // 6. Push verified order to Inkthreadable Print-on-Demand
    // SAFETY LOCK: ONLY submit real production orders to Inkthreadable if PayPal is in LIVE/PRODUCTION mode.
    // In Sandbox mode, we NEVER push to Inkthreadable so your client is never charged for testing.
    let fulfillmentResult: any = null;
    const generatedOrderNumber = `SWPA-${orderID.slice(-8)}`;
    const isPayPalLive = (process.env.PAYPAL_ENVIRONMENT || '').toLowerCase() === 'production' || (process.env.PAYPAL_ENVIRONMENT || '').toLowerCase() === 'live';

    if (isPayPalLive) {
      try {
        fulfillmentResult = await submitOrderToInkthreadable({
          orderId: `SWPA-${orderID}`,
          shipping,
          items: validatedFulfillmentItems,
        });
        console.log('[Auto-Fulfillment Success]', fulfillmentResult);
      } catch (fulfillErr) {
        console.error('[Auto-Fulfillment Error]', fulfillErr);
        fulfillmentResult = {
          success: false,
          error: String(fulfillErr),
        };
      }
    } else {
      console.log('[Sandbox Test Mode] PayPal is in Sandbox. Skipping Inkthreadable dispatch so no real money or orders are triggered.');
      fulfillmentResult = {
        success: true,
        mode: 'sandbox_simulation',
        message: 'Sandbox test completed. Inkthreadable production order skipped safely.',
      };
    }

    // 7. Fire official Order Confirmation Email from sales@swpamerch.uk
    try {
      await sendOrderConfirmationEmail({
        to: shipping.email,
        customerName: shipping.fullName,
        orderNumber: generatedOrderNumber,
        total: capturedValue,
        shippingAddress: {
          address1: shipping.address1,
          city: shipping.city,
          postcode: shipping.postcode,
        },
        items: cartItems.map((ci: any) => ({
          title: ci.title,
          size: ci.size,
          color: ci.color,
          quantity: ci.quantity,
          price: ci.price,
        })),
      });
    } catch (emailErr) {
      console.error('[Confirmation Email Error]', emailErr);
    }

    // 8. Fire instant New Sale Alert Email to store owner (sales@swpamerch.uk)
    try {
      const statusSummary = fulfillmentResult?.mode === 'live'
        ? `Submitted to Inkthreadable (Order ID: ${fulfillmentResult.inkthreadableOrderId || 'Accepted'})${fulfillmentResult.manualItemsCount ? ` + ${fulfillmentResult.manualItemsCount} manual item(s) to post` : ''}`
        : fulfillmentResult?.mode === 'manual_only'
          ? 'Manual fulfillment required (badges/stickers/patches — not sent to Inkthreadable)'
          : fulfillmentResult?.mode === 'sandbox_simulation'
            ? 'Sandbox test order (Inkthreadable skipped safely)'
            : `Attention needed: ${fulfillmentResult?.error || fulfillmentResult?.message || 'Check Inkthreadable'}`;

      await sendAdminOrderAlertEmail({
        orderNumber: generatedOrderNumber,
        total: capturedValue,
        customerName: shipping.fullName,
        customerEmail: shipping.email,
        customerPhone: shipping.phone,
        shippingAddress: {
          address1: shipping.address1,
          address2: shipping.address2,
          city: shipping.city,
          county: shipping.county,
          postcode: shipping.postcode,
        },
        items: cartItems.map((ci: any) => ({
          title: ci.title,
          sku: ci.sku,
          size: ci.size,
          color: ci.color,
          quantity: ci.quantity,
          price: ci.price,
        })),
        fulfillmentStatus: statusSummary,
      });
    } catch (adminEmailErr) {
      console.error('[Admin Alert Email Error]', adminEmailErr);
    }

    return NextResponse.json({
      success: true,
      capture: captureResult,
      fulfillment: fulfillmentResult,
      orderNumber: generatedOrderNumber,
    });
  } catch (err: any) {
    console.error('PayPal capture-order API error:', err);
    return NextResponse.json({ error: err.message || 'Payment capture failed' }, { status: 500 });
  }
}
