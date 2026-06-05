/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CartItem, Order } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, volume: string, qty: number) => void;
  onRemoveItem: (productId: string, volume: string) => void;
  onPlaceOrder: (newOrder: Order) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder
}: CartSidebarProps) {
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = View, 1 = Billing/Form, 2 = Confirmed

  // Form Fields
  const [fullName, setFullName] = useState("Julianne Thorne");
  const [shippingAddress, setShippingAddress] = useState("450 Rue de l'Odéon, Appt 4B, 75006 Paris, France");
  const [cardDetails, setCardDetails] = useState("•••• •••• •••• 9811");

  if (!isOpen) return null;

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);
  const shippingFee = subtotal > 150 ? 0 : 15.0;
  const estimatedTax = Math.round(subtotal * 0.08); // 8% VAT
  const grandTotal = subtotal + shippingFee + estimatedTax;

  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      setCheckoutStep(1);
    }
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // construct a premium Order object standard to our types
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Processing",
      total: grandTotal,
      trackingNumber: `FR-${Math.floor(100000 + Math.random() * 900000)}-DHL`,
      items: cart.map((item) => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.priceAtSelection,
        volume: item.selectedVolume,
        image: item.product.image
      }))
    };

    onPlaceOrder(newOrder);
    setCheckoutStep(2);
  };

  const resetSidebar = () => {
    setCheckoutStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-sidebar-container">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Drawer viewport */}
        <div className="w-screen max-w-md bg-white border-l-2 border-brand-dark shadow-2xl flex flex-col h-full overflow-hidden animate-slideLeft rounded-none font-sans">
          
          {/* Header Block */}
          <div className="px-6 py-6 border-b border-brand-dark/15 flex items-center justify-between bg-brand-cream/40">
            <span className="font-sans font-black tracking-widest text-brand-dark text-sm uppercase flex items-center gap-2">
              <ShoppingBag className="w-4.5 h-4.5 text-brand-orange" />
              Scent Bag {cart.length > 0 ? `(${cart.length})` : ""}
            </span>
            <button
              onClick={onClose}
              className="p-1 px-2.5 border border-brand-dark/15 hover:bg-brand-orange hover:text-white text-brand-dark rounded-none font-bold cursor-pointer transition-colors"
              id="close-cart-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Checkout views switch */}
          {checkoutStep === 0 && (
            <div className="flex-grow flex flex-col h-full overflow-hidden">
              
              {/* Bag list */}
              <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item, i) => (
                    <div
                      key={`${item.product.id}-${item.selectedVolume}-${i}`}
                      className="flex items-center space-x-4 p-3.5 border border-brand-dark/10 rounded-none bg-brand-gray hover:border-brand-dark transition-all"
                      id={`cart-item-${item.product.id}-${i}`}
                    >
                      <div className="w-16 h-16 bg-white border border-brand-dark/10 rounded-none flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-grow space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-sans text-xs uppercase font-black tracking-wide text-brand-dark">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedVolume)}
                            className="text-brand-dark/40 hover:text-brand-orange transition-colors cursor-pointer"
                            title="Remove Formula"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 text-[9px] font-mono uppercase text-brand-dark/50 font-bold">
                          <span>{item.selectedVolume}</span>
                          <span>•</span>
                          <span className="text-brand-orange font-black">${item.priceAtSelection.toFixed(2)} ea</span>
                        </div>

                        {/* Quantity trigger */}
                        <div className="flex items-center justify-between pt-1.5">
                          <div className="flex items-center space-x-2.5 border border-brand-dark px-2 py-0.5 bg-white text-xs rounded-none">
                            <button
                              onClick={() => item.quantity > 1 && onUpdateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)}
                              className="text-brand-dark font-black hover:text-brand-orange pr-1 select-none focus:outline-none cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-brand-dark font-black text-xs select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)}
                              className="text-brand-dark font-black hover:text-brand-orange pl-1 select-none focus:outline-none cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          
                          <span className="font-sans font-black text-brand-dark text-xs">
                            ${(item.priceAtSelection * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 space-y-4 text-brand-dark/40" id="cart-empty-stage">
                    <div className="w-12 h-12 rounded-none border-2 border-dashed border-brand-dark/25 flex items-center justify-center mx-auto text-brand-dark/30">
                      <ShoppingBag className="w-5 h-5 text-brand-dark/30" />
                    </div>
                    <div>
                      <p className="font-serif italic text-sm text-brand-dark">Your Scent Bag is vacant.</p>
                      <p className="text-[10px] mt-1 font-mono">Acquire formulas from Paris ateliers to commence distillation.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer footer computations summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t-2 border-brand-dark bg-brand-cream/40 space-y-4">
                  <div className="space-y-2 text-xs font-mono text-brand-dark/70 font-bold uppercase text-[9px] tracking-wider">
                    <div className="flex justify-between">
                      <span>Formulae Subtotal</span>
                      <span className="text-brand-dark font-black">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maison Courier Shipping</span>
                      <span className="text-brand-dark font-black">
                        {shippingFee === 0 ? "Bespoke Complimentary" : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated VAT (8%)</span>
                      <span className="text-brand-dark font-black">${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-brand-dark/15 flex justify-between font-sans text-brand-dark font-black text-sm">
                      <span className="uppercase tracking-widest text-xs">Total Curation</span>
                      <span className="text-brand-orange text-lg">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 bg-brand-orange hover:bg-brand-dark text-white font-black text-xs tracking-widest uppercase rounded-none transition-colors duration-300 flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_#0f0f0f] border-0 focus:outline-none cursor-pointer"
                    id="checkout-trigger-btn"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Checkout Steps 1: Shipping and Billing payment */}
          {checkoutStep === 1 && (
            <form onSubmit={handlePlaceOrderSubmit} className="flex-grow flex flex-col h-full overflow-hidden" id="checkout-form">
              <div className="flex-grow overflow-y-auto px-6 py-6 space-y-5">
                <span className="font-mono text-[9px] text-[#000]/40 tracking-wider uppercase font-black block">
                  Bespoke Verification Details
                </span>
                
                {/* Shipping info */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] tracking-widest uppercase font-mono font-black text-brand-dark/60">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-brand-gray border border-brand-dark/25 focus:border-brand-orange rounded-none px-3 py-2.5 text-xs focus:outline-none font-bold text-brand-dark"
                    id="checkout-name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] tracking-widest uppercase font-mono font-black text-brand-dark/60">
                    Delivery Mansion Address
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-brand-gray border border-brand-dark/25 focus:border-brand-orange rounded-none px-3 py-2.5 text-xs focus:outline-none resize-none font-bold text-brand-dark"
                    id="checkout-address"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Dummy Credit Card */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] tracking-widest uppercase font-mono font-black text-brand-dark/60">
                    Bespoke Card Registry Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardDetails}
                    onChange={(e) => setCardDetails(e.target.value)}
                    className="w-full bg-brand-gray border border-brand-dark/25 focus:border-brand-orange rounded-none px-3 py-2.5 text-xs focus:outline-none font-mono font-bold text-brand-dark"
                    id="checkout-card"
                  />
                  <span className="text-[9px] text-[#0c0c0c]/40 font-mono font-bold">
                    Secured by Paris Royal Bank Encryption Standards.
                  </span>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-brand-gray rounded-none border border-brand-dark/15 flex justify-between items-center text-xs">
                  <span className="font-mono text-brand-dark/60 uppercase font-bold text-[9px]">Charged total</span>
                  <span className="font-sans font-black text-brand-orange text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout page actions */}
              <div className="p-6 border-t border-brand-dark/15 bg-brand-cream/40 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(0)}
                  className="px-4 py-3 border border-brand-dark/30 hover:bg-brand-dark hover:text-white rounded-none text-xs uppercase font-bold text-brand-dark bg-white cursor-pointer transition-colors"
                  id="checkout-back-btn"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className="flex-grow py-3 bg-brand-orange hover:bg-brand-dark text-white font-black text-xs tracking-wider uppercase rounded-none transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-[3px_3px_0px_0px_#000] border-0"
                  id="checkout-place-btn"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Place Bespoke Order</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Checkout complete confirmation receipt */}
          {checkoutStep === 2 && (
            <div className="flex-grow overflow-y-auto px-6 py-12 flex flex-col items-center justify-center text-center space-y-6" id="checkout-completed-stage">
              <div className="w-16 h-16 bg-brand-orange flex items-center justify-center border-2 border-brand-dark text-white animate-bounce rounded-none shadow-[4px_4px_0_0_#000]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif italic text-brand-orange text-lg font-bold">Commande Confirmée</h3>
                <h4 className="font-sans font-black uppercase text-brand-dark tracking-wider text-sm">
                  Distillation Commenced Successfully
                </h4>
                <p className="text-brand-dark/75 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  Your order details has been dispatched into Julianne Thorne&rsquo;s Profile timeline dashboard records. Your master perfumer has commenced formulating your bespoke absolute blends.
                </p>
              </div>

              <button
                onClick={resetSidebar}
                className="px-6 py-3 border-2 border-brand-dark bg-brand-orange text-white font-black text-xs tracking-widest uppercase hover:bg-brand-dark hover:text-white rounded-none transition-all duration-300 focus:outline-none cursor-pointer shadow-[4px_4px_0px_0px_#000]"
                id="cart-confirmation-continue-btn"
              >
                Return to La Maison
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
