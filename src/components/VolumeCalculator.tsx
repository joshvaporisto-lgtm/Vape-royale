import React, { useState } from 'react';
import { PRICING_TIERS } from '../data/storeData';
import { useStore } from '../context/StoreContext';
import { TrendingDown, Building2, CheckCircle2 } from 'lucide-react';

export const VolumeCalculator: React.FC = () => {
  const { getTierForUnits, isWholesaleMode, toggleWholesaleMode, setIsWholesaleModalOpen } = useStore();
  const [sliderUnits, setSliderUnits] = useState(120);

  const activeTier = getTierForUnits(sliderUnits);
  const activeIndex = PRICING_TIERS.findIndex((t) => t.min === activeTier.min);

  return (
    <section id="volume-calculator" className="py-10 bg-white border-y border-[#E6E2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF8FD] rounded-3xl p-6 sm:p-10 border border-[#E6E2EF] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left explanation & interactive range slider */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEBFF] text-[#5B3DF5] text-xs font-bold mb-3">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Shop Wholesale Case Ladder</span>
              </div>

              <h2 className="font-['Unbounded'] text-2xl sm:text-3xl font-bold text-[#1B1630] tracking-tight">
                Buying for a vape shop or smoke store?
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Wholesale accounts unlock scalable case-rate discounts. Combine any
                mix of flavors across the same product model to count toward your unit volume tiers.
              </p>

              {/* Slider Controller */}
              <div className="w-full mt-6 p-4 rounded-2xl bg-white border border-[#E6E2EF]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>Product Unit Quantity</span>
                  <span className="font-['Unbounded'] text-base font-bold text-[#5B3DF5] tabular-nums">
                    {sliderUnits} Units
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="400"
                  step="10"
                  value={sliderUnits}
                  onChange={(e) => setSliderUnits(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5B3DF5]"
                />

                <div className="mt-3 text-xs text-slate-700 bg-[#FAF8FD] p-2.5 rounded-xl border border-[#E6E2EF]">
                  {activeTier.off > 0 ? (
                    <span className="font-medium">
                      🎯 <strong className="text-[#5B3DF5]">{sliderUnits} units</strong> qualifies for the{' '}
                      <strong>{activeTier.label}</strong> tier — saving{' '}
                      <strong className="text-emerald-600">{Math.round(activeTier.off * 100)}% off</strong> every single piece in the batch.
                    </span>
                  ) : (
                    <span>
                      Standard wholesale list price. Add <strong>{50 - sliderUnits} more units</strong> to unlock the 8% tier.
                    </span>
                  )}
                </div>
              </div>

              {/* CTA button */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsWholesaleModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#1B1630] text-white font-semibold text-xs hover:bg-[#322A56] transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Apply for Wholesale Account</span>
                </button>
                <button
                  onClick={toggleWholesaleMode}
                  className="px-5 py-2.5 rounded-full bg-white text-slate-700 border border-[#E6E2EF] hover:border-[#5B3DF5] font-semibold text-xs transition-colors cursor-pointer"
                >
                  {isWholesaleMode ? 'Currently in Wholesale Mode' : 'Preview Wholesale Mode Now'}
                </button>
              </div>
            </div>

            {/* Right: Visual stepped ladder */}
            <div className="lg:col-span-6 flex flex-col justify-end">
              <div className="flex items-end gap-2 sm:gap-3 h-52 sm:h-64 p-3 bg-white rounded-2xl border border-[#E6E2EF]">
                {PRICING_TIERS.map((tier, idx) => {
                  const isCurrent = idx === activeIndex;
                  const heightPercent = 38 + idx * 20;

                  return (
                    <div
                      key={tier.min}
                      className={`flex-1 rounded-xl transition-all duration-300 flex flex-col justify-end p-2.5 sm:p-3 relative ${
                        isCurrent
                          ? 'bg-[#5B3DF5] text-white shadow-md'
                          : 'bg-[#F2EDF9] text-slate-600 hover:bg-[#EBE4F6]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    >
                      {isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1B1630] text-white text-[10px] font-bold whitespace-nowrap shadow-sm">
                          Active Tier
                        </div>
                      )}
                      <div className="font-['Unbounded'] font-extrabold text-sm sm:text-lg leading-tight">
                        {tier.off > 0 ? `-${Math.round(tier.off * 100)}%` : 'List'}
                      </div>
                      <div className="text-[11px] sm:text-xs opacity-85 mt-1 font-medium leading-tight">
                        {tier.min}+ units
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Perks beneath ladder */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Flavors pool together for volume</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free delivery over $500 cases</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
