import React, { useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { UserProfile, Order, Consultation } from "../types";
import { INITIAL_PROFILE, INITIAL_ORDERS, INITIAL_CONSULTATIONS } from "../data";

interface LoginViewProps {
  setCurrentView: (view: string) => void;
  setIsAuthenticated: (val: boolean) => void;
  setProfile: (profile: UserProfile) => void;
  setOrders: (orders: Order[]) => void;
  setConsultations: (consultations: Consultation[]) => void;
}

export default function LoginView({ 
  setCurrentView, 
  setIsAuthenticated,
  setProfile,
  setOrders,
  setConsultations
}: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    if (email && password) {
      setIsAuthenticated(true);
      
      // If logging in as the default initial user (for demo purposes)
      if (email.toLowerCase() === INITIAL_PROFILE.email.toLowerCase()) {
        setProfile(INITIAL_PROFILE);
        setOrders(INITIAL_ORDERS);
        setConsultations(INITIAL_CONSULTATIONS);
      } else {
        // Otherwise, initialize a fresh dashboard for this user
        setProfile({
          name: email.split("@")[0], // Simple name extraction
          email: email,
          avatar: "", // Provide default or leave empty
          shippingAddress: "",
          signatureScentId: "",
          notesSaved: []
        });
        setOrders([]);
        setConsultations([]);
      }
      
      setCurrentView("profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center animate-fadeIn">
      <div className="max-w-5xl w-full bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image / Brand Experience */}
        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-brand-dark">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDokwGTqq2yiw-CbJpDqvNn2ZreH_h_YBd9xIB8RKka7R9izzyxEZsAPYpwm1_85bpOWK84OqJIEvdKL86Qe7EPcnhQZs0TWUTxDK8GDURXlw7Vh0lTdaFFAENvHA4Kk1i92qxD1W3DmAW4xP1ZBNMXYyllraIRyNBkwFRZ_KqarilWBejzseQwUIh6gdSInnfa4VzGWpVt3iAKu_LPnm2ZN0IKERiPPY7IaqLopx7koWxgiNcYifZMKVQ2gBexDbCVCq0GhYlCEY-L" 
            alt="Perfume BD Heritage" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent flex flex-col justify-end p-10 text-white">
            <h2 className="font-serif text-3xl mb-4">Enter the Maison</h2>
            <p className="font-sans text-sm tracking-wide leading-relaxed text-white/80">
              Access your personalized olfactory journey, track your bespoke orders, and curate your signature scent library.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="font-serif text-3xl text-brand-dark mb-2">Welcome Back</h1>
            <p className="font-sans text-sm text-brand-dark/60 tracking-wider">Please enter your credentials to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-end mt-2">
                <button type="button" className="text-[10px] font-sans font-bold tracking-widest text-brand-dark/50 hover:text-brand-orange uppercase transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-brand-dark text-brand-cream hover:bg-brand-orange hover:text-white transition-all duration-300 py-4 px-6 flex items-center justify-center group font-sans text-xs font-bold tracking-[0.2em] uppercase"
            >
              <span>Authenticate</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="font-sans text-[10px] tracking-widest text-brand-dark/60 uppercase">
              Don't have an account?{" "}
              <button 
                onClick={() => {
                  setCurrentView("signup");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="font-bold text-brand-dark hover:text-brand-orange transition-colors ml-1"
              >
                Create One
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
