/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Eye, Heart, Plus, ShoppingBag } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToBag,
  isFavorite,
  onToggleFavorite
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col bg-white border border-brand-dark/15 rounded-none overflow-hidden transition-all duration-500 hover:shadow-[6px_6px_0px_0px_#ff3e00] hover:border-brand-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`product-card-${product.id}`}
    >
      
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-brand-gray/30 overflow-hidden flex items-center justify-center p-6 border-b border-brand-dark/10">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="max-h-[85%] max-w-[85%] object-contain transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
          id={`product-img-${product.id}`}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 font-sans">
          <span className="bg-brand-dark text-white font-mono text-[9px] tracking-wider font-bold leading-none px-2.5 py-1.5 uppercase rounded-none">
            {product.concentration}
          </span>
          {product.isNewArrival && (
            <span className="bg-brand-orange text-white font-mono text-[9px] tracking-wider font-bold leading-none px-2.5 py-1.5 uppercase rounded-none">
              New Arrival
            </span>
          )}
        </div>

        {/* Favorite/Heart Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-none border transition-all duration-300 focus:outline-none cursor-pointer ${
            isFavorite
              ? "bg-brand-orange/10 border-brand-orange text-brand-orange"
              : "bg-white/90 hover:bg-white border-brand-dark/10 text-brand-dark/40 hover:text-brand-dark"
          }`}
          title={isFavorite ? "Remove from Library" : "Save to Olfactory Library"}
          id={`fav-btn-${product.id}`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-brand-orange text-brand-orange" : ""}`} />
        </button>

        {/* Hover quick overlays */}
        <div className={`absolute inset-0 bg-brand-dark/25 backdrop-blur-[1px] transition-opacity duration-300 flex items-center justify-center gap-3 z-10 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-brand-orange text-brand-dark hover:text-white rounded-none shadow-md transition-all transform hover:scale-105 duration-200 focus:outline-none cursor-pointer flex items-center justify-center border border-brand-dark/10"
            title="Olfactory Details"
            id={`quickview-btn-${product.id}`}
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onAddToBag(product)}
            className="p-3 bg-brand-orange hover:bg-brand-dark text-white rounded-none shadow-md transition-all transform hover:scale-105 duration-200 focus:outline-none cursor-pointer flex items-center justify-center"
            title="Add to Olfactory Bag"
            id={`addbag-btn-${product.id}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-grow flex flex-col justify-between border-t border-brand-dark/5" id={`info-block-${product.id}`}>
        <div>
          {/* Metadata category */}
          <div className="flex justify-between items-center mb-2 font-sans">
            <span className="font-mono text-[9px] text-brand-dark/50 tracking-widest uppercase">
              {product.collection}
            </span>
            <span className="font-mono text-[9px] text-brand-orange font-bold tracking-wider uppercase bg-brand-orange/10 px-2 py-0.5 rounded-none">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans font-bold text-brand-dark text-sm sm:text-base tracking-wide uppercase group-hover:text-brand-orange transition-colors duration-300">
            {product.name}
          </h3>

          {/* Excerpt */}
          <p className="text-brand-dark/70 font-sans text-[11px] sm:text-xs leading-relaxed mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Footer info (price + button) */}
        <div className="mt-4 pt-4 border-t border-brand-dark/10 flex items-center justify-between font-sans">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-brand-dark/40 uppercase leading-none">
              {product.volume}
            </span>
            <span className="font-sans font-black text-brand-dark text-sm mt-1">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToBag(product)}
            className="flex items-center space-x-1.5 px-3.5 py-2 border border-brand-dark hover:bg-brand-orange hover:border-brand-orange hover:text-white rounded-none text-xs text-brand-dark hover:text-white font-bold tracking-wide transition-all focus:outline-none cursor-pointer"
            id={`buy-trigger-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
          </button>
        </div>

      </div>

    </div>
  );
}
