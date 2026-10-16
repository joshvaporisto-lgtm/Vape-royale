import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  CategoryId,
  OrderRecord,
  PricingTier,
  Product,
  WholesaleAccount,
} from '../types';
import {
  CATEGORIES,
  DEMO_WHOLESALE_ACCOUNT,
  PRICING_TIERS,
  PRODUCTS,
  STORE_CONFIG,
} from '../data/storeData';

interface CartLineItem {
  key: string;
  product: Product;
  flavor: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface CheckoutData {
  contact: string;
  phone: string;
  business?: string;
  street: string;
  city: string;
  landmark?: string;
  shipMethod: 'standard' | 'express' | 'pickup';
  payMethod: 'cod' | 'momo' | 'bank';
  notes?: string;
}

interface StoreContextType {
  // Navigation / Modal States
  activeCategory: CategoryId | 'all';
  setActiveCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  stockOnly: boolean;
  setStockOnly: (val: boolean) => void;
  newOnly: boolean;
  setNewOnly: (val: boolean) => void;
  sortBy: 'featured' | 'popular' | 'price-asc' | 'price-desc' | 'name';
  setSortBy: (sort: 'featured' | 'popular' | 'price-asc' | 'price-desc' | 'name') => void;

  // Selected Product PDP Modal
  activeProductId: string | null;
  setActiveProductId: (id: string | null) => void;

  // Drawer / Modal triggers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWholesaleModalOpen: boolean;
  setIsWholesaleModalOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;

  // User & Wholesale Mode
  user: WholesaleAccount | null;
  isWholesaleMode: boolean;
  toggleWholesaleMode: () => void;
  loginWholesale: (email: string) => boolean;
  registerWholesale: (account: WholesaleAccount) => void;
  loadDemoWholesale: () => void;
  logout: () => void;

  // Cart Management
  cart: Record<string, number>;
  cartLineItems: CartLineItem[];
  cartCount: number;
  cartSubtotal: number;
  cartListTotal: number;
  cartSavings: number;
  freeShippingThreshold: number;
  addToCart: (productId: string, flavor: string, quantity: number) => void;
  updateCartQty: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;

  // Price calculations
  getRetailPrice: (p: Product) => number;
  getUnitPrice: (p: Product, unitsOfThisProduct: number) => number;
  getUnitsInCartForProduct: (productId: string) => number;
  getTierForUnits: (units: number) => PricingTier;
  formatMoney: (amount: number) => string;

  // Orders
  orders: OrderRecord[];
  submitWhatsAppOrder: (data: CheckoutData) => { url: string; orderId: string };
  reorder: (orderId: string) => void;

  // Age Gate
  ageVerified: boolean;
  verifyAge: (verified: boolean) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & filtering states
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [stockOnly, setStockOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Modals & Sheets
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Persistent user & preview state
  const [user, setUser] = useState<WholesaleAccount | null>(() => {
    try {
      const stored = localStorage.getItem('sh_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [previewWholesale, setPreviewWholesale] = useState(false);
  const isWholesaleMode = Boolean(user) || previewWholesale;

  const toggleWholesaleMode = () => {
    if (user) {
      showToast('You are logged in as a verified wholesale account');
    } else {
      setPreviewWholesale((prev) => {
        const next = !prev;
        showToast(next ? 'Wholesale Case Pricing Enabled' : 'Retail Pricing Enabled');
        return next;
      });
    }
  };

  // Age verification state
  const [ageVerified, setAgeVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sh_age_verified') === 'true';
    } catch {
      return false;
    }
  });

  const verifyAge = (verified: boolean) => {
    setAgeVerified(verified);
    try {
      localStorage.setItem('sh_age_verified', String(verified));
    } catch {
      // storage unavailable
    }
  };

  // Cart state: Record of "productId|flavor" -> quantity
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('sh_cart');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sh_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Orders state
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem('sh_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sh_orders', JSON.stringify(orders));
    } catch {
      // storage unavailable
    }
  }, [orders]);

