/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Search, Sparkles, Sliders, ArrowRight, CornerDownRight } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onQuickView,
  onAddToBag
}: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Vetiver essence",
    "Jasmine absolute",
    "Discovery set"
  ]);

  const trendingSearches = [
    "Santal Noir",
    "Aurum Botanica",
    "May Rose",
    "Bespoke Collection"
  ];

  const noteCategories = [
    { name: "Floral", count: 2, desc: "Delicate spring blossoms" },
    { name: "Woody", count: 1, desc: "Aromatic ancient heartwoods" },
    { name: "Citrus", count: 1, desc: "Vibrant zesty sparklers" },
    { name: "Oriental", count: 2, desc: "Warm spices and resins" }
  ];

  // Perform filtering live as searchQuery changes
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PRODUCTS.filter(
      (prod) =>
        prod.name.toLowerCase().includes(query) ||
        prod.collection.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query) ||
        prod.notes.top.some((note) => note.toLowerCase().includes(query)) ||
        prod.notes.heart.some((note) => note.toLowerCase().includes(query)) ||
        prod.notes.base.some((note) => note.toLowerCase().includes(query))
    );
    setResults(filtered);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleRecentClick = (term: string) => {
    // extract base term word, e.g. "Vetiver"
    const parsed = term.split(" ")[0];
    setSearchQuery(parsed);
  };

  const handleNoteClick = (note: string) => {
    setSearchQuery(note);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 3)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="search-overlay-container">
      
      {/* Dark backdrop with blur */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Search Overlay Panel */}
        <div className="w-screen max-w-lg bg-white border-l-2 border-brand-dark shadow-2xl flex flex-col h-full overflow-y-auto animate-slideLeft rounded-none font-sans">
          
          {/* Top Panel Close */}
          <div className="px-6 py-6 border-b border-brand-dark/15 flex items-center justify-between bg-brand-cream/40">
            <span className="font-mono text-xs text-brand-dark/60 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
              Olfactory Search Assistant
            </span>
            <button
              onClick={onClose}
              className="p-1 px-2.5 border border-brand-dark/15 hover:bg-brand-orange hover:text-white text-brand-dark rounded-none font-bold cursor-pointer transition-colors"
              id="close-search-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-grow p-6 sm:p-8 space-y-8">
            
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative" id="main-search-form">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our olfactory library..."
                className="w-full bg-brand-gray border border-brand-dark/20 focus:border-brand-orange rounded-none px-4 py-4 pl-11 text-brand-dark text-xs sm:text-sm transition-all focus:outline-none font-bold"
                id="search-input"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 sm:w-4.5 h-4 sm:h-4.5 text-brand-dark/40" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange hover:text-brand-dark font-black text-xs uppercase"
                  id="search-clear-btn"
                >
                  Clear
                </button>
              )}
            </form>

            {/* If no search results & no query, show helper suggestions */}
            {!searchQuery && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Recent Searches */}
                <div className="space-y-3">
                  <h3 className="font-mono text-[9px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentClick(term)}
                        className="px-3.5 py-2 text-xs border border-brand-dark/15 hover:border-brand-orange text-brand-dark font-bold rounded-none bg-brand-gray hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
                        id={`recent-search-${i}`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Now */}
                <div className="space-y-3">
                  <h3 className="font-mono text-[9px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
                    Trending Now
                  </h3>
                  <ul className="space-y-2.5 text-xs text-brand-dark font-bold">
                    {trendingSearches.map((term) => (
                      <li key={term} className="flex items-center">
                        <CornerDownRight className="w-3.5 h-3.5 text-brand-orange mr-2" />
                        <button
                          type="button"
                          onClick={() => setSearchQuery(term)}
                          className="hover:text-brand-orange hover:underline cursor-pointer focus:outline-none text-left"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Discover by Notes */}
                <div className="space-y-4">
                  <h3 className="font-mono text-[9px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
                    Discover by Notes
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {noteCategories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleNoteClick(cat.name)}
                        className="p-3 text-left border border-brand-dark/15 bg-brand-gray rounded-none hover:border-brand-dark hover:bg-brand-cream hover:shadow-[3px_3px_0px_0px_#ff3e00] transition-all cursor-pointer flex flex-col justify-between"
                        id={`discover-note-${cat.name}`}
                      >
                        <span className="font-sans font-black text-xs text-brand-dark uppercase tracking-widest">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-brand-dark/50 mt-1 font-bold">
                          {cat.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Results Grid */}
            {searchQuery && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-between items-center text-xs font-mono border-b border-brand-dark/15 pb-2">
                  <span className="text-brand-dark/65 font-bold uppercase text-[9px] tracking-wider">Search Results</span>
                  <span className="text-brand-orange font-black text-[10px] uppercase tracking-wider">{results.length} Formulae</span>
                </div>

                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 border border-brand-dark/10 rounded-none bg-brand-gray hover:border-brand-dark hover:shadow-[3px_3px_0px_0px_#ff3e00] transition-all flex items-center space-x-4"
                        id={`search-result-item-${prod.id}`}
                      >
                        <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center p-2 border border-brand-dark/10 flex-shrink-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-grow space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[8.5px] text-brand-orange font-black tracking-wider uppercase">
                              {prod.concentration}
                            </span>
                            <span className="font-sans text-xs text-brand-dark font-black">
                              ${prod.price.toFixed(2)}
                            </span>
                          </div>
                          <h4 className="font-sans text-xs uppercase font-black tracking-wider text-brand-dark leading-tight">
                            {prod.name}
                          </h4>
                          <p className="text-brand-dark/65 text-[10px] font-sans line-clamp-1 leading-tight">
                            {prod.description}
                          </p>

                          <div className="flex items-center justify-end space-x-3 pt-1 text-[9px] uppercase tracking-widest font-black">
                            <button
                              onClick={() => {
                                onQuickView(prod);
                                onClose();
                              }}
                              className="text-brand-dark/60 hover:text-brand-orange cursor-pointer"
                            >
                              Details
                            </button>
                            <span className="text-brand-dark/20 font-light">|</span>
                            <button
                              onClick={() => {
                                onAddToBag(prod);
                                onClose();
                              }}
                              className="text-brand-orange hover:text-brand-dark cursor-pointer"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-2 text-brand-dark/50" id="search-no-results">
                    <p className="font-serif italic text-sm">Our archives are empty for &ldquo;{searchQuery}&rdquo;.</p>
                    <p className="text-[10px] font-mono leading-relaxed">Try searching for &quot;Honey&quot;, &quot;Vetiver&quot;, &quot;Grasse&quot;, or &quot;Discovery&quot;.</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
