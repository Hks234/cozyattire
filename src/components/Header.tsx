import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Video, Phone, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useBoutique } from '../context/BoutiqueContext';
import { CURRENCIES, BOUTIQUE_INFO } from '../data/products';

export const Header: React.FC = () => {
  const {
    cartTotalCount,
    wishlist,
    currency,
    setCurrencyCode,
    setIsCartOpen,
    openVideoCallModal,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useBoutique();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFD]/95 backdrop-blur-md border-b border-rose-100/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-[#8A1538] to-rose-950 text-rose-50 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-rose-200">
              <span className="text-sm">📍</span> Baloda Bazar, Chhattisgarh
            </span>
            <span className="hidden sm:inline text-rose-400">·</span>
            <span className="flex items-center gap-1.5 font-medium text-rose-100">
              <span className="text-sm">🛍️</span> Video Call Shopping Available
            </span>
            <span className="hidden md:inline text-rose-400">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-rose-200">
              <Globe className="w-3.5 h-3.5 text-rose-300" /> We Ship Worldwide
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BOUTIQUE_INFO.phoneRaw}`}
              className="hidden lg:flex items-center gap-1.5 text-rose-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-rose-300" />
              <span>{BOUTIQUE_INFO.phone}</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-900/60 hover:bg-rose-900 text-rose-100 border border-rose-700/60 transition-colors"
              >
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white border border-rose-100 rounded-lg shadow-xl py-1 text-slate-800 z-50 text-xs">
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrencyCode(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-rose-50 flex items-center justify-between ${
                        currency.code === c.code ? 'font-bold text-rose-700 bg-rose-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span className="text-slate-400">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-Zone Contract: Brand — 4-5 Nav Links — Primary Action & Controls) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <a
          href="/"
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-rose-950 flex items-center gap-1.5">
            <span className="text-rose-600 text-xl group-hover:scale-110 transition-transform">🎀</span>
            Cozy Attire
            <span className="text-xs font-sans tracking-widest font-medium uppercase text-rose-700/80 ml-1.5 border-l border-rose-300 pl-2 hidden sm:inline">
              Boutique
            </span>
          </span>
        </a>

        {/* Zone 2: Clean 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => handleNavClick('All')}
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Collections
          </button>
          <button
            onClick={() => handleNavClick('Sarees')}
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Sarees
          </button>
          <button
            onClick={() => handleNavClick('Lehengas')}
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Lehengas
          </button>
          <button
            onClick={() => handleNavClick('Kurtis & Suits')}
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Kurtis &amp; Suits
          </button>
          <button
            onClick={() => openVideoCallModal(null)}
            className="flex items-center gap-1.5 text-rose-700 hover:text-rose-900 font-semibold whitespace-nowrap shrink-0 py-1 transition-colors"
          >
            <Video className="w-4 h-4 text-rose-600" />
            <span>Video Call Shopping</span>
          </button>
        </nav>

        {/* Zone 3: Search, Wishlist & Cart Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            aria-label="Toggle search"
            className="p-2 text-stone-700 hover:text-rose-700 hover:bg-rose-50/70 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Video Call Quick Button (Mobile/Tablet) */}
          <button
            onClick={() => openVideoCallModal(null)}
            className="hidden sm:flex md:hidden items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-full hover:bg-rose-100 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-rose-600" />
            <span>Live Tour</span>
          </button>

          {/* Wishlist Link */}
          <button
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="View wishlist"
            className="relative p-2 text-stone-700 hover:text-rose-700 hover:bg-rose-50/70 rounded-full transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Primary Action: Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-rose-900/60 text-rose-100 px-1.5 py-0.5 rounded-full text-xs tabular-nums">
              {cartTotalCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 text-stone-700 hover:text-rose-700 hover:bg-rose-50/70 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {showSearchInput && (
        <div className="bg-white border-t border-rose-100 px-4 py-3 shadow-inner transition-all animate-in fade-in">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-rose-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sarees, Kosa silk, bridal lehengas, festive anarkalis..."
              className="w-full text-sm text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-rose-600 hover:underline shrink-0"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-1.5 text-xs font-semibold bg-rose-700 text-white rounded-md hover:bg-rose-800 shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white px-5 py-4 space-y-3 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('All')}
              className="w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-rose-700"
            >
              All Collections
            </button>
            <button
              onClick={() => handleNavClick('Sarees')}
              className="w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-rose-700"
            >
              Kosa &amp; Banarasi Sarees
            </button>
            <button
              onClick={() => handleNavClick('Lehengas')}
              className="w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-rose-700"
            >
              Bridal &amp; Heritage Lehengas
            </button>
            <button
              onClick={() => handleNavClick('Kurtis & Suits')}
              className="w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-rose-700"
            >
              Chanderi &amp; Festive Suits
            </button>
            <button
              onClick={() => handleNavClick('Dupattas')}
              className="w-full text-left py-2 text-sm font-medium text-stone-700 hover:text-rose-700"
            >
              Dupattas &amp; Stoles
            </button>
          </div>

          <div className="pt-3 border-t border-rose-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openVideoCallModal(null);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-50 text-rose-800 font-semibold text-sm rounded-lg border border-rose-200"
            >
              <Video className="w-4 h-4 text-rose-600" />
              <span>Schedule Live Video Call Tour</span>
            </button>
          </div>

          <div className="pt-2 text-xs text-stone-500 space-y-1">
            <p className="flex items-center gap-1">📍 Baloda Bazar, Chhattisgarh</p>
            <p className="flex items-center gap-1">📞 Call/WhatsApp: +91 99816 26248</p>
          </div>
        </div>
      )}
    </header>
  );
};
