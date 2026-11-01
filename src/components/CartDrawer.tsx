import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, ShieldCheck, MessageSquare } from 'lucide-react';
import { useBoutique } from '../context/BoutiqueContext';
import { BOUTIQUE_INFO } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotalINR,
    formatPrice,
    setIsCheckoutOpen,
    setSelectedCategory,
  } = useBoutique();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2999;
  const isFreeShipping = cartSubtotalINR >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotalINR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'COZYFIRST') {
      const discount = Math.round(cartSubtotalINR * 0.1);
      setAppliedCoupon({ code, discount });
    } else if (code === 'COZY500' && cartSubtotalINR >= 3000) {
      setAppliedCoupon({ code, discount: 500 });
    } else if (code === 'BALODA') {
      setAppliedCoupon({ code, discount: 250 });
    } else {
      setCouponError('Invalid coupon code. Try "COZYFIRST" for 10% off.');
    }
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotalINR = Math.max(0, cartSubtotalINR - discountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.name} (Size: ${item.selectedSize}, Qty: ${
            item.quantity
          }) - ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n');

    const text = encodeURIComponent(
      `Hello Cozy Attire Boutique (Baloda Bazar)! 🛍️\n\nI want to place an order for the following items in my bag:\n\n${itemsList}\n\nEstimated Subtotal: ${formatPrice(
        cartSubtotalINR
      )}\n\nPlease assist me with payment and dispatch details!`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-rose-100">
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-rose-950 via-[#8A1538] to-rose-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-rose-200" />
              <h2 className="text-lg font-serif font-bold tracking-tight">Your Shopping Bag</h2>
              <span className="bg-rose-900 text-rose-200 text-xs px-2 py-0.5 rounded-full font-sans">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 text-rose-200 hover:text-white rounded-full hover:bg-rose-900/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-rose-50 px-6 py-2.5 border-b border-rose-100 text-xs">
            {isFreeShipping ? (
              <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                🎉 Congratulations! You unlocked Free Shipping across India!
              </p>
            ) : (
              <div>
                <p className="text-stone-700">
                  Add <span className="font-bold text-rose-800">{formatPrice(amountNeededForFreeShipping)}</span> more for Free Domestic Shipping!
                </p>
                <div className="w-full bg-rose-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-rose-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotalINR / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 max-w-xs mt-1">
                    Discover handwoven Kosa silks from Baloda Bazar, designer lehengas, and festive kurti sets.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedCategory('All');
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3.5 p-3 rounded-xl border border-rose-100 bg-[#FFFDFD] relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-rose-50 border border-rose-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          aria-label="Remove item"
                          className="text-stone-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Size: <span className="font-semibold text-stone-700">{item.selectedSize}</span>
                      </p>
                      <p className="text-[11px] text-rose-700 font-medium">
                        {item.product.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-rose-50">
                      <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-rose-950 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 bg-rose-50/50 border-t border-rose-100 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. COZYFIRST)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 shrink-0"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-[11px] text-emerald-700 font-semibold">
                  ✓ Code &quot;{appliedCoupon.code}&quot; applied: -{formatPrice(appliedCoupon.discount)}
                </p>
              )}

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-rose-100 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="font-semibold tabular-nums">{formatPrice(cartSubtotalINR)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount:</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Courier Delivery:</span>
                  <span className="font-medium text-stone-800">
                    {isFreeShipping ? 'FREE (Pan-India)' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-rose-950 pt-2 border-t border-rose-100">
                  <span>Total Amount:</span>
                  <span className="tabular-nums">{formatPrice(finalTotalINR)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Quick Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Order via WhatsApp Direct (+91 99816 26248)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout · Encrypted Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
