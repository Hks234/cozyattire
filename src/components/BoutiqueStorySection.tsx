import React from 'react';
import { Video, Globe, Award, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { BOUTIQUE_INFO } from '../data/products';
import { useBoutique } from '../context/BoutiqueContext';

export const BoutiqueStorySection: React.FC = () => {
  const { openVideoCallModal } = useBoutique();

  const handleCallWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Cozy Attire Boutique! I am reaching out to enquire about your Baloda Bazar collection and live video shopping.`
    );
    window.open(`https://wa.me/${BOUTIQUE_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section className="bg-gradient-to-b from-[#FFFDFD] via-[#FAF3F5] to-[#FFFDFD] py-16 sm:py-20 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-rose-100">
              <img
                src="/src/assets/images/cozy_boutique_hero_1793511669825.jpg"
                alt="Cozy Attire Boutique Interior Showroom in Baloda Bazar"
                referrerPolicy="no-referrer"
                className="w-full h-96 sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-rose-100 text-stone-900 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-800">
                  📍 Our Flagship Showroom
                </p>
                <p className="font-serif font-bold text-base sm:text-lg">
                  Baloda Bazar, Chhattisgarh
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  Open 7 Days a Week for In-Store Walk-ins &amp; Worldwide Video Call Consultations.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Story & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-700">
              <span>The Art of Authentic Dressing</span>
              <span aria-hidden="true" className="text-rose-300">·</span>
              <span>Baloda Bazar Legacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-950 leading-tight">
              Where Chhattisgarh Handloom Meets Modern Couture Grace
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Founded in Baloda Bazar, <strong className="text-rose-900 font-semibold">Cozy Attire Boutique</strong> is dedicated to bringing authentic wild Kosa silks, handcrafted festive anarkalis, and regal bridal lehengas directly from the weavers to your wardrobe, no matter where you reside across the globe.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  Live Video Call Facility 📱
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Browse our live showroom racks via 1-on-1 WhatsApp video call. Inspect silk luster and border finish under natural light.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  We Ship Worldwide 📦
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Fast insured worldwide dispatch via DHL &amp; FedEx to USA, UAE, UK, Canada, Australia, and 50+ countries.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  100% Handpicked Quality
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every saree, kurti, and lehenga undergoes stringent quality checks for thread count, zari purity, and seam perfection.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  Direct Boutique Concierge
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Call or WhatsApp our styling team at <span className="font-semibold text-rose-900">+91 99816 26248</span> for custom sizing or bridal queries.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openVideoCallModal(null)}
                className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Book Live Showroom Tour</span>
              </button>

              <button
                onClick={handleCallWhatsApp}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 99816 26248)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="mt-16 pt-12 border-t border-rose-200/60">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-700">
              Customer Experiences
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-rose-950 mt-1">
              Loved by Patrons in India &amp; Across the Globe
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                &quot;The video call facility is fabulous! The boutique team in Baloda Bazar showed me 6 different Kosa silk sarees in natural daylight. The saree reached me in Dubai within 4 days, exactly as shown.&quot;
              </p>
              <div className="pt-2 border-t border-rose-50 text-xs">
                <p className="font-bold text-stone-900">Dr. Meenakshi Tiwari</p>
                <p className="text-stone-500">Dubai, UAE · Verified Buyer</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                &quot;Ordered the Gulab-Rang bridal lehenga for my sister&apos;s sangeet. The hand zardozi work and the soft blush pink organza dupatta exceeded all expectations. Genuine boutique craftsmanship.&quot;
              </p>
              <div className="pt-2 border-t border-rose-50 text-xs">
                <p className="font-bold text-stone-900">Pooja &amp; Rajesh Agrawal</p>
                <p className="text-stone-500">Raipur, Chhattisgarh · Verified Buyer</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                &quot;Super smooth UPI payment and instant WhatsApp confirmation directly with the boutique owner. The Chanderi anarkali set fits like a glove. Will order regularly from Cozy Attire.&quot;
              </p>
              <div className="pt-2 border-t border-rose-50 text-xs">
                <p className="font-bold text-stone-900">Shweta Verma</p>
                <p className="text-stone-500">Bengaluru, Karnataka · Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
