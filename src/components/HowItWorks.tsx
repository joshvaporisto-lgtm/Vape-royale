import React from 'react';
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-14 lg:py-18 bg-[#FAF8F5] border-t border-[#EAE6DF] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 w-full min-w-0">
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#80602D] mb-1">
            Fulfillment Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0C0E13] tracking-tight">
            How Orders Are Dispatched
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#6F6B64] leading-relaxed">
            Direct warehouse transmission with zero payment processor delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 border border-[#EAE6DF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#80602D] tracking-wider mb-3">
                STEP 01
              </div>
              <h3 className="text-base font-serif font-bold text-[#0C0E13] mb-2">
                Configure Flavors & Case Units
              </h3>
              <p className="text-xs text-[#6F6B64] leading-relaxed">
                Choose unit quantities across any combination of flavors. Automatic volume tier discounts scale the price as batch sizes grow.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center gap-2 text-xs font-medium text-[#6F6B64]">
              <ShoppingBag className="w-4 h-4 text-[#80602D]" />
              <span>Multi-flavor matrix ordering</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 border border-[#EAE6DF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#124E33] tracking-wider mb-3">
                STEP 02
              </div>
              <h3 className="text-base font-serif font-bold text-[#0C0E13] mb-2">
                Transmit Order via WhatsApp
              </h3>
              <p className="text-xs text-[#6F6B64] leading-relaxed">
                Your checkout transcript generates a complete itemized manifest sent directly to our warehouse desk. Stock reservation is acknowledged within minutes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center gap-2 text-xs font-medium text-[#6F6B64]">
              <MessageCircle className="w-4 h-4 text-[#124E33]" />
              <span>Direct dispatch verification</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 border border-[#EAE6DF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#80602D] tracking-wider mb-3">
                STEP 03
              </div>
              <h3 className="text-base font-serif font-bold text-[#0C0E13] mb-2">
                Doorstep Delivery & Settlement
              </h3>
              <p className="text-xs text-[#6F6B64] leading-relaxed">
                Courier arrives with factory-sealed goods. Settle upon delivery via Cash on Delivery, Mobile Money, or direct commercial bank wire.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center gap-2 text-xs font-medium text-[#6F6B64]">
              <Truck className="w-4 h-4 text-[#80602D]" />
              <span>Free delivery on orders $100+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
