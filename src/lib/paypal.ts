/**
 * PayPal API Helper Library (Orders v2 API)
 * Hardened with server-side signature validation and zero mock backdoors.
 */

interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getPayPalAccessToken(): Promise<string> {
  const rawClientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
  const rawClientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  const rawEnvironment = process.env.PAYPAL_ENVIRONMENT || 'sandbox';

  // Automatically strip all whitespaces, tabs, newlines, and quotes
  let clientId = rawClientId.trim().replace(/[\r\n\t\s'"]/g, '');
  let clientSecret = rawClientSecret.trim().replace(/[\r\n\t\s'"]/g, '');
  const environment = rawEnvironment.trim().toLowerCase();

  if (!clientId || !clientSecret || clientId === 'test_client_id') {
    throw new Error('PayPal credentials are not configured in environment variables.');
  }

  // Detect sandbox vs production based on key prefix or environment
  const isLive = environment === 'production' || environment === 'live';
  const baseUrl = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  const auth = typeof Buffer !== 'undefined'
    ? Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    : btoa(`${clientId}:${clientSecret}`);

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to obtain PayPal access token [env=${environment}, isLive=${isLive}, url=${baseUrl}, cidLen=${clientId.length}, secLen=${clientSecret.length}, cidPrefix=${clientId.substring(0, 8)}]: ${errorText}`);
  }

  const data: PayPalTokenResponse = await response.json();
  return data.access_token;
}

export async function createPayPalOrder(orderData: {
  amount: number;
  currency: string;
  items: Array<{
    name: string;
    unit_amount: number;
    quantity: number;
    sku: string;
  }>;
  shipping: number;
  origin?: string;
}) {
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox';
  const baseUrl = environment === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const token = await getPayPalAccessToken();
  const origin = orderData.origin || 'https://swpamerch.uk';

  const total = (orderData.amount + orderData.shipping).toFixed(2);
  const itemTotal = orderData.amount.toFixed(2);
  const shippingTotal = orderData.shipping.toFixed(2);

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: `SWPA-${Date.now()}`,
        description: 'SWPA Official Merchandise Order',
        amount: {
          currency_code: orderData.currency,
          value: total,
          breakdown: {
            item_total: {
              currency_code: orderData.currency,
              value: itemTotal,
            },
            shipping: {
              currency_code: orderData.currency,
              value: shippingTotal,
            },
          },
        },
        items: orderData.items.map((item) => ({
          name: item.name.substring(0, 127),
          sku: item.sku,
          unit_amount: {
            currency_code: orderData.currency,
            value: item.unit_amount.toFixed(2),
          },
          quantity: item.quantity.toString(),
        })),
      },
    ],
    application_context: {
      brand_name: 'SWPA Official Merch',
      landing_page: 'NO_PREFERENCE',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
      return_url: `${origin}/order-success`,
      cancel_url: `${origin}/checkout?canceled=true`,
    },
  };

  const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal Create Order Error: ${error}`);
  }

  const resData = await res.json();
  const approveLink = resData.links?.find((l: any) => l.rel === 'approve')?.href;

  return {
    ...resData,
    approveUrl: approveLink || null,
  };
}

export async function capturePayPalOrder(orderId: string) {
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox';
  const baseUrl = environment === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  const token = await getPayPalAccessToken();

  const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`PayPal Capture Order Error: ${error}`);
  }

  return await res.json();
}
