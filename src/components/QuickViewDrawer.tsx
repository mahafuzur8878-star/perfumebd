/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, Heart, ShieldCheck, HelpCircle, Star, Sparkles } from "lucide-react";
import { Product } from "../types";

interface QuickViewDrawerProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, size: string, price: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
}

export default function QuickViewDrawer({
  product,
  onClose,
  onAddToBag,
  isFavorite,
  onToggleFavorite
}: QuickViewDrawerProps) {
  const [selectedVolume, setSelectedVolume] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);

  // Initialize values when product changes
  useEffect(() => {
    if (product) {
      setSelectedVolume(product.volume);
      setCurrentPrice(product.price);
    }
  }, [product]);

  if (!product) return null;

  // Handle volume option selections
  const volumeOptions = [
    { label: "50ml / 1.7 fl oz", multiplier: 0.8 },
    { label: "100ml / 3.4 fl oz", multiplier: 1.0 },
    { label: "200ml / 6.8 fl oz", multiplier: 1.6 }
  ];

  const handleVolumeChange = (volLabel: string, multiplier: number) => {
    setSelectedVolume(volLabel);
    setCurrentPrice(Math.round(product.price * multiplier));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="quickview-overlay">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Drawer Window */}
        <div className="w-screen max-w-2xl bg-white border-l-2 border-brand-dark shadow-2xl flex flex-col h-full overflow-y-auto animate-slideLeft rounded-none font-sans">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-brand-dark/15 flex items-center justify-between bg-[#0f0f0f]/5">
            <span className="font-mono text-xs text-brand-dark/60 font-black uppercase tracking-widest">
              Olfactory Examination
            </span>
            <button
              onClick={onClose}
              className="p-1 px-2.5 border border-brand-dark/15 hover:bg-brand-orange hover:text-white text-brand-dark rounded-none font-black cursor-pointer transition-colors text-xs"
              id="close-quickview-btn"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>
          </div>

          <div className="flex-grow p-6 sm:p-8 space-y-8">
            
            {/* Upper grid (Image + general intro) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-brand-dark/10 pb-8">
              
              {/* Image Frame */}
              <div className="aspect-square bg-brand-gray flex items-center justify-center p-6 rounded-none border border-brand-dark/15 shadow-none hover:shadow-[4px_4px_0px_0px_#ff3e00] transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[90%] max-w-[90%] object-contain"
                />
              </div>

              {/* General Metadata */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-brand-orange text-white font-mono text-[9px] tracking-wider uppercase font-black px-2.5 py-1 rounded-none border-0">
                    {product.concentration}
                  </span>
                  <span className="bg-brand-dark text-white font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-none font-bold">
                    {product.collection}
                  </span>
                </div>

                <h2 className="font-sans font-black text-2xl tracking-tight uppercase text-brand-dark leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-2">
                  <div className="flex text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-orange text-transparent" />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-brand-dark/55 uppercase">
                    {product.rating ?? "4.8"} (62 Archives)
                  </span>
                </div>

                <p className="text-brand-dark/75 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Sizing Toggles */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#0c0c0c]/40 font-bold uppercase block">
                    Select Flacon Volume
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {volumeOptions.map((opt) => {
                      const isSelected = selectedVolume === opt.label || (product.id === "discovery-set-i" && opt.multiplier === 1.0);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => product.id !== "discovery-set-i" && handleVolumeChange(opt.label, opt.multiplier)}
                          disabled={product.id === "discovery-set-i"}
                          className={`px-3 py-2 text-xs font-mono tracking-wider transition-all border rounded-none text-left focus:outline-none cursor-pointer font-bold ${
                            isSelected
                              ? "bg-brand-orange border-brand-orange text-white"
                              : "bg-white border-brand-dark/15 text-brand-dark hover:border-brand-dark"
                          }`}
                          id={`volume-select-${opt.label.split(" ")[0]}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Show price */}
                <div className="pt-2">
                  <span className="font-sans font-black text-xl text-brand-dark">
                    ${currentPrice.toFixed(2)}
                  </span>
                </div>

              </div>

            </div>

            {/* Olfactory Pyramid (Top, heart, base ingredients) */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
                  The Olfactory Pyramid
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Top Notes */}
                <div className="p-4 bg-brand-gray rounded-none border border-brand-dark/10 space-y-1.5 hover:shadow-[3px_3px_0px_0px_#ff3e00] hover:border-brand-dark transition-all duration-200">
                  <div className="font-mono text-[9px] text-[#0f0f0f]/45 uppercase tracking-widest font-black">
                    Top Notes (Volatile)
                  </div>
                  <div className="font-serif italic text-xs text-brand-orange font-bold">
                    The Initial Greeting
                  </div>
                  <ul className="text-brand-dark text-[11px] sm:text-xs space-y-1 pt-1 ml-3 list-disc">
                    {product.notes.top.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>

                {/* Heart Notes */}
                <div className="p-4 bg-brand-gray rounded-none border border-brand-dark/10 space-y-1.5 hover:shadow-[3px_3px_0px_0px_#ff3e00] hover:border-brand-dark transition-all duration-200">
                  <div className="font-mono text-[9px] text-[#0f0f0f]/45 uppercase tracking-widest font-black">
                    Heart Notes (Heart)
                  </div>
                  <div className="font-serif italic text-xs text-brand-orange font-bold">
                    The Olfactory Identity
                  </div>
                  <ul className="text-brand-dark text-[11px] sm:text-xs space-y-1 pt-1 ml-3 list-disc">
                    {product.notes.heart.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>

                {/* Base Notes */}
                <div className="p-4 bg-brand-gray rounded-none border border-brand-dark/10 space-y-1.5 hover:shadow-[3px_3px_0px_0px_#ff3e00] hover:border-brand-dark transition-all duration-200">
                  <div className="font-mono text-[9px] text-[#0f0f0f]/45 uppercase tracking-widest font-black">
                    Base Notes (Dry Down)
                  </div>
                  <div className="font-serif italic text-xs text-brand-orange font-bold">
                    The Linger & Anchor
                  </div>
                  <ul className="text-brand-dark text-[11px] sm:text-xs space-y-1 pt-1 ml-3 list-disc">
                    {product.notes.base.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Long Editorial description */}
            <div className="space-y-3 pt-4 border-t border-brand-dark/10">
              <h4 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
                The Heritage Profile
              </h4>
              <p className="text-brand-dark/85 text-xs sm:text-sm leading-relaxed font-serif italic text-justify text-stone-700">
                &ldquo;{product.longDescription}&rdquo;
              </p>
            </div>

            {/* Quality Seals */}
            <div className="p-4 border border-brand-dark/15 bg-brand-gray rounded-none flex items-center justify-between text-[#0f0f0f]/45 font-mono font-bold text-[9px] uppercase">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>100% Extract Integrity</span>
              </div>
              <div className="h-4 w-px bg-brand-dark/10" />
              <span>Paris Atelier Standard</span>
              <div className="h-4 w-px bg-brand-dark/10" />
              <span>Complimentary Courier</span>
            </div>

          </div>

          {/* Action Row - Fixed at the bottom of the drawer */}
          <div className="p-6 border-t border-brand-dark/15 bg-brand-cream/80 flex items-center space-x-4">
            <button
              onClick={() => onToggleFavorite(product)}
              className={`p-3.5 border rounded-none flex items-center justify-center transition-all focus:outline-none cursor-pointer ${
                isFavorite
                  ? "border-brand-orange bg-brand-orange text-white"
                  : "border-brand-dark/15 bg-white hover:border-brand-dark text-brand-dark"
              }`}
              id="quickview-drawer-fav-btn"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => {
                onAddToBag(product, selectedVolume, currentPrice);
                onClose();
              }}
              className="flex-grow py-4 bg-brand-orange hover:bg-brand-dark text-white font-black text-xs tracking-widest uppercase rounded-none transition-colors duration-300 flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_#0f0f0f] border-0 focus:outline-none cursor-pointer"
              id="quickview-drawer-add-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Scent Bag — ${currentPrice.toFixed(2)}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
