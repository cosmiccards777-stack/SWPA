import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[Inkthreadable Webhook Received]:', JSON.stringify(payload, null, 2));

    // Inkthreadable sends updates like status='dispatched', tracking_number='...', tracking_url='...'
    const orderId = payload.order_id || payload.external_id;
    const trackingNumber = payload.tracking_number;
    const status = payload.status;

    console.log(`Order ${orderId} status updated to: ${status}. Tracking: ${trackingNumber}`);

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Inkthreadable Webhook Error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
