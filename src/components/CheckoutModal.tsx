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
    submitWhatsAppOrder,
    setIsOrdersOpen,
  } = useStore();

  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
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
      setFormError('Please provide your full contact name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please provide your WhatsApp contact number.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto bg-[#07090C]/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE6DF] bg-[#FAF8F5]">
          <div>
            <h2 className="text-sm font-serif font-bold text-[#0C0E13] tracking-wide">
              Commercial Order Manifest & WhatsApp Dispatch
            </h2>
            <p className="text-xs text-[#6F6B64] mt-0.5">
              Review delivery coordinates and format structured transmission
            </p>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setLastPlacedOrder(null);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6F6B64] hover:text-[#0C0E13] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success confirmation view */}
        {lastPlacedOrder ? (
          <div className="p-8 text-center flex flex-col items-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#EBF4EE] text-[#124E33] flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-serif font-bold text-[#0C0E13]">
              Manifest {lastPlacedOrder.id} Generated
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#6F6B64] leading-relaxed">
              Your order transcript has been compiled for the warehouse WhatsApp desk. Click below if your WhatsApp window did not open automatically.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={lastPlacedOrder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#124E33] hover:bg-[#0E3F29] text-white font-semibold text-xs transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="px-5 py-3 rounded-lg bg-[#FAF8F5] hover:bg-[#EAE6DF] text-[#0C0E13] font-semibold text-xs transition-colors cursor-pointer border border-[#EAE6DF]"
              >
                View Past Orders
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Customer Contact Section */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#80602D] mb-2">
                1. Contact & Recipient Coordinates
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Miller"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +61 480 850 123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                    Business / Store Legal Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Vapor LLC (or leave blank for personal delivery)"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method Options */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#80602D] mb-2">
                2. Fulfillment Method
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'standard'
                      ? 'border-[#0C0E13] bg-[#FAF8F5] ring-1 ring-[#0C0E13]'
                      : 'border-[#EAE6DF] hover:border-[#D4B68D] bg-white'
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
                    <div className="font-semibold text-xs text-[#0C0E13]">Standard Delivery</div>
                    <div className="text-[11px] text-[#6F6B64] mt-0.5">1–3 business days</div>
                  </div>
                  <div className="mt-2 text-xs font-mono font-semibold text-[#0C0E13]">
                    {isFreeStandard ? 'Free ($0.00)' : formatMoney(STORE_CONFIG.deliveryFee)}
                  </div>
                </label>

                <label
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'express'
                      ? 'border-[#0C0E13] bg-[#FAF8F5] ring-1 ring-[#0C0E13]'
                      : 'border-[#EAE6DF] hover:border-[#D4B68D] bg-white'
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
                    <div className="font-semibold text-xs text-[#0C0E13]">Same-Day Express</div>
                    <div className="text-[11px] text-[#6F6B64] mt-0.5">Priority dispatch</div>
                  </div>
                  <div className="mt-2 text-xs font-mono font-semibold text-[#0C0E13]">
                    {formatMoney(STORE_CONFIG.expressFee)}
                  </div>
                </label>

                <label
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                    shipMethod === 'pickup'
                      ? 'border-[#0C0E13] bg-[#FAF8F5] ring-1 ring-[#0C0E13]'
                      : 'border-[#EAE6DF] hover:border-[#D4B68D] bg-white'
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
                    <div className="font-semibold text-xs text-[#0C0E13]">Hub Pickup</div>
                    <div className="text-[11px] text-[#6F6B64] mt-0.5">Direct warehouse dock</div>
                  </div>
                  <div className="mt-2 text-xs font-mono font-semibold text-[#124E33]">Free</div>
                </label>
              </div>

              {shipMethod !== 'pickup' && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Terrace, Suite 100"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sydney, NSW"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                      Delivery Landmark / Gate Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Loading bay #2, buzzer 4"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#80602D] mb-2">
                3. Settlement Method
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay upon courier arrival' },
                  { id: 'momo', label: 'Mobile Money', sub: 'Instant digital transfer' },
                  { id: 'bank', label: 'Bank Wire / EFT', sub: 'Commercial invoice on WhatsApp' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      payMethod === item.id
                        ? 'border-[#0C0E13] bg-[#FAF8F5] ring-1 ring-[#0C0E13]'
                        : 'border-[#EAE6DF] hover:border-[#D4B68D] bg-white'
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
                    <div className="font-semibold text-xs text-[#0C0E13]">{item.label}</div>
                    <div className="text-[11px] text-[#6F6B64] mt-0.5">{item.sub}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#3C3A36] mb-1">
                Order Notes & Flavor Backup Preferences (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Mention backup flavor substitutions or special warehouse dispatch instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 text-xs rounded-lg border border-[#EAE6DF] focus:outline-none focus:border-[#B89360] focus:ring-1 focus:ring-[#B89360] bg-[#FAF8F5] text-[#0C0E13]"
              />
            </div>

            {/* Legal Nicotine Compliance Confirmation */}
            <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6DF]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={ageConfirmed}
                  onChange={(e) => setAgeConfirmed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#0C0E13] focus:ring-[#0C0E13] accent-[#0C0E13]"
                />
                <span className="text-xs text-[#3C3A36] leading-normal">
                  I certify under penalty of law that I am of legal age (21+ in the US / 18+ where applicable) for nicotine product purchases in my jurisdiction.
                </span>
              </label>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE6DF]">
              <div>
                <span className="text-xs text-[#6F6B64] block">Total Manifest Settlement:</span>
                <span className="font-mono text-xl font-extrabold text-[#0C0E13] tabular-nums">
                  {formatMoney(grandTotal)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#EAE6DF] text-xs font-semibold text-[#3C3A36] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Back to Manifest
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#124E33] hover:bg-[#0E3F29] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Transmit Order to WhatsApp Desk</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
