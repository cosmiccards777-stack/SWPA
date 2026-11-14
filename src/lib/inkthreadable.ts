/**
 * Inkthreadable API Client
 * Automatically pushes confirmed orders directly into the customer's Inkthreadable account.
 */

export interface InkthreadableCustomerShipping {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  county?: string;
  postcode: string;
  countryCode: string;
  phone?: string;
  email: string;
}

export interface InkthreadableOrderItem {
  sku: string;
  quantity: number;
  title?: string;
  size?: string | null;
  color?: string | null;
}

export interface SubmitOrderParams {
  orderId: string;
  shipping: InkthreadableCustomerShipping;
  items: InkthreadableOrderItem[];
}

export async function submitOrderToInkthreadable(params: SubmitOrderParams) {
  const appId = process.env.INKTHREADABLE_APP_ID;
  const apiKey = process.env.INKTHREADABLE_API_KEY;

  console.log(`[Inkthreadable] Submitting Order ${params.orderId}...`);

  // Handle mock mode if credentials are not yet set
  if (!appId || !apiKey || appId === 'test_inkthreadable_app_id') {
    console.log('[Inkthreadable DEV MODE] Order simulated successfully:', {
      orderId: params.orderId,
      items: params.items.length,
      destination: `${params.shipping.city}, ${params.shipping.postcode}`,
    });
    return {
      success: true,
      mode: 'mock',
      inkthreadableOrderId: `INK-MOCK-${Date.now()}`,
      message: 'Dev simulated Inkthreadable submission (Provide real API keys in .env.local for production fulfillment)',
    };
  }

  // Inkthreadable v1 Order creation payload
  const payload = {
    order: {
      external_id: params.orderId,
      shipping_name: params.shipping.fullName,
      shipping_address_1: params.shipping.address1,
      shipping_address_2: params.shipping.address2 || '',
      shipping_city: params.shipping.city,
      shipping_county: params.shipping.county || '',
      shipping_postcode: params.shipping.postcode,
      shipping_country: params.shipping.countryCode || 'GB',
      shipping_phone: params.shipping.phone || '',
      shipping_email: params.shipping.email,
      shipping_service: 'standard', // or 'tracked' depending on inkthreadable setup
      items: params.items.map((item) => ({
        sku: item.sku,
        quantity: item.quantity,
      })),
    },
  };

  try {
    const res = await fetch('https://www.inkthreadable.co.uk/api/orders', {
      method: 'POST',
      headers: {
        'X-App-Id': appId,
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[Inkthreadable Error Response]', data);
      throw new Error(data.message || data.error || 'Failed to place order in Inkthreadable');
    }

    return {
      success: true,
      mode: 'live',
      inkthreadableOrderId: data.order?.id || data.id,
      data,
    };
  } catch (error: any) {
    console.error('[Inkthreadable API Exception]', error);
    return {
      success: false,
      error: error.message || 'Unknown network error connecting to Inkthreadable API',
    };
  }
}
