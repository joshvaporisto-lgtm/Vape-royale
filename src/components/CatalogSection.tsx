import React, { useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/storeData';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../types';

export const CatalogSection: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    stockOnly,
    setStockOnly,
    newOnly,
    setNewOnly,
    sortBy,
    setSortBy,
  } = useStore();

  // Extract unique brands from catalogue
  const availableBrands = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.cat !== activeCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Stock filter
      if (stockOnly && p.stock <= 0) {
        return false;
      }
      // New arrivals filter
      if (newOnly && !p.isNew) {
        return false;
      }
      // Search query filter (matches name, brand, description, and flavor names)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCat = p.cat.toLowerCase().includes(query);
        const matchesFlavors = p.flavors.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesFlavors) {
          return false;
        }
      }
      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.stock - a.stock);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [activeCategory, selectedBrand, stockOnly, newOnly, searchQuery, sortBy]);

  const activeCategoryTitle =
    activeCategory === 'all'
      ? 'All Vapor Products'
      : CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Catalog';

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSelectedBrand('all');
    setStockOnly(false);
    setNewOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    selectedBrand !== 'all' ||
    stockOnly ||
    newOnly ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'featured';

  return (
    <section id="catalog-section" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#80602D] mb-1">
              Live Stock Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C0E13] tracking-tight">
              {activeCategoryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Showing {filteredProducts.length} verified {filteredProducts.length === 1 ? 'model' : 'models'} available for immediate fulfillment
            </p>
          </div>

          {/* Quick Clear All Filters button if active */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:text-[#0C0E13] bg-white border border-stone-300 hover:border-[#C5A880]/60 transition-colors cursor-pointer self-start md:self-auto"
            >
              <X className="w-3.5 h-3.5 text-[#B58742]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Serious Automatic Volume Tiers Banner */}
        <div className="mb-6 p-4 rounded-xl bg-[#F8F5EE] border border-[#E8DFC8] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B58742]" />
            <strong className="text-[#6D4F23] font-bold">Tiered Wholesale Pricing:</strong>
            <span className="text-[#6B665E]">Discounts calculate automatically across all flavors in cart</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap">
            <span className="px-2.5 py-1 rounded bg-white border border-[#E0D7C6] text-stone-800 font-semibold shadow-2xs">50+ units: -8%</span>
            <span className="px-2.5 py-1 rounded bg-white border border-[#E0D7C6] text-stone-800 font-semibold shadow-2xs">100+ units: -15%</span>
            <span className="px-2.5 py-1 rounded bg-[#0C0E13] border border-[#C5A880]/40 text-[#D4B68D] font-semibold shadow-2xs">250+ units: -20%</span>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#EAE6DF] shadow-2xs mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Brand Filter & Stock Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] text-stone-800 focus:outline-none focus:border-[#0C0E13]"
              >
                <option value="all">All Brands ({PRODUCTS.length})</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Stock Toggle */}
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] cursor-pointer text-xs font-medium text-stone-700 hover:bg-[#F2EEE6] transition-colors select-none">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#0C0E13] accent-[#0C0E13]"
              />
              <span>In Stock Only</span>
            </label>

            {/* New Arrivals Toggle */}
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] cursor-pointer text-xs font-medium text-stone-700 hover:bg-[#F2EEE6] transition-colors select-none">
              <input
                type="checkbox"
                checked={newOnly}
                onChange={(e) => setNewOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#0C0E13] accent-[#0C0E13]"
              />
              <span>New Arrivals</span>
            </label>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-xs font-semibold text-stone-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] text-stone-900 focus:outline-none focus:border-[#0C0E13]"
            >
              <option value="featured">Featured Catalog</option>
              <option value="popular">Stock Volume: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#EAE6DF] p-8 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
              <Search className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h3 className="text-base font-bold text-[#0C0E13]">
              No matching products found
            </h3>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Reset your active filters or select a different category.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#0C0E13] text-[#D4B68D] text-xs font-semibold hover:bg-[#1A1E28] transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
