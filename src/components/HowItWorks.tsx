import React from 'react';
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 lg:py-16 bg-[#FAF8FD] border-t border-[#E6E2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B3DF5]">
            Simple 3-Step Process
          </span>
          <h2 className="font-['Unbounded'] text-2xl sm:text-3xl font-extrabold text-[#1B1630] tracking-tight mt-1">
            How Ordering Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Frictionless direct-to-warehouse dispatch powered by WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E2EF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EFEBFF] text-[#5B3DF5] font-['Unbounded'] font-bold text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="font-['Unbounded'] text-base font-bold text-[#1B1630] mb-2">
                Configure Flavors & Case Packs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose custom quantities across multiple flavor options on a single
                screen without tedious back-and-forth navigation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2EF] flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShoppingBag className="w-4 h-4 text-[#5B3DF5]" />
              <span>Multi-flavor matrix cart</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E2EF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#1FA855]/10 text-[#1FA855] font-['Unbounded'] font-bold text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="font-['Unbounded'] text-base font-bold text-[#1B1630] mb-2">
                Transmit on WhatsApp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Checkout structures your order into a formatted WhatsApp transcript.
                Tap send, and our dispatch team verifies live allocation within minutes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2EF] flex items-center gap-2 text-xs font-semibold text-slate-500">
              <MessageCircle className="w-4 h-4 text-[#1FA855]" />
              <span>Zero website card fees</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6E2EF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EFEBFF] text-[#5B3DF5] font-['Unbounded'] font-bold text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="font-['Unbounded'] text-base font-bold text-[#1B1630] mb-2">
                Settle & Receive
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay on arrival via Cash on Delivery, instant Mobile Money, or direct
                Bank Wire. Free standard shipping or same-day express available.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2EF] flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Truck className="w-4 h-4 text-[#5B3DF5]" />
              <span>Doorstep courier delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
