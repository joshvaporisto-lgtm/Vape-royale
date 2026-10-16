import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, STORE_CONFIG } from '../data/storeData';

interface FlavorOption {
  name: string;
  hue: number;
  flavorDesc: string;
}

const HERO_FLAVORS: FlavorOption[] = [
  { name: 'Grape Ice', hue: 285, flavorDesc: 'Concord grape chilled with frosted menthol' },
  { name: 'Blue Razz', hue: 215, flavorDesc: 'Tangy blue raspberry with candy zest' },
  { name: 'Watermelon', hue: 350, flavorDesc: 'Sweet ripe watermelon with icy undertones' },
  { name: 'Mango Burst', hue: 38, flavorDesc: 'Alphonso tropical mango nectar' },
  { name: 'Cool Mint', hue: 160, flavorDesc: 'Spearmint and pure glacial leaf essence' },
];

export const Hero: React.FC = () => {
  const {
    isWholesaleMode,
    formatMoney,
    getRetailPrice,
    setActiveProductId,
    setIsWholesaleModalOpen,
    setActiveCategory,
  } = useStore();

  const [activeFlavor, setActiveFlavor] = useState<FlavorOption>(HERO_FLAVORS[0]);
  const featuredProduct = PRODUCTS.find((p) => p.id === 'geek-bar-25k') || PRODUCTS[0];
  const priceDisplay = isWholesaleMode
    ? `${formatMoney(featuredProduct.price)} / unit (case of ${featuredProduct.pack})`
    : formatMoney(getRetailPrice(featuredProduct));

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E2EF] text-xs font-semibold text-[#5B3DF5] shadow-xs mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#5B3DF5]" />
              <span>Direct Wholesale & Consumer Fulfillment</span>
            </div>

            <h1 className="font-['Unbounded'] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B1630] leading-[1.08] text-balance">
              Every flavor, by the piece or by the case.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Disposables, premium nicotine salts, pod kits, and replacement coils.
              Assemble customized flavor quantities, transmit your order over WhatsApp,
              and receive instant inventory reservation.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  const catalog = document.getElementById('catalog-section');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5B3DF5] text-white font-bold text-sm hover:bg-[#4A2FE0] hover:shadow-lg hover:shadow-[#5B3DF5]/25 transition-all cursor-pointer"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsWholesaleModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1B1630] border border-[#E6E2EF] hover:border-[#5B3DF5] font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>Wholesale Application</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFEBFF] text-[#5B3DF5] font-bold">
                  Up to 20% Off
                </span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="mt-8 pt-6 border-t border-[#E6E2EF]/80 grid grid-cols-3 gap-3 w-full max-w-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span>WhatsApp Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span>Authentic Lab Batch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Showcase Stage */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-3xl p-6 sm:p-8 min-h-[440px] flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-700 border border-white/50"
              style={{
                background: `radial-gradient(65% 55% at 55% 45%, hsl(${activeFlavor.hue}, 95%, 72%, 0.75), transparent 75%), radial-gradient(75% 65% at 10% 100%, hsl(${activeFlavor.hue + 35}, 90%, 68%, 0.4), transparent 70%), #EEEAF6`,
              }}
            >
              {/* Top Tag & Price Callout */}
              <div className="flex items-start justify-between z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Featured Flagship
                  </span>
                  <div className="font-['Unbounded'] font-bold text-sm text-[#1B1630]">
                    {featuredProduct.name}
                  </div>
                  <div className="text-xs font-bold text-[#5B3DF5] mt-0.5">
                    {priceDisplay}
                  </div>
                </div>

                <button
                  onClick={() => setActiveProductId(featuredProduct.id)}
                  className="px-3.5 py-1.5 rounded-full bg-[#1B1630] text-white text-xs font-bold hover:bg-[#322A56] transition-colors cursor-pointer"
                >
                  Configure Flavors
                </button>
              </div>

              {/* Dynamic Showcase Visual: Real product photo with ambient glow */}
              <div className="relative my-4 flex items-center justify-center">
                <span
                  className="absolute left-0 bottom-4 font-['Unbounded'] font-black text-4xl sm:text-5xl select-none transition-colors duration-500 pointer-events-none opacity-20"
                  style={{ color: `hsl(${activeFlavor.hue}, 80%, 25%)` }}
                >
                  {activeFlavor.name}
                </span>

                <div className="relative w-52 sm:w-64 aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 group bg-white/40 backdrop-blur-xs z-10 transition-transform duration-300 hover:scale-105">
                  <img
                    src={encodeURI(
                      featuredProduct.image
                        ? (featuredProduct.image.startsWith('/') ? featuredProduct.image : `/${featuredProduct.image}`)
                        : '/Disposable Vape - 25000 puffs.jpg'
                    )}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1B1630]/85 text-white text-[10px] font-bold shadow-md">
                    {activeFlavor.name}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Flavor Color Chips */}
              <div className="z-10 bg-white/70 backdrop-blur-md rounded-2xl p-2.5 shadow-sm border border-white/80">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                  Preview Profile: <span className="text-[#1B1630] normal-case">{activeFlavor.flavorDesc}</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                  {HERO_FLAVORS.map((f) => {
                    const isSelected = activeFlavor.name === f.name;
                    return (
                      <button
                        key={f.name}
                        onClick={() => setActiveFlavor(f)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-[#1B1630] text-white shadow-sm'
                            : 'bg-white/80 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{
                            background: `linear-gradient(135deg, hsl(${f.hue}, 95%, 75%), hsl(${f.hue}, 80%, 45%))`,
                          }}
                        />
                        <span>{f.name}</span>
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
