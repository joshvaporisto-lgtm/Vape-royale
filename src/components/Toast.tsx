import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="px-4 py-2.5 rounded-full bg-[#1B1630] text-white text-xs font-semibold shadow-xl border border-white/10 flex items-center gap-2 max-w-sm">
        <div className="w-4 h-4 rounded-full bg-[#5B3DF5] flex items-center justify-center shrink-0">
          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
        </div>
        <span className="truncate">{toastMessage}</span>
      </div>
    </div>
  );
};
