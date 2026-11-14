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
  Check,
  ShoppingBag,
  ArrowRight,
  Flame,
  ChevronRight,
  Sparkles,
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
  const isHoodie = product.product_type.toLowerCase().includes('hoodie');

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
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-medium">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Store
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/#${product.product_type.toLowerCase()}`} className="hover:text-amber-400 transition-colors">
          {product.product_type}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-200 line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] sm:aspect-square w-full rounded-3xl bg-[#0e1017] border border-[#1f242e] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {isHoodie && (
                <span className="bg-amber-400 text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-black" />
                  Official Patrol Hoodie
                </span>
              )}
              <span className="bg-black/75 backdrop-blur-md text-gray-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border border-white/10">
                UK Fulfilled
              </span>
            </div>

            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.src)}
                  className={`w-20 h-20 rounded-xl bg-[#0e1017] border overflow-hidden p-1 flex-shrink-0 transition-all ${
                    selectedImage === img.src
                      ? 'border-amber-400 ring-2 ring-amber-400/20'
                      : 'border-gray-800 hover:border-gray-700'
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
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{product.product_type}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-display leading-tight">
              {product.title}
            </h1>

            {/* Price display */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-amber-400 font-display">
                £{price}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                (Includes VAT & Direct UK Fulfillment)
              </span>
            </div>
          </div>

          {/* Color Selector */}
          {availableColors.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-gray-800">
              <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Select Color: <span className="text-amber-400">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedColor === col
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20 font-extrabold'
                        : 'bg-[#12141c] text-gray-300 border border-gray-800 hover:border-gray-700'
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
            <div className="space-y-2.5 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Select Size: <span className="text-amber-400">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                        : 'bg-[#12141c] text-gray-300 border border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="space-y-2 pt-2 border-t border-gray-800">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Quantity</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-700 bg-gray-900 rounded-xl px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-gray-400 hover:text-white font-bold"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-gray-400 hover:text-white font-bold"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-gray-400">
                Total: <strong className="text-white">£{(parseFloat(price) * quantity).toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => handleAddToCart(true)}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:brightness-110 text-black font-black uppercase tracking-wider py-4 rounded-xl text-sm font-display flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{addedAnimation ? 'Added to Bag ✓' : 'Add to Bag'}</span>
            </button>

            <Link
              href="/checkout"
              onClick={() => handleAddToCart(false)}
              className="w-full bg-[#1b1e2a] hover:bg-[#232838] border border-gray-700 text-white font-bold uppercase tracking-wider py-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all font-display"
            >
              <span>Instant Checkout with PayPal</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="bg-[#0e1017] border border-[#1f242e] rounded-2xl p-4 space-y-3 text-xs text-gray-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Fast UK Dispatch — Tracked direct from Inkthreadable UK</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Secure Checkout with PayPal Buyer Protection</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Guaranteed Quality & Heavyweight Garment Construction</span>
            </div>
          </div>

          {/* Description */}
          {product.body_html && (
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Product Specifications</h3>
              <div
                className="text-xs text-gray-400 leading-relaxed space-y-2 prose prose-invert prose-xs max-w-none"
                dangerouslySetInnerHTML={{ __html: product.body_html }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productType={product.product_type}
      />
    </div>
  );
}
