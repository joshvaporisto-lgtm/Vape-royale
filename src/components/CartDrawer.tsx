import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, MessageCircle } from 'lucide-react';
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
  } = useStore();

  if (!isCartOpen) return null;

  const isFreeDelivery = cartSubtotal >= freeShippingThreshold;
  const deliveryShortfall = Math.max(0, freeShippingThreshold - cartSubtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#080B10]/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 border-l border-stone-200"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-amber-700" />
            <h2 className="text-sm font-bold text-[#0B0E14]">
              Active Order Manifest ({cartCount} {cartCount === 1 ? 'unit' : 'units'})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-500 hover:text-[#0B0E14] hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-medium text-stone-600 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              {isFreeDelivery ? (
                <span className="text-emerald-800 font-semibold">Free delivery qualified</span>
              ) : (
                <span>
                  Add <strong className="text-[#0B0E14] font-mono">{formatMoney(deliveryShortfall)}</strong> more for free delivery
                </span>
              )}
            </span>
            <span className="tabular-nums font-mono font-bold text-stone-800 text-[11px]">
              {deliveryProgressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${deliveryProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Line Items Container */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
          {cartLineItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                <ShoppingBag className="w-6 h-6 text-amber-700/60" />
              </div>
              <h3 className="text-sm font-bold text-[#0B0E14]">
                Order manifest is empty
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-xs leading-relaxed">
                Browse our catalog to select models, flavors, and batch allocations.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 rounded-lg bg-[#0B0E14] text-amber-300 text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Browse Inventory
              </button>
            </div>
          ) : (
            cartLineItems.map((item) => (
              <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                {/* Thumbnail Art */}
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-50 flex items-center justify-center p-1">
                  <ProductArt product={item.product} size="sm" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-[#0B0E14] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-stone-700">{item.flavor}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="tabular-nums font-mono">{formatMoney(item.unitPrice)} ea</span>
                  </div>

                  {/* Stepper & Subtotal row */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="inline-flex items-center rounded-lg bg-stone-50 border border-stone-200 p-0.5">
                      <button
                        onClick={() => updateCartQty(item.key, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-9 text-center text-xs font-mono font-bold tabular-nums text-[#0B0E14]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.key, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#0B0E14] tabular-nums">
                        {formatMoney(item.subtotal)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-1"
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
          <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-semibold text-[#0B0E14] tabular-nums">{formatMoney(cartSubtotal)}</span>
              </div>

              {cartSavings > 0 && (
                <div className="flex justify-between text-amber-800 font-medium">
                  <span>Automated Tier Volume Discount</span>
                  <span className="font-mono tabular-nums">-{formatMoney(cartSavings)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Standard Dispatch Courier</span>
                <span className="font-semibold text-stone-700">
                  {isFreeDelivery ? 'Free ($0.00)' : formatMoney(STORE_CONFIG.deliveryFee)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-semibold text-stone-500 block">Total Due</span>
                <span className="text-[11px] text-stone-400">Settled upon delivery</span>
              </div>
              <div className="font-mono text-xl font-extrabold text-[#0B0E14] tabular-nums">
                {formatMoney(cartSubtotal + (isFreeDelivery ? 0 : STORE_CONFIG.deliveryFee))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
