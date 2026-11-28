import { NextResponse } from 'next/server';
import { sendDispatchEmail } from '@/lib/email';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[Inkthreadable Webhook Received]:', JSON.stringify(payload, null, 2));

    // Inkthreadable sends updates like status='dispatched' or 'shipped', trackingNumber under shipping, etc.
    const orderId = payload.external_id || payload.order?.external_id || payload.order_id || payload.order?.id || payload.id;
    const trackingNumber =
      payload.tracking_number ||
      payload.trackingNumber ||
      payload.tracking ||
      payload.shipping?.trackingNumber ||
      payload.order?.shipping?.trackingNumber ||
      payload.order?.tracking_number;
    const trackingUrl =
      payload.tracking_url ||
      payload.trackingUrl ||
      payload.tracking_link ||
      payload.shipping?.trackingUrl ||
      payload.order?.shipping?.trackingUrl ||
      payload.order?.tracking_url;
    const carrier =
      payload.carrier ||
      payload.shipping_service ||
      payload.shipping?.shippingMethod ||
      payload.order?.shipping?.shippingMethod ||
      'Royal Mail Tracked';
    const customerEmail =
      payload.shipping_email ||
      payload.email ||
      payload.shipping_address?.email ||
      payload.order?.shipping_address?.email;
    const customerName =
      payload.shipping_name ||
      payload.name ||
      payload.shipping_address?.firstName ||
      payload.order?.shipping_address?.firstName ||
      'Valued Supporter';
    const status = String(payload.status || payload.event || payload.order?.status || '').toLowerCase();

    console.log(`Order ${orderId} status: ${status}. Tracking: ${trackingNumber}`);

    // If order is dispatched or shipped, send official customer tracking email
    if ((status.includes('ship') || status.includes('dispatch')) && customerEmail) {
      await sendDispatchEmail({
        to: customerEmail,
        customerName: customerName,
        orderNumber: String(orderId).replace('SWPA-', ''),
        carrier: carrier,
        trackingNumber: trackingNumber,
        trackingUrl: trackingUrl,
      });
      console.log(`[Dispatch Email Sent] Order ${orderId} to ${customerEmail}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Inkthreadable Webhook Error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
