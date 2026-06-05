/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Calendar, User, Clock, ArrowRight, Share2, CornerDownRight, BookOpen } from "lucide-react";
import { JournalPost } from "../types";
import { JOURNAL_POSTS } from "../data";

interface JournalViewProps {
  selectedArticle: JournalPost | null;
  setSelectedArticle: (article: JournalPost | null) => void;
}

export default function JournalView({
  selectedArticle,
  setSelectedArticle
}: JournalViewProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ["All", "Extraction", "Scent Theory", "Craftsmanship", "Heritage"];

  const filteredPosts = JOURNAL_POSTS.filter((p) => {
    return activeCategory === "All" || p.category === activeCategory;
  });

  const handleShareClick = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pb-24 font-sans" id="journal-view-stage">
      
      {/* 1. Header Hero with atmosphere */}
      <section className="relative overflow-hidden bg-brand-dark text-white py-16 sm:py-24 border-b border-brand-dark pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcPX92vP9SNAbsDCJkFDS3c_Ww_VwA-lnwt2Xv6qiXFoMTW3jzwcLysIVtp4qkbRc9WtkuvjXXX-1izYItXNDh-m1icNy99s6c9HAY8yrW-v8MwVbPJBJNp6eCwrQoNiNELsg9L0242uVIrfT5YLFnSaeCm7em0Qka7JCUf1B-Eu_qpdoieEqhImvevyiM7q-9A-3XEKa1gE7ryRI1340RP8w5JiWcCvGu1-chTbkZC-KdS1cEtXJIpKahWzAd9WSP26lXYMi18lzV"
            alt="Maison Atelier Workshop"
            className="w-full h-full object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-brand-dark/30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs text-brand-orange tracking-[0.35em] uppercase font-bold">
            The Olfactory Archives
          </span>
          <h1 className="font-sans font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase leading-none text-white">
            The Journal
          </h1>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-serif italic">
            Chronicles of botanical extraction, ancestral steam distillation mechanics, Master glassblowing laboratories, and dry down identity theory.
          </p>
        </div>
      </section>

      {/* 2. Category Filters Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 z-15">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-brand-dark/15 pb-4 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-sans border rounded-none transition-all focus:outline-none cursor-pointer font-bold ${
                activeCategory === cat
                  ? "bg-brand-orange border-brand-orange text-white"
                  : "bg-white border-brand-dark/15 text-brand-dark hover:border-brand-dark"
              }`}
              id={`journal-cat-btn-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Articles Grid List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedArticle(post);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group cursor-pointer flex flex-col bg-white border border-brand-dark/15 rounded-none overflow-hidden hover:shadow-[6px_6px_0px_0px_#ff3e00] hover:border-brand-dark transition-all duration-300 text-left"
              id={`journal-post-card-${post.id}`}
            >
              
              {/* Cover visual */}
              <div className="aspect-[16/10] bg-brand-gray overflow-hidden relative">
                <img
                  src={post.bgImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 select-none brightness-[0.9]"
                />
                
                {/* Meta float badge */}
                <span className="absolute top-4 left-4 bg-brand-dark text-white font-mono text-[9px] tracking-widest px-2.5 py-1.5 uppercase rounded-none font-bold">
                  {post.category}
                </span>
                {post.tag && (
                  <span className="absolute bottom-4 left-4 bg-brand-orange text-white font-mono text-[9px] tracking-widest px-2.5 py-1.5 uppercase rounded-none font-bold">
                    {post.tag}
                  </span>
                )}
              </div>

              {/* Text content details info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif italic text-lg sm:text-xl text-brand-dark leading-tight group-hover:text-brand-orange transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-brand-dark/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-dark/10 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 font-mono text-[9px] text-[#0f0f0f]/45 font-bold uppercase">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>

                  <span className="text-xs uppercase tracking-widest font-black text-brand-orange flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Full Article Reader Modal overlay */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-sans" id="article-reader-overlay">
          
          {/* Main article layout frame */}
          <div className="w-full max-w-4xl bg-brand-cream rounded-none shadow-[10px_10px_0px_0px_#0a0a0a] overflow-hidden border-2 border-brand-dark flex flex-col max-h-[90vh] animate-scaleIn">
            
            {/* Header / Meta panel */}
            <div className="px-6 py-5 border-b border-brand-dark/15 flex items-center justify-between bg-white flex-shrink-0">
              <span className="font-mono text-[9px] text-brand-dark/60 font-black uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-orange" />
                Editorial Reading Room
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 px-2.5 border border-brand-dark/15 hover:bg-brand-orange hover:text-white text-brand-dark rounded-none font-black cursor-pointer transition-colors text-xs"
                id="close-reader-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable scroll panel */}
            <div className="flex-grow overflow-y-auto">
              
              {/* Header visual hero */}
              <div className="relative h-64 sm:h-80 bg-brand-dark flex items-end">
                <img
                  src={selectedArticle.bgImage}
                  alt={selectedArticle.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                />
                
                {/* Visual Title floating overlays */}
                <div className="relative p-6 sm:p-10 text-white text-left space-y-3 z-10 max-w-2xl">
                  <span className="font-mono text-[9px] text-brand-orange bg-brand-dark border-0 hover:bg-brand-orange px-2.5 py-1.5 uppercase tracking-wider font-extrabold rounded-none">
                    Maison Archives: {selectedArticle.category}
                  </span>
                  <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-tight pt-2">
                    {selectedArticle.title}
                  </h2>

                  <div className="flex items-center space-x-3.5 font-mono text-[9px] sm:text-[10px] text-white/70">
                    <span>By {selectedArticle.author}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Literal Storytelling copy layout */}
              <div className="p-6 sm:p-10 space-y-6 text-left" id="article-text-container">
                
                {/* Intro paragraph */}
                <p className="font-sans font-bold text-brand-dark text-sm sm:text-base leading-relaxed tracking-wide border-l-2 border-brand-orange pl-4 bg-white/60 py-3.5 rounded-none">
                  {selectedArticle.excerpt}
                </p>

                {/* Subsections mock editorial breakdown */}
                <div className="font-sans text-brand-dark/85 text-sm sm:text-base leading-relaxed space-y-6 text-justify">
                  {selectedArticle.content.split("\n\n").map((para, idx) => {
                    if (idx === 1) {
                      return (
                        <div key={idx} className="space-y-6 lg:space-y-8">
                          <p>{para}</p>
                          
                          {/* Beautiful central pullquote block */}
                          <blockquote className="p-8 border-y border-brand-dark/15 bg-brand-gray rounded-none my-8 flex flex-col items-center text-center">
                            <span className="font-serif italic font-black text-brand-orange text-xl sm:text-2xl tracking-tight leading-snug">
                              &ldquo;A perfume is not merely a scent; it is an invisible garment, a silent storyteller woven from the memories of the earth.&rdquo;
                            </span>
                            <cite className="font-mono uppercase text-[9px] tracking-widest text-[#0c0c0c]/40 mt-3 block font-bold">
                              — The Master Perfumer
                            </cite>
                          </blockquote>
                        </div>
                      );
                    }
                    return <p key={idx}>{para}</p>;
                  })}
                </div>

                {/* Quality Seal margin indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-dark/15 pt-8 font-mono text-[10px] text-brand-dark/45 font-bold uppercase">
                  <div className="flex space-x-1.5">
                    <CornerDownRight className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span>Transcribed directly from the Royal French Botanical Library archives.</span>
                  </div>
                  <div className="flex space-x-1.5 sm:justify-end">
                    <span>Paris Atelier formulation code: PA-90212</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Read bottom action controls bars */}
            <div className="px-6 py-4 border-t border-brand-dark/15 bg-white flex items-center justify-between flex-shrink-0">
              <button
                type="button"
                onClick={handleShareClick}
                className="inline-flex items-center space-x-2 px-3.5 py-2 border border-brand-dark/20 hover:border-brand-dark rounded-none text-xs text-brand-dark tracking-wider transition-all cursor-pointer bg-white font-bold"
                id="article-share-btn"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>{copiedLink ? "Link copied" : "Share dispatch"}</span>
              </button>
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-3 bg-brand-dark hover:bg-brand-orange text-white font-bold text-xs tracking-widest uppercase rounded-none focus:outline-none cursor-pointer"
                id="article-return-list-btn"
              >
                Close Archives
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
