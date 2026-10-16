import React from 'react';
import { Product } from '../types';
import { ProductArt } from './ProductArt';
import { useStore } from '../context/StoreContext';
import { PRICING_TIERS } from '../data/storeData';
import { Sparkles, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isWholesaleMode,
    getRetailPrice,
    formatMoney,
    setActiveProductId,
    setIsWholesaleModalOpen,
  } = useStore();

  const retailPrice = getRetailPrice(product);
  const maxDiscountTier = PRICING_TIERS[PRICING_TIERS.length - 1];
  const maxDiscountPrice = Number((product.price * (1 - maxDiscountTier.off)).toFixed(2));

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 100;

  return (
    <article className="group bg-white rounded-3xl p-3 sm:p-3.5 border border-[#E6E2EF] hover:border-[#5B3DF5]/40 hover:shadow-xl hover:shadow-[#5B3DF5]/5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Visual Artwork Container */}
        <div
          onClick={() => setActiveProductId(product.id)}
          className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer"
        >
          <ProductArt product={product} />

          {/* New Tag / Indicator */}
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#1B1630] text-white text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#FF6FA0]" />
              New
            </span>
          )}

          {/* Flavor Count Pill in corner */}
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-slate-700 shadow-xs">
            {product.flavors.length} {product.cat === 'devices' || product.cat === 'accessories' ? 'options' : 'flavors'}
          </span>
        </div>

        {/* Content Details */}
        <div className="pt-3.5 px-1 flex flex-col gap-1">
          {/* Brand & Stock Status Inline */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-600">{product.brand}</span>
            {isOutOfStock ? (
              <span className="text-red-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Out of stock
              </span>
            ) : isLowStock ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Low: {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In stock
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProductId(product.id)}
            className="font-['Unbounded'] text-base font-bold text-[#1B1630] tracking-tight hover:text-[#5B3DF5] transition-colors cursor-pointer line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>

          {/* Meta: Nicotine / Specs */}
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            {product.nic !== '—' && <span>Nic: {product.nic}</span>}
            {product.nic !== '—' && <span aria-hidden="true">·</span>}
            <span>Packs of {product.pack}</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-2 pt-2 border-t border-[#E6E2EF]/80">
            {isWholesaleMode ? (
              <div>
                <div className="font-['Unbounded'] text-lg font-extrabold text-[#1B1630] tabular-nums">
                  {formatMoney(product.price)}{' '}
                  <span className="text-xs font-normal text-slate-500 font-sans">
                    /unit wholesale
                  </span>
                </div>
                <div className="text-[11px] text-[#5B3DF5] font-semibold mt-0.5">
                  Down to {formatMoney(maxDiscountPrice)} at 250+ units
                </div>
              </div>
            ) : (
              <div>
                <div className="font-['Unbounded'] text-lg font-extrabold text-[#1B1630] tabular-nums">
                  {formatMoney(retailPrice)}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWholesaleModalOpen(true);
                  }}
                  className="text-[11px] text-[#5B3DF5] hover:underline font-semibold text-left block mt-0.5 cursor-pointer"
                >
                  Apply for wholesale bulk pricing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-4 pt-1 px-1">
        <button
          type="button"
          onClick={() => setActiveProductId(product.id)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isOutOfStock
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-[#FAF8FD] hover:bg-[#5B3DF5] text-[#1B1630] hover:text-white border border-[#E6E2EF] hover:border-[#5B3DF5]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isOutOfStock ? 'Sold Out' : 'Choose Flavors'}</span>
        </button>
      </div>
    </article>
  );
};
