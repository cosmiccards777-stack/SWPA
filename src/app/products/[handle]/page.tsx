'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductByHandle, ProductVariant } from '@/data/products';
import { useCart } from '@/context/CartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.featuredImage);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Extract unique options
  const colorOption = product.options.find((o) => o.name.toLowerCase().includes('colo'));
  const sizeOption = product.options.find((o) => o.name.toLowerCase().includes('size'));

  const availableColors = colorOption?.values || [];
  const availableSizes = sizeOption?.values || [];

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0] || (product.variants[0]?.option1 ?? '')
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes[0] || (product.variants[0]?.option2 ?? '')
  );

  // Match the active variant
  const activeVariant: ProductVariant = useMemo(() => {
    let match = product.variants.find((v) => {
      const matchColor = !colorOption || v.option1 === selectedColor || v.option2 === selectedColor;
      const matchSize = !sizeOption || v.option1 === selectedSize || v.option2 === selectedSize;
      return matchColor && matchSize;
    });

    return match || product.variants[0];
  }, [product, selectedColor, selectedSize, colorOption, sizeOption]);

  const price = activeVariant?.price || product.startingPrice;

  const handleAddToCart = (openDrawer = true) => {
    addToCart(
      {
        productId: product.id,
        variantId: activeVariant.id,
        title: product.title,
        handle: product.handle,
        price: parseFloat(price),
        quantity: quantity,
        sku: activeVariant.sku || 'SWPA-SKU',
        size: selectedSize || null,
        color: selectedColor || null,
        image: activeVariant.featured_image?.src || selectedImage,
      },
      openDrawer
    );

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#737981] mb-8 font-medium">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/#${product.product_type.toLowerCase()}`} className="hover:text-white transition-colors">
          {product.product_type}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#c5c9cf] line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square w-full rounded-xl bg-[#08090a] border border-[#2b2e33] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  className={`w-20 h-20 rounded-lg bg-[#08090a] border overflow-hidden p-1 flex-shrink-0 transition-all ${
                    selectedImage === img.src
                      ? 'border-white ring-1 ring-white'
                      : 'border-[#2b2e33] hover:border-gray-500'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt || product.title}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-bold text-[#737981] uppercase tracking-wider mb-1">
              {product.vendor || 'SWPA Merch'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-display leading-tight">
              {product.title}
            </h1>

            {/* Price display */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white font-display">
                £{price}
              </span>
              <span className="text-xs text-[#737981]">
                Tax included.
              </span>
            </div>
          </div>

          {/* Color Selector */}
          {availableColors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#1d1f22]">
              <div className="text-xs font-bold text-[#c5c9cf] uppercase tracking-wider">
                Colour: <span className="text-white font-normal">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                      selectedColor === col
                        ? 'bg-white text-black'
                        : 'bg-[#181a1b] text-gray-300 border border-[#2b2e33] hover:border-gray-500'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {availableSizes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#1d1f22]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#c5c9cf] uppercase tracking-wider">
                  Size: <span className="text-white font-normal">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#a7adb5] hover:text-white underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[44px] px-3.5 py-2 rounded text-xs font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-white text-black font-black'
                        : 'bg-[#181a1b] text-gray-300 border border-[#2b2e33] hover:border-gray-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2 pt-2 border-t border-[#1d1f22]">
            <span className="text-xs font-bold text-[#c5c9cf] uppercase tracking-wider">Quantity</span>
            <div className="flex items-center border border-[#3b3f46] bg-[#101113] rounded w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-gray-300 hover:text-white font-bold"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-gray-300 hover:text-white font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4">
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full bg-[#24272b] hover:bg-[#32363c] border border-[#d7d9dd] text-white font-bold uppercase tracking-wider py-3.5 rounded text-xs transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedAnimation ? 'Added to bag ✓' : 'Add to bag'}</span>
            </button>

            <Link
              href="/checkout"
              onClick={() => handleAddToCart(false)}
              className="w-full bg-[#ffc439] hover:bg-[#f4bb34] text-[#003087] font-black uppercase tracking-wider py-3.5 rounded text-xs flex items-center justify-center gap-2 transition-all shadow"
            >
              <span className="italic font-bold font-serif text-sm">PayPal</span>
              <span>Express Checkout</span>
            </Link>
          </div>

          {/* Reassurance */}
          <div className="border border-[#23262a] rounded-lg p-3.5 bg-[#0e1013] space-y-2 text-xs text-[#a7adb5]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white flex-shrink-0" />
              <span>Automated UK fulfillment direct from Inkthreadable UK</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Protected with PayPal Buyer Protection</span>
            </div>
          </div>

          {/* Description */}
          {product.body_html && (
            <div className="pt-4 border-t border-[#1d1f22] space-y-2 text-xs text-[#888e96] leading-relaxed">
              <h3 className="font-bold text-white uppercase text-xs">Description</h3>
              <div
                className="prose prose-invert prose-xs max-w-none text-[#a7adb5]"
                dangerouslySetInnerHTML={{ __html: product.body_html }}
              />
            </div>
          )}
        </div>
      </div>

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productType={product.product_type}
      />
    </div>
  );
}
