import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const AgeGateModal: React.FC = () => {
  const { ageVerified, verifyAge } = useStore();
  const [denied, setDenied] = useState(false);

  if (ageVerified) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B10]/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-center flex flex-col items-center">
        <Logo size="lg" className="mb-4" />

        <h2 id="age-gate-title" className="text-lg sm:text-xl font-bold text-[#0B0E14]">
          Age Verification Required
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
          This portal distributes adult nicotine and inhalation vapor products. You must be at least 21 years of age (or 18+ where governed by local jurisdiction) to enter.
        </p>

        {denied && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>Access restricted. You must meet legal age requirements to view or order from this catalog.</span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5 w-full">
          <button
            onClick={() => verifyAge(true)}
            className="flex-1 py-3 px-4 rounded-lg bg-[#0B0E14] hover:bg-stone-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-sm border border-stone-900"
          >
            I am 21 or older (Enter)
          </button>
          <button
            onClick={() => setDenied(true)}
            className="py-3 px-4 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Under Legal Age
          </button>
        </div>

        <p className="mt-4 text-[11px] text-stone-400">
          Strict age gate verification is mandated by federal and regional tobacco laws.
        </p>
      </div>
    </div>
  );
};
