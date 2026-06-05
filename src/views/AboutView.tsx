/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShieldAlert, Award, Compass, Heart, Anchor } from "lucide-react";

export default function AboutView() {
  const milestones = [
    { year: "1982", title: "Foundry Constructed", desc: "The first artisanal distillation still built in Paris." },
    { year: "1997", title: "Grasse Field Acquisition", desc: "Acquired exclusive harvesting rights over Centifolia Rose fields." },
    { year: "2011", title: "Fontainebleau Integration", desc: "Mouth-blown crystal flacon design established in historical Parisian studios." },
    { year: "2026", title: "Haute Parfumerie digital launch", desc: "Providing global patrons access to our private olfactory reserves." }
  ];

  return (
    <div className="space-y-20 pb-24 font-sans" id="about-view-stage">
      
      {/* 1. Header Hero with premium image */}
      <section className="relative overflow-hidden bg-brand-gray/40 py-16 sm:py-24 border-b border-brand-dark/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text description on the left */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left animate-fadeIn">
              <div className="space-y-3">
                <span className="font-mono text-xs text-brand-orange tracking-[0.35em] uppercase font-bold pl-1">
                  Maison Céleste Craft
                </span>
                <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-brand-dark uppercase">
                  The Art of <br />
                  <span className="text-brand-orange italic font-normal font-serif">Essence</span>
                </h1>
              </div>

              <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed max-w-lg">
                Perfume BD was founded with a singular conviction: that perfume should not merely mask the skin, but translate the earth. Across forty years, we have protected ancestral extraction methodologies, working directly alongside botanical harvesters, steam master distillers, and Paris flacon glassblowers.
              </p>

              {/* Qualities Grid */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <span className="font-sans font-black uppercase text-brand-dark text-xs tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-brand-orange" />
                    Pristine Provenance
                  </span>
                  <p className="text-brand-dark/75 text-xs leading-relaxed">
                    Sourcing directly from Grasse, Haiti, and Mysore without synthetic fillers.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-sans font-black uppercase text-brand-dark text-xs tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-brand-orange" />
                    Artisanal Gravity
                  </span>
                  <p className="text-brand-dark/75 text-xs leading-relaxed">
                    Weighted flacons constructed by mouth blowers using Fontainebleau quartz.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium primary image container on the right */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fadeIn">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-none overflow-hidden shadow-[8px_8px_0_0_#ff3e00] border-2 border-brand-dark">
                <img
                  src="https://lh3.googleusercontent.com/aida/AP1WRLsN5pFa6xdDL2guL-uXNjHL3e4yQSTa7BrNURm4R--sfrC3jmlIV7914bOUK2uLmeNwApYsEMEg508nGqq_64dzsDtce7Gx7NO-E95sa3VcRsAsMS6Q4FuKCLVtA_Y7hZMrNaohOiHS-T7lXRDwC7v_w3VlOrybazItToaGMtTGAprUqjmMzSBFWoYFZQ5UfJmI_osi_l-ZO1leXWBMY13CwbtVH4axR-mcCDdnQq_KOJ1FVuONA0kcGBXk"
                  alt="Ancestral distillation portrait"
                  className="w-full h-full object-cover brightness-[0.95]"
                  id="heritage-hero-img"
                />
                <div className="absolute inset-0 bg-brand-dark/10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Premium quote of Master Perfumer */}
      <section className="bg-brand-gray border-y border-brand-dark/15 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="font-mono text-[10px] text-brand-dark/40 tracking-widest uppercase font-bold">The Creed</span>
          <p className="font-serif italic text-xl sm:text-2xl text-brand-dark font-black max-w-2xl mx-auto leading-snug">
            &ldquo;A perfume is not merely a scent; it is an invisible garment, a silent storyteller woven from the memories of the earth.&rdquo;
          </p>
          <div className="font-mono text-[10px] tracking-widest text-brand-orange uppercase pt-2 font-bold">
            — Sylvain Alarie, Master Perfumer
          </div>
        </div>
      </section>

      {/* 3. Deep Heritage section: Milestones */}
      <section className="max-w-5xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-brand-orange tracking-[0.25em] uppercase font-bold">Lineage Timeline</span>
          <h2 className="font-sans font-black uppercase text-brand-dark text-xl sm:text-2xl tracking-wide">
            Decades of Distillation
          </h2>
        </div>

        {/* Milestones stepper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Subtle connecting horizontal border wire on desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-brand-dark/15 z-0" />

          {milestones.map((st, i) => (
            <div key={st.year} className="relative z-10 text-center space-y-3" id={`milestone-${st.year}`}>
              <div className="w-12 h-12 bg-white rounded-none border border-brand-dark flex items-center justify-center mx-auto shadow-[4px_4px_0_0_#ff3e00] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                <span className="font-mono text-xs font-black text-brand-dark">
                  {st.year}
                </span>
              </div>
              <div className="space-y-1 text-center">
                <h4 className="font-sans uppercase font-black text-xs text-brand-dark tracking-wide pt-1">
                  {st.title}
                </h4>
                <p className="text-brand-dark/75 text-[11px] sm:text-xs leading-relaxed max-w-[190px] mx-auto">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Commitment of Extraction statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-brand-dark text-white rounded-none p-10 sm:p-16 relative overflow-hidden border border-brand-dark/20 text-left shadow-[8px_8px_0_0_#ff3e00]">
        <div className="relative z-10 space-y-6 max-w-3xl">
          <span className="font-mono text-xs text-brand-orange tracking-[0.25em] uppercase font-bold">
            Our Uncompromising Code
          </span>
          <h3 className="font-sans font-black uppercase text-2xl sm:text-3xl lg:text-4xl leading-tight text-white">
            Extraction Integrity Guarantee
          </h3>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed text-justify font-sans">
            We pledge to never compromise the absolute purity of our ingredients. Perfume BD operates on an exclusive direct-source ledger system. Every blossom of Grasse May Rose, each stem of Haitian Vetiver, and every drop of Indian Mysore wood is traceable to the farmer&rsquo;s cooperative. We decline all synthetic acceleration catalysts, preserving the authentic lingering duration that only mature, naturally synthesized oils command.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-[9px] text-brand-orange tracking-wider font-bold">
            <span className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1.5 border border-white/10 uppercase">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-none" />
              <span>Grasse Certified Sourcing</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1.5 border border-white/10 uppercase">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-none" />
              <span>Zero Artificial Solvents</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white/5 px-2.5 py-1.5 border border-white/10 uppercase">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-none" />
              <span>100% Carbon Neutral Distillation</span>
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
