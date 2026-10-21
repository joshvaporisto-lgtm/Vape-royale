import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="px-4 py-2.5 rounded-lg bg-[#0B0E14] text-white text-xs font-medium shadow-xl border border-amber-500/30 flex items-center gap-2.5 max-w-sm">
        <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
        </div>
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
