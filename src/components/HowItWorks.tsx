import React from 'react';
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-14 lg:py-18 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Fulfillment Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            How Orders Are Dispatched
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Direct warehouse transmission with zero payment processor delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#F8F9FA] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 mb-3">
                STEP 01
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Configure Flavors & Case Units
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose unit quantities across any combination of flavors. Automatic volume tier discounts scale the price as batch sizes grow.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500">
              <ShoppingBag className="w-4 h-4 text-slate-900" />
              <span>Multi-flavor matrix ordering</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#F8F9FA] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-600 mb-3">
                STEP 02
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Transmit Order via WhatsApp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your checkout transcript generates a complete itemized manifest sent directly to our warehouse desk. Stock reservation is acknowledged within minutes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct dispatch verification</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F8F9FA] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-slate-400 mb-3">
                STEP 03
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Doorstep Delivery & Settlement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courier arrives with factory-sealed goods. Settle upon delivery via Cash on Delivery, Mobile Money, or direct commercial bank wire.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500">
              <Truck className="w-4 h-4 text-slate-900" />
              <span>Free delivery on orders $100+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
