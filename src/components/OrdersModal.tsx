import React from 'react';
import { X, Clock, Repeat, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersModal: React.FC = () => {
  const {
    isOrdersOpen,
    setIsOrdersOpen,
    orders,
    reorder,
    formatMoney,
  } = useStore();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E6E2EF] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#5B3DF5]" />
            <h2 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
              Past Orders & WhatsApp History
            </h2>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
                No orders placed yet
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
                Orders sent over WhatsApp on this device are archived here for 1-click
                reordering and record keeping.
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              const totalUnits = ord.items.reduce((acc, i) => acc + i.quantity, 0);

              return (
                <div
                  key={ord.id}
                  className="p-4 sm:p-5 rounded-2xl border border-[#E6E2EF] bg-[#FAF8FD] hover:border-[#5B3DF5]/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-['Unbounded'] font-bold text-sm text-[#1B1630]">
                          Order {ord.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                          <PackageCheck className="w-3 h-3" />
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(ord.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}{' '}
                        · {totalUnits} {totalUnits === 1 ? 'unit' : 'units'} ·{' '}
                        <strong className="text-[#1B1630] font-semibold">{formatMoney(ord.total)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Line Items Preview */}
                  <div className="bg-white p-3 rounded-xl border border-[#E6E2EF] text-xs space-y-1.5 divide-y divide-slate-100">
                    {ord.items.map((line, idx) => (
                      <div key={idx} className="flex justify-between items-center pt-1.5 first:pt-0">
                        <span className="text-slate-700 font-medium">
                          {line.quantity}× {line.productName} ({line.flavor})
                        </span>
                        <span className="tabular-nums font-semibold text-slate-900">
                          {formatMoney(line.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500">
                      {ord.deliveryMethod} · {ord.paymentMethod}
                    </span>

                    <div className="flex items-center gap-2">
                      {ord.whatsappUrl && (
                        <a
                          href={ord.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-white border border-[#E6E2EF] hover:border-[#1FA855] text-[#1FA855] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Resend WhatsApp</span>
                        </a>
                      )}

                      <button
                        onClick={() => reorder(ord.id)}
                        className="px-3.5 py-1.5 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
