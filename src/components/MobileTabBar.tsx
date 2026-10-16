import React from 'react';
import { Home, Layers, MessageCircle, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../data/storeData';

export const MobileTabBar: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    setIsWholesaleModalOpen,
  } = useStore();

  const directWhatsAppUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hi Vape Royale, I would like to inquire about placing an order.'
  )}`;

  return (
    <>
      {/* Floating WhatsApp Action Button for Desktop & Tablet */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-40 hidden md:inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1FA855] text-white font-bold text-xs shadow-xl shadow-[#1FA855]/30 hover:bg-[#188C46] hover:scale-105 transition-all"
        title="Chat with dispatch on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat on WhatsApp</span>
      </a>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-lg border border-[#E6E2EF] rounded-3xl shadow-xl px-2 py-1.5 flex items-center justify-around"
        aria-label="Mobile Navigation"
      >
        {/* Home */}
        <button
          onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-[#5B3DF5] cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-[#5B3DF5] cursor-pointer"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Catalog</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1FA855] text-white shadow-md shadow-[#1FA855]/30 hover:bg-[#188C46] cursor-pointer -mt-4 border-2 border-white"
          title="Direct WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
        </a>

        {/* Cart with Live Count Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-2 text-slate-500 hover:text-[#5B3DF5] cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#5B3DF5] text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Cart</span>
        </button>

        {/* Wholesale Account */}
        <button
          onClick={() => setIsWholesaleModalOpen(true)}
          className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-[#5B3DF5] cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Account</span>
        </button>
      </nav>
    </>
  );
};
