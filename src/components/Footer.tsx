import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/storeData';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveCategory,
    setIsWholesaleModalOpen,
    setIsOrdersOpen,
    setIsContactOpen,
  } = useStore();

  return (
    <footer className="bg-[#1B1630] text-[#EFEBFA] pt-14 pb-20 md:pb-14 mt-16 rounded-t-[36px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-7 rounded-sm bg-gradient-to-b from-[#8F7CFF] via-[#5B3DF5] to-[#2E1BA8]" />
              <span className="font-['Unbounded'] font-extrabold text-2xl tracking-tight text-white">
                vape royale
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A49EBF] leading-relaxed max-w-sm">
              Disposables, pods, e-liquids, and hardware accessories. Sold by the piece
              or by the bulk case. Transmit your order via WhatsApp and our dispatch team
              confirms stock allocation and courier dispatch within minutes.
            </p>

            <div className="pt-2 text-xs text-[#A49EBF] space-y-1">
              <div>📍 Direct Dispatch Hub & Fulfillment Warehouse</div>
              <div>⚡ Orders confirmed Monday – Sunday (9:00 AM – 9:00 PM)</div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-['Unbounded'] text-xs font-bold uppercase tracking-wider text-white">
              Shop Catalog
            </h3>
            <ul className="space-y-2 text-xs text-[#A49EBF]">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.name} ({cat.blurb})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Support */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-['Unbounded'] text-xs font-bold uppercase tracking-wider text-white">
              Wholesale & Help
            </h3>
            <ul className="space-y-2 text-xs text-[#A49EBF]">
              <li>
                <button
                  onClick={() => setIsWholesaleModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apply for Wholesale Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsOrdersOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Orders & Reorder
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('volume-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Volume Discount Ladder
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ & WhatsApp Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Nicotine Warning Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl border-2 border-white/20 bg-white/5 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-[#FF6FA0] shrink-0" />
          <div className="font-['Unbounded'] text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white leading-snug">
            WARNING: This product contains nicotine. Nicotine is an addictive chemical.
          </div>
        </div>

        {/* Legal & Age Disclaimer */}
        <div className="mt-6 pt-6 border-t border-white/10 text-[11px] text-[#A49EBF] leading-relaxed flex flex-col md:flex-row justify-between gap-4">
          <p className="max-w-3xl">
            We strictly enforce age verification and do not sell to anyone under the legal age (18+ / 21+). Customers are solely responsible for adhering to vaping statutes in their respective jurisdictions. This storefront operates direct WhatsApp message generation; no card payments are processed directly on this website.
          </p>
          <div className="shrink-0 text-white/60">
            © {new Date().getFullYear()} Vape Royale Distribution. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
