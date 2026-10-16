import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AgeGateModal: React.FC = () => {
  const { ageVerified, verifyAge } = useStore();
  const [denied, setDenied] = useState(false);

  if (ageVerified) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E6E2EF] text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#EFEBFF] text-[#5B3DF5] flex items-center justify-center mb-4 shadow-sm">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 id="age-gate-title" className="font-['Unbounded'] text-xl sm:text-2xl font-bold text-[#1B1630]">
          Are you of legal age?
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          This storefront features adult nicotine and vapor products. You must be at least 18 years old, or 21+ where required by regional law, to enter.
        </p>

        {denied && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
            <span>Access denied. You must be of legal age to view or purchase from this store.</span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => verifyAge(true)}
            className="flex-1 py-3.5 px-5 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white font-bold text-xs shadow-md shadow-[#5B3DF5]/20 transition-all cursor-pointer"
          >
            I am 18+ / 21+ (Enter)
          </button>
          <button
            onClick={() => setDenied(true)}
            className="py-3.5 px-5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
          >
            I am Underage
          </button>
        </div>

        <p className="mt-5 text-[11px] text-slate-400">
          Age verification is mandatory for legal compliance. Demo transactions are dispatched over WhatsApp.
        </p>
      </div>
    </div>
  );
};
