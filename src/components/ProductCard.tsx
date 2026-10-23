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
    <article className="group bg-white rounded-xl p-3.5 border border-[#EAE6DF] hover:border-[#C5A880]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Visual Artwork Container */}
        <div
          onClick={() => setActiveProductId(product.id)}
          className="relative aspect-square w-full rounded-lg overflow-hidden cursor-pointer bg-[#F8F6F2] border border-[#EBE7E0] flex items-center justify-center"
        >
          <ProductArt product={product} />

          {/* New Tag / Indicator */}
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#0C0E13] text-[#D4B68D] border border-[#C5A880]/30 shadow-xs">
              New Arrival
            </span>
          )}

          {/* Flavor Count Pill in corner */}
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-white/95 text-[11px] font-medium text-stone-700 shadow-2xs border border-[#E5DFD5]">
            {product.flavors.length} {product.cat === 'devices' || product.cat === 'accessories' ? 'options' : 'flavors'}
          </span>
        </div>

        {/* Content Details */}
        <div className="pt-3 px-0.5 flex flex-col gap-1">
          {/* Brand & Stock Status Inline */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#7C756B]">{product.brand}</span>
            {isOutOfStock ? (
              <span className="text-red-600 font-semibold text-[11px]">
                Out of stock
              </span>
            ) : isLowStock ? (
              <span className="text-[#80602D] font-medium text-[11px]">
                Low: {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-800 font-medium text-[11px]">
                In stock ({product.stock})
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setActiveProductId(product.id)}
            className="text-sm font-bold text-[#0C0E13] tracking-tight hover:text-[#80602D] transition-colors cursor-pointer line-clamp-1 mt-0.5"
          >
            {product.name}
          </h3>

          {/* Meta: Nicotine / Specs */}
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            {product.nic !== '—' && <span>Nic: {product.nic}</span>}
            {product.nic !== '—' && <span aria-hidden="true">·</span>}
            <span>Box of {product.pack}</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-2 pt-2 border-t border-[#F0ECE4]">
            <div className="flex items-baseline justify-between">
              <div className="text-base font-bold text-[#0C0E13] tabular-nums">
                {formatMoney(product.price)}
                <span className="text-xs font-normal text-stone-500 ml-1">
                  / unit
                </span>
              </div>
            </div>
            <div className="text-[11px] text-stone-600 font-medium mt-0.5">
              Volume tier: <span className="text-[#80602D] font-semibold">{formatMoney(maxDiscountPrice)}</span> at 250+
            </div>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-3.5 pt-1">
        <button
          type="button"
          onClick={() => setActiveProductId(product.id)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isOutOfStock
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
              : 'bg-[#0C0E13] hover:bg-[#1A1E28] text-white shadow-2xs border border-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#D4B68D]" />
          <span>{isOutOfStock ? 'Sold Out' : 'Select Flavors & Units'}</span>
        </button>
      </div>
    </article>
  );
};
