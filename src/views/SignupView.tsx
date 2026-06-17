import React, { useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import { UserProfile, Order, Consultation } from "../types";

interface SignupViewProps {
  setCurrentView: (view: string) => void;
  setIsAuthenticated: (val: boolean) => void;
  setProfile: (profile: UserProfile) => void;
  setOrders: (orders: Order[]) => void;
  setConsultations: (consultations: Consultation[]) => void;
}

export default function SignupView({ 
  setCurrentView, 
  setIsAuthenticated,
  setProfile,
  setOrders,
  setConsultations
}: SignupViewProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    if (name && email && password) {
      setIsAuthenticated(true);
      
      // Initialize fresh dashboard for the new user
      setProfile({
        name: name,
        email: email,
        avatar: "", // Provide default or leave empty
        shippingAddress: "",
        signatureScentId: "",
        notesSaved: []
      });
      setOrders([]);
      setConsultations([]);
      
      setCurrentView("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fadeIn">
      <div className="max-w-5xl w-full bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        {/* Right Side: Image / Brand Experience */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-brand-dark">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_kMfnovtl5ZkIUEMgs2hUSv017XzUXa-qs1K2hqq-b0nPxrmbXJmU1qsJfWEcXBxMYTXtoiJsX1OlzwCjvZYvBssrENVDEsx6kvrE87eT085LR5SjptbOtbsthhmn4_TWx-Np4vXcrhIg8dVwhCuOdAXoN1wBtOlcuiWZ_2WwuTQMiZBjy-EyxM8mblS8cqFHqbhqtDAtbVN4KWWPoELhzCERP6oyKqppfJVzXIV8U7bDHqgtmzYGeYEf7_WwU62x7cGQ7689VN_" 
            alt="Perfume BD Craftsmanship" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-10 text-white">
            <h2 className="font-serif text-3xl mb-4">Join the Inner Circle</h2>
            <p className="font-sans text-sm tracking-wide leading-relaxed text-white/80">
              Discover unparalleled olfactory artistry. Create an account to curate your signature library, request bespoke samples, and access exclusive formulations.
            </p>
          </div>
        </div>

        {/* Left Side: Signup Form */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="font-serif text-3xl text-brand-dark mb-2">Create Account</h1>
            <p className="font-sans text-sm text-brand-dark/60 tracking-wider">Begin your bespoke journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark/70 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-brand-dark/40" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-b-2 border-brand-dark/10 bg-transparent focus:outline-none focus:border-brand-orange transition-colors duration-300 font-serif text-brand-dark placeholder-brand-dark/30"
                  placeholder="Julianne Thorne"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark/70 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-dark/40" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-b-2 border-brand-dark/10 bg-transparent focus:outline-none focus:border-brand-orange transition-colors duration-300 font-serif text-brand-dark placeholder-brand-dark/30"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark/70 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-dark/40" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-b-2 border-brand-dark/10 bg-transparent focus:outline-none focus:border-brand-orange transition-colors duration-300 font-serif text-brand-dark placeholder-brand-dark/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-brand-dark text-brand-cream hover:bg-brand-orange hover:text-white transition-all duration-300 py-4 px-6 flex items-center justify-center group font-sans text-xs font-bold tracking-[0.2em] uppercase"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="font-sans text-[10px] tracking-widest text-brand-dark/60 uppercase">
              Already a member?{" "}
              <button 
                onClick={() => {
                  setCurrentView("login");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="font-bold text-brand-dark hover:text-brand-orange transition-colors ml-1"
              >
                Log In
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
