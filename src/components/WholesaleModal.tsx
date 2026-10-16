import React, { useState } from 'react';
import { X, Building2, CheckCircle2, ShieldCheck, Zap, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WholesaleAccount } from '../types';

export const WholesaleModal: React.FC = () => {
  const {
    isWholesaleModalOpen,
    setIsWholesaleModalOpen,
    user,
    loginWholesale,
    registerWholesale,
    loadDemoWholesale,
    logout,
    setIsOrdersOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'apply' | 'login'>('apply');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  // Application form fields
  const [business, setBusiness] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ein, setEin] = useState('');
  const [license, setLicense] = useState('');
  const [region, setRegion] = useState('');
  const [storeType, setStoreType] = useState('Vape & Smoke Retailer');
  const [appError, setAppError] = useState('');

  if (!isWholesaleModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Enter your account email.');
      return;
    }
    const success = loginWholesale(loginEmail);
    if (success) {
      setIsWholesaleModalOpen(false);
    } else {
      setLoginError('No approved wholesale account found with that email. Try the demo or submit an application.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAppError('');
    if (!business.trim() || !contact.trim() || !email.trim() || !phone.trim() || !ein.trim() || !region.trim()) {
      setAppError('Please fill in all required business credentials.');
      return;
    }

    const newAccount: WholesaleAccount = {
      business,
      contact,
      email,
      phone,
      ein,
      license,
      region,
      type: storeType,
    };

    registerWholesale(newAccount);
    setIsWholesaleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E6E2EF] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2EF] bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#5B3DF5]" />
            <h2 className="font-['Unbounded'] text-base font-bold text-[#1B1630]">
              Wholesale Business Portal
            </h2>
          </div>
          <button
            onClick={() => setIsWholesaleModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {user ? (
            /* Logged in Wholesale Account Overview */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#EFEBFF] border border-[#5B3DF5]/30 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#5B3DF5] uppercase tracking-wider block">
                    Verified Wholesale Account
                  </span>
                  <h3 className="font-['Unbounded'] text-lg font-bold text-[#1B1630] mt-0.5">
                    {user.business}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {user.contact} · {user.email} · {user.region}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#E6E2EF] text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Business Registration / EIN:</span>
                  <span className="font-semibold text-slate-800">{user.ein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Tobacco/Vape License:</span>
                  <span className="font-semibold text-slate-800">{user.license || 'On File'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Store Classification:</span>
                  <span className="font-semibold text-slate-800">{user.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Tier Pricing:</span>
                  <span className="font-bold text-emerald-600">Active (Up to 20% off cases)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsWholesaleModalOpen(false);
                    setIsOrdersOpen(true);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#1B1630] hover:bg-[#322A56] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  View Wholesale Past Orders
                </button>
                <button
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full border border-slate-200 hover:border-red-300 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated: Tabs for Apply & Login */
            <div className="space-y-5">
              {/* Demo Pre-fill Shortcut Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#EFEBFF] to-white border border-[#5B3DF5]/30 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <strong className="text-[#5B3DF5] block">Quick Evaluator Shortcut</strong>
                  <span className="text-slate-600">
                    Instant login as verified shop (Apex Vapor & Smoke LLC)
                  </span>
                </div>
                <button
                  onClick={loadDemoWholesale}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Load Demo</span>
                </button>
              </div>

              {/* Segmented Control Tabs */}
              <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setActiveTab('apply')}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'apply'
                      ? 'bg-white text-[#1B1630] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Apply for Wholesale
                </button>
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-[#1B1630] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Account Login
                </button>
              </div>

              {activeTab === 'login' ? (
                /* Login Form */
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. buyers@smokestore.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Log In to Wholesale Portal
                  </button>
                </form>
              ) : (
                /* Application Form */
                <form onSubmit={handleRegister} className="space-y-3.5">
                  {appError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                      {appError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Metro Smoke & Vapor Inc"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Miller"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jordan@metrosmoke.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 555-890-1234"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tax ID / EIN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 12-3456789"
                        value={ein}
                        onChange={(e) => setEin(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Retail Vapor License (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LIC-89230"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dallas, TX"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business Type
                      </label>
                      <select
                        value={storeType}
                        onChange={(e) => setStoreType(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6E2EF] focus:outline-none focus:border-[#5B3DF5] bg-[#FAF8FD]"
                      >
                        <option>Vape & Smoke Retailer</option>
                        <option>Convenience / Gas Station</option>
                        <option>Wholesale Sub-Distributor</option>
                        <option>Hookah & Cigar Lounge</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Accounts are registered instantly in this demo environment with immediate case-tier access.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-full bg-[#5B3DF5] hover:bg-[#4A2FE0] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Wholesale Application
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
