/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Award, HelpCircle, ArrowRight, Hourglass, Pocket } from "lucide-react";
import { Product, JournalPost } from "../types";
import { PRODUCTS, JOURNAL_POSTS } from "../data";
import ProductCard from "../components/ProductCard";

interface HomeViewProps {
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  setCurrentView: (view: string) => void;
  setSelectedArticle: (article: JournalPost) => void;
}

export default function HomeView({
  onQuickView,
  onAddToBag,
  favorites,
  onToggleFavorite,
  setCurrentView,
  setSelectedArticle
}: HomeViewProps) {
  // Filtering States for "THE NEW FRAGRANCE CURATION"
  const [profileFilter, setProfileFilter] = useState("All");
  const [concentrationFilter, setConcentrationFilter] = useState("All");

  // Dropdown UI states
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isConcentrationDropdownOpen, setIsConcentrationDropdownOpen] = useState(false);

  // New Arrivals
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);

  // Filter products based on selected parameters
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesProfile =
      profileFilter === "All" || prod.category === profileFilter;
    const matchesConcentration =
      concentrationFilter === "All" || prod.concentration === concentrationFilter;
    return matchesProfile && matchesConcentration;
  });

  const scentProfilesList = ["All", "Floral", "Woody", "Citrus", "Oriental", "Oud"];
  const concentrationList = ["All", "Eau de Parfum", "Extrait de Parfum", "Discovery Set"];

  const handleArticleTeaserClick = (id: string) => {
    const match = JOURNAL_POSTS.find((post) => post.id === id);
    if (match) {
      setSelectedArticle(match);
      setCurrentView("journal");
    }
  };

  return (
    <div className="space-y-24 pb-20 font-serif" id="home-view-stage">
      
      {/* 1. Flagship Hero Block: "SCENTS THAT LINGER" */}
      <section className="relative overflow-hidden bg-brand-cream py-16 sm:py-24 border-b border-brand-dark/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left animate-fadeIn font-sans">
              <div className="space-y-4">
                <span className="font-mono text-xs text-brand-orange tracking-[0.35em] uppercase font-bold pl-1">
                  Maison Céleste de Paris • Issue No. 042
                </span>
                <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none text-brand-dark uppercase">
                  SCENTS<br/>THAT<br/>
                  <span className="text-brand-orange italic font-light font-serif tracking-normal lowercase">linger.</span>
                </h1>
              </div>

              <div className="flex gap-6 items-center">
                <p className="text-brand-dark/75 text-sm sm:text-base leading-normal max-w-lg">
                  Crafted in ancient French copper distillation silos, our extractions anchor the deepest floral absolute and dark cedar hearts directly to your skin, evoking memories that transcend space and time.
                </p>
                <div className="w-16 h-[1px] bg-brand-dark hidden sm:block"></div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("catalog-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-4 bg-brand-orange hover:bg-brand-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-300 cursor-pointer"
                  id="hero-discover-btn"
                >
                  Discover the Notes
                </button>
                <button
                  onClick={() => setCurrentView("collections")}
                  className="px-6 py-4 border border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark font-sans font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-350 bg-transparent cursor-pointer"
                  id="hero-collections-btn"
                >
                  The Chapters
                </button>
              </div>

              {/* Little detail anchors */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-dark/15 uppercase font-mono text-[9px] sm:text-[10px] text-brand-dark/50">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1 h-3 bg-brand-orange" />
                  <span>100% Grasse Rose</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1 h-3 bg-brand-dark" />
                  <span>Mouth Blown Flacons</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1 h-3 bg-brand-dark" />
                  <span>Parisian Curation</span>
                </div>
              </div>
            </div>

            {/* Right block: Artistic graphic image frame with actual bottle on top */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fadeIn relative font-sans">
              <div className="relative w-full max-w-sm aspect-[4/5] border border-brand-dark/15 rotate-2 bg-brand-gray/40 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-brand-orange/5 -translate-x-4 -translate-y-4 border border-brand-orange/10 pointer-events-none"></div>
                <img
                  src="https://lh3.googleusercontent.com/aida/AP1WRLtz4uHEMSWnAaMt5cHBUEDQW0Nyvn8h5GHMyY-1_vCCaa2MeFpxm28QbHV5sB-RU931Rq-c1PvCqSZxCvJ4SOsO0nDkuznChlwdvLdCbIe_XzWoMDhD-QOD8W4NV3BKyBXdWfs1U1pXA77GfJhXao0qa0Ch-YXru7_vF1ZkAbnZOPkrfNoWtYpZqJ_VbgjfrSsSdY3YSbg2daHxDvaDVfLkRQPmsvepRPnU0XEFBQ9njz2C0IajXLzasIA"
                  alt="Aurum Botanica"
                  referrerPolicy="no-referrer"
                  className="max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl transition-transform hover:scale-[1.05] duration-500 relative z-10"
                />
                
                {/* Floating details badge in mono */}
                <div className="absolute bottom-6 left-6 right-6 border border-brand-dark/20 bg-brand-cream/95 p-4 z-20 text-left shadow-lg">
                  <p className="font-sans font-extrabold uppercase tracking-widest text-[10px] text-brand-dark mb-1">CH. 01 / Aurum Botanica</p>
                  <p className="font-mono text-[9px] text-brand-orange font-bold uppercase leading-tight mb-2">Signature Formula</p>
                  <p className="text-[11px] font-sans leading-relaxed text-brand-dark/75">
                    Sweet warm raw honey and gold liquid sun extracts, harvested in our private Reserve Grasse fields.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Horizontal Slider/Grid: "New Arrivals" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-brand-dark/15 pb-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase font-bold">
              The Fresh Formulations
            </span>
            <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-brand-dark mt-1">
              New Olfactory Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setProfileFilter("All");
              setConcentrationFilter("All");
              const el = document.getElementById("catalog-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs uppercase tracking-widest font-black text-brand-orange hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All Formulae</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newArrivals.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              isFavorite={favorites.includes(prod.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </section>

      {/* 3. Under the Hood Signature Card design feature: Large full-screen ambient image of stills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full rounded-none overflow-hidden border border-brand-dark/15 flex items-center">
          
          {/* Backdrop Image */}
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF9u8xj-VMlysfbShi8Y64zqgFWOJ0L23rFnn_zAR2UVHvxqh7ij8D9J53tjfbLme0uCCkia_LmPRZxdOgKfVHjAmNXQzo1Tl52su9ry58cG0f5pky76h7jscKjytwAXHyuuHRG-BuDv9fwQEHIjQU5zMgQCM5UVzLXf4AIVK1zFMDymfqNHAc11y7jU40nL2ntrDeRS7fcy5p-5_Jeh5LTn2CFjJ6ZtE6LCZLgmqPrI_DZlP2iHagLqnyq8o5AsJ3LjHEYxqniplS"
              alt="Artisanal copper stills backdrop"
              className="w-full h-full object-cover brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-brand-dark/20" />
          </div>

          {/* Floating Content */}
          <div className="relative p-6 sm:p-12 space-y-4 max-w-lg text-left text-white z-10">
            <span className="font-mono text-[9px] tracking-[0.25em] text-brand-orange uppercase font-extrabold bg-brand-dark px-2.5 py-1">
              Chapter 01: Scent Craft
            </span>
            <h3 className="font-sans font-black text-xl sm:text-3xl uppercase tracking-tight leading-none text-white">
              The Pure Ancestry <br/>of Extraction
            </h3>
            <p className="text-white/85 text-[11px] sm:text-xs leading-relaxed font-sans font-normal">
              We employ centuries-old copper distillation stills that extract pure wood moisture slowly across 36-hour cycles, yielding soft architectural wood anchors that last beautifully on structural skin layers.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView("about")}
                className="px-5 py-3 border border-white/35 hover:border-brand-orange bg-black/40 hover:bg-brand-orange text-[10px] tracking-widest uppercase font-mono transition-all duration-300 text-white rounded-none cursor-pointer"
              >
                Our Legacy Story
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Filtrable / Curated grid catalog: "THE NEW FRAGRANCE CURATION" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 font-sans" id="catalog-section">
        
        {/* Section Header & Filters Block */}
        <div className="border-b border-brand-dark/15 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase font-bold">
              The Complete Collection
            </span>
            <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-brand-dark">
              The New Fragrance Curation
            </h2>
          </div>

          {/* Elegant Luxury Dropdowns */}
          <div className="flex flex-wrap gap-4 z-20">
            
            {/* Filter 1: SCENT PROFILE */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsConcentrationDropdownOpen(false);
                }}
                className="px-4 py-3 bg-white border border-brand-dark/15 hover:border-brand-dark rounded-none text-xs text-brand-dark tracking-wider flex items-center justify-between space-x-6 focus:outline-none cursor-pointer"
                id="filter-profile-toggle"
              >
                <span>SCENT PROFILE: <strong className="text-brand-orange uppercase font-black pl-1">{profileFilter}</strong></span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-dark/55" />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white border border-brand-dark/15 rounded-none shadow-lg animate-fadeIn py-1 z-30">
                  {scentProfilesList.map((node) => (
                    <button
                      key={node}
                      onClick={() => {
                        setProfileFilter(node);
                        setIsProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs hover:bg-brand-gray transition-colors uppercase tracking-wider ${
                        profileFilter === node ? "text-brand-orange font-bold text-[#ff3e00]" : "text-brand-dark/70"
                      }`}
                      id={`profile-opt-${node}`}
                    >
                      {node}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: CONCENTRATION */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsConcentrationDropdownOpen(!isConcentrationDropdownOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className="px-4 py-3 bg-white border border-brand-dark/15 hover:border-brand-dark rounded-none text-xs text-brand-dark tracking-wider flex items-center justify-between space-x-6 focus:outline-none cursor-pointer"
                id="filter-concentration-toggle"
              >
                <span>CONCENTRATION: <strong className="text-brand-orange uppercase font-black pl-1">{concentrationFilter}</strong></span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-dark/55" />
              </button>
              
              {isConcentrationDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-52 bg-white border border-brand-dark/15 rounded-none shadow-lg animate-fadeIn py-1 z-30">
                  {concentrationList.map((conc) => (
                    <button
                      key={conc}
                      onClick={() => {
                        setConcentrationFilter(conc);
                        setIsConcentrationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs hover:bg-brand-gray transition-colors uppercase tracking-wider ${
                        concentrationFilter === conc ? "text-brand-orange font-bold text-[#ff3e00]" : "text-brand-dark/70"
                      }`}
                      id={`concentration-opt-${conc.split(" ")[0]}`}
                    >
                      {conc}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Product Grid Matched */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={onQuickView}
                onAddToBag={onAddToBag}
                isFavorite={favorites.includes(prod.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-cream/50 rounded-none border border-brand-dark/15 space-y-2 text-brand-dark/60">
            <p className="font-serif italic text-base">No formula matches this olfactory curation profile.</p>
            <p className="text-xs">Select different parameters in the SCENT PROFILE or CONCENTRATION filters.</p>
          </div>
        )}

      </section>

      {/* 5. The Journal Teaser Frame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <div className="flex justify-between items-end border-b border-brand-dark/15 pb-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-brand-orange uppercase font-bold">
              Stories from Grasse & Paris
            </span>
            <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-brand-dark mt-1">
              The Journal
            </h2>
          </div>
          <button
            onClick={() => setCurrentView("journal")}
            className="text-xs uppercase tracking-widest font-black text-brand-orange hover:text-brand-dark transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Open Archives</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main big block card */}
          <div
            onClick={() => handleArticleTeaserClick("alchemy-of-grasse")}
            className="group relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[450px] rounded-none overflow-hidden border border-brand-dark/15 cursor-pointer flex flex-col justify-end p-6 sm:p-10 text-white text-left"
            id="journal-post-teaser-1"
          >
            {/* Backdrop */}
            <div className="absolute inset-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3MSiOGjpUFZs5_XGPuqkBT7sgq-NCAuN3hQiWrzg1QY7-xwsvZgMx_9BIigja03Ndg3Exc3fgIy1zK9C_Vy6WbxyJbiRtJmjV-L8EYKfYQY6aLNoX_D8uuZG5qshdiGPZEaVVcoTb-8mCWhJL7hPINcHXq3HQppXCmTajpyTMpxyHok332PEnFV3yR-Nx1YBliHbWlmtZN10W2aYHHqMkaYklvS1QM_Pcif5nNXOnS0vG9Z0q1Fv_yKP2Vt3sRlO1SlO31Mvy1NeZ"
                alt="Rose Fields"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/20 to-transparent" />
            </div>

            <div className="relative space-y-3 z-10 max-w-lg">
              <span className="font-mono text-[9px] tracking-wider font-bold uppercase bg-brand-orange text-white px-3 py-1.5 rounded-none inline-block border-0">
                Extraction Spotlight
              </span>
              <h3 className="font-serif italic text-xl sm:text-2xl leading-snug group-hover:text-brand-orange transition-colors duration-300">
                The Alchemy of Grasse: Sourcing May Rose
              </h3>
              <p className="text-white/80 text-xs line-clamp-2">
                Before dawn, expert harvesters gather blooming Centifolia Rose buds in Grasse, capturing the perfect moment before the heat evaporates the precious dew.
              </p>
              <div className="pt-2 flex items-center space-x-2.5 font-mono text-[10px] text-white/55">
                <span>By Dominic Pascal</span>
                <span>•</span>
                <span>6 mins read</span>
              </div>
            </div>
          </div>

          {/* Secondary teaser card lists */}
          <div className="flex flex-col gap-6">
            
            <div
              onClick={() => handleArticleTeaserClick("complexity-of-vetiver")}
              className="group p-5 border border-brand-dark/15 rounded-none hover:border-brand-orange hover:shadow-lg bg-white transition-all cursor-pointer flex gap-4 text-left items-center"
              id="journal-post-teaser-2"
            >
              <div className="w-24 h-24 bg-brand-gray/50 rounded-none border border-brand-dark/15 flex-shrink-0 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg_9jasAldfqIz2phaZhqHq7Od6sjin0YlRWJLroy4LsvX5eCNqwE-jun9DlD0UC_nO81ZMlTPI8wrSKashOSar5ieNDThUZ4uWzq41stHMiO_lZM6Bi5XKzVJJIeW2kfPI0X8unDQauFsV2APJTvEZAoy-bza43lUtLFToQ68SFbaz4q8D-V7neW3nLTnHlZ7HlggdLQsqGeaoRrqM9oRLSUJMIx1-FTs7tgUPUk6_xxray9ARHu4XUtZj1_dY4DZ2vildPNur-cz"
                  alt="vetiver root"
                  className="w-full h-full object-cover transition-transform group-hover:scale-102"
                />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-brand-dark/45 tracking-wider uppercase font-bold">Base Notes Theory</span>
                <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-dark group-hover:text-brand-orange transition-colors">
                  Understanding Base Notes: Complexity of Vetiver
                </h4>
                <p className="text-brand-dark/70 text-xs line-clamp-2">
                  Demystifying dry down profiles. Why Haitian Vetiver roots evoke damp soil, rich hazelnut, and deep oceanic salt.
                </p>
                <span className="block font-mono text-[9px] text-brand-orange font-bold pt-1">Decades of Sourcing • 7 mins read</span>
              </div>
            </div>

            <div
              onClick={() => handleArticleTeaserClick("evolution-of-flacon")}
              className="group p-5 border border-brand-dark/15 rounded-none hover:border-brand-orange hover:shadow-lg bg-white transition-all cursor-pointer flex gap-4 text-left items-center"
              id="journal-post-teaser-3"
            >
              <div className="w-24 h-24 bg-brand-gray/50 rounded-none border border-brand-dark/15 flex-shrink-0 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_kMfnovtl5ZkIUEMgs2hUSv017XzUXa-qs1K2hqq-b0nPxrmbXJmU1qsJfWEcXBxMYTXtoiJsX1OlzwCjvZYvBssrENVDEsx6kvrE87eT085LR5SjptbOtbsthhmn4_TWx-Np4vXcrhIg8dVwhCuOdAXoN1wBtOlcuiWZ_2WwuTQMiZBjy-EyxM8mblS8cqFHqbhqtDAtbVN4KWWPoELhzCERP6oyKqppfJVzXIV8U7bDHqgtmzYGeYEf7_WwU62x7cGQ7689VN_"
                  alt="flacon"
                  className="w-full h-full object-cover transition-transform group-hover:scale-102"
                />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-brand-dark/45 tracking-wider uppercase font-bold"> Parisian Craft</span>
                <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-brand-dark group-hover:text-brand-orange transition-colors">
                  The Evolution of the Flacon: The Craft of Glassmaking
                </h4>
                <p className="text-brand-dark/70 text-xs line-clamp-2">
                  How our hand-molded crystal vessels are mouth-blown, flame-polished, and detailed in Parisian studios.
                </p>
                <span className="block font-mono text-[9px] text-brand-orange font-bold pt-1">Fontainebleau sand • 5 mins read</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Interactive Page-Switching Portal Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans mt-24">
        <div className="border-b border-brand-dark/15 pb-4">
          <span className="font-mono text-[10px] tracking-widest text-[#ff3e00] uppercase font-bold text-brand-orange">
            Interactive Navigation Hub
          </span>
          <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-brand-dark mt-1">
            Explore the Chapters of Perfume BD
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => {
              setCurrentView("collections");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-6 text-left border border-brand-dark/15 bg-white hover:border-brand-dark hover:shadow-[4px_4px_0px_0px_#ff3e00] transition-all cursor-pointer flex flex-col justify-between min-h-[190px]"
            id="portal-link-collections"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#ff3e00] text-brand-orange font-black uppercase tracking-wider block">Chapter I</span>
              <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-dark">The Collections</h3>
              <p className="text-brand-dark/75 text-xs font-serif italic">Discover our full library of rare botanical distillations and extract formulations.</p>
            </div>
            <span className="font-mono text-[10px] text-brand-dark/50 font-bold uppercase tracking-widest pt-4 block hover:text-brand-orange">
              Enter Collections →
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentView("journal");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-6 text-left border border-brand-dark/15 bg-white hover:border-brand-dark hover:shadow-[4px_4px_0px_0px_#ff3e00] transition-all cursor-pointer flex flex-col justify-between min-h-[190px]"
            id="portal-link-journal"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#ff3e00] text-brand-orange font-black uppercase tracking-wider block">Chapter II</span>
              <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-dark">The Journal</h3>
              <p className="text-brand-dark/75 text-xs font-serif italic">Sourcing diaries, raw crop extraction chronicles, and master perfumer essays.</p>
            </div>
            <span className="font-mono text-[10px] text-brand-dark/50 font-bold uppercase tracking-widest pt-4 block hover:text-brand-orange">
              Open Archives →
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentView("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-6 text-left border border-brand-dark/15 bg-white hover:border-brand-dark hover:shadow-[4px_4px_0px_0px_#ff3e00] transition-all cursor-pointer flex flex-col justify-between min-h-[190px]"
            id="portal-link-about"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#ff3e00] text-brand-orange font-black uppercase tracking-wider block">Chapter III</span>
              <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-dark">Our Heritage</h3>
              <p className="text-brand-dark/75 text-xs font-serif italic">Our forty-year history of keeping French hand-made flacons and ancestral extraction alive.</p>
            </div>
            <span className="font-mono text-[10px] text-brand-dark/50 font-bold uppercase tracking-widest pt-4 block hover:text-brand-orange">
              Trace Heritage →
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentView("profile");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-6 text-left border border-brand-dark/15 bg-white hover:border-brand-dark hover:shadow-[4px_4px_0px_0px_#ff3e00] transition-all cursor-pointer flex flex-col justify-between min-h-[190px]"
            id="portal-link-profile"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#ff3e00] text-brand-orange font-black uppercase tracking-wider block">Chapter IV</span>
              <h3 className="font-sans font-black text-lg uppercase tracking-tight text-brand-dark">Curation Studio</h3>
              <p className="text-brand-dark/75 text-xs font-serif italic">Your private cabinet. Review consultation logs, active orders, and your saved note profile.</p>
            </div>
            <span className="font-mono text-[10px] text-brand-dark/50 font-bold uppercase tracking-widest pt-4 block hover:text-brand-orange">
              Enter Studio →
            </span>
          </button>
        </div>
      </section>

    </div>
  );
}
