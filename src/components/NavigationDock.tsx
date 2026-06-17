/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Home, Layers, Search, Sparkles, ShoppingBag, User } from "lucide-react";
import { CartItem } from "../types";

interface NavigationDockProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsQuizOpen: (open: boolean) => void;
  isAuthenticated: boolean;
}

export default function NavigationDock({
  currentView,
  setCurrentView,
  cart,
  setIsCartOpen,
  setIsSearchOpen,
  setIsQuizOpen,
  isAuthenticated
}: NavigationDockProps) {
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const navItems = [
    { id: "home", label: "Home", icon: Home, type: "view" },
    { id: "collections", label: "Collections", icon: Layers, type: "view" },
    { id: "matcher", label: "Scent Matcher", icon: Sparkles, type: "action", action: () => setIsQuizOpen(true) },
    { id: "search", label: "Search", icon: Search, type: "action", action: () => setIsSearchOpen(true) },
    { id: "cart", label: "Scent Bag", icon: ShoppingBag, type: "action", action: () => setIsCartOpen(true), badge: totalCartCount },
    { id: isAuthenticated ? "profile" : "login", label: "Profile", icon: User, type: "view" },
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    if (item.type === "action" && item.action) {
      item.action();
    } else {
      setCurrentView(item.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-fadeIn" 
      id="floating-navigation-dock-container"
    >
      <div 
        className="bg-brand-cream/95 backdrop-blur-md border border-brand-dark/15 sm:border-2 sm:border-brand-dark p-1.5 sm:p-2 shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_0px_#ff3e00] hover:border-brand-dark transition-all duration-300"
        id="floating-navigation-dock"
      >
        <div className="flex items-center justify-between sm:justify-around text-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            // For the profile/login tab, consider it active if currentView is login, signup, or profile.
            const isProfileTab = item.icon === User;
            const isActive = item.type === "view" && 
              (isProfileTab 
                ? (currentView === "profile" || currentView === "login" || currentView === "signup") 
                : currentView === item.id);
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex-1 flex flex-col items-center justify-center py-1 px-1 sm:px-2 text-center transition-all duration-300 relative focus:outline-none cursor-pointer group ${
                  isActive 
                    ? "text-brand-orange" 
                    : "text-brand-dark/65 hover:text-brand-dark"
                }`}
                id={`dock-nav-item-${item.id}`}
              >
                {/* Visual state indicator dot */}
                {isActive && (
                  <span className="absolute -top-0.5 sm:top-0 w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                )}

                {/* Styled icon box */}
                <div className={`p-1.5 mb-0.5 transition-all duration-300 rounded-none relative ${
                  isActive 
                    ? "bg-brand-orange/10 scale-105" 
                    : "group-hover:bg-brand-gray/50 group-hover:scale-102"
                }`}>
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ${
                    isActive ? "text-brand-orange stroke-[2.5]" : "text-brand-dark/70 group-hover:text-brand-dark stroke-[2]"
                  }`} />
                  
                  {/* Badge Counter */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-orange text-white font-mono text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white shadow animate-bounce">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Human legible text */}
                <span className={`text-[8px] sm:text-[9.5px] font-sans font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 leading-none ${
                  isActive ? "text-brand-orange" : "text-brand-dark/55 group-hover:text-brand-dark"
                }`}>
                  {item.label}
                </span>

                {/* Fine interactive indicator ribbon */}
                <span className={`absolute bottom-0 left-2 right-2 h-[2px] bg-brand-orange transition-all duration-300 origin-center scale-x-0 ${
                  isActive ? "scale-x-100" : "group-hover:scale-x-50"
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
