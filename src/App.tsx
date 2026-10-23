import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersModal } from './components/OrdersModal';
import { AgeGateModal } from './components/AgeGateModal';
import { MobileTabBar } from './components/MobileTabBar';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#12141A] flex flex-col font-sans selection:bg-[#0C0E13] selection:text-[#D4B68D] antialiased">
        {/* Navigation & Header */}
        <Header />

        {/* Main Content Areas */}
        <main className="flex-1">
          <Hero />
          <CatalogSection />
          <HowItWorks />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrdersModal />
        <AgeGateModal />

        {/* Mobile Navigation & Floating Actions */}
        <MobileTabBar />
        <Toast />
      </div>
    </StoreProvider>
  );
}
