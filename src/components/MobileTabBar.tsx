import React from 'react';
import { Home, Layers, MessageCircle, ShoppingBag, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../data/storeData';

export const MobileTabBar: React.FC = () => {
  const {
    setActiveCategory,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    setIsOrdersOpen,
    orders,
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
        className="fixed right-6 bottom-6 z-40 hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#124E33] text-white font-semibold text-xs shadow-lg hover:bg-[#0E3F29] transition-all cursor-pointer border border-[#1B6343]/50"
        title="Chat with dispatch on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp Dispatch</span>
      </a>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border border-[#EAE6DF] rounded-2xl shadow-xl px-2 py-1.5 flex items-center justify-around"
        aria-label="Mobile Navigation"
      >
        {/* Home */}
        <button
          onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center p-2 text-[#6F6B64] hover:text-[#0C0E13] cursor-pointer"
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
          className="flex flex-col items-center justify-center p-2 text-[#6F6B64] hover:text-[#0C0E13] cursor-pointer"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Catalog</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#124E33] text-white shadow-md hover:bg-[#0E3F29] cursor-pointer -mt-3.5 border-2 border-white"
          title="Direct WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
        </a>

        {/* Cart with Live Count Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-2 text-[#6F6B64] hover:text-[#0C0E13] cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-sm bg-[#0C0E13] text-[#D4B68D] text-[9px] font-mono font-bold flex items-center justify-center border border-[#C5A880]/30">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Bag</span>
        </button>

        {/* Past Orders */}
        <button
          onClick={() => setIsOrdersOpen(true)}
          className="relative flex flex-col items-center justify-center p-2 text-[#6F6B64] hover:text-[#0C0E13] cursor-pointer"
        >
          <div className="relative">
            <Clock className="w-5 h-5" />
            {orders.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#80602D]" />
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Orders</span>
        </button>
      </nav>
    </>
  );
};
