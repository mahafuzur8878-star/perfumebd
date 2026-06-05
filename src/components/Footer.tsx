/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, HelpCircle, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0c0c0c] text-white/70 font-sans border-t border-brand-dark" id="main-footer">
      
      {/* Newsletter Block: "Join the Inner Circle" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-12 xl:col-span-5 space-y-3">
            <h3 className="font-sans font-black tracking-[0.1em] text-white text-lg sm:text-xl uppercase">
              Join the Inner Circle
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md font-serif italic">
              Receive bespoke invitations, olfactory storytelling from Grasse, and first access to private reserve creations.
            </p>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            {subscribed ? (
              <div 
                className="p-6 border border-brand-orange bg-brand-orange/5 rounded-none text-center text-xs sm:text-sm text-white animate-fadeIn"
                id="newsletter-success"
              >
                <div className="font-serif italic text-brand-orange mb-1.5 text-base">Vous êtes membre.</div>
                Welcome to the Inner Circle. Olfactory archives and exclusive private accesses have been dispatched.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 font-sans" id="newsletter-form">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for private listings"
                    className="w-full bg-brand-dark/40 border border-white/15 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 text-white rounded-none px-4 py-3.5 text-xs tracking-wider transition-all placeholder:text-white/40 focus:outline-none"
                    id="newsletter-email-input"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-4 bg-brand-orange hover:bg-white hover:text-brand-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-none transition-all duration-300 flex items-center justify-center space-x-2 group focus:outline-none cursor-pointer"
                  id="newsletter-submit-btn"
                >
                  <span>Submit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 font-sans">
        
        {/* Brand Mission */}
        <div className="col-span-2 md:col-span-1 space-y-5">
          <div className="font-sans font-black tracking-[0.25em] text-white text-base">
            PERFUME BD
          </div>
          <p className="text-white/60 text-xs leading-relaxed font-sans font-normal">
            Crafted with hand-molded crystal sand from Fontainebleau and pure Centifolia Rose from Grasse, Perfume BD honors the pure ancestry of steam and absolute extraction.
          </p>
          <div className="flex items-center space-x-2.5 text-xs text-brand-orange">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-white/60 font-mono tracking-wider text-[10px]">France / Paris Atelier</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="font-sans font-bold uppercase text-white text-xs tracking-widest">
            Olfactory Library
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60 font-sans">
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">The Signature Series</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Les Saisons Collection</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Extrait de Parfum Reserve</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Custom Olfactory Flight</span></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h4 className="font-sans font-bold uppercase text-white text-xs tracking-widest">
            Story & Craft
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60 font-sans">
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Sourcing Grasse Petals</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Ancestral Distillation</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Olfactory Pyramid Guide</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Master Glassblowers</span></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="font-sans font-bold uppercase text-white text-xs tracking-widest">
            Atelier Consultations
          </h4>
          <ul className="space-y-2.5 text-xs text-white/60 font-sans">
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Bespoke Aroma profiling</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Private Lounge Booking</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Shipping & Concierge</span></li>
            <li><span className="hover:text-brand-orange cursor-pointer transition-colors">Return Archives</span></li>
          </ul>
        </div>

      </div>

      {/* Copyright/Legal section */}
      <div className="bg-[#060606] text-white/40 py-8 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left text-[10px] tracking-wider uppercase">
            <span>&copy; {new Date().getFullYear()} Perfume BD. Registered Maison de Haute Parfumerie.</span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-brand-orange cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">Terms of Extraction</span>
            <span className="hover:text-brand-orange cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
