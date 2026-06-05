/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface HeaderProps {
  setCurrentView: (view: string) => void;
}

export default function Header({
  setCurrentView
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-cream/90 backdrop-blur-md border-b border-brand-dark/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20 font-sans" id="header-navigation-wrapper">
          
          {/* Centered Brand/Logo */}
          <button
            onClick={() => setCurrentView("home")}
            className="flex flex-col items-center focus:outline-none group text-center cursor-pointer"
            id="nav-logo"
          >
            <span className="font-sans font-black tracking-[0.15em] text-brand-dark text-xl uppercase transition-colors duration-300 group-hover:text-brand-orange">
              PERFUME BD
            </span>
            <span className="font-mono text-[9px] text-brand-dark/50 tracking-[0.3em] uppercase pl-0.5 mt-0.5">
              Haute Parfumerie
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}
