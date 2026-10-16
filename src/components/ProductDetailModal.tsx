import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, PRICING_TIERS } from '../data/storeData';
import { ProductArt } from './ProductArt';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductId,
    setActiveProductId,
    isWholesaleMode,
    formatMoney,
    getRetailPrice,
    getUnitPrice,
    getUnitsInCartForProduct,
    getTierForUnits,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
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

  const packSize = isWholesaleMode ? product.pack : 1;
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
      const next = Math.max(0, current + delta * packSize);
      return {
        ...prev,
        [flavor]: next,
      };
    });
  };

  const handleDirectInput = (flavor: string, valStr: string) => {
    const raw = parseInt(valStr, 10);
    const parsed = isNaN(raw) ? 0 : Math.max(0, raw);
    // In wholesale mode, snap to nearest pack multiple
    const normalized = isWholesaleMode ? Math.round(parsed / packSize) * packSize : parsed;
    setFlavorQuantities((prev) => ({
      ...prev,
      [flavor]: normalized,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E6E2EF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.cat}</span>
            {isWholesaleMode && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#5B3DF5] font-bold">Pack of {product.pack}</span>
              </>
            )}
          </div>
          <button
            onClick={() => setActiveProductId(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
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
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#E6E2EF] shadow-sm">
                <ProductArt product={product} size="lg" />
              </div>

              <div className="w-full mt-4 p-4 rounded-2xl bg-[#FAF8FD] border border-[#E6E2EF] text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Nicotine Strength:</span>
                  <span className="font-bold text-[#1B1630]">{product.nic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Wholesale Unit Packaging:</span>
                  <span className="font-bold text-[#1B1630]">{product.pack} units per case box</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Stock Availability:</span>
                  <span className={product.stock > 0 ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                    {product.stock > 0 ? `${product.stock} units in inventory` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description, and Tier Ladder */}
            <div className="md:col-span-7 flex flex-col">
              <h2 className="font-['Unbounded'] text-2xl font-extrabold text-[#1B1630] tracking-tight">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {product.desc}
              </p>

              {/* Wholesale Pricing Tier Table */}
              <div className="mt-5 rounded-2xl border border-[#E6E2EF] overflow-hidden bg-white shadow-xs">
                <div className="bg-[#FAF8FD] px-4 py-2.5 border-b border-[#E6E2EF] flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#5B3DF5]" />
                    Wholesale Volume Tiers (All Flavors Combined)
                  </span>
                  <span className="text-[#5B3DF5]">
                    {isWholesaleMode ? 'Wholesale Active' : 'Retail Price'}
                  </span>
                </div>

                <div className="divide-y divide-[#E6E2EF] text-xs">
                  {PRICING_TIERS.map((tier) => {
                    const tierUnitPrice = Number((product.price * (1 - tier.off)).toFixed(2));
                    const isCurrentActive = isWholesaleMode && activeTier.min === tier.min;

                    return (
                      <div
                        key={tier.min}
                        className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                          isCurrentActive ? 'bg-[#EFEBFF] font-bold text-[#5B3DF5]' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCurrentActive && <Check className="w-3.5 h-3.5 text-[#5B3DF5]" />}
                          <span>{tier.label}</span>
                        </div>
                        <div className="tabular-nums font-semibold">
                          {isWholesaleMode ? formatMoney(tierUnitPrice) : formatMoney(getRetailPrice(product))}
                          <span className="text-[10px] font-normal opacity-75 ml-1">/ unit</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Batch Select Shortcut */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold">Quick Batch Presets:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAllFlavorsQty(packSize)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 transition-colors cursor-pointer text-[11px]"
                  >
                    +1 Pack to All
                  </button>
                  <button
                    onClick={() => setAllFlavorsQty(0)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 transition-colors cursor-pointer text-[11px]"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Flavor Quantity Configuration Matrix */}
          <div className="mt-6 pt-4 border-t border-[#E6E2EF]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Unbounded'] text-sm font-bold text-[#1B1630]">
                Select Quantities per {product.cat === 'devices' || product.cat === 'accessories' ? 'Option' : 'Flavor'}
              </h3>
              <span className="text-xs text-slate-500">
                {isWholesaleMode ? `Pack increment: ${packSize} units` : 'Piece by piece'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.flavors.map((flavor) => {
                const qty = flavorQuantities[flavor] || 0;
                return (
                  <div
                    key={flavor}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      qty > 0
                        ? 'border-[#5B3DF5] bg-[#FAF8FD] shadow-xs'
                        : 'border-[#E6E2EF] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-[#1B1630] truncate">
                        {flavor}
                      </span>
                      {qty > 0 && (
                        <span className="text-[11px] text-[#5B3DF5] font-semibold">
                          Subtotal: {formatMoney(qty * activeUnitPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200 shrink-0">
                      <button
                        onClick={() => handleQtyChange(flavor, -1)}
                        disabled={qty <= 0}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
                        aria-label={`Decrease ${flavor} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="text"
                        inputMode="numeric"
                        value={qty}
                        onChange={(e) => handleDirectInput(flavor, e.target.value)}
                        className="w-12 text-center text-xs font-bold bg-transparent focus:outline-none tabular-nums"
                        aria-label={`${flavor} quantity`}
                      />

                      <button
                        onClick={() => handleQtyChange(flavor, 1)}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-black shadow-xs transition-colors cursor-pointer"
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
        <div className="p-4 sm:p-5 bg-white border-t border-[#E6E2EF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-['Unbounded'] text-lg font-extrabold text-[#1B1630] tabular-nums">
                {newlySelectedUnits} Units
              </span>
              <span className="text-xs text-slate-500">
                ({formatMoney(activeUnitPrice)} / unit)
              </span>
              <span className="text-xs font-bold text-emerald-600">
                Total: {formatMoney(selectionSubtotal)}
              </span>
            </div>

            {isWholesaleMode && nextTier && (
              <span className="text-[11px] text-indigo-600 font-medium mt-0.5">
                💡 Add {unitsNeededForNextTier} more units to unlock {Math.round(nextTier.off * 100)}% off!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveProductId(null)}
              className="px-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAllToCart}
              disabled={newlySelectedUnits === 0}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white text-xs font-bold shadow-md shadow-[#5B3DF5]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <span>Add to Cart ({newlySelectedUnits})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
