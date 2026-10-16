import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Truck, MessageCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../data/storeData';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartLineItems,
    cartSubtotal,
    cartSavings,
    freeShippingThreshold,
    formatMoney,
    user,
    isWholesaleMode,
    submitWhatsAppOrder,
    setIsOrdersOpen,
  } = useStore();

  const [contact, setContact] = useState(user?.contact || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [business, setBusiness] = useState(user?.business || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState(user?.region || '');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [shipMethod, setShipMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [payMethod, setPayMethod] = useState<'cod' | 'momo' | 'bank'>('cod');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<{ id: string; url: string } | null>(null);

  if (!isCheckoutOpen) return null;

  // Calculate delivery fee
  const isFreeStandard = cartSubtotal >= freeShippingThreshold;
  let deliveryFee = 0;
  if (shipMethod === 'express') {
    deliveryFee = STORE_CONFIG.expressFee;
  } else if (shipMethod === 'standard') {
    deliveryFee = isFreeStandard ? 0 : STORE_CONFIG.deliveryFee;
  }

  const grandTotal = cartSubtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!contact.trim()) {
      setFormError('Please enter your full contact name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter your WhatsApp contact number.');
      return;
    }
    if (shipMethod !== 'pickup' && (!street.trim() || !city.trim())) {
      setFormError('Please enter your complete delivery street and city.');
      return;
    }
    if (!ageConfirmed) {
      setFormError('You must confirm that you meet the legal nicotine age requirement.');
      return;
    }

    const result = submitWhatsAppOrder({
      contact,
      phone,
      business,
      street,
      city,
      landmark,
      shipMethod,
      payMethod,
      notes,
    });

    setLastPlacedOrder({ id: result.orderId, url: result.url });

    // Open WhatsApp in new tab
    try {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } catch {
      // browser popup catch
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E6E2EF] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div>
            <h2 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
              WhatsApp Order Checkout
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review details and generate formatted order message
            </p>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setLastPlacedOrder(null);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success confirmation view */}
        {lastPlacedOrder ? (
          <div className="p-8 text-center flex flex-col items-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-['Unbounded'] text-xl font-bold text-[#1B1630]">
              Order {lastPlacedOrder.id} Generated!
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Your order transcript has been formatted for WhatsApp. If WhatsApp did
              not open automatically, click the button below to send your reservation.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={lastPlacedOrder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1FA855] text-white font-bold text-xs hover:bg-[#188C46] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                View Order History
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            {/* Customer Contact Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Customer & Delivery Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-019-2831"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                  />
                </div>

                {isWholesaleMode && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Legal Entity (Wholesale)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Skyline Smoke & Vape LLC"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Method Options */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                2. Fulfillment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'standard'
                      ? 'border-[#5B3DF5] bg-[#FAF8FD] ring-1 ring-[#5B3DF5]'
                      : 'border-[#E6E2EF] hover:border-slate-300'
                  }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="shipMethod"
                      value="standard"
                      checked={shipMethod === 'standard'}
                      onChange={() => setShipMethod('standard')}
                      className="sr-only"
                    />
                    <div className="font-semibold text-xs text-[#1B1630]">Standard Delivery</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">1–3 business days</div>
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#5B3DF5]">
                    {isFreeStandard ? 'Free' : formatMoney(STORE_CONFIG.deliveryFee)}
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'express'
                      ? 'border-[#5B3DF5] bg-[#FAF8FD] ring-1 ring-[#5B3DF5]'
                      : 'border-[#E6E2EF] hover:border-slate-300'
                  }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="shipMethod"
                      value="express"
                      checked={shipMethod === 'express'}
                      onChange={() => setShipMethod('express')}
                      className="sr-only"
                    />
                    <div className="font-semibold text-xs text-[#1B1630]">Same-Day Express</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Orders before 2:00 PM</div>
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#5B3DF5]">
                    {formatMoney(STORE_CONFIG.expressFee)}
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'pickup'
                      ? 'border-[#5B3DF5] bg-[#FAF8FD] ring-1 ring-[#5B3DF5]'
                      : 'border-[#E6E2EF] hover:border-slate-300'
                  }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="shipMethod"
                      value="pickup"
                      checked={shipMethod === 'pickup'}
                      onChange={() => setShipMethod('pickup')}
                      className="sr-only"
                    />
                    <div className="font-semibold text-xs text-[#1B1630]">Store Pickup</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Pickup at dispatch hub</div>
                  </div>
                  <div className="mt-2 text-xs font-bold text-emerald-600">Free</div>
                </label>
              </div>

              {shipMethod !== 'pickup' && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Terrace, Suite 100"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Austin, TX"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Landmark / Suite / Gate Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near blue gate, buzzer #4"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                3. Preferred Settlement Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay upon courier arrival' },
                  { id: 'momo', label: 'Mobile Money', sub: 'USSD / App payment on reply' },
                  { id: 'bank', label: 'Bank Wire Transfer', sub: 'Invoice attached on WhatsApp' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      payMethod === item.id
                        ? 'border-[#5B3DF5] bg-[#FAF8FD] ring-1 ring-[#5B3DF5]'
                        : 'border-[#E6E2EF] hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      value={item.id}
                      checked={payMethod === item.id}
                      onChange={() => setPayMethod(item.id as 'cod' | 'momo' | 'bank')}
                      className="sr-only"
                    />
                    <div className="font-semibold text-xs text-[#1B1630]">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Flavor Backups & Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention any backup flavor substitutions if inventory is tight, or specific drop-off instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
              />
            </div>

            {/* Legal Nicotine Compliance Confirmation */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#E6E2EF]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#5B3DF5] focus:ring-[#5B3DF5] accent-[#5B3DF5]"
                />
                <span className="text-xs text-slate-700 leading-normal">
                  I certify under penalty of law that I am of legal purchasing age (18+ or 21+ where applicable) for nicotine products in my jurisdiction.
                </span>
              </label>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E6E2EF]">
              <div>
                <span className="text-xs text-slate-500 block">Total Due:</span>
                <span className="font-['Unbounded'] text-xl font-extrabold text-[#1B1630] tabular-nums">
                  {formatMoney(grandTotal)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-5 py-3 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#1FA855] hover:bg-[#188C46] text-white text-xs font-bold shadow-lg shadow-[#1FA855]/25 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Transmit Order to WhatsApp</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
