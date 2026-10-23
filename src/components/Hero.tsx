import React, { useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, STORE_CONFIG } from '../data/storeData';

interface FlavorOption {
  name: string;
  flavorDesc: string;
}

const HERO_FLAVORS: FlavorOption[] = [
  { name: 'Grape Ice', flavorDesc: 'Concord grape chilled with menthol finish' },
  { name: 'Blue Razz', flavorDesc: 'Tangy blue raspberry with crisp citrus' },
  { name: 'Watermelon', flavorDesc: 'Natural ripe watermelon with frosted finish' },
  { name: 'Mango Burst', flavorDesc: 'Alphonso tropical mango essence' },
  { name: 'Cool Mint', flavorDesc: 'Glacial spearmint leaf formulation' },
];

export const Hero: React.FC = () => {
  const {
    formatMoney,
    setActiveProductId,
  } = useStore();

  const [activeFlavor, setActiveFlavor] = useState<FlavorOption>(HERO_FLAVORS[0]);
  const featuredProduct = PRODUCTS.find((p) => p.id === 'geek-bar-25k') || PRODUCTS[0];

  const directWhatsAppUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hi Vape Royale, I would like to inquire about current stock allocation and order dispatch.'
  )}`;

  return (
    <section className="relative overflow-hidden w-full max-w-full pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-16 lg:pb-20 border-b border-[#EAE6DF] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Serious Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start w-full min-w-0">
            {/* Context Notice with Aged Champagne Gold Accent */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#80602D] mb-4 bg-[#F6F2E9] px-2.5 sm:px-3 py-1 rounded-md border border-[#E8DFC8] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58742] shrink-0" />
              <span className="truncate">Commercial Distribution & Direct Fulfillment</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0C0E13] leading-[1.12] sm:leading-[1.08] break-words">
              Direct Commercial Vapor Distribution & Fast Dispatch.
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#6B665E] max-w-xl leading-relaxed">
              Authentic factory-sealed vaporizers, closed pod systems, and premium nicotine solutions. Select exact unit quantities per flavor with transparent volume tier pricing and direct WhatsApp dispatch verification.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  const catalog = document.getElementById('catalog-section');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#0C0E13] text-white font-semibold text-xs sm:text-sm hover:bg-[#1A1E28] transition-all cursor-pointer shadow-sm border border-stone-900"
              >
                <span>View Product Inventory</span>
                <ArrowRight className="w-4 h-4 text-[#D4B68D]" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#124E33] hover:bg-[#0E3D28] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer border border-[#165B3C]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Transmit Order via WhatsApp</span>
              </a>
            </div>

            {/* Quiet Architectural Proof Row */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#EAE6DF] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#B58742] shrink-0" />
                <span className="font-semibold">Factory Batch Authenticity</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#B58742] shrink-0" />
                <span className="font-semibold">Direct Courier Tracking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-[#B58742] shrink-0" />
                <span className="font-semibold">Settlement on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Studio Product Showcase */}
          <div className="lg:col-span-5 w-full min-w-0">
            <div className="rounded-2xl p-4 sm:p-7 bg-white border border-[#EAE6DF] shadow-xs flex flex-col justify-between w-full min-w-0">
              {/* Product Header */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#F0ECE4]">
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#80602D] truncate">
                    Flagship Inventory Allocation
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0C0E13] mt-0.5 truncate">
                    {featuredProduct.name}
                  </h3>
                  <div className="text-xs font-semibold text-stone-700 mt-0.5">
                    {formatMoney(featuredProduct.price)} <span className="font-normal text-stone-500">/ unit</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProductId(featuredProduct.id)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0C0E13] text-[#D4B68D] text-xs font-semibold hover:bg-[#1A1E28] transition-colors cursor-pointer shrink-0"
                >
                  Configure
                </button>
              </div>

              {/* Clean Studio Product Frame */}
              <div className="my-4 sm:my-6 relative aspect-square rounded-xl overflow-hidden bg-[#F8F6F2] border border-[#EBE7E0] flex items-center justify-center p-3 sm:p-4">
                <img
                  src={encodeURI(
                    featuredProduct.image
                      ? (featuredProduct.image.startsWith('/') ? featuredProduct.image : `/${featuredProduct.image}`)
                      : '/Disposable Vape - 25000 puffs.jpg'
                  )}
                  alt={featuredProduct.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#0C0E13]/90 text-[#D4B68D] text-[10px] sm:text-[11px] font-mono tabular-nums border border-[#C5A880]/30 max-w-[85%] truncate">
                  Flavor: {activeFlavor.name}
                </div>
              </div>

              {/* Flavor Selector Matrix */}
              <div className="w-full min-w-0">
                <div className="text-xs text-stone-600 mb-2 flex items-center justify-between gap-2">
                  <span className="font-semibold text-stone-700 shrink-0">Profile:</span>
                  <span className="text-stone-500 truncate text-[11px]">{activeFlavor.flavorDesc}</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 w-full max-w-full touch-pan-x">
                  {HERO_FLAVORS.map((f) => {
                    const isSelected = activeFlavor.name === f.name;
                    return (
                      <button
                        key={f.name}
                        onClick={() => setActiveFlavor(f)}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                          isSelected
                            ? 'bg-[#0C0E13] text-[#D4B68D] border-[#0C0E13] font-semibold shadow-2xs'
                            : 'bg-[#F7F5F0] text-stone-700 border-[#E5DFD5] hover:border-[#C5A880]/50'
                        }`}
                      >
                        {f.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
