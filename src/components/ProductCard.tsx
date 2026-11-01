import React from 'react';
import { Heart, ShoppingBag, Eye, Video, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useBoutique } from '../context/BoutiqueContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openQuickView,
    openVideoCallModal,
  } = useBoutique();

  const wishlisted = isWishlisted(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article className="group bg-white rounded-2xl border border-rose-100 overflow-hidden boutique-card flex flex-col justify-between">
      {/* Visual Slot */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-rose-50/50">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Soft subtle gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.isBestseller && (
            <span className="text-[11px] font-semibold tracking-wider uppercase bg-rose-800 text-rose-50 px-2.5 py-1 rounded-md shadow-sm">
              Bestseller
            </span>
          )}
          {product.isVideoCallReady && (
            <span className="text-[10px] font-semibold tracking-wide bg-white/95 text-rose-900 px-2 py-0.5 rounded shadow-sm border border-rose-200/60 flex items-center gap-1">
              <Video className="w-3 h-3 text-rose-600" /> Video Call Ready
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm transition-all ${
            wishlisted
              ? 'bg-rose-600 text-white'
              : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 py-2 px-3 text-xs font-semibold bg-white/95 text-stone-800 hover:bg-white hover:text-rose-700 rounded-lg shadow-md transition-colors flex items-center justify-center gap-1.5 backdrop-blur-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => openVideoCallModal(product)}
            title="Book video call to inspect this piece live"
            className="p-2 bg-rose-700 text-white hover:bg-rose-800 rounded-lg shadow-md transition-colors"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500 uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-rose-700 font-semibold truncate max-w-[140px]">{product.craft}</span>
          </div>

          <h3
            onClick={() => openQuickView(product)}
            className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-800 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-stone-800 tabular-nums">{product.rating}</span>
            <span className="text-stone-400">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-rose-950 tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700">
              Save {discountPercent}%
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
