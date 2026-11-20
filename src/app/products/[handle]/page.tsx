'use client';

export const runtime = 'edge';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductByHandle, ProductVariant } from '@/data/products';
import { getCategory, CATEGORY_LABELS } from '@/data/collections';
import { useCart } from '@/context/CartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import {
  ShieldCheck,
  Truck,
  Ruler,
  ShoppingBag,
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
      <nav className="flex items-center gap-2 text-xs font-semibold text-[#c5c9cf] mb-8 uppercase font-sans">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/collections/${getCategory(product)}`} className="hover:text-white transition-colors">
          {CATEGORY_LABELS[getCategory(product)]}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-bold line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square w-full rounded-xl bg-[#0a0b0d] border-2 border-[#33373e] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
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
                  className={`w-20 h-20 rounded-lg bg-[#0a0b0d] border-2 overflow-hidden p-1 flex-shrink-0 transition-all ${
                    selectedImage === img.src
                      ? 'border-white ring-2 ring-white'
                      : 'border-[#33373e] hover:border-gray-400'
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
            <div className="text-xs font-bold text-[#c5c9cf] uppercase tracking-widest mb-1 font-sans">
              {product.vendor || 'SWPA Merch'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-normal text-white uppercase font-bebas leading-tight tracking-wide">
              {product.title}
            </h1>

            {/* Price display */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-normal text-white font-bebas tracking-wide">
                £{price}
              </span>
              <span className="text-xs font-semibold text-[#d1d5db] font-sans">
                Tax included. Direct UK Tracked Fulfillment.
              </span>
            </div>
          </div>

          {/* Color Selector */}
          {availableColors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#2d3137]">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                COLOUR: <span className="text-[#e5e7eb] font-normal">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 rounded text-sm font-bold uppercase transition-all font-sans ${
                      selectedColor === col
                        ? 'bg-white text-black font-extrabold'
                        : 'bg-[#181a1d] text-white border border-[#373c44] hover:border-white'
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
            <div className="space-y-2 pt-2 border-t border-[#2d3137]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                  SIZE: <span className="text-[#e5e7eb] font-normal">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs font-bold text-white hover:underline flex items-center gap-1 font-sans"
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
                    className={`min-w-[48px] px-4 py-2.5 rounded text-sm font-bold uppercase transition-all font-sans ${
                      selectedSize === sz
                        ? 'bg-white text-black font-black'
                        : 'bg-[#181a1d] text-white border border-[#373c44] hover:border-white'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2 pt-2 border-t border-[#2d3137]">
            <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">QUANTITY</span>
            <div className="flex items-center border border-[#454a52] bg-[#141618] rounded w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-white hover:bg-[#202326] font-bold text-sm"
              >
                -
              </button>
              <span className="px-4 text-sm font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-white hover:bg-[#202326] font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full bg-[#272b32] hover:bg-[#343942] border-2 border-white text-white font-bebas text-2xl tracking-wider uppercase py-3.5 rounded transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{addedAnimation ? 'ADDED TO CART ✓' : 'ADD TO CART'}</span>
            </button>

            <Link
              href="/checkout"
              onClick={() => handleAddToCart(false)}
              className="w-full bg-[#ffc439] hover:bg-[#f4bb34] text-[#003087] font-bebas text-2xl tracking-wider uppercase py-3.5 rounded flex items-center justify-center gap-2 transition-all shadow"
            >
              <span className="italic font-bold font-serif text-xl">PayPal</span>
              <span className="ml-1">EXPRESS CHECKOUT</span>
            </Link>
          </div>

          {/* Reassurance */}
          <div className="border border-[#33373e] rounded-lg p-4 bg-[#111316] space-y-2.5 text-xs text-[#ffffff] font-medium font-sans">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-white flex-shrink-0" />
              <span>Automated UK fulfillment direct from Inkthreadable UK</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Protected with PayPal Buyer Protection</span>
            </div>
          </div>

          {/* Description */}
          {product.body_html && (
            <div className="pt-4 border-t border-[#2d3137] space-y-2 text-sm text-[#ffffff] leading-relaxed font-sans">
              <h3 className="font-bebas text-2xl text-white uppercase tracking-wider">PRODUCT DESCRIPTION</h3>
              <div
                className="prose prose-invert max-w-none text-white font-medium"
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
