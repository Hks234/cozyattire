import React, { useState, useMemo } from 'react';
import { BoutiqueProvider, useBoutique } from './context/BoutiqueContext';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { BoutiqueStorySection } from './components/BoutiqueStorySection';
import { Footer } from './components/Footer';
import { VideoCallModal } from './components/VideoCallModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PRODUCTS, BOUTIQUE_INFO } from './data/products';
import {
  Video,
  Globe,
  ShieldCheck,
  Sparkles,
  Phone,
  Search,
  RotateCcw,
  ShoppingBag,
  Heart,
} from 'lucide-react';

const BoutiqueStorefront: React.FC = () => {
  const {
    selectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    notification,
    openVideoCallModal,
    cartTotalCount,
    setIsCartOpen,
  } = useBoutique();

  const [isVideoOnly, setIsVideoOnly] = useState(false);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Video Call availability
    if (isVideoOnly) {
      result = result.filter((p) => p.isVideoCallReady);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craft.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, isVideoOnly, searchQuery, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F9] text-stone-900 pb-16 md:pb-0">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-stone-800 transition-all animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Featured Collections Carousel */}
      <HeroCarousel />

      {/* Trust & Highlights Ribbon */}
      <section className="bg-white border-y border-rose-100 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900 text-sm">Authentic Handloom</p>
              <p className="text-stone-500 text-[11px]">Direct from Baloda Bazar &amp; Chhattisgarh</p>
            </div>
          </div>

          <div
            onClick={() => openVideoCallModal(null)}
            className="flex items-center gap-3 p-2 cursor-pointer group hover:bg-rose-50/50 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1">
                Live Video Facility 📱
              </p>
              <p className="text-stone-500 text-[11px] group-hover:text-rose-700 transition-colors">
                Inspect sarees 1-on-1 on WhatsApp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900 text-sm">We Ship Worldwide 📦</p>
              <p className="text-stone-500 text-[11px]">Tracked express delivery via DHL</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-stone-900 text-sm">Secure Payments</p>
              <p className="text-stone-500 text-[11px]">UPI, Cards, NetBanking, COD</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-700 mb-1">
              <span>Handcrafted Ethnic Couture</span>
              <span aria-hidden="true" className="text-rose-300">·</span>
              <span>Baloda Bazar Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-950">
              Explore Our Boutique Catalog
            </h2>
          </div>

          {/* Direct WhatsApp Call Banner */}
          <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-200/80 px-4 py-2 rounded-xl text-xs">
            <Phone className="w-4 h-4 text-rose-700" />
            <span className="text-stone-700">
              Need instant styling advice? Call:{' '}
              <a
                href={`tel:${BOUTIQUE_INFO.phoneRaw}`}
                className="font-bold text-rose-900 hover:underline"
              >
                {BOUTIQUE_INFO.phone}
              </a>
            </span>
          </div>
        </div>

        {/* Categories, Filters & Sorters */}
        <CategoryFilterBar
          totalCount={filteredProducts.length}
          isVideoOnly={isVideoOnly}
          setIsVideoOnly={setIsVideoOnly}
        />

        {/* Search Notice if Active */}
        {searchQuery && (
          <div className="mb-6 p-3 bg-white border border-rose-100 rounded-xl flex items-center justify-between text-xs text-stone-600">
            <span>
              Searching for: &quot;<strong className="text-rose-900">{searchQuery}</strong>&quot; ({filteredProducts.length} found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-1 text-rose-700 font-semibold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-rose-100 p-12 text-center max-w-md mx-auto space-y-4 my-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              No matching pieces found
            </h3>
            <p className="text-xs text-stone-500">
              Try searching with broader terms or browse all categories to explore our handwoven silks and lehengas.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setIsVideoOnly(false);
              }}
              className="px-5 py-2.5 bg-rose-700 text-white text-xs font-semibold rounded-xl hover:bg-rose-800 transition-colors"
            >
              View Full Collection
            </button>
          </div>
        )}

        {/* Video Shopping Callout Banner */}
        <div className="mt-16 bg-gradient-to-r from-rose-950 via-[#8A1538] to-rose-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-200">
                <Video className="w-4 h-4 text-rose-300" />
                <span>Live Video Facility Available 📱</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                Can&apos;t visit Baloda Bazar in person? We bring our racks to your living room.
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed max-w-xl">
                Schedule a 1-on-1 personalized video appointment over WhatsApp or Google Meet. Our stylists drape the saree on mannequins, show you zari details in high-definition, and answer all fabric questions.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <button
                onClick={() => openVideoCallModal(null)}
                className="px-6 py-3.5 bg-white hover:bg-rose-50 text-rose-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors text-center"
              >
                Schedule Video Call Now
              </button>
              <a
                href={`https://wa.me/${BOUTIQUE_INFO.phoneRaw}?text=Hello%20Cozy%20Attire%20Boutique!%20I%20would%20like%20to%20book%20a%20Video%20Call%20shopping%20tour.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>WhatsApp: {BOUTIQUE_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Boutique Heritage Story Section */}
      <BoutiqueStorySection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <VideoCallModal />
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal />

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/80 px-4 py-2 flex items-center justify-around text-[10px] font-semibold text-stone-600 shadow-lg">
        <button
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 hover:text-rose-700"
        >
          <Sparkles className="w-5 h-5 text-rose-600" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => openVideoCallModal(null)}
          className="flex flex-col items-center gap-1 text-rose-700 font-bold"
        >
          <div className="relative">
            <Video className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span>Video Call</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-rose-700 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-700 text-white text-[9px] font-bold flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        <a
          href={`https://wa.me/${BOUTIQUE_INFO.phoneRaw}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 text-emerald-700 font-bold"
        >
          <Phone className="w-5 h-5" />
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BoutiqueProvider>
      <BoutiqueStorefront />
    </BoutiqueProvider>
  );
}
