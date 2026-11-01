import React from 'react';
import { Phone, Mail, MapPin, Globe, Video, ShieldCheck, Heart } from 'lucide-react';
import { BOUTIQUE_INFO } from '../data/products';
import { useBoutique } from '../context/BoutiqueContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, openVideoCallModal } = useBoutique();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-rose-950/40">
      {/* Top Banner Ribbon */}
      <div className="bg-rose-950/60 border-b border-rose-900/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-rose-200">
            <span className="text-sm">🎀</span>
            <span className="font-serif font-bold text-sm text-white">Cozy Attire Boutique</span>
            <span className="text-rose-400">·</span>
            <span>Baloda Bazar, Chhattisgarh</span>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-rose-400" /> We Ship Worldwide 📦
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-rose-200">
              <Video className="w-3.5 h-3.5 text-rose-400" /> Video Call Facility Available 📱
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About & Location */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-rose-500">🎀</span> Cozy Attire
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Baloda Bazar&apos;s premier boutique atelier for authentic handwoven Kosa silks, bridal lehengas, and designer festive ethnic couture.
            </p>
            <div className="space-y-2 text-xs text-stone-300 pt-1">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{BOUTIQUE_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${BOUTIQUE_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {BOUTIQUE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{BOUTIQUE_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('Sarees')}
                  className="hover:text-white transition-colors"
                >
                  Pure Chhattisgarh Kosa Silk Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Bridal Couture')}
                  className="hover:text-white transition-colors"
                >
                  Regal Bridal &amp; Velvet Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Kurtis & Suits')}
                  className="hover:text-white transition-colors"
                >
                  Chanderi &amp; Organza Suit Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Sarees')}
                  className="hover:text-white transition-colors"
                >
                  Handcrafted Organza &amp; Banarasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Dupattas')}
                  className="hover:text-white transition-colors"
                >
                  Zari Dupattas &amp; Heirloom Shawls
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bespoke Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => openVideoCallModal(null)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-rose-200 font-medium"
                >
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  <span>Book Live Video Shopping</span>
                </button>
              </li>
              <li>
                <span className="block">Custom Bridal Blouse Stitching</span>
              </li>
              <li>
                <span className="block">Trousseau Packaging &amp; Styling</span>
              </li>
              <li>
                <span className="block">Worldwide Express Dispatch (DHL/FedEx)</span>
              </li>
              <li>
                <span className="block">Direct WhatsApp Styling (+91 99816 26248)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Partners & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300">
              Secure Payments Accepted
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              We support fast UPI QR payments (GPay, PhonePe, Paytm, BHIM), all major Credit/Debit Cards, NetBanking, and Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] rounded text-stone-300 font-mono">
                UPI / QR
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] rounded text-stone-300 font-mono">
                GPay / PhonePe
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] rounded text-stone-300 font-mono">
                Visa / MasterCard
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] rounded text-stone-300 font-mono">
                RuPay
              </span>
              <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] rounded text-stone-300 font-mono">
                COD
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-2 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Buyer Protection &amp; Safe Checkout</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Cozy Attire Boutique · Baloda Bazar, Chhattisgarh. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for connoisseurs of Indian heritage ethnic wear.
          </p>
        </div>
      </div>
    </footer>
  );
};
