import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { submitOrderToInkthreadable } from '@/lib/inkthreadable';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderID, customerInfo, cartItems } = body;

    if (!orderID) {
      return NextResponse.json({ error: 'Missing PayPal Order ID' }, { status: 400 });
    }

    // 1. Capture the payment on PayPal
    const captureResult = await capturePayPalOrder(orderID);

    // 2. Extract shipping details (from PayPal capture or the form submitted by customer)
    const paypalShipping = captureResult.purchase_units?.[0]?.shipping;
    const shipping = {
      fullName:
        customerInfo?.fullName ||
        paypalShipping?.name?.full_name ||
        'Valued Customer',
      address1:
        customerInfo?.address1 ||
        paypalShipping?.address?.address_line_1 ||
        '10 Main Street',
      address2:
        customerInfo?.address2 ||
        paypalShipping?.address?.address_line_2 ||
        '',
      city:
        customerInfo?.city ||
        paypalShipping?.address?.admin_area_2 ||
        'London',
      county:
        customerInfo?.county ||
        paypalShipping?.address?.admin_area_1 ||
        '',
      postcode:
        customerInfo?.postcode ||
        paypalShipping?.address?.postal_code ||
        'SW1A 1AA',
      countryCode:
        customerInfo?.countryCode ||
        paypalShipping?.address?.country_code ||
        'GB',
      phone: customerInfo?.phone || '',
      email:
        customerInfo?.email ||
        captureResult.payer?.email_address ||
        'customer@example.com',
    };

    // 3. Format items for Inkthreadable
    const inkItems = (cartItems || []).map((item: any) => ({
      sku: item.sku || 'SWPA-HOODIE',
      quantity: Number(item.quantity) || 1,
      title: item.title,
      size: item.size,
      color: item.color,
    }));

    // 4. Automatically push order to Inkthreadable Print-on-Demand!
    let fulfillmentResult: any = null;
    try {
      fulfillmentResult = await submitOrderToInkthreadable({
        orderId: `SWPA-${orderID}`,
        shipping,
        items: inkItems,
      });
      console.log('[Auto-Fulfillment Success]', fulfillmentResult);
    } catch (fulfillErr) {
      console.error('[Auto-Fulfillment Error]', fulfillErr);
      // We still complete checkout even if webhook/API has an issue, so customer gets their confirmation
      fulfillmentResult = {
        success: false,
        error: String(fulfillErr),
      };
    }

    return NextResponse.json({
      success: true,
      capture: captureResult,
      fulfillment: fulfillmentResult,
      orderNumber: `SWPA-${orderID.slice(-8)}`,
    });
  } catch (err: any) {
    console.error('PayPal capture-order API error:', err);
    return NextResponse.json({ error: err.message || 'Payment capture failed' }, { status: 500 });
  }
}
