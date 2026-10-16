import React, { useState } from 'react';
import { X, HelpCircle, MessageCircle, ChevronDown, Send, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../data/storeData';

const FAQS = [
  {
    q: 'How does ordering over WhatsApp work?',
    a: 'Choose your desired products and flavor quantities, then click checkout. The site formats your complete itemized order with prices, discounts, and delivery address into a ready-to-send WhatsApp message. Once you hit send, our warehouse team confirms inventory reservation and dispatch timeframe within minutes.',
  },
  {
    q: 'How does wholesale case tier pricing work?',
    a: 'Wholesale accounts receive case rate savings that scale as total quantities grow: 8% off at 50 units, 15% off at 100 units, and 20% off at 250 units. All flavors of the same product count together toward reaching the volume tier thresholds.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'We accept Cash on Delivery (COD) for qualified delivery zones, instant Mobile Money transfer, and direct Bank Wire transfers. Invoices and settlement instructions are transmitted in the WhatsApp confirmation thread.',
  },
  {
    q: 'What is the shipping turnaround time?',
    a: 'Standard ground delivery is completed within 1 to 3 business days. Same-day express courier dispatch is available for orders confirmed before 2:00 PM local warehouse time.',
  },
  {
    q: 'What if a chosen flavor runs out before confirmation?',
    a: 'Our team will alert you immediately in the WhatsApp chat and propose optimal alternative flavors from the same device line. You can also specify backup substitutions in your checkout order notes.',
  },
];

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, showToast } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isContactOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setFormSent(true);
    showToast('Inquiry received. Our wholesale team will reply shortly.');
  };

  const whatsappInquiryUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hi Vape Royale, I have an inquiry regarding wholesale catalog stock and pricing.'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E2EF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#5B3DF5]" />
            <h2 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
              Help & Support Center
            </h2>
          </div>
          <button
            onClick={() => setIsContactOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick WhatsApp Support Banner */}
          <div className="p-4 rounded-2xl bg-[#1FA855]/10 border border-[#1FA855]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-['Unbounded'] text-sm font-bold text-[#1B1630] block">
                Need Rapid Assistance?
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Chat directly with our dispatch desk on WhatsApp.
              </p>
            </div>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1FA855] text-white text-xs font-bold hover:bg-[#188C46] transition-colors shrink-0 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Frequently Asked Questions Accordion */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E6E2EF] rounded-2xl overflow-hidden bg-[#FAF8FD] transition-colors"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold text-[#1B1630] hover:text-[#5B3DF5] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#5B3DF5]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-[#E6E2EF]/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Inquiry Form */}
          <div className="pt-4 border-t border-[#E6E2EF]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Send an Inquiry
            </h3>

            {formSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your message has been routed to our accounts desk.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jordan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message / Question
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ask about bulk allocations, custom orders, or delivery timing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B1630] hover:bg-[#322A56] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
