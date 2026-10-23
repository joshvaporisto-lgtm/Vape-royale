import React from 'react';
import { Product } from '../types';
import { ProductArt } from './ProductArt';
import { useStore } from '../context/StoreContext';
import { PRICING_TIERS } from '../data/storeData';
import { Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatMoney,
    setActiveProductId,
  } = useStore();

  const maxDiscountTier = PRICING_TIERS[PRICING_TIERS.length - 1];
  const maxDiscountPrice = Number((product.price * (1 - maxDiscountTier.off)).toFixed(2));

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 100;

  return (
    <article className="group bg-white rounded-xl p-2.5 sm:p-3.5 border border-[#EAE6DF] hover:border-[#C5A880]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between w-full min-w-0">
      <div className="w-full min-w-0">
        {/* Visual Artwork Container */}
        <div
          onClick={() => setActiveProductId(product.id)}
          className="relative aspect-square w-full rounded-lg overflow-hidden cursor-pointer bg-[#F8F6F2] border border-[#EBE7E0] flex items-center justify-center"
        >
          <ProductArt product={product} />

          {/* New Tag / Indicator */}
          {product.isNew && (
            <span className="absolute top-2 left-2 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#0C0E13] text-[#D4B68D] border border-[#C5A880]/30 shadow-xs">
              New
            </span>
          )}

          {/* Flavor Count Pill in corner */}
          <span className="absolute bottom-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-white/95 text-[10px] sm:text-[11px] font-medium text-stone-700 shadow-2xs border border-[#E5DFD5]">
            {product.flavors.length} {product.cat === 'devices' || product.cat === 'accessories' ? 'opts' : 'flavors'}
          </span>
        </div>

        {/* Content Details */}
        <div className="pt-2.5 sm:pt-3 px-0.5 flex flex-col gap-0.5 sm:gap-1 w-full min-w-0">
          {/* Brand & Stock Status Inline */}
          <div className="flex items-center justify-between text-xs text-stone-500 gap-1 min-w-0">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] text-[#7C756B] truncate">{product.brand}</span>
            {isOutOfStock ? (
              <span className="text-red-600 font-semibold text-[10px] sm:text-[11px] shrink-0">
                Sold Out
              </span>
            ) : isLowStock ? (
              <span className="text-[#80602D] font-medium text-[10px] sm:text-[11px] shrink-0">
                Low: {product.stock}
              </span>
            ) : (
              <span className="text-emerald-800 font-medium text-[10px] sm:text-[11px] shrink-0">
                In stock ({product.stock})
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProductId(product.id)}
            className="text-xs sm:text-sm font-bold text-[#0C0E13] tracking-tight hover:text-[#80602D] transition-colors cursor-pointer line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>

          {/* Meta: Nicotine / Specs */}
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5 truncate">
            {product.nic !== '—' && <span>Nic: {product.nic}</span>}
            {product.nic !== '—' && <span aria-hidden="true">·</span>}
            <span>Box of {product.pack}</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-[#F0ECE4]">
            <div className="flex items-baseline justify-between">
              <div className="text-sm sm:text-base font-bold text-[#0C0E13] tabular-nums">
                {formatMoney(product.price)}
                <span className="text-[10px] sm:text-xs font-normal text-stone-500 ml-1">
                  / unit
                </span>
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-600 font-medium mt-0.5 truncate">
              Volume tier: <span className="text-[#80602D] font-semibold">{formatMoney(maxDiscountPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-2.5 sm:mt-3.5 pt-1 w-full">
        <button
          type="button"
          onClick={() => setActiveProductId(product.id)}
          disabled={isOutOfStock}
          className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isOutOfStock
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
              : 'bg-[#0C0E13] hover:bg-[#1A1E28] text-white shadow-2xs border border-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#D4B68D] shrink-0" />
          <span className="truncate">{isOutOfStock ? 'Sold Out' : 'Select Flavors'}</span>
        </button>
      </div>
    </article>
  );
};
