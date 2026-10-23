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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto bg-[#07090C]/85 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE6DF] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#80602D]" />
            <h2 className="text-sm font-serif font-bold text-[#0C0E13] tracking-wide">
              Commercial Order Manifest Archive
            </h2>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6F6B64] hover:text-[#0C0E13] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#6F6B64] mb-3 border border-[#EAE6DF]">
                <ShoppingBag className="w-6 h-6 text-[#80602D]" />
              </div>
              <h3 className="text-sm font-serif font-bold text-[#0C0E13]">
                No orders on record
              </h3>
              <p className="mt-1 text-xs text-[#6F6B64] max-w-xs leading-relaxed">
                Orders transmitted to the WhatsApp dispatch desk from this browser are logged here for rapid reordering.
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              const totalUnits = ord.items.reduce((acc, i) => acc + i.quantity, 0);

              return (
                <div
                  key={ord.id}
                  className="p-4 sm:p-5 rounded-xl border border-[#EAE6DF] bg-[#FAF8F5] hover:border-[#D4B68D] transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0C0E13]">
                          Manifest #{ord.id}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#EBF4EE] text-[#124E33] text-[10px] font-semibold flex items-center gap-1">
                          <PackageCheck className="w-3 h-3" />
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#6F6B64] mt-1">
                        {new Date(ord.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}{' '}
                        · {totalUnits} {totalUnits === 1 ? 'unit' : 'units'} ·{' '}
                        <strong className="text-[#0C0E13] font-mono font-semibold">{formatMoney(ord.total)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Line Items Preview */}
                  <div className="bg-white p-3 rounded-lg border border-[#EAE6DF] text-xs space-y-1.5 divide-y divide-[#F0EDE8]">
                    {ord.items.map((line, idx) => (
                      <div key={idx} className="flex justify-between items-center pt-1.5 first:pt-0">
                        <span className="text-[#3C3A36] font-medium">
                          {line.quantity}× {line.productName} ({line.flavor})
                        </span>
                        <span className="tabular-nums font-mono font-semibold text-[#0C0E13]">
                          {formatMoney(line.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#6F6B64]">
                      {ord.deliveryMethod} · {ord.paymentMethod}
                    </span>

                    <div className="flex items-center gap-2">
                      {ord.whatsappUrl && (
                        <a
                          href={ord.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#EAE6DF] hover:border-[#124E33] text-[#124E33] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Resend to Desk</span>
                        </a>
                      )}

                      <button
                        onClick={() => reorder(ord.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0C0E13] hover:bg-[#1E222B] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-[#242833]"
                      >
                        <Repeat className="w-3.5 h-3.5 text-[#D4B68D]" />
                        <span>Reorder Batch</span>
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
