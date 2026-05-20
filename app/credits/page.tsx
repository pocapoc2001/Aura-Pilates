"use client";

import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Star, Zap, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreditsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; credit_balance: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session?.user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("credit_balance")
        .eq("id", session.user.id)
        .maybeSingle();

      setUser({
        id: session.user.id,
        email: session.user.email || "user@example.com",
        credit_balance: profile?.credit_balance || 0,
      });
    };

    fetchAuth();
  }, [router]);

  const handleCheckout = async (amount: number) => {
    if (!user) return;
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    // In a real app, this would be a Stripe route. For now, just update Supabase profiles.
    const newBalance = user.credit_balance + amount;
    const { error } = await supabase
      .from("profiles")
      .update({ credit_balance: newBalance })
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, credit_balance: newBalance });
      setToast(`Successfully purchased ${amount} credits.`);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("aura_balance_updated"));
      }
      setTimeout(() => setToast(null), 3000);
    } else {
      setToast(`Checkout failed.`);
      setTimeout(() => setToast(null), 3000);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex-1 w-full bg-[#FCFAFA] py-24 px-6 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#D2B4A7] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-[#FCFAFA] py-24 px-6 relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8F9D82]/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Toast Notification */}
      {toast && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#3A3331] text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)]"
        >
          <div className="w-6 h-6 rounded-full bg-[#8F9D82] flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium tracking-wide text-sm">{toast}</span>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-2xl mb-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#8F9D82] font-semibold tracking-widest uppercase text-sm mb-4 block">
              Abonamente Lunare
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#3A3331] mb-6">Investește în starea ta de bine</h1>
            <p className="text-lg text-[#5C5351] font-light leading-relaxed">
              Acces flexibil la întreaga noastră rețea de studiouri premium. Alege pachetul care se potrivește stilului tău de viață.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] border border-gray-50"
          >
             <span className="text-sm text-[#5C5351]">Balanță Curentă:</span>
             <span className="font-serif text-xl text-[#3A3331] font-semibold">{user.credit_balance} cr</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 items-center">
          
          {/* Starter Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.15)] hover:shadow-[0_8px_30px_-4px_rgba(210,180,167,0.25)] transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FCFAFA] text-[#5C5351] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-3xl text-[#3A3331] mb-2">Starter</h3>
            <p className="text-[#A98273] font-medium tracking-wide uppercase text-xs mb-8">Primești 20 Credite</p>
            
            <div className="mb-8 flex items-baseline space-x-2">
              <span className="font-serif text-5xl text-[#3A3331]">149</span>
              <span className="text-[#5C5351] text-lg font-light">RON / lună</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {['Acces la clase Mat Pilates', 'Păstrezi maxim 5 credite nefolosite pentru luna viitoare'].map(feature => (
                <li key={feature} className="flex items-start text-sm text-[#3A3331]">
                  <Check className="w-5 h-5 text-[#8F9D82] mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleCheckout(20)}
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#FCFAFA] text-[#3A3331] border border-gray-100 font-medium hover:bg-[#FAF7F6] transition-colors"
            >
              Alege Starter
            </button>
          </motion.div>

          {/* Balance Tier (Recommended) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-12 rounded-[3rem] border-2 border-[#D2B4A7]/30 shadow-[0_4px_40px_-4px_rgba(210,180,167,0.3)] relative flex flex-col md:-mt-8 md:-mb-8 backdrop-blur-md overflow-hidden"
          >
             {/* Inner ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2B4A7]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#D2B4A7] text-white px-4 py-1 rounded-b-xl text-xs font-semibold tracking-widest uppercase">
              Cel mai popular
            </div>

            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#D2B4A7]/10 text-[#D2B4A7] mb-6 relative z-10">
              <Star className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-4xl text-[#3A3331] mb-2 relative z-10">Balance</h3>
            <p className="text-[#A98273] font-medium tracking-wide uppercase text-xs mb-8 relative z-10">Primești 40 Credite</p>
            
            <div className="mb-8 flex items-baseline space-x-2 relative z-10">
              <span className="font-serif text-6xl text-[#3A3331]">249</span>
              <span className="text-[#5C5351] text-xl font-light">RON / lună</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1 relative z-10">
              {['Acces la studiouri Reformer premium', 'Păstrezi maxim 10 credite nefolosite pentru luna viitoare', 'Fără taxe ascunse'].map(feature => (
                <li key={feature} className="flex items-start text-sm text-[#3A3331]">
                  <Check className="w-5 h-5 text-[#8F9D82] mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleCheckout(40)}
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#C29D8D] hover:bg-[#A98273] text-white font-semibold shadow-[0_4px_20px_-4px_rgba(210,180,167,0.4)] hover:shadow-[0_8px_30px_-4px_rgba(210,180,167,0.5)] transition-all duration-300 relative z-10"
            >
              Alege Balance
            </button>
          </motion.div>

          {/* Elite Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#3A3331] p-10 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(58,51,49,0.3)] flex flex-col text-[#FCFAFA]"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-[#FCFAFA] mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-3xl text-[#FCFAFA] mb-2">Elite</h3>
            <p className="text-[#C29D8D] font-medium tracking-wide uppercase text-xs mb-8">Primești 75 Credite</p>
            
            <div className="mb-8 flex items-baseline space-x-2">
              <span className="font-serif text-5xl text-[#FCFAFA]">399</span>
             <span className="text-[#FCFAFA]/80 text-lg font-light">RON / lună</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {['Acces nelimitat la orice tip de clasă', 'Prioritate pe lista de așteptare'].map(feature => (
                <li key={feature} className="flex items-start text-sm text-[#FCFAFA]/80">
                  <Check className="w-5 h-5 text-[#8F9D82] mr-3 flex-shrink-0" />
                  <span className="font-light">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleCheckout(75)}
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#FCFAFA] text-[#3A3331] font-medium hover:bg-white transition-colors"
            >
              Alege Elite
            </button>
          </motion.div>

        </div>

        {/* Top-up section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 w-full max-w-3xl bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-50 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
        >
           <div className="text-center md:text-left">
             <h3 className="font-serif text-2xl text-[#3A3331] mb-2">Ai rămas fără credite luna aceasta?</h3>
             <p className="text-[#5C5351] font-light text-sm">Creditele extra nu expiră atâta timp cât ai un abonament activ.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={() => handleCheckout(5)}
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-[#FCFAFA] border border-[#C29D8D]/30 text-[#3A3331] hover:bg-[#F5EFEB] hover:border-[#C29D8D] font-medium text-sm transition-all whitespace-nowrap flex flex-col items-center justify-center shadow-sm"
              >
                  <span>+5 Credite</span>
                  <span className="text-xs font-light text-[#5C5351] mt-0.5">45 RON</span>
              </button>
              <button 
                onClick={() => handleCheckout(10)}
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-[#FCFAFA] border border-[#C29D8D]/30 text-[#3A3331] hover:bg-[#F5EFEB] hover:border-[#C29D8D] font-medium text-sm transition-all whitespace-nowrap flex flex-col items-center justify-center shadow-sm"
              >
                  <span>+10 Credite</span>
                  <span className="text-xs font-light text-[#5C5351] mt-0.5">80 RON</span>
              </button>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
