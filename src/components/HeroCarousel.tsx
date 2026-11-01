import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Video, Sparkles, ArrowRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../data/products';
import { useBoutique } from '../context/BoutiqueContext';

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setSelectedCategory, openVideoCallModal } = useBoutique();

  const totalSlides = FEATURED_COLLECTIONS.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCtaClick = (categoryTarget: string) => {
    if (categoryTarget === 'All' && currentSlide === 3) {
      openVideoCallModal(null);
    } else {
      setSelectedCategory(categoryTarget);
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Featured Collections Carousel"
      className="relative overflow-hidden bg-gradient-to-b from-[#FDF6F7] to-[#FAF1F3] border-b border-rose-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center">
          {FEATURED_COLLECTIONS.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
                  {/* Left Column: Editorial Details */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                    {/* Clean unboxed metadata separator */}
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700">
                      <span>Cozy Attire Boutique</span>
                      <span aria-hidden="true" className="text-rose-300">·</span>
                      <span>Baloda Bazar</span>
                      <span aria-hidden="true" className="text-rose-300">·</span>
                      <span className="text-rose-600 font-bold">{slide.badge}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-rose-950 leading-[1.15] text-balance">
                      {slide.title}
                    </h1>

                    <p className="text-base sm:text-lg text-stone-700 font-light leading-relaxed max-w-xl">
                      {slide.tagline}
                    </p>

                    {/* Value points & Location confidence */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-stone-600 pt-1">
                      <span className="flex items-center gap-1.5 font-medium text-rose-900">
                        <Sparkles className="w-4 h-4 text-rose-600 shrink-0" /> Hand-picked Pure Weaves
                      </span>
                      <span className="text-stone-300 hidden sm:inline">|</span>
                      <span className="flex items-center gap-1.5 font-medium text-rose-900">
                        <Video className="w-4 h-4 text-rose-600 shrink-0" /> Live Video Call Facility
                      </span>
                      <span className="text-stone-300 hidden sm:inline">|</span>
                      <span className="text-stone-600">Worldwide Tracked Shipping</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-3">
                      <button
                        onClick={() => handleCtaClick(slide.categoryTarget)}
                        className="px-6 py-3 text-sm font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openVideoCallModal(null)}
                        className="px-5 py-3 text-sm font-semibold text-rose-900 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Video className="w-4 h-4 text-rose-600" />
                        <span>Schedule Live Video Tour</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: High Quality Visual Showcase */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-rose-50">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-white p-3 backdrop-blur-sm bg-black/25 rounded-xl border border-white/20">
                        <p className="text-xs font-semibold tracking-wider uppercase text-rose-200">
                          {slide.subtitle}
                        </p>
                        <p className="text-sm font-serif italic text-white/95">
                          Authentic boutique piece direct from Baloda Bazar atelier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls & Indicators */}
        <div className="mt-6 flex items-center justify-between border-t border-rose-200/60 pt-4">
          <div className="flex items-center gap-2">
            {FEATURED_COLLECTIONS.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === i ? 'w-8 bg-rose-700' : 'w-2 bg-rose-300 hover:bg-rose-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous collection slide"
              className="p-2 rounded-full border border-rose-200 bg-white text-stone-700 hover:text-rose-700 hover:bg-rose-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-medium text-stone-500 tabular-nums px-1">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next collection slide"
              className="p-2 rounded-full border border-rose-200 bg-white text-stone-700 hover:text-rose-700 hover:bg-rose-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
