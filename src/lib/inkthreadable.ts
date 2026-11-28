/**
 * Inkthreadable Official API Client (POST /api/orders.php with SHA-1 Signature)
 * Edge-runtime compatible using Web Crypto API (crypto.subtle).
 * All 300 DPI print masters hosted permanently on https://assets.swpamerch.uk (Cloudflare R2).
 */

const R2_BASE = 'https://assets.swpamerch.uk';

export const PRODUCT_DESIGN_MAP: Record<string, { front?: string; back?: string }> = {
  // Hoodies
  'original-swpa-night-patrol-hoodie': {
    front: `${R2_BASE}/7033-7983-front.png`,
    back: `${R2_BASE}/7033-7983-back.png`,
  },
  'awdis-college-hoodie-7691-7691': {
    front: `${R2_BASE}/7691-7691-front.png`,
    back: `${R2_BASE}/7691-7691-back.png`,
  },
  'awdis-college-hoodie-swpa-womens-night-patrol-hoodie': {
    front: `${R2_BASE}/swpa-womens-night-patrol-hoodie-front.png`,
    back: `${R2_BASE}/swpa-womens-night-patrol-hoodie-back.png`,
  },
  'awdis-college-hoodie-black-night-patrol-hoodie-mens': {
    front: `${R2_BASE}/black-night-patrol-hoodie-mens-front.png`,
    back: `${R2_BASE}/black-night-patrol-hoodie-mens-back.png`,
  },
  'swpa-classic-pullover-hoodie': {
    front: `${R2_BASE}/7033-7039-front.png`,
    back: `${R2_BASE}/7033-7039-back.png`,
  },
  'swpa-printed-zip-up-hoodie': {
    front: `${R2_BASE}/7033-7039-front.png`,
    back: `${R2_BASE}/7033-7039-back.png`,
  },

  // Sweatshirts
  'awdis-sweatshirt-7033-7186': {
    front: `${R2_BASE}/7033-7033-front.png`,
    back: `${R2_BASE}/7033-7033-back.png`,
  },
  'awdis-sweatshirt-7033-7185': {
    front: `${R2_BASE}/7033-7185-front.png`,
    back: `${R2_BASE}/7033-7185-back.png`,
  },

  // Tees & Polos
  'swpa-womens-embroidered-polo-shirt-black-pink': {
    front: `${R2_BASE}/7691-7691-front.png`,
  },
  'swpa-womens-embroidered-polo-shirt': {
    front: `${R2_BASE}/7033-7033-front.png`,
  },
  'swpa-classic-t-shirt': {
    front: `${R2_BASE}/7033-7033-front.png`,
    back: `${R2_BASE}/7033-7033-back.png`,
  },
  'swpa-womens-fitted-t-shirt': {
    front: `${R2_BASE}/7691-7691-front.png`,
    back: `${R2_BASE}/7691-7691-back.png`,
  },
  'swpa-classic-polo-shirt': {
    front: `${R2_BASE}/7033-7033-front.png`,
  },

  // Joggers
  'swpa-embroidered-cuffed-joggers': {
    front: `${R2_BASE}/embroidered-logo-tracksuit-bottoms-back.png`,
  },
  'swpa-printed-cuffed-joggers': {
    front: `${R2_BASE}/swpa-printed-tracksuit-bottoms-front-right-leg.png`,
  },
  'swpa-logo-joggers': {
    front: `${R2_BASE}/embroidered-logo-tracksuit-bottoms-back.png`,
  },
  'swpa-leg-joggers': {
    front: `${R2_BASE}/swpa-printed-tracksuit-bottoms-front-right-leg.png`,
  },

  // Accessories & Stickers
  'swpa-bag-for-life-long-handles': {
    front: `${R2_BASE}/embroidered-logo-tracksuit-bottoms-back.png`,
  },
  'swpa-bottle-opener-keyring': {
    front: `${R2_BASE}/swpa-printed-tracksuit-bottoms-front-right-leg.png`,
  },
  'swpa-weatherproof-car-sticker-3-4in': {
    front: `${R2_BASE}/sticker-classic-crest.png`,
  },
  'swpa-stop-the-boats-rectangular-car-sticker': {
    front: `${R2_BASE}/sticker-stop-the-boats-rect.png`,
  },
  'swpa-whose-streets-our-streets-car-sticker': {
    front: `${R2_BASE}/sticker-whose-streets-round.png`,
  },
  'swpa-stop-the-boats-round-car-sticker': {
    front: `${R2_BASE}/sticker-stop-the-boats-round.png`,
  },
};

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
  handle?: string;
  sku: string;
  quantity: number;
  title?: string;
  size?: string | null;
  color?: string | null;
  price?: number | string;
  designs?: {
    front?: string;
    back?: string;
  };
}

export interface SubmitOrderParams {
  orderId: string;
  shipping: InkthreadableCustomerShipping;
  items: InkthreadableOrderItem[];
}

