import { NextResponse } from 'next/server';
import { sendDispatchEmail } from '@/lib/email';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[Inkthreadable Webhook Received]:', JSON.stringify(payload, null, 2));

    // Inkthreadable sends updates like status='dispatched' or 'shipped', tracking_number='...', etc.
    const orderId = payload.order_id || payload.external_id || payload.order?.external_id || payload.order?.id;
    const trackingNumber = payload.tracking_number || payload.tracking || payload.order?.tracking_number;
    const trackingUrl = payload.tracking_url || payload.tracking_link || payload.order?.tracking_url;
    const carrier = payload.carrier || payload.shipping_service || 'Royal Mail Tracked';
    const customerEmail = payload.shipping_email || payload.email || payload.order?.shipping_address?.email;
    const customerName = payload.shipping_name || payload.name || payload.order?.shipping_address?.firstName || 'Valued Supporter';
    const status = (payload.status || payload.event || '').toLowerCase();

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
