import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Video, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useBoutique } from '../context/BoutiqueContext';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openVideoCallModal,
    setIsCheckoutOpen,
    setIsCartOpen,
  } = useBoutique();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0] || 'Standard';
  const wishlisted = isWishlisted(quickViewProduct.id);
  const discountPercent = Math.round(
    ((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100
  );

  const handleInstantBuy = () => {
    addToCart(quickViewProduct, currentSize, quantity);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, quantity);
    closeQuickView();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 text-stone-600 hover:text-rose-700 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-rose-50/40 p-6 flex flex-col justify-center items-center relative">
            <div className="w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-rose-100 bg-white shadow-sm relative">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {quickViewProduct.isBestseller && (
                <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase bg-rose-800 text-rose-50 px-2.5 py-1 rounded-md shadow-sm">
                  Bestseller
                </span>
              )}
            </div>

            {/* Video Call Highlight Box */}
            <div className="w-full mt-4 p-3 bg-white rounded-xl border border-rose-200/80 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-xs text-stone-700 font-medium">
                  Want to see this fabric live before buying?
                </span>
              </div>
              <button
                onClick={() => {
                  closeQuickView();
                  openVideoCallModal(quickViewProduct);
                }}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline whitespace-nowrap"
              >
                Book Live Call
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Unboxed Metadata Line */}
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
                <span>{quickViewProduct.category}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{quickViewProduct.origin}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-semibold text-stone-800 tabular-nums">
                  {quickViewProduct.rating} / 5.0
                </span>
                <span className="text-stone-400">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>

              {/* Price Block */}
              <div className="pt-1 pb-2 border-b border-rose-100 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-rose-950 tabular-nums">
                  {formatPrice(quickViewProduct.price)}
                </span>
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Save {discountPercent}%
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Fabric & Craft Specification */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                <div>
                  <span className="text-stone-500 block">Pure Fabric:</span>
                  <span className="font-semibold text-stone-800">{quickViewProduct.fabric}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Artisanal Craft:</span>
                  <span className="font-semibold text-stone-800">{quickViewProduct.craft}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                  <span>Select Size:</span>
                  <span className="text-rose-700 font-normal">Need custom tailoring? Available on request</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        currentSize === sz
                          ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-rose-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 mt-4 border-t border-rose-100 space-y-2.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label="Toggle wishlist"
                  className={`p-3 border rounded-xl transition-colors ${
                    wishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleInstantBuy}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl transition-all"
              >
                Buy Now &amp; Quick Checkout
              </button>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-stone-500 text-center">
                <span className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-rose-600" /> Worldwide Courier
                </span>
                <span className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> 100% Authentic
                </span>
                <span className="flex items-center justify-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-rose-600" /> Easy Exchange
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
