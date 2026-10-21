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
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20 border-b border-stone-200 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Serious Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Context Notice with Royal Gold Accent */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-4 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>Commercial Distribution & Direct Fulfillment</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B0E14] leading-[1.08] text-balance">
              Direct Commercial Vapor Distribution & Fast Dispatch.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Authentic factory-sealed vaporizers, closed pod systems, and premium nicotine solutions. Select exact unit quantities per flavor with transparent volume tier pricing and direct WhatsApp dispatch verification.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  const catalog = document.getElementById('catalog-section');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B0E14] text-white font-semibold text-sm hover:bg-stone-800 transition-all cursor-pointer shadow-sm border border-stone-900"
              >
                <span>View Product Inventory</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Transmit Order via WhatsApp</span>
              </a>
            </div>

            {/* Quiet Architectural Proof Row */}
            <div className="mt-10 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">Factory Batch Authenticity</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">Direct Courier Tracking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">Settlement on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Studio Product Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-6 sm:p-7 bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
              {/* Product Header */}
              <div className="flex items-start justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                    Flagship Inventory Allocation
                  </div>
                  <h3 className="font-bold text-base text-[#0B0E14] mt-0.5">
                    {featuredProduct.name}
                  </h3>
                  <div className="text-xs font-semibold text-stone-700 mt-0.5">
                    {formatMoney(featuredProduct.price)} <span className="font-normal text-stone-500">/ unit (base rate)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProductId(featuredProduct.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#0B0E14] text-amber-300 text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Configure Flavors
                </button>
              </div>

              {/* Clean Studio Product Frame */}
              <div className="my-6 relative aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center p-4">
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

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#0B0E14]/90 text-amber-300 text-[11px] font-mono tabular-nums">
                  Flavor: {activeFlavor.name}
                </div>
              </div>

              {/* Flavor Selector Matrix */}
              <div>
                <div className="text-xs text-stone-600 mb-2 flex items-center justify-between">
                  <span className="font-semibold text-stone-700">Flavor Profile:</span>
                  <span className="text-stone-500 truncate max-w-[200px]">{activeFlavor.flavorDesc}</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {HERO_FLAVORS.map((f) => {
                    const isSelected = activeFlavor.name === f.name;
                    return (
                      <button
                        key={f.name}
                        onClick={() => setActiveFlavor(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                          isSelected
                            ? 'bg-[#0B0E14] text-amber-300 border-[#0B0E14] font-semibold shadow-2xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-700/40'
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