// Known Inkthreadable blank garment / accessory SKU prefixes
const INKTHREADABLE_SKU_PREFIXES = [
  'JH001',   // AWDis College Hoodie
  'JH030',   // AWDis Sweatshirt
  'STPW977', // Stanley/Stella Women's Polo
  'STBU185', // Stanley/Stella Cuffed Joggers
  'W101',    // Westford Mill Bag for Life
  'BOTTLE',  // Bottle Opener Keyring
  'BB900',   // Beechfield Morf Snood
  'NN500',   // Onna Men's Relentless Stretch Cargo Pants
  'NN600',   // Onna Women's Relentless Stretch Cargo Pants
  'ONNA',    // Onna Stretch Cargo Pants
  'STICKER', // Inkthreadable Core Vinyl Stickers
];

export function isInkthreadableSku(sku: string | null | undefined): boolean {
  if (!sku) return false;
  const upper = sku.toUpperCase().trim();
  return INKTHREADABLE_SKU_PREFIXES.some((prefix) => upper.startsWith(prefix));
}

async function sha1Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function submitOrderToInkthreadable(params: SubmitOrderParams) {
  const appId = (process.env.INKTHREADABLE_APP_ID || '').trim();
  const apiKey = (process.env.INKTHREADABLE_API_KEY || '').trim();

  console.log(`[Inkthreadable] Preparing Order ${params.orderId}...`);

  // Split items into Inkthreadable-compatible vs manual fulfillment
  const inkItems = params.items.filter((item) => isInkthreadableSku(item.sku));
  const manualItems = params.items.filter((item) => !isInkthreadableSku(item.sku));

  if (inkItems.length === 0) {
    console.log(`[Inkthreadable] Order ${params.orderId} contains only manual fulfillment items. Skipping Inkthreadable API.`);
    return {
      success: true,
      mode: 'manual_only',
      inkthreadableOrderId: null,
      manualItemsCount: manualItems.length,
      message: 'All items require manual fulfillment (notified via sales@swpamerch.uk).',
    };
  }

  // Handle mock mode if credentials are not yet set
  if (!appId || !apiKey || appId === 'test_inkthreadable_app_id') {
    console.log('[Inkthreadable DEV MODE] Order simulated successfully:', {
      orderId: params.orderId,
      items: inkItems.length,
      destination: `${params.shipping.city}, ${params.shipping.postcode}`,
    });
    return {
      success: true,
      mode: 'mock',
      inkthreadableOrderId: `INK-MOCK-${Date.now()}`,
      manualItemsCount: manualItems.length,
      message: 'Dev simulated Inkthreadable submission',
    };
  }

  const nameParts = params.shipping.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || 'Customer';
  const lastName = nameParts.slice(1).join(' ') || '-';

  // Official Inkthreadable POST /api/orders.php JSON payload
  const payload = {
    brandName: 'SWPA Merch',
    external_id: params.orderId,
    shipping_address: {
      firstName,
      lastName,
      address1: params.shipping.address1,
      address2: params.shipping.address2 || '',
      city: params.shipping.city,
      county: params.shipping.county || '',
      country: params.shipping.countryCode === 'GB' ? 'United Kingdom' : params.shipping.countryCode,
      postcode: params.shipping.postcode,
      phone1: params.shipping.phone || '',
      email: params.shipping.email,
    },
    shipping: {
      shippingMethod: 'tracked',
    },
    items: inkItems.map((item) => {
      const resolvedDesigns = item.designs || (item.handle ? PRODUCT_DESIGN_MAP[item.handle] : undefined);
      return {
        pn: item.sku,
        quantity: item.quantity,
        ...(item.price ? { retailPrice: Number(item.price).toFixed(2) } : {}),
        ...(resolvedDesigns ? { designs: resolvedDesigns } : {}),
      };
    }),
  };

  const bodyString = JSON.stringify(payload);
  const signature = await sha1Hex(bodyString + apiKey);
  const url = `https://www.inkthreadable.co.uk/api/orders.php?AppId=${encodeURIComponent(appId)}&Signature=${signature}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: bodyString,
    });

    const responseText = await res.text();
    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    if (!res.ok || data?.error) {
      console.error('[Inkthreadable Error Response]', res.status, data);
      throw new Error(data?.error || data?.message || `Inkthreadable returned HTTP ${res.status}`);
    }

    return {
      success: true,
      mode: 'live',
      inkthreadableOrderId: data?.order?.id || data?.id || null,
      manualItemsCount: manualItems.length,
      data,
    };
  } catch (error: any) {
    console.error('[Inkthreadable API Exception]', error);
    return {
      success: false,
      mode: 'error',
      manualItemsCount: manualItems.length,
      error: error.message || 'Unknown network error connecting to Inkthreadable API',
    };
  }
}
