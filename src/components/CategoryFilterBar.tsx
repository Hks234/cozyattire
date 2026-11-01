import React from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { Video, SlidersHorizontal, Sparkles } from 'lucide-react';

interface CategoryFilterBarProps {
  totalCount: number;
  isVideoOnly: boolean;
  setIsVideoOnly: (val: boolean) => void;
}

const CATEGORIES = [
  'All',
  'Sarees',
  'Lehengas',
  'Kurtis & Suits',
  'Bridal Couture',
  'Dupattas',
];

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  totalCount,
  isVideoOnly,
  setIsVideoOnly,
}) => {
  const { selectedCategory, setSelectedCategory, sortOption, setSortOption } = useBoutique();

  return (
    <div className="space-y-4 mb-8">
      {/* Category Pills/Segmented Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-rose-100 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-rose-50/70 text-stone-700 hover:bg-rose-100 hover:text-rose-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filters & Sorting */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Video Call Ready Toggle Button */}
          <button
            onClick={() => setIsVideoOnly(!isVideoOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
              isVideoOnly
                ? 'bg-rose-900 text-rose-50 border-rose-900 shadow-sm'
                : 'bg-white text-stone-700 border-rose-200 hover:border-rose-300'
            }`}
          >
            <Video className={`w-3.5 h-3.5 ${isVideoOnly ? 'text-rose-300' : 'text-rose-600'}`} />
            <span>Video Call Ready</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort products"
              className="bg-white border border-rose-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-700 font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="featured">Featured Collections</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <p>
          Showing <span className="font-semibold text-rose-950">{totalCount}</span> exquisite pieces in{' '}
          <span className="font-semibold text-rose-800">{selectedCategory}</span>
        </p>
        <span className="flex items-center gap-1 text-rose-700 font-medium">
          <Sparkles className="w-3.5 h-3.5" /> 100% Authentic Handpicked Quality
        </span>
      </div>
    </div>
  );
};
