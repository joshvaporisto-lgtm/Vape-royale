import React from 'react';
import { ShoppingBag, MessageCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, STORE_CONFIG } from '../data/storeData';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    cartCount,
    setIsCartOpen,
    setIsOrdersOpen,
    orders,
  } = useStore();

  const directWhatsAppUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hi Vape Royale, I would like to inquire about stock and commercial order dispatch.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner: Minimalist Obsidian & Champagne Gold Bar */}
      <div className="bg-[#080B10] text-stone-300 text-xs py-2 border-b border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 tracking-normal text-stone-300">
            <span className="font-semibold text-white">Commercial Wholesale & Retail Fulfillment</span>
            <span aria-hidden="true" className="text-amber-500/60">·</span>
            <span>Free delivery on orders over <strong className="text-amber-400 font-mono">${STORE_CONFIG.freeShippingThreshold}</strong></span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Desk</span>
            </a>

            <span aria-hidden="true" className="text-stone-700">|</span>

            <button
              onClick={() => setIsOrdersOpen(true)}
              className="text-stone-300 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500/80" />
              <span>Past Orders {orders.length > 0 ? `(${orders.length})` : ''}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 py-3.5">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Serious Brand Logo */}
          <div className="shrink-0">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center"
              aria-label="Vape Royale Homepage"
            >
              <Logo size="md" />
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                setActiveCategory('all');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#0B0E14] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'text-[#0B0E14] font-bold' : ''
              }`}
            >
              All Inventory
            </button>
            <button
              onClick={() => {
                setActiveCategory('disposables');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#0B0E14] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'disposables' ? 'text-[#0B0E14] font-bold' : ''
              }`}
            >
              Disposables
            </button>
            <button
              onClick={() => {
                setActiveCategory('eliquids');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#0B0E14] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'eliquids' ? 'text-[#0B0E14] font-bold' : ''
              }`}
            >
              E-Liquids
            </button>
            <button
              onClick={() => {
                setActiveCategory('podkits');
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#0B0E14] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'podkits' ? 'text-[#0B0E14] font-bold' : ''
              }`}
            >
              Pod Systems
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0B0E14] transition-colors whitespace-nowrap cursor-pointer"
            >
              Fulfillment Protocol
            </button>
          </nav>

          {/* Zone 3: Direct WhatsApp & Cart Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct WhatsApp Action */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-700 hover:text-white transition-colors"
              title="Chat directly with dispatch desk on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp Dispatch</span>
              <span className="sm:hidden">Chat</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0B0E14] text-white hover:bg-stone-800 transition-colors cursor-pointer shrink-0 shadow-sm border border-stone-800"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Order Bag</span>
              <span className="min-w-5 h-5 px-1 flex items-center justify-center rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none mt-1 border-t border-stone-100 pt-2.5">
          <button
            onClick={() => {
              setActiveCategory('all');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0B0E14] text-amber-300 shadow-2xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B0E14] text-amber-300 shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
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
