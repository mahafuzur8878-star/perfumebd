/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Product, CartItem, UserProfile, Order, Consultation, JournalPost } from "./types";
import { PRODUCTS, JOURNAL_POSTS, INITIAL_PROFILE, INITIAL_ORDERS, INITIAL_CONSULTATIONS } from "./data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import CollectionsView from "./views/CollectionsView";
import JournalView from "./views/JournalView";
import AboutView from "./views/AboutView";
import ProfileView from "./views/ProfileView";
import QuickViewDrawer from "./components/QuickViewDrawer";
import SearchOverlay from "./components/SearchOverlay";
import CartSidebar from "./components/CartSidebar";
import OlfactoryQuiz from "./components/OlfactoryQuiz";
import NavigationDock from "./components/NavigationDock";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";

export default function App() {
  // Navigation & Workspace views
  const [currentView, setCurrentView] = useState<string>("home");

  // Global Overlay States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState<Product | null>(null);
  const [selectedJournalArticle, setSelectedJournalArticle] = useState<JournalPost | null>(null);

  // Core Scent Bag Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("perfume_bd_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem("perfume_bd_auth");
    return saved ? JSON.parse(saved) : false;
  });

  // Favorites (Scent library favorites) state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("perfume_bd_favorites");
    return saved ? JSON.parse(saved) : ["aurum-botanica", "santal-noir"];
  });

  // Profile Dashboard details state
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("perfume_bd_profile");
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("perfume_bd_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem("perfume_bd_consultations");
    return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
  });

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem("perfume_bd_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("perfume_bd_auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("perfume_bd_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("perfume_bd_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("perfume_bd_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("perfume_bd_consultations", JSON.stringify(consultations));
  }, [consultations]);

  // Core Cart Operations
  const handleAddToBag = (product: Product, volume: string = "100ml / 3.4 fl oz", customPrice: number | null = null) => {
    const finalPrice = customPrice ?? product.price;
    const finalVolume = product.id === "discovery-set-i" ? "3 x 10ml vials" : volume;

    setCart((prev) => {
      const matchIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVolume === finalVolume
      );

      if (matchIndex > -1) {
        // Increment quantity
        const updated = [...prev];
        updated[matchIndex].quantity += 1;
        return updated;
      } else {
        // Create new item
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedVolume: finalVolume,
            priceAtSelection: finalPrice
          }
        ];
      }
    });

    // Automatically trigger cart lateral sidebar pullout opening
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, volume: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVolume === volume) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string, volume: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedVolume === volume))
    );
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCart([]); // Clear the bag on complete order
  };

  // Toggle Scent Favorites Matches
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const hasFav = prev.includes(product.id);
      if (hasFav) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });

    // Sync elements inside profile elements notes saved
    const note = product.category;
    if (!profile.notesSaved.includes(note)) {
      setProfile({
        ...profile,
        notesSaved: [...profile.notesSaved, note]
      });
    }
  };

  // Switch overlay toggle checks
  const handleOpenQuickView = (product: Product) => {
    setSelectedQuickProduct(product);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-dark font-serif" id="applet-primary">
      
      {/* Editorial/Bespoke announcement subbar ribbon */}
      <div className="w-full bg-brand-orange text-white py-2 px-4 text-[10px] sm:text-xs tracking-[0.25em] font-sans uppercase text-center font-bold">
        <span>Complimentary Maison Courier Dispatch on all orders exceeding $150</span>
      </div>

      {/* Main Luxury Navigation Header */}
      <Header
        setCurrentView={setCurrentView}
      />

      {/* Dynamic Render Sandbox Space based on Navigation Tabs */}
      <main className="flex-grow">
        {currentView === "home" && (
          <HomeView
            onQuickView={handleOpenQuickView}
            onAddToBag={(p) => handleAddToBag(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            setCurrentView={setCurrentView}
            setSelectedArticle={setSelectedJournalArticle}
          />
        )}

        {currentView === "collections" && (
          <CollectionsView
            onQuickView={handleOpenQuickView}
            onAddToBag={(p) => handleAddToBag(p)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "journal" && (
          <JournalView
            selectedArticle={selectedJournalArticle}
            setSelectedArticle={setSelectedJournalArticle}
          />
        )}

        {currentView === "about" && <AboutView />}

        {currentView === "profile" && (
          <ProfileView
            profile={profile}
            setProfile={setProfile}
            orders={orders}
            consultations={consultations}
            setConsultations={setConsultations}
            onQuickView={handleOpenQuickView}
          />
        )}

        {currentView === "login" && (
          <LoginView
            setCurrentView={setCurrentView}
            setIsAuthenticated={setIsAuthenticated}
            setProfile={setProfile}
            setOrders={setOrders}
            setConsultations={setConsultations}
          />
        )}

        {currentView === "signup" && (
          <SignupView
            setCurrentView={setCurrentView}
            setIsAuthenticated={setIsAuthenticated}
            setProfile={setProfile}
            setOrders={setOrders}
            setConsultations={setConsultations}
          />
        )}
      </main>

      {/* Flagship Brand Footer with Newsletter triggers */}
      <Footer />

      {/* GLOBAL SYSTEM OVERLAYS */}

      {/* 1. Quick View Olfactory Drawer */}
      <QuickViewDrawer
        product={selectedQuickProduct}
        onClose={() => setSelectedQuickProduct(null)}
        onAddToBag={handleAddToBag}
        isFavorite={selectedQuickProduct ? favorites.includes(selectedQuickProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Olfactory Finder Keyword Search assistant */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={handleOpenQuickView}
        onAddToBag={(p) => handleAddToBag(p)}
      />

      {/* 3. Sliding lateral Cart Sidebar Scent Bag panel */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* 4. Personality Olfactory Matching Quiz */}
      <OlfactoryQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onQuickView={handleOpenQuickView}
        onAddToBag={(p) => handleAddToBag(p)}
      />

      {/* 5. Persistent Floating Custom Navigation Dock */}
      <NavigationDock
        currentView={currentView}
        setCurrentView={setCurrentView}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsQuizOpen={setIsQuizOpen}
        isAuthenticated={isAuthenticated}
      />

    </div>
  );
}
