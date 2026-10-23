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
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-[#EAE6DF]">
      {/* Top Banner: Minimalist Noir & Champagne Gold Bar */}
      <div className="bg-[#07090C] text-stone-300 text-xs py-2 border-b border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 tracking-normal text-stone-300">
            <span className="font-semibold text-white">Commercial Wholesale & Retail Fulfillment</span>
            <span aria-hidden="true" className="text-[#C5A880]/50">·</span>
            <span>Free delivery on orders over <strong className="text-[#D4B68D] font-mono">${STORE_CONFIG.freeShippingThreshold}</strong></span>
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
              className="text-stone-300 hover:text-[#D4B68D] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
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
              className={`hover:text-[#0C0E13] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'text-[#0C0E13] font-bold border-b-2 border-[#B89360] pb-0.5' : ''
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
              className={`hover:text-[#0C0E13] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'disposables' ? 'text-[#0C0E13] font-bold border-b-2 border-[#B89360] pb-0.5' : ''
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
              className={`hover:text-[#0C0E13] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'eliquids' ? 'text-[#0C0E13] font-bold border-b-2 border-[#B89360] pb-0.5' : ''
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
              className={`hover:text-[#0C0E13] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'podkits' ? 'text-[#0C0E13] font-bold border-b-2 border-[#B89360] pb-0.5' : ''
              }`}
            >
              Pod Systems
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#0C0E13] transition-colors whitespace-nowrap cursor-pointer"
            >
              Fulfillment Protocol
            </button>
          </nav>

          {/* Zone 3: Direct WhatsApp & Cart Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct WhatsApp Action - British Racing Green */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#124E33] text-white hover:bg-[#0E3D28] transition-colors border border-[#165B3C] shadow-xs"
              title="Chat directly with dispatch desk on WhatsApp (+61 480 850 123)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">WhatsApp Dispatch</span>
              <span className="sm:hidden">Chat</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0C0E13] text-white hover:bg-[#181C25] transition-colors cursor-pointer shrink-0 shadow-sm border border-stone-800"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4B68D]" />
              <span className="hidden sm:inline">Order Bag</span>
              <span className="min-w-5 h-5 px-1 flex items-center justify-center rounded-md text-[11px] font-bold bg-[#C5A880]/20 text-[#D4B68D] tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none mt-1 border-t border-[#F0ECE4] pt-2.5">
          <button
            onClick={() => {
              setActiveCategory('all');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0C0E13] text-[#D4B68D] shadow-2xs'
                : 'bg-[#F5F2EC] text-stone-700 hover:bg-[#EBE7DF] border border-transparent hover:border-[#DDD7CD]'
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
                  ? 'bg-[#0C0E13] text-[#D4B68D] shadow-2xs'
                  : 'bg-[#F5F2EC] text-stone-700 hover:bg-[#EBE7DF] border border-transparent hover:border-[#DDD7CD]'
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