  // Pricing calculations
  const formatMoney = (amount: number) => {
    return `${STORE_CONFIG.currency}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const getRetailPrice = (p: Product) => {
    return Math.ceil(p.price * STORE_CONFIG.retailMarkup) - 0.01;
  };

  const getTierForUnits = (units: number): PricingTier => {
    return [...PRICING_TIERS].reverse().find((t) => units >= t.min) || PRICING_TIERS[0];
  };

  const getUnitsInCartForProduct = (productId: string): number => {
    return Object.entries(cart)
      .filter(([key]) => key.startsWith(`${productId}|`))
      .reduce((acc, [, qty]) => acc + qty, 0);
  };

  const getUnitPrice = (p: Product, unitsOfThisProduct: number) => {
    if (!isWholesaleMode) {
      return getRetailPrice(p);
    }
    const tier = getTierForUnits(Math.max(unitsOfThisProduct, 1));
    return Number((p.price * (1 - tier.off)).toFixed(2));
  };

  // Cart derived calculations
  const cartLineItems = useMemo(() => {
    return Object.entries(cart)
      .map(([key, quantity]) => {
        const [productId, flavor] = key.split('|');
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product || quantity <= 0) return null;

        const totalUnitsForProduct = getUnitsInCartForProduct(productId);
        const unitPrice = getUnitPrice(product, totalUnitsForProduct);
        const subtotal = Number((unitPrice * quantity).toFixed(2));

        return {
          key,
          product,
          flavor,
          quantity,
          unitPrice,
          subtotal,
        };
      })
      .filter((item): item is CartLineItem => item !== null);
  }, [cart, isWholesaleMode]);

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((acc, q) => acc + q, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cartLineItems.reduce((acc, item) => acc + item.subtotal, 0);
  }, [cartLineItems]);

  const cartListTotal = useMemo(() => {
    return cartLineItems.reduce((acc, item) => {
      const basePrice = isWholesaleMode ? item.product.price : getRetailPrice(item.product);
      return acc + basePrice * item.quantity;
    }, 0);
  }, [cartLineItems, isWholesaleMode]);

  const cartSavings = useMemo(() => {
    return Math.max(0, Number((cartListTotal - cartSubtotal).toFixed(2)));
  }, [cartListTotal, cartSubtotal]);

  const freeShippingThreshold = isWholesaleMode ? STORE_CONFIG.freeWholesale : STORE_CONFIG.freeRetail;

  // Cart actions
  const addToCart = (productId: string, flavor: string, quantity: number) => {
    if (quantity <= 0) return;
    const key = `${productId}|${flavor}`;
    setCart((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + quantity,
    }));
    showToast(`Added ${quantity} units (${flavor}) to cart`);
  };

  const updateCartQty = (key: string, delta: number) => {
    const [productId] = key.split('|');
    const product = PRODUCTS.find((p) => p.id === productId);
    const step = isWholesaleMode && product ? product.pack : 1;

    setCart((prev) => {
      const current = prev[key] || 0;
      const next = current + delta * step;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    showToast('Removed item from cart');
  };

  const clearCart = () => {
    setCart({});
  };

  // Wholesale account actions
  const loginWholesale = (email: string) => {
    try {
      const stored = localStorage.getItem(`sh_acct_${email.toLowerCase().trim()}`);
      if (stored) {
        const account = JSON.parse(stored);
        setUser(account);
        localStorage.setItem('sh_user', JSON.stringify(account));
        showToast(`Welcome back, ${account.business}`);
        return true;
      }
    } catch {
      // storage error
    }
    return false;
  };

  const registerWholesale = (account: WholesaleAccount) => {
    setUser(account);
    try {
      localStorage.setItem('sh_user', JSON.stringify(account));
      localStorage.setItem(`sh_acct_${account.email.toLowerCase().trim()}`, JSON.stringify(account));
    } catch {
      // storage error
    }
    showToast(`Wholesale account registered for ${account.business}`);
  };

  const loadDemoWholesale = () => {
    registerWholesale(DEMO_WHOLESALE_ACCOUNT);
    setIsWholesaleModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setPreviewWholesale(false);
    try {
      localStorage.removeItem('sh_user');
    } catch {
      // storage error
    }
    showToast('Logged out of wholesale account');
  };

  // Order submission
  const submitWhatsAppOrder = (data: CheckoutData) => {
    const orderId = `SH-${Date.now().toString().slice(-6)}`;
    const free = freeShippingThreshold;
    const isFree = cartSubtotal >= free;

    let deliveryFee = 0;
    let deliveryLabel = 'Standard Delivery (1–3 days)';

    if (data.shipMethod === 'pickup') {
      deliveryFee = 0;
      deliveryLabel = 'Store Pickup (Free)';
    } else if (data.shipMethod === 'express') {
      deliveryFee = STORE_CONFIG.expressFee;
      deliveryLabel = 'Same-Day Express';
    } else {
      deliveryFee = isFree ? 0 : STORE_CONFIG.deliveryFee;
      deliveryLabel = `Standard Delivery (${isFree ? 'Free' : formatMoney(STORE_CONFIG.deliveryFee)})`;
    }

    const grandTotal = cartSubtotal + deliveryFee;

    const payLabels = {
      cod: 'Cash on Delivery',
      momo: 'Mobile Money',
      bank: 'Bank Wire / Transfer',
    };

    // Construct formatted WhatsApp message with markdown
    const messageLines = [
      `*New ${isWholesaleMode ? 'Wholesale' : 'Retail'} Order ${orderId}*`,
      `📅 ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      '',
      '*Order Items:*',
      ...cartLineItems.map(
        (item) =>
          `• ${item.quantity}× ${item.product.name} [${item.flavor}] @ ${formatMoney(item.unitPrice)} = ${formatMoney(item.subtotal)}`
      ),
      '',
      `Subtotal: ${formatMoney(cartSubtotal)}`,
      ...(cartSavings > 0 ? [`Volume Savings: -${formatMoney(cartSavings)}`] : []),
      `${deliveryLabel}: ${deliveryFee === 0 ? 'Free' : formatMoney(deliveryFee)}`,
      `*Total: ${formatMoney(grandTotal)}*`,
      '',
      '*Customer Information:*',
      `👤 Name: ${data.contact}`,
      ...(data.business ? [`🏢 Business: ${data.business}`] : []),
      `📞 Phone: ${data.phone}`,
      data.shipMethod === 'pickup'
        ? '📦 Fulfillment: Customer Pickup'
        : `📍 Address: ${data.street}, ${data.city}${data.landmark ? ` (${data.landmark})` : ''}`,
      `💳 Payment: ${payLabels[data.payMethod]}`,
      ...(data.notes ? [`📝 Notes: ${data.notes}`] : []),
      '',
      '_Please reply to confirm inventory reservation and dispatch timeframe._',
    ];

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodedText}`;

    const newOrder: OrderRecord = {
      id: orderId,
      date: new Date().toISOString(),
      email: user?.email,
      contact: data.contact,
      phone: data.phone,
      business: data.business,
      items: cartLineItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        flavor: item.flavor,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.subtotal,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      deliveryMethod: deliveryLabel,
      paymentMethod: payLabels[data.payMethod],
      address: data.shipMethod === 'pickup' ? 'Store Pickup' : `${data.street}, ${data.city}`,
      notes: data.notes,
      status: 'Sent on WhatsApp',
      whatsappUrl,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);

    return { url: whatsappUrl, orderId };
  };

  const reorder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    let addedCount = 0;
    target.items.forEach((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (product && product.stock > 0) {
        const key = `${item.productId}|${item.flavor}`;
        setCart((prev) => ({
          ...prev,
          [key]: (prev[key] || 0) + item.quantity,
        }));
        addedCount += item.quantity;
      }
    });

    if (addedCount > 0) {
      showToast(`Added ${addedCount} units from order ${target.id} to cart`);
      setIsOrdersOpen(false);
      setIsCartOpen(true);
    } else {
      showToast('Items from that order are currently out of stock');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedBrand,
        setSelectedBrand,
        stockOnly,
        setStockOnly,
        newOnly,
        setNewOnly,
        sortBy,
        setSortBy,

        activeProductId,
        setActiveProductId,

        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWholesaleModalOpen,
        setIsWholesaleModalOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isContactOpen,
        setIsContactOpen,

        user,
        isWholesaleMode,
        toggleWholesaleMode,
        loginWholesale,
        registerWholesale,
        loadDemoWholesale,
        logout,

        cart,
        cartLineItems,
        cartCount,
        cartSubtotal,
        cartListTotal,
        cartSavings,
        freeShippingThreshold,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,

        getRetailPrice,
        getUnitPrice,
        getUnitsInCartForProduct,
        getTierForUnits,
        formatMoney,

        orders,
        submitWhatsAppOrder,
        reorder,

        ageVerified,
        verifyAge,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
