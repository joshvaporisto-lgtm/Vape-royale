export type CategoryId =
  | 'disposables'
  | 'eliquids'
  | 'podkits'
  | 'pods'
  | 'devices'
  | 'accessories';

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface PricingTier {
  min: number;
  off: number;
  label: string;
}

export interface Product {
  id: string;
  cat: CategoryId;
  brand: string;
  name: string;
  price: number; // Wholesale unit list price
  pack: number;  // Wholesale pack size (e.g. 10 per box)
  nic: string;   // e.g. "5%", "35mg / 50mg", "—"
  hue: number;   // Color degree for dynamic SVG artwork
  stock: number;
  isNew: boolean;
  desc: string;
  flavors: string[];
  image?: string;
}

export interface CartItem {
  key: string;       // "productId|flavor"
  productId: string;
  flavor: string;
  quantity: number;
}

export interface WholesaleAccount {
  business: string;
  contact: string;
  email: string;
  phone: string;
  ein: string;
  license?: string;
  region: string;
  type: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  email?: string;
  contact: string;
  phone: string;
  business?: string;
  items: {
    productId: string;
    productName: string;
    flavor: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  address: string;
  notes?: string;
  status: string;
  whatsappUrl: string;
}

export interface StoreConfig {
  name: string;
  whatsapp: string;
  currency: string;
  freeShippingThreshold: number;
  deliveryFee: number;
  expressFee: number;
  freeRetail?: number;
  freeWholesale?: number;
  retailMarkup?: number;
}
