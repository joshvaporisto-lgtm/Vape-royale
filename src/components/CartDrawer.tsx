import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, TrendingDown, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductArt } from './ProductArt';
import { STORE_CONFIG } from '../data/storeData';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartLineItems,
    cartCount,
    cartSubtotal,
    cartSavings,
    freeShippingThreshold,
    updateCartQty,
    removeFromCart,
    clearCart,
    formatMoney,
    setIsCheckoutOpen,
    isWholesaleMode,
    setIsWholesaleModalOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const isFreeDelivery = cartSubtotal >= freeShippingThreshold;
  const deliveryShortfall = Math.max(0, freeShippingThreshold - cartSubtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5B3DF5]" />
            <h2 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
              Your Order ({cartCount} {cartCount === 1 ? 'unit' : 'units'})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3 bg-[#FAF8FD] border-b border-[#E6E2EF]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              {isFreeDelivery ? (
                <span className="text-emerald-700 font-bold">You unlocked free delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-[#5B3DF5]">{formatMoney(deliveryShortfall)}</strong> more for free delivery
                </span>
              )}
            </span>
            <span className="tabular-nums font-bold text-slate-700">
              {deliveryProgressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${deliveryProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Line Items Container */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E6E2EF]">
          {cartLineItems.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
                Your cart is empty
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
                Explore our catalog, select your favorite flavors and quantities,
                and send your order straight over WhatsApp.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 rounded-full bg-[#5B3DF5] text-white text-xs font-bold hover:bg-[#4A2FE0] transition-colors cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartLineItems.map((item) => (
              <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                {/* Thumbnail Art */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E6E2EF] shadow-xs">
                  <ProductArt product={item.product} size="sm" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-[#1B1630] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-slate-700">{item.flavor}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{formatMoney(item.unitPrice)} each</span>
                  </div>

                  {/* Stepper & Subtotal row */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="inline-flex items-center rounded-full bg-slate-100 p-0.5 border border-slate-200">
                      <button
                        onClick={() => updateCartQty(item.key, -1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-black shadow-xs transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.key, 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-black shadow-xs transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-['Unbounded'] text-xs font-bold text-[#1B1630] tabular-nums">
                        {formatMoney(item.subtotal)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals & WhatsApp Checkout Trigger */}
        {cartLineItems.length > 0 && (
          <div className="p-6 bg-[#FAF8FD] border-t border-[#E6E2EF] space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1B1630] tabular-nums">{formatMoney(cartSubtotal)}</span>
              </div>

              {cartSavings > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Tier Volume Savings
                  </span>
                  <span className="tabular-nums">-{formatMoney(cartSavings)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Standard Delivery</span>
                <span className="font-semibold text-slate-700">
                  {isFreeDelivery ? 'Free' : formatMoney(STORE_CONFIG.deliveryFee)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6E2EF] flex justify-between items-baseline">
              <div>
                <span className="text-xs font-semibold text-slate-500 block">Total Payable</span>
                <span className="text-[11px] text-slate-400">Confirmed via WhatsApp</span>
              </div>
              <div className="font-['Unbounded'] text-xl font-extrabold text-[#1B1630] tabular-nums">
                {formatMoney(cartSubtotal + (isFreeDelivery ? 0 : STORE_CONFIG.deliveryFee))}
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#1FA855] hover:bg-[#188C46] text-white font-bold text-sm shadow-md shadow-[#1FA855]/20 transition-all cursor-pointer"
              >
                <span>Checkout: Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {!isWholesaleMode && (
              <p className="text-[11px] text-center text-slate-500 pt-1">
                Ordering for a retail store?{' '}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsWholesaleModalOpen(true);
                  }}
                  className="text-[#5B3DF5] font-semibold hover:underline cursor-pointer"
                >
                  Apply for Wholesale Pricing
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
