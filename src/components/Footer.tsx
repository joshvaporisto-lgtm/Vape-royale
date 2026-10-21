import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, STORE_CONFIG } from '../data/storeData';
import { ShieldAlert, MessageCircle, Clock } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const {
    setActiveCategory,
    setIsOrdersOpen,
  } = useStore();

  const directWhatsAppUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hi Vape Royale, I have an inquiry regarding product inventory and commercial order dispatch.'
  )}`;

  return (
    <footer className="bg-[#080B10] text-stone-300 pt-14 pb-20 md:pb-16 mt-16 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3.5">
            <Logo theme="dark" size="lg" />

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authorized commercial distribution and direct-to-consumer fulfillment of lab-certified vaporizers, pods, and nicotine e-liquids. Manifest orders are compiled for instantaneous WhatsApp desk verification and courier dispatch.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1 font-mono text-[11px]">
              <div>Facility: Direct Warehouse Dispatch Hub</div>
              <div>Operating Hours: Mon – Sun (09:00 – 21:00 UTC)</div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Inventory Categories
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    const el = document.getElementById('catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  All Inventory
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
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {cat.name} ({cat.blurb})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Support & Orders */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Dispatch & Manifests
            </div>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Dispatch Desk</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsOrdersOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                  <span>Past Orders & Reorder Manifest</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Fulfillment Protocol
                </button>
              </li>
              <li className="pt-2 text-stone-500 text-[11px]">
                Dedicated Dispatch Line:
                <div className="text-white font-mono font-semibold mt-0.5">
                  +{STORE_CONFIG.whatsapp}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal Nicotine Warning Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-100 leading-snug">
            WARNING: This product contains nicotine. Nicotine is an addictive chemical.
          </div>
        </div>

        {/* Legal & Age Disclaimer */}
        <div className="mt-6 pt-6 border-t border-stone-800 text-[11px] text-stone-500 leading-relaxed flex flex-col md:flex-row justify-between gap-4">
          <p className="max-w-3xl">
            We strictly enforce adult age verification protocols. Products sold are intended solely for adult consumers of legal age (21+ in the United States / 18+ where governed by international statute). All manifests are confirmed directly with our warehouse desk.
          </p>
          <div className="shrink-0 text-stone-400 font-mono text-[11px]">
            © {new Date().getFullYear()} Vape Royale Distribution. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
