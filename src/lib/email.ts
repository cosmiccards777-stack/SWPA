// Edge-native Resend Client (Direct REST API, 100% Edge compatible with 0 heavy node dependencies)

interface OrderConfirmationEmailParams {
  to: string;
  customerName: string;
  orderNumber: string;
  total: number | string;
  shippingAddress: {
    address1: string;
    city: string;
    postcode: string;
  };
  items: Array<{
    title: string;
    size?: string | null;
    color?: string | null;
    quantity: number;
    price: number | string;
  }>;
}

interface DispatchEmailParams {
  to: string;
  customerName: string;
  orderNumber: string;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

async function sendEmailViaResendRest(params: {
  to: string[];
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_test') {
    console.log('[Email Simulated] RESEND_API_KEY not configured.');
    return { success: true, simulated: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SWPA Official Store <sales@swpamerch.uk>',
      to: params.to,
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('[Resend REST API Error]', res.status, errorText);
    return { success: false, error: errorText };
  }

  const data = await res.json();
  return { success: true, data };
}

/**
 * Sends official Order Confirmation Email directly after PayPal payment capture
 */
export async function sendOrderConfirmationEmail(params: OrderConfirmationEmailParams) {
  const itemsHtml = params.items
    .map(
      (item) => `
        <tr style="border-bottom: 1px solid #2d3137;">
          <td style="padding: 12px 0; color: #ffffff; font-size: 14px;">
            <strong>${item.title}</strong>
            ${item.size || item.color ? `<br><span style="color: #9ca3af; font-size: 12px;">${[item.color, item.size].filter(Boolean).join(' / ')}</span>` : ''}
          </td>
          <td style="padding: 12px 0; text-align: center; color: #ffffff; font-size: 14px;">
            ${item.quantity}
          </td>
          <td style="padding: 12px 0; text-align: right; color: #ffffff; font-size: 14px; font-weight: bold;">
            £${(Number(item.price) * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation #${params.orderNumber}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #121418; border: 1px solid #282c34; border-radius: 12px; overflow: hidden; padding: 32px;">
          
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #282c34;">
            <h1 style="font-size: 28px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin: 0 0 6px 0; text-transform: uppercase;">SWPA MERCH</h1>
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Official South West Patriots Alliance Apparel</p>
          </div>

          <div style="padding: 24px 0;">
            <span style="display: inline-block; background-color: rgba(16, 185, 129, 0.15); color: #10b981; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
              Payment Verified ✓
            </span>
            <h2 style="font-size: 22px; color: #ffffff; margin: 0 0 12px 0;">Thank you for your order, ${params.customerName}!</h2>
            <p style="color: #d1d5db; font-size: 14px; line-height: 1.6; margin: 0;">
              Your order <strong style="color: #ffffff;">#${params.orderNumber}</strong> has been received and securely paid via PayPal. Your gear is now registered for premium UK printing and tracked dispatch.
            </p>
          </div>

          <div style="background-color: #0d0e11; border: 1px solid #23272f; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 13px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid #2d3137; text-align: left; color: #9ca3af; font-size: 11px; text-transform: uppercase;">
                  <th style="padding-bottom: 8px;">Item</th>
                  <th style="padding-bottom: 8px; text-align: center;">Qty</th>
                  <th style="padding-bottom: 8px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="border-top: 1px solid #2d3137; margin-top: 16px; padding-top: 16px; display: flex; justify-content: space-between; text-align: right;">
              <span style="font-size: 16px; font-weight: 700; color: #ffffff;">Total Paid:</span>
              <span style="font-size: 20px; font-weight: 900; color: #ffffff; margin-left: auto;">£${Number(params.total).toFixed(2)}</span>
            </div>
          </div>

          <div style="background-color: #0d0e11; border: 1px solid #23272f; border-radius: 8px; padding: 16px; margin-bottom: 28px; font-size: 13px;">
            <strong style="color: #ffffff; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Delivery Address:</strong>
            <span style="color: #d1d5db;">${params.shippingAddress.address1}, ${params.shippingAddress.city}, ${params.shippingAddress.postcode}</span>
          </div>

          <div style="text-align: center; padding-top: 12px; border-top: 1px solid #282c34; color: #6b7280; font-size: 11px;">
            <p style="margin: 0 0 4px 0;">Questions? Reply directly to this email: <a href="mailto:sales@swpamerch.uk" style="color: #9ca3af;">sales@swpamerch.uk</a></p>
            <p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Stand With Steel • swpamerch.uk</p>
          </div>

        </div>
      </body>
    </html>
  `;

  return sendEmailViaResendRest({
    to: [params.to],
    subject: `Order Confirmed: #${params.orderNumber}`,
    html: html,
  });
}

/**
 * Sends official Dispatch & Tracking Email when Inkthreadable ships
 */
export async function sendDispatchEmail(params: DispatchEmailParams) {
  const trackingLink = params.trackingUrl || `https://www.royalmail.com/track-your-item#/tracking-results/${params.trackingNumber || ''}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your SWPA gear is on its way!</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #121418; border: 1px solid #282c34; border-radius: 12px; overflow: hidden; padding: 32px;">
          
          <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #282c34;">
            <h1 style="font-size: 28px; font-weight: 900; letter-spacing: 2px; color: #ffffff; margin: 0 0 6px 0; text-transform: uppercase;">SWPA MERCH</h1>
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Official South West Patriots Alliance Apparel</p>
          </div>

          <div style="padding: 24px 0; text-align: center;">
            <span style="display: inline-block; background-color: rgba(0, 112, 186, 0.2); color: #38bdf8; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px;">
              Dispatched &amp; Tracked 🚚
            </span>
            <h2 style="font-size: 24px; color: #ffffff; margin: 0 0 12px 0;">Your SWPA gear is on its way!</h2>
            <p style="color: #d1d5db; font-size: 15px; line-height: 1.6; margin: 0 auto; max-width: 480px;">
              Great news, ${params.customerName}! Your order <strong style="color: #ffffff;">#${params.orderNumber}</strong> has been printed, quality-checked, and dispatched via ${params.carrier || 'Royal Mail Tracked'}.
            </p>
          </div>

          <div style="background-color: #0d0e11; border: 1px solid #23272f; border-radius: 8px; padding: 24px; text-align: center; margin: 20px 0 28px 0;">
            ${params.trackingNumber ? `
              <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0;">Tracking Number</p>
              <p style="color: #ffffff; font-size: 18px; font-weight: 800; font-family: monospace; letter-spacing: 1px; margin: 0 0 20px 0;">${params.trackingNumber}</p>
            ` : ''}

            <a href="${trackingLink}" style="display: inline-block; background-color: #ffffff; color: #000000; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 9999px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">
              Track here: [Royal Mail Link]
            </a>
          </div>

          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #282c34; color: #6b7280; font-size: 11px;">
            <p style="margin: 0 0 4px 0;">Need help with your parcel? Reply to <a href="mailto:sales@swpamerch.uk" style="color: #9ca3af;">sales@swpamerch.uk</a></p>
            <p style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Stand With Steel • swpamerch.uk</p>
          </div>

        </div>
      </body>
    </html>
  `;

  return sendEmailViaResendRest({
    to: [params.to],
    subject: `Your SWPA gear is on its way! #${params.orderNumber}`,
    html: html,
  });
}
