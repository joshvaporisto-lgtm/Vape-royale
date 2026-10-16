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
        // Featured default ordering
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
    <section id="catalog-section" className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B3DF5]">
              Curated Inventory
            </span>
            <h2 className="font-['Unbounded'] text-2xl sm:text-3xl font-extrabold text-[#1B1630] tracking-tight mt-1">
              {searchQuery ? `Search Results for "${searchQuery}"` : activeCategoryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available for rapid fulfillment
            </p>
          </div>

          {/* Quick Clear All Filters button if active */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-[#E6E2EF] hover:border-slate-300 transition-colors cursor-pointer self-start md:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white p-4 rounded-3xl border border-[#E6E2EF] shadow-xs mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Brand Filter & Stock Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Brand Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF8FD] border border-[#E6E2EF] text-[#1B1630] focus:outline-none focus:border-[#5B3DF5]"
              >
                <option value="all">All Brands</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Stock Toggle */}
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8FD] border border-[#E6E2EF] cursor-pointer text-xs font-medium text-slate-700 hover:bg-[#F2EDF9] transition-colors select-none">
              <input
                type="checkbox"
                checked={stockOnly}
                onChange={(e) => setStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#5B3DF5] accent-[#5B3DF5]"
              />
              <span>In Stock Only</span>
            </label>

            {/* New Arrivals Toggle */}
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8FD] border border-[#E6E2EF] cursor-pointer text-xs font-medium text-slate-700 hover:bg-[#F2EDF9] transition-colors select-none">
              <input
                type="checkbox"
                checked={newOnly}
                onChange={(e) => setNewOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#5B3DF5] accent-[#5B3DF5]"
              />
              <span>New Arrivals</span>
            </label>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#FAF8FD] border border-[#E6E2EF] text-[#1B1630] focus:outline-none focus:border-[#5B3DF5]"
            >
              <option value="featured">Featured Collection</option>
              <option value="popular">Best Selling Inventory</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E6E2EF] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-['Unbounded'] text-lg font-bold text-[#1B1630]">
              No matching products found
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Try clearing specific filters, selecting "All Brands", or searching for a different keyword.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#5B3DF5] text-white text-xs font-bold hover:bg-[#4A2FE0] transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 xl:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
