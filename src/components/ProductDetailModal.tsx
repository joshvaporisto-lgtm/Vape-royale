import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, PRICING_TIERS } from '../data/storeData';
import { ProductArt } from './ProductArt';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductId,
    setActiveProductId,
    formatMoney,
    getUnitPrice,
    getUnitsInCartForProduct,
    getTierForUnits,
    addToCart,
    setIsCartOpen,
    showToast,
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === activeProductId);

  // Per-flavor selected quantities state: { [flavorName]: number }
  const [flavorQuantities, setFlavorQuantities] = useState<Record<string, number>>({});

  // Reset state when opening a different product
  useEffect(() => {
    if (product) {
      const initial: Record<string, number> = {};
      product.flavors.forEach((f) => {
        initial[f] = 0;
      });
      setFlavorQuantities(initial);
    }
  }, [product?.id]);

  if (!product) return null;

  const existingInCart = getUnitsInCartForProduct(product.id);

  // Sum of newly selected units across all flavors in this modal
  const newlySelectedUnits = Object.values(flavorQuantities).reduce((acc, q) => acc + q, 0);
  const combinedTotalUnits = existingInCart + newlySelectedUnits;

  // Active pricing tier calculation
  const activeTier = getTierForUnits(Math.max(combinedTotalUnits, 1));
  const activeUnitPrice = getUnitPrice(product, Math.max(combinedTotalUnits, 1));
  const selectionSubtotal = Number((activeUnitPrice * newlySelectedUnits).toFixed(2));

  // Determine next tier threshold
  const nextTier = PRICING_TIERS.find((t) => t.min > combinedTotalUnits);
  const unitsNeededForNextTier = nextTier ? nextTier.min - combinedTotalUnits : 0;

  const handleQtyChange = (flavor: string, delta: number) => {
    setFlavorQuantities((prev) => {
      const current = prev[flavor] || 0;
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        [flavor]: next,
      };
    });
  };

  const handleDirectInput = (flavor: string, valStr: string) => {
    const raw = parseInt(valStr, 10);
    const parsed = isNaN(raw) ? 0 : Math.max(0, raw);
    setFlavorQuantities((prev) => ({
      ...prev,
      [flavor]: parsed,
    }));
  };

  const setAllFlavorsQty = (unitsPerFlavor: number) => {
    const updated: Record<string, number> = {};
    product.flavors.forEach((f) => {
      updated[f] = unitsPerFlavor;
    });
    setFlavorQuantities(updated);
  };

  const handleAddAllToCart = () => {
    if (newlySelectedUnits === 0) {
      showToast('Select quantities for at least one flavor');
      return;
    }

    Object.entries(flavorQuantities).forEach(([flavor, qty]) => {
      if (qty > 0) {
        addToCart(product.id, flavor, qty);
      }
    });

    // Reset modal counters
    const reset: Record<string, number> = {};
    product.flavors.forEach((f) => {
      reset[f] = 0;
    });
    setFlavorQuantities(reset);
    setActiveProductId(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto bg-[#07090C]/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#EAE6DF] bg-[#FAF8F5]">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-stone-600 min-w-0 truncate">
            <span className="uppercase tracking-wider text-[#80602D] shrink-0">{product.brand}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="capitalize truncate">{product.cat}</span>
            <span aria-hidden="true" className="text-stone-300 hidden sm:inline">·</span>
            <span className="text-[#0C0E13] font-mono hidden sm:inline">Pack: {product.pack}</span>
          </div>
          <button
            onClick={() => setActiveProductId(null)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-[#0C0E13] hover:bg-[#EBE7DF] transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Product Visual & Highlights */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-[#EAE6DF] bg-[#F8F6F2] p-3 flex items-center justify-center">
                <ProductArt product={product} size="lg" />
              </div>

              <div className="w-full mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] text-xs space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Nicotine Strength:</span>
                  <span className="font-semibold text-[#0C0E13]">{product.nic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Packaging Format:</span>
                  <span className="font-semibold text-[#0C0E13]">{product.pack} units per case box</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Stock Availability:</span>
                  <span className={product.stock > 0 ? 'text-emerald-800 font-semibold' : 'text-red-600 font-semibold'}>
                    {product.stock > 0 ? `${product.stock} units in inventory` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description, and Tier Ladder */}
            <div className="md:col-span-7 flex flex-col">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C0E13] tracking-tight">
                {product.name}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.desc}
              </p>

              {/* Automatic Volume Tier Table */}
              <div className="mt-5 rounded-xl border border-[#EAE6DF] overflow-hidden bg-white">
                <div className="bg-[#F8F5EE] px-4 py-2.5 border-b border-[#E8DFC8] flex items-center justify-between text-xs font-semibold text-[#6D4F23]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#B58742]" />
                    Tiered Volume Pricing Schedule
                  </span>
                  <span className="text-[#80602D] font-semibold text-[11px]">
                    Automatic in Cart
                  </span>
                </div>

                <div className="divide-y divide-stone-100 text-xs">
                  {PRICING_TIERS.map((tier) => {
                    const tierUnitPrice = Number((product.price * (1 - tier.off)).toFixed(2));
                    const isCurrentActive = activeTier.min === tier.min;

                    return (
                      <div
                        key={tier.min}
                        className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                          isCurrentActive ? 'bg-[#F5EFE6] font-bold text-[#0C0E13]' : 'text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCurrentActive && <Check className="w-3.5 h-3.5 text-[#B58742]" />}
                          <span>{tier.label}</span>
                        </div>
                        <div className="tabular-nums font-mono font-semibold">
                          {formatMoney(tierUnitPrice)}
                          <span className="text-[10px] font-normal text-stone-500 ml-1">/ unit</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Batch Presets */}
              <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Quick Presets:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAllFlavorsQty(5)}
                    className="px-2.5 py-1 rounded bg-[#F5F2EC] hover:bg-[#EBE7DF] font-medium text-stone-700 transition-colors cursor-pointer text-[11px]"
                  >
                    +5 Each
                  </button>
                  <button
                    onClick={() => setAllFlavorsQty(10)}
                    className="px-2.5 py-1 rounded bg-[#F5F2EC] hover:bg-[#EBE7DF] font-medium text-stone-700 transition-colors cursor-pointer text-[11px]"
                  >
                    +10 Each
                  </button>
                  <button
                    onClick={() => setAllFlavorsQty(0)}
                    className="px-2.5 py-1 rounded bg-[#F5F2EC] hover:bg-[#EBE7DF] font-medium text-stone-700 transition-colors cursor-pointer text-[11px]"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Flavor Quantity Configuration Matrix */}
          <div className="mt-6 pt-4 border-t border-[#EAE6DF]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0C0E13]">
                Select Quantities per {product.cat === 'devices' || product.cat === 'accessories' ? 'Option' : 'Flavor'}
              </h3>
              <span className="text-xs text-stone-500">
                Pick individual quantities or mix and match flavors
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.flavors.map((flavor) => {
                const qty = flavorQuantities[flavor] || 0;
                return (
                  <div
                    key={flavor}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      qty > 0
                        ? 'border-[#B89360] bg-[#FAF6F0]'
                        : 'border-[#EAE6DF] bg-white hover:border-[#D5CEBF]'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-[#0C0E13] truncate">
                        {flavor}
                      </span>
                      {qty > 0 && (
                        <span className="text-[11px] text-[#80602D] font-mono mt-0.5">
                          Subtotal: {formatMoney(qty * activeUnitPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center rounded-lg bg-white border border-[#EAE6DF] p-0.5 shrink-0">
                      <button
                        onClick={() => handleQtyChange(flavor, -1)}
                        disabled={qty <= 0}
                        className="w-7 h-7 rounded flex items-center justify-center text-stone-700 hover:bg-[#F5F2EC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        aria-label={`Decrease ${flavor} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={qty}
                        onChange={(e) => handleDirectInput(flavor, e.target.value)}
                        className="w-12 text-center text-xs font-bold font-mono bg-transparent focus:outline-none tabular-nums text-[#0C0E13]"
                        aria-label={`${flavor} quantity`}
                      />

                      <button
                        onClick={() => handleQtyChange(flavor, 1)}
                        className="w-7 h-7 rounded flex items-center justify-center text-stone-700 hover:bg-[#F5F2EC] transition-colors cursor-pointer"
                        aria-label={`Increase ${flavor} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Action & Summary Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#EAE6DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-base font-extrabold text-[#0C0E13] font-mono tabular-nums">
                {newlySelectedUnits} Units
              </span>
              <span className="text-xs text-stone-500">
                ({formatMoney(activeUnitPrice)} / unit)
              </span>
              <span className="text-xs font-bold text-[#80602D] font-mono">
                Total: {formatMoney(selectionSubtotal)}
              </span>
            </div>

            {nextTier && (
              <span className="text-[11px] text-stone-600 font-medium mt-0.5">
                Add {unitsNeededForNextTier} more units to unlock {Math.round(nextTier.off * 100)}% case discount.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveProductId(null)}
              className="px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAllToCart}
              disabled={newlySelectedUnits === 0}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0C0E13] hover:bg-[#1A1E28] text-white text-xs font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer border border-stone-900"
            >
              <span>Add to Order Bag ({newlySelectedUnits})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4B68D]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
