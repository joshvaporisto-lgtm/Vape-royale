import React from 'react';
import { ShoppingBag, User, Search, X, Check, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/storeData';

export const Header: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    setIsWholesaleModalOpen,
    setIsOrdersOpen,
    setIsContactOpen,
    user,
    isWholesaleMode,
    toggleWholesaleMode,
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4FA]/90 backdrop-blur-md border-b border-[#E6E2EF]">
      {/* Top Banner with Delivery Promo & Retail/Wholesale Toggle */}
      <div className="bg-[#5B3DF5] text-white text-xs font-semibold py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="hidden md:inline">⚡ Direct WhatsApp order dispatch:</span>
            <span>Free delivery on {isWholesaleMode ? 'wholesale orders over $500' : 'retail orders over $100'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleWholesaleMode}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer text-xs"
              title="Switch between single item retail & bulk case wholesale pricing"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Mode: {isWholesaleMode ? 'Wholesale (Case Tiers)' : 'Retail (Per Unit)'}</span>
              <span className="underline opacity-80 text-[11px] ml-1">
                {isWholesaleMode ? 'Switch to Retail' : 'Preview Wholesale'}
              </span>
            </button>

            {user && (
              <button
                onClick={() => setIsOrdersOpen(true)}
                className="hover:underline text-white/90 text-xs hidden lg:inline"
              >
                My Orders
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 py-3.5">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-slate-900 group"
            >
              <div className="w-3.5 h-7 rounded-sm bg-gradient-to-b from-[#8F7CFF] via-[#5B3DF5] to-[#2E1BA8] shadow-sm shadow-[#5B3DF5]/30 group-hover:scale-105 transition-transform" />
              <span className="font-['Unbounded'] font-extrabold text-xl tracking-tight text-[#1B1630]">
                vape royale
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className={`hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' && !searchQuery ? 'text-[#5B3DF5] font-semibold' : ''
              }`}
            >
              All Catalog
            </button>
            <button
              onClick={() => setActiveCategory('disposables')}
              className={`hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'disposables' ? 'text-[#5B3DF5] font-semibold' : ''
              }`}
            >
              Disposables
            </button>
            <button
              onClick={() => setActiveCategory('eliquids')}
              className={`hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'eliquids' ? 'text-[#5B3DF5] font-semibold' : ''
              }`}
            >
              E-Liquids
            </button>
            <button
              onClick={() => setActiveCategory('podkits')}
              className={`hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'podkits' ? 'text-[#5B3DF5] font-semibold' : ''
              }`}
            >
              Pod Kits
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('volume-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Volume Discounts
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-[#5B3DF5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Help & FAQ
            </button>
          </nav>

          {/* Zone 3: Search, Account & Cart Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E6E2EF] rounded-full focus:outline-none focus:border-[#5B3DF5] focus:ring-1 focus:ring-[#5B3DF5] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wholesale Account Button */}
            <button
              onClick={() => setIsWholesaleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-full bg-white border border-[#E6E2EF] hover:border-[#5B3DF5] text-[#1B1630] transition-colors cursor-pointer shrink-0"
              title="Wholesale account status and login"
            >
              <User className="w-4 h-4 text-[#5B3DF5]" />
              <span className="hidden sm:inline">
                {user ? user.business : 'Wholesale Portal'}
              </span>
              {user && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Wholesale active" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full bg-[#1B1630] text-white hover:bg-[#2C244C] transition-colors cursor-pointer shrink-0 shadow-sm"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#8F7CFF]" />
              <span className="hidden sm:inline">Cart</span>
              <span
                className={`min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full text-[11px] font-bold ${
                  cartCount > 0 ? 'bg-[#5B3DF5] text-white' : 'bg-white/20 text-white/80'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & Category Chips */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search flavors, brands, coils..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#E6E2EF] rounded-full focus:outline-none focus:border-[#5B3DF5]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none mt-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#1B1630] text-white'
                : 'bg-white border border-[#E6E2EF] text-slate-600 hover:text-slate-900'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1B1630] text-white'
                  : 'bg-white border border-[#E6E2EF] text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
