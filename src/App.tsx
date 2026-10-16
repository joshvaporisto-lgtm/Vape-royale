import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VolumeCalculator } from './components/VolumeCalculator';
import { CatalogSection } from './components/CatalogSection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WholesaleModal } from './components/WholesaleModal';
import { OrdersModal } from './components/OrdersModal';
import { ContactModal } from './components/ContactModal';
import { AgeGateModal } from './components/AgeGateModal';
import { MobileTabBar } from './components/MobileTabBar';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#F6F4FA] text-[#1B1630] flex flex-col font-sans selection:bg-[#5B3DF5] selection:text-white">
        {/* Navigation & Header */}
        <Header />

        {/* Main Content Areas */}
        <main className="flex-1">
          <Hero />
          <VolumeCalculator />
          <CatalogSection />
          <HowItWorks />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <WholesaleModal />
        <OrdersModal />
        <ContactModal />
        <AgeGateModal />

        {/* Mobile Navigation & Floating Actions */}
        <MobileTabBar />
        <Toast />
      </div>
    </StoreProvider>
  );
}
