/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Layers, ArrowUpRight, HelpCircle, Inbox, Star } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface CollectionsViewProps {
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export default function CollectionsView({
  onQuickView,
  onAddToBag,
  setCurrentView
}: CollectionsViewProps) {
  
  // Categorize products by their theoretical collection
  const signatureProducts = PRODUCTS.filter((p) => p.collection === "The Signature Series");
  const saisonsProducts = PRODUCTS.filter((p) => p.collection === "Les Saisons");
  const discoveryProducts = PRODUCTS.filter((p) => p.collection === "The Discovery Set");

  const chapters = [
    {
      id: "chapter-01",
      title: "Chapter 01: The Signature Series",
      desc: "Timeless gravity. Formulated using historical extraction lineages that represent our uncompromising benchmark of olfactory depth.",
      products: signatureProducts,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcPX92vP9SNAbsDCJkFDS3c_Ww_VwA-lnwt2Xv6qiXFoMTW3jzwcLysIVtp4qkbRc9WtkuvjXXX-1izYItXNDh-m1icNy99s6c9HAY8yrW-v8MwVbPJBJNp6eCwrQoNiNELsg9L0242uVIrfT5YLFnSaeCm7em0Qka7JCUf1B-Eu_qpdoieEqhImvevyiM7q-9A-3XEKa1gE7ryRI1340RP8w5JiWcCvGu1-chTbkZC-KdS1cEtXJIpKahWzAd9WSP26lXYMi18lzV"
    },
    {
      id: "chapter-02",
      title: "Chapter 02: Les Saisons Collection",
      desc: "The cyclical breath of the planet. Capturing volatile organic transits — from morning rose fields of Grasse during harvest, to coastal seawater-salted dry vetiver roots.",
      products: saisonsProducts,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChcHon3oocQcvf7qh4L2bYNmk3CmbB2Z255X3m_AoihhUy9Dq0Gnou-9nI38SZcjG9Hn4wLI9E6Stifi0AvG_1ZVzaKPBvhkpbt_Hu6X6XpiWt7RdmnXfu53ux-2bvfZfBEb3QGcT13QIBAGOaUv0s6gMJW0sFzNrLaW7PqkUxZIma6Jzmi0kZS5r3-z3cI5bDfE395wi-DjPxjaDvTJWZjH8pqKbRo51UWQNyStNRhG3dukEXfFl1t3rot-W2eFMqerI27UeniIYT"
    },
    {
      id: "chapter-03",
      title: "Chapter 03: The Discovery Set",
      desc: "For the inquisitive traveler. Decanted glass atomizers accompanying our ancestral parchment booklets, fully credit-refundable toward full bottle conversions.",
      products: discoveryProducts,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTxb1O1gaTt5ENrG82pTBGbZ63kmeTmCMO1uPUH0pSa9hCs5auiGAn5S5QzlfNehcS1SZ1YHRywZ9hrVy5bvu9H8Ct063LM8hw-HqnQt7pDldKCr8G0yjDBRGb3HERCFD2DMx1aFLFmgJT3CzVg8VuySGAtIXjTM1_epsfXrakIK3cD1ueVDfXeD-NfkdszmLqjSPkzrC3p0BJqw3rke964Y1uEIfEX5TYEl4btpC2ItnnI-EG1_-MkMj-QwWb9_jrP4RpmHyq9bLW"
    }
  ];

  return (
    <div className="space-y-24 pb-20 font-sans" id="collections-view-stage">
      
      {/* Editorial Header */}
      <section className="text-center py-12 max-w-3xl mx-auto px-4 space-y-4 animate-fadeIn">
        <span className="font-mono text-xs text-brand-orange tracking-[0.35em] uppercase font-bold">
          The Olfactory Chapters
        </span>
        <h1 className="font-sans font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase text-brand-dark leading-tight">
          The Collections
        </h1>
        <p className="text-brand-dark/70 text-sm sm:text-base leading-relaxed font-sans font-normal">
          Explore our fragrance lineage catalog classified across three master chapters — from our high-density signature reserves to cyclic botanical extracts and sample journeys.
        </p>
      </section>

      {/* Chapters Layout List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {chapters.map((ch, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={ch.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              id={ch.id}
            >
              
              {/* Cover Atmospheric Graphic Stage */}
              <div className={`lg:col-span-6 overflow-hidden rounded-none border-2 border-brand-dark shadow-[6px_6px_0px_0px_#0f0f0f] hover:shadow-[8px_8px_0px_0px_#ff3e00] transition-all duration-300 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square ${
                isEven ? "lg:order-first" : "lg:order-last"
              }`}>
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102 brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Float tag */}
                <div className="absolute bottom-6 left-6 text-white text-left font-serif italic text-base sm:text-lg">
                  &ldquo;Formulated slowly to linger beautifully&rdquo;
                </div>
              </div>

              {/* Core Chapter Details Info content */}
              <div className="lg:col-span-6 text-left space-y-6">
                <div className="space-y-2.5">
                  <span className="font-mono text-xs text-brand-orange font-black tracking-widest uppercase">
                    Maison Archive • {ch.id.toUpperCase()}
                  </span>
                  <h2 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-brand-dark">
                    {ch.title}
                  </h2>
                </div>

                <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed">
                  {ch.desc}
                </p>

                {/* Subproducts lists */}
                <div className="space-y-4 pt-4 border-t border-brand-dark/15">
                  <span className="block font-mono text-[10px] tracking-widest text-[#0c0c0c]/40 uppercase font-black mb-3">
                    Formulas Assigned
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ch.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 border border-brand-dark/15 rounded-none bg-white hover:shadow-[4px_4px_0px_0px_#ff3e00] hover:border-brand-dark hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center space-x-3 text-left group"
                        id={`coll-sub-item-${prod.id}`}
                      >
                        <div className="w-12 h-12 bg-white rounded-none border border-brand-dark/10 p-1 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <h4 className="font-sans text-xs uppercase font-black text-brand-dark group-hover:text-brand-orange transition-colors truncate">
                            {prod.name}
                          </h4>
                          <span className="font-mono text-[9px] text-[#0f0f0f]/45 tracking-wider font-bold">
                            {prod.volume} • ${prod.price}
                          </span>
                        </div>

                        <button
                          onClick={() => onQuickView(prod)}
                          className="p-1.5 rounded-none border border-brand-dark/15 hover:border-brand-dark hover:bg-brand-orange hover:text-white text-brand-dark transition-all cursor-pointer"
                          title="Examine Pyramid"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
