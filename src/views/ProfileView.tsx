/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Mail, MapPin, Award, Star, History, CalendarClock, ShieldCheck, Heart, Edit3, Save, Plus, Trash2, Calendar, ChevronDown, ChevronUp, Package, Receipt, Truck, Check, LogOut, UserMinus } from "lucide-react";
import { UserProfile, Order, Consultation, Product } from "../types";
import { PRODUCTS } from "../data";

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  orders: Order[];
  consultations: Consultation[];
  setConsultations: (consultation: Consultation[]) => void;
  onQuickView: (product: Product) => void;
  setIsAuthenticated: (val: boolean) => void;
  setCurrentView: (view: string) => void;
  setOrders: (orders: Order[]) => void;
}

export default function ProfileView({
  profile,
  setProfile,
  orders,
  consultations,
  setConsultations,
  onQuickView,
  setIsAuthenticated,
  setCurrentView,
  setOrders
}: ProfileViewProps) {
  // Editing states
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedAddress, setEditedAddress] = useState(profile.shippingAddress);

  // Scent Library - Custom Note Adding State
  const [newNoteInput, setNewNoteInput] = useState("");

  // Booking states
  const [bookingDate, setBookingDate] = useState("2026-06-25");
  const [bookingTime, setBookingTime] = useState("11:30");
  const [bookingType, setBookingType] = useState<"Olfactory Identity" | "Wedding Scent Profiling" | "Bespoke Curation">("Olfactory Identity");
  const [bookingConsultant, setBookingConsultant] = useState("Sylvain Alarie");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Tracking expanded order state for breakdown details
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Active Signature Perfume representation
  const signatureProduct = PRODUCTS.find((p) => p.id === profile.signatureScentId) || PRODUCTS[0];

  const handleProfileSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: editedName,
      email: editedEmail,
      shippingAddress: editedAddress
    });
    setIsEditing(false);
  };

  const handleAddScentNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteInput.trim() && !profile.notesSaved.includes(newNoteInput.trim())) {
      setProfile({
        ...profile,
        notesSaved: [...profile.notesSaved, newNoteInput.trim()]
      });
      setNewNoteInput("");
    }
  };

  const handleRemoveScentNote = (noteToRemove: string) => {
    setProfile({
      ...profile,
      notesSaved: profile.notesSaved.filter((n) => n !== noteToRemove)
    });
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Consultation = {
      id: `CNS-0${consultations.length + 5}`,
      date: bookingDate,
      time: bookingTime,
      expertName: bookingConsultant,
      type: bookingType,
      status: "Confirmed"
    };

    setConsultations([newBooking, ...consultations]);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const handleSignatureSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfile({
      ...profile,
      signatureScentId: e.target.value
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be reversed.")) {
      setProfile({
        name: "",
        email: "",
        avatar: "",
        shippingAddress: "",
        signatureScentId: "",
        notesSaved: []
      });
      setOrders([]);
      setConsultations([]);
      setIsAuthenticated(false);
      setCurrentView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans space-y-12 text-left" id="profile-view-stage">
      
      {/* 1. Header Banner & Card */}
      <div className="p-6 sm:p-10 border-2 border-brand-dark rounded-none bg-brand-cream flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-[6px_6px_0px_0px_#0f0f0f]">
        
        {/* Left Side: Avatar + Main titles */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 border-brand-dark overflow-hidden relative shadow-md">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="font-sans font-black text-xl uppercase tracking-tight text-brand-dark">
                {profile.name}
              </h2>
              <span className="bg-brand-orange text-white border-0 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none font-bold">
                Bespoke Scent Patron
              </span>
            </div>

            <div className="space-y-1 text-brand-dark/70 text-xs font-mono font-bold">
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <Mail className="w-3.5 h-3.5 text-brand-orange" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span className="truncate max-w-xs">{profile.shippingAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Toggle controls */}
        <div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-3 border border-brand-dark hover:border-brand-orange text-xs uppercase tracking-wider font-bold text-brand-dark hover:text-white hover:bg-brand-orange bg-white rounded-none flex items-center space-x-1.5 cursor-pointer focus:outline-none transition-colors"
              id="profile-edit-btn"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Curation Profile</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-3 border border-brand-dark text-xs uppercase tracking-wider text-brand-dark bg-white hover:bg-brand-gray rounded-none focus:outline-none cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

      </div>

      {/* Editing Form Window (Conditional) */}
      {isEditing && (
        <form onSubmit={handleProfileSaveSubmit} className="p-6 border border-brand-dark bg-brand-gray rounded-none space-y-4 animate-fadeIn" id="profile-edit-form">
          <div className="flex justify-between items-center pb-2 border-b border-brand-dark/15">
            <span className="font-mono text-[10px] text-brand-orange uppercase font-black tracking-widest">
              Modify Contact & Register Archives
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="edit-name-input">
                Full Name
              </label>
              <input
                type="text"
                required
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full bg-white border border-brand-dark/15 focus:border-brand-orange rounded-none px-3 py-2 text-xs focus:outline-none font-bold"
                id="edit-name-input"
                title="Full Name"
                placeholder="Full Name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="edit-email-input">
                Email Address
              </label>
              <input
                type="email"
                required
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-full bg-white border border-brand-dark/15 focus:border-brand-orange rounded-none px-3 py-2 text-xs focus:outline-none font-bold"
                id="edit-email-input"
                title="Email Address"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="edit-address-input">
              Mansion Shipping Address
            </label>
            <textarea
              rows={2}
              required
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="w-full bg-white border border-brand-dark/15 focus:border-brand-orange rounded-none px-3 py-2 text-xs focus:outline-none resize-none font-bold"
              id="edit-address-input"
              title="Mansion Shipping Address"
              placeholder="Mansion Shipping Address"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-brand-orange hover:bg-brand-dark hover:text-white text-white font-bold text-xs tracking-wider uppercase rounded-none transition-colors duration-300 flex items-center space-x-1.5 focus:outline-none cursor-pointer border-0"
              id="profile-save-btn"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. Middle Row: "Current Signature" special feature card vs Scent Library */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Card Area: Signature Scent Frame */}
        <div className="lg:col-span-12 xl:col-span-5 p-6 border border-brand-dark/15 bg-white space-y-5 text-left flex flex-col justify-between rounded-none">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-widest text-[#0f0f0f]/45 uppercase font-bold">
                Current Signature
              </span>
              <span className="bg-brand-orange text-white font-mono text-[9px] font-black px-2.5 py-1 uppercase rounded-none animate-pulse">
                In Rotation
              </span>
            </div>
            
            <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em] pt-2">
              Signature Formula
            </h3>
          </div>

          {/* Scent portrait Display */}
          <div className="p-4 border border-brand-dark/10 bg-brand-gray rounded-none flex items-center space-x-4">
            <div className="w-20 h-20 bg-white border border-brand-dark/10 rounded-none flex-shrink-0 p-2 flex items-center justify-center">
              <img
                src={signatureProduct.image}
                alt={signatureProduct.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-brand-orange font-bold">
                {signatureProduct.concentration}
              </span>
              <h4 className="font-sans uppercase font-black tracking-wider text-brand-dark text-sm">
                {signatureProduct.name}
              </h4>
              <p className="text-brand-dark/70 text-[10.5px] line-clamp-2 leading-tight font-sans">
                {signatureProduct.description}
              </p>
              <button
                onClick={() => onQuickView(signatureProduct)}
                className="text-[9px] uppercase tracking-widest text-brand-orange hover:text-brand-dark hover:underline pt-0.5 font-bold block"
              >
                Olfactory Details
              </button>
            </div>
          </div>

          {/* Signature Match Dropdwon selector */}
          <div className="space-y-1.5 pt-2 border-t border-brand-dark/15">
            <label className="block text-[9.5px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="signature-selector">
              Alter Signature Selection:
            </label>
            <select
              value={profile.signatureScentId}
              onChange={handleSignatureSelectChange}
              className="w-full bg-white border border-brand-dark/15 rounded-none px-2 py-2.5 text-xs text-brand-dark font-bold cursor-pointer focus:outline-none"
              id="signature-selector"
              title="Alter Signature Selection"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.concentration} (${p.price})
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-brand-dark text-white/60 text-[11px] leading-relaxed rounded-none font-mono border border-brand-dark/20 uppercase tracking-wide">
            &ldquo;Changing your signature shifts your olfactory projection settings. Sylvain Alarie will adjust private reserve recommendations accordingly.&rdquo;
          </div>

        </div>

        {/* Right Card Area: Scent Library list of favorited scent notes / elements */}
        <div className="lg:col-span-12 xl:col-span-7 p-6 border border-brand-dark/15 bg-white space-y-6 text-left rounded-none">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
              Olfactory Elements Ledger
            </span>
            <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
              Scent Library Saved Notes
            </h3>
          </div>

          <p className="text-brand-dark/70 text-xs">
            These are individual scent note classifications that trigger positive olfactory responses. Sylvain Alarie isolates these extracts during consultations.
          </p>

          {/* Grid list of notes tags */}
          <div className="flex flex-wrap gap-2.5">
            {profile.notesSaved.map((note) => (
              <div
                key={note}
                className="px-3.5 py-2 rounded-none border border-brand-dark/15 hover:border-brand-orange hover:shadow-[3px_3px_0px_0px_#ff3e00] bg-brand-gray flex items-center space-x-3 text-xs font-bold transition-all"
                id={`saved-note-tag-${note}`}
              >
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-brand-orange fill-brand-orange" />
                  <span className="font-sans uppercase text-brand-dark">{note}</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleRemoveScentNote(note)}
                  className="text-brand-dark/30 hover:text-brand-orange transition-colors focus:outline-none cursor-pointer"
                  title={`Delete ${note}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Form to insert custom elements */}
          <form onSubmit={handleAddScentNote} className="flex gap-2 pt-2" id="add-ledger-form">
            <input
              type="text"
              required
              value={newNoteInput}
              onChange={(e) => setNewNoteInput(e.target.value)}
              placeholder="e.g. Cedarwood, Patchouli, Szechuan Pepper"
              className="flex-grow bg-white border border-brand-dark/15 focus:border-brand-orange rounded-none px-3 py-2.5 text-xs focus:outline-none font-bold"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-brand-dark hover:bg-brand-orange text-white rounded-none text-xs uppercase tracking-wider font-bold transition-colors flex items-center space-x-1 cursor-pointer border-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add element</span>
            </button>
          </form>

        </div>

      </div>

      {/* 3. Lower Row: Order History Timeline Trackers vs Consultations scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
        
        {/* Left Side: Order history */}
        <div className="lg:col-span-12 xl:col-span-7 p-6 border border-brand-dark/15 rounded-none bg-white space-y-6 text-left">
          
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
              PATRON PROCUREMENT TIMELINE
            </span>
            <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
              Order History & Trackers
            </h3>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => {
              const isExpanded = expandedOrderId === ord.id;
              const totalItemsQty = ord.items.reduce((acc, curr) => acc + curr.quantity, 0);
              
              // Define tracking steps dynamically based on status
              const steps = [
                { label: "Atelier Registered", description: "Order confirmed & added to the Grasse reserve ledger.", status: "completed" },
                { 
                  label: "Olfactory Blending", 
                  description: "Master perfumer extracting & stabilizing raw scent extracts.", 
                  status: ord.status === "Processing" ? "active" : "completed" 
                },
                { 
                  label: "Hand-Wax Bottling", 
                  description: "Filling custom flacon & hand-wax sealing the brand badge.", 
                  status: ord.status === "Processing" ? "active" : "completed" 
                },
                { 
                  label: "Courier Despatch", 
                  description: "Premium shipping box with safety cushioning dispatched under signature requirement.", 
                  status: ord.status === "Processing" ? "pending" : (ord.status === "In Transit" ? "active" : "completed") 
                },
                { 
                  label: "Patron Delivery", 
                  description: "Hand delivered and certified matching signature scent registry.", 
                  status: ord.status === "Delivered" ? "completed" : (ord.status === "In Transit" ? "pending" : "pending") 
                },
              ];

              return (
                <div 
                  key={ord.id} 
                  className={`border border-brand-dark/15 rounded-none bg-brand-gray/30 transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "ring-2 ring-brand-orange bg-brand-gray/10 shadow-[6px_6px_0px_0px_#1a1a1a]" 
                      : "hover:shadow-[4px_4px_0px_0px_#ff3e00] hover:border-brand-dark hover:bg-brand-gray/50 cursor-pointer"
                  }`} 
                  id={`timeline-order-${ord.id}`}
                >
                  {/* Card Trigger Header */}
                  <div 
                    onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                    id={`order-header-trigger-${ord.id}`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2 rounded-none transition-colors border ${
                        isExpanded ? "bg-brand-orange border-brand-orange text-white" : "bg-white border-brand-dark/10 text-brand-dark/60"
                      }`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-brand-dark font-black tracking-tight text-sm font-sans">{ord.id}</span>
                          <span className="text-brand-dark/45 text-[11px] font-mono font-bold">({ord.date})</span>
                        </div>
                        <div className="text-[10px] text-brand-dark/65 font-mono font-bold tracking-wider uppercase mt-0.5">
                          {totalItemsQty} {totalItemsQty === 1 ? 'Scent' : 'Scents'} • {ord.items.map(item => item.productName).join(", ")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <span className="block text-brand-dark font-black text-sm font-sans">${ord.total.toFixed(2)}</span>
                        <span className={`inline-block px-2 py-0.5 mt-1 rounded-none text-[8.5px] font-bold uppercase tracking-widest border ${
                          ord.status === "In Transit"
                            ? "bg-brand-orange border-brand-orange text-white"
                            : ord.status === "Delivered"
                            ? "bg-brand-dark border-brand-dark text-white"
                            : "bg-white border-brand-dark/20 text-brand-dark/70"
                        }`}>
                          {ord.status}
                        </span>
                      </div>

                      <div className="text-brand-dark/45 hover:text-brand-orange transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-brand-orange stroke-[2.5]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 group-hover:text-brand-orange stroke-[2]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed Breakdown Container */}
                  {isExpanded && (
                    <div className="border-t border-brand-dark/10 bg-white p-5 space-y-6 animate-fadeIn">
                      
                      {/* Section 1: Itemized Products */}
                      <div className="space-y-3">
                        <h4 className="font-sans font-black uppercase text-brand-dark text-[10.5px] tracking-[0.15em] border-b border-brand-dark/10 pb-1.5 flex items-center space-x-1.5 animate-fadeIn">
                          <Package className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Purchased Olfactory Creations</span>
                        </h4>
                        
                        <div className="divide-y divide-brand-dark/5">
                          {ord.items.map((sub, sidx) => (
                            <div key={sidx} className="py-3 flex items-center space-x-4 text-xs first:pt-0 last:pb-0 animate-fadeIn">
                              <div className="w-12 h-12 rounded-none border border-brand-dark/10 bg-brand-gray p-1.5 flex-shrink-0 flex items-center justify-center">
                                <img
                                  src={sub.image}
                                  alt={sub.productName}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              
                              <div className="flex-grow">
                                <h5 className="font-sans font-black uppercase text-brand-dark text-xs">{sub.productName}</h5>
                                <div className="flex items-center space-x-2 mt-0.5 text-[10px] text-brand-dark/60 font-mono font-bold tracking-wider">
                                  <span>{sub.volume}</span>
                                  <span>•</span>
                                  <span>Qty: {sub.quantity}</span>
                                </div>
                              </div>
                              
                              <div className="text-right font-mono text-xs font-bold text-brand-dark">
                                <span className="block">${sub.price.toFixed(2)}</span>
                                {sub.quantity > 1 && (
                                  <span className="text-[9.5px] text-brand-dark/50 font-normal font-sans">(${sub.price / sub.quantity} each)</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Financial Breakdown Ledger */}
                      <div className="bg-brand-gray/40 border border-brand-dark/10 p-4 space-y-3 animate-fadeIn">
                        <h4 className="font-sans font-black uppercase text-brand-dark text-[10px] tracking-[0.15em] border-b border-brand-dark/10 pb-1.5 flex items-center space-x-1.5">
                          <Receipt className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Acquisition Ledger Statement</span>
                        </h4>
                        
                        <div className="space-y-1.5 text-xs font-mono font-bold text-brand-dark/85">
                          <div className="flex justify-between">
                            <span className="text-brand-dark/55">Creations Subtotal:</span>
                            <span>${(ord.total - (ord.total * 0.085)).toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-brand-dark/55">Artisanal Wrapping & Gift Case:</span>
                            <span className="text-brand-orange uppercase text-[9px] tracking-wide font-black flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Complimentary
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-brand-dark/55">Priority Courier Shipment (Grasse-Paris):</span>
                            <span className="text-brand-orange uppercase text-[9px] tracking-wide font-black flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Complimentary
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-brand-dark/55">VAT / Duties (8.5% Luxury Tax):</span>
                            <span>${(ord.total * 0.085).toFixed(2)}</span>
                          </div>

                          <div className="border-t border-brand-dark/10 pt-2 flex justify-between items-center text-sm font-sans font-black text-brand-dark">
                            <span>Scent Ledger Total:</span>
                            <span className="text-brand-orange text-base">${ord.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Status Stepper Timeline */}
                      <div className="space-y-4 animate-fadeIn">
                        <h4 className="font-sans font-black uppercase text-brand-dark text-[10px] tracking-[0.15em] border-b border-brand-dark/10 pb-1.5 flex items-center space-x-1.5">
                          <Truck className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Atelier Processing & Courier Milestones</span>
                        </h4>

                        <div className="relative pl-6 space-y-4 font-mono text-[10.5px]">
                          {/* Left solid connection bar line */}
                          <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-brand-dark/10" />

                          {steps.map((step, idx) => {
                            const isDone = step.status === "completed";
                            const isActive = step.status === "active";
                            
                            return (
                              <div key={idx} className="relative space-y-0.5">
                                {/* Bullet indicator dot */}
                                <div className={`absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                                  isDone 
                                    ? "bg-brand-orange border-brand-orange shadow-[0px_0px_4px_#ff3e00]" 
                                    : isActive 
                                    ? "bg-white border-brand-orange animate-pulse" 
                                    : "bg-white border-brand-dark/20"
                                }`} />

                                <div className="flex flex-col">
                                  <span className={`font-sans font-black uppercase text-[10px] tracking-wider ${
                                    isDone ? "text-brand-orange" : isActive ? "text-brand-dark" : "text-brand-dark/40"
                                  }`}>
                                    {step.label} {isActive && "— ACTIVE"}
                                  </span>
                                  <p className={`text-xs mt-0.5 leading-relaxed font-sans ${
                                    isDone || isActive ? "text-brand-dark/75" : "text-brand-dark/40 font-normal"
                                  }`}>
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {ord.trackingNumber && (
                          <div className="p-3 bg-brand-dark text-white/95 rounded-none text-[10px] font-mono uppercase tracking-wider flex justify-between items-center">
                            <span>Private Courier Tracking</span>
                            <span className="bg-brand-orange text-white px-2.5 py-1 text-[9.5px] font-black tracking-widest leading-none">
                              {ord.trackingNumber}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Consultation booking schedule scheduler */}
        <div className="lg:col-span-12 xl:col-span-5 p-6 border border-brand-dark/15 bg-white space-y-6 text-left flex flex-col justify-between rounded-none">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-brand-dark/40 uppercase font-black">
              LA MAISON ATELIER
            </span>
            <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
              Olfactory Consultations
            </h3>
          </div>

          <p className="text-brand-dark/70 text-xs leading-relaxed">
            Register a private virtual appointment with one of our master blenders to analyze your custom olfactory chemistry index.
          </p>

          {/* Book form */}
          {bookingSuccess ? (
            <div className="p-5 border border-brand-orange bg-brand-orange/5 text-brand-dark rounded-none text-center text-xs animate-fadeIn space-y-1">
              <span className="font-serif italic text-brand-orange font-bold text-sm block">Appointment Registered!</span>
              <p>Your olfactory consult dossier has been added below. Sylvain Alarie will mail physical smelling cards directly to your shipping address.</p>
            </div>
          ) : (
            <form onSubmit={handleBookConsultation} className="space-y-3 p-4 bg-brand-gray rounded-none border border-brand-dark/15" id="consult-book-form">
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="schedule-date">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-white border border-brand-dark/15 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-orange font-bold"
                    id="schedule-date"
                    title="Schedule Date"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="schedule-time">
                    Hour (GMT+1)
                  </label>
                  <input
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-white border border-brand-dark/15 rounded-none px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-orange font-bold"
                    id="schedule-time"
                    title="Hour (GMT+1)"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="olfactory-inquiry-type">
                  Olfactory Inquiry Type
                </label>
                <select
                  value={bookingType}
                  onChange={(e: any) => setBookingType(e.target.value)}
                  className="w-full bg-white border border-brand-dark/15 rounded-none px-2.5 py-2 text-xs text-brand-dark font-bold cursor-pointer focus:outline-none focus:border-brand-orange"
                  id="olfactory-inquiry-type"
                  title="Olfactory Inquiry Type"
                >
                  <option value="Olfactory Identity">Olfactory Identity Curation</option>
                  <option value="Wedding Scent Profiling">Bridal/Wedding Scent Profiling</option>
                  <option value="Bespoke Curation">Bespoke Aroma Synthesis</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] tracking-widest uppercase font-mono text-brand-dark/45 font-bold" htmlFor="assigned-master-blender">
                  Assigned Master Blender
                </label>
                <select
                  value={bookingConsultant}
                  onChange={(e) => setBookingConsultant(e.target.value)}
                  className="w-full bg-white border border-brand-dark/15 rounded-none px-2.5 py-2 text-xs text-brand-dark font-bold cursor-pointer focus:outline-none focus:border-brand-orange"
                  id="assigned-master-blender"
                  title="Assigned Master Blender"
                >
                  <option value="Sylvain Alarie">Sylvain Alarie (Grasse Lead)</option>
                  <option value="Gabrielle Moreau">Gabrielle Moreau (Aroma Chemist)</option>
                  <option value="Dominic Pascal">Dominic Pascal (Botanical Sourcing Chef)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-brand-dark text-white rounded-none text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer border-0"
                id="book-submit-btn"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Curation Consult</span>
              </button>

            </form>
          )}

          {/* List existing consults */}
          <div className="space-y-2 pt-2 border-t border-brand-dark/15 font-sans">
            <span className="block font-mono text-[9px] tracking-widest text-brand-dark/40 uppercase font-black">
              Scheduled Dossiers
            </span>

            <div className="space-y-2 max-h-[160px] overflow-y-auto">
              {consultations.map((c) => (
                <div key={c.id} className="p-3 border border-brand-dark/15 rounded-none bg-brand-gray flex justify-between items-center text-xs hover:border-brand-dark transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[9px] bg-brand-dark text-white px-1.5 py-0.5 rounded-none font-bold uppercase mr-1.5">
                      {c.id}
                    </span>
                    <strong className="text-brand-dark uppercase font-sans tracking-tight font-black">{c.type}</strong>
                    <div className="font-mono text-[10px] text-brand-dark/60 font-bold whitespace-nowrap pt-0.5">
                      <span>{c.date} ({c.time}) with <strong>{c.expertName}</strong></span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-brand-orange uppercase tracking-wider text-[10px]">{c.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Account Administration Section */}
      <div className="p-6 border border-brand-dark/15 bg-white rounded-none flex flex-col sm:flex-row justify-between items-center gap-6 animate-fadeIn">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-[10px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
            Account Administration
          </span>
          <h3 className="font-sans font-black uppercase text-brand-dark text-xs tracking-[0.15em]">
            Security & Data
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={handleLogout}
            className="px-6 py-3 border border-brand-dark hover:border-brand-orange hover:text-brand-orange text-xs uppercase tracking-wider font-bold text-brand-dark bg-white rounded-none flex items-center justify-center space-x-1.5 transition-colors focus:outline-none cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Logout</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 border border-red-900/20 bg-red-900/5 hover:bg-red-900 hover:text-white text-xs uppercase tracking-wider font-bold text-red-900 rounded-none flex items-center justify-center space-x-1.5 transition-colors focus:outline-none cursor-pointer"
          >
            <UserMinus className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

    </div>
  );
}
