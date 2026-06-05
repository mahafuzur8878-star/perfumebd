/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  collection: string;
  category: string; // e.g. "Floral", "Woody", "Citrus", "Oriental", "Oud"
  concentration: "Eau de Parfum" | "Extrait de Parfum" | "Discovery Set";
  volume: string; // e.g. "100ml / 3.4 fl oz"
  description: string;
  longDescription: string;
  image: string;
  isNewArrival?: boolean;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
  priceAtSelection: number;
}

export interface JournalPost {
  id: string;
  title: string;
  category: "Extraction" | "Scent Theory" | "Craftsmanship" | "Heritage";
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  bgImage: string;
  tag?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "In Transit" | "Delivered" | "Processing";
  items: {
    productName: string;
    quantity: number;
    price: number;
    volume: string;
    image: string;
  }[];
  total: number;
  trackingNumber?: string;
}

export interface Consultation {
  id: string;
  date: string;
  time: string;
  expertName: string;
  type: "Olfactory Identity" | "Wedding Scent Profiling" | "Bespoke Curation";
  status: "Confirmed" | "Completed" | "Pending";
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  shippingAddress: string;
  signatureScentId: string;
  notesSaved: string[];
}
