"use client";

import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Star, Zap, Shield, CreditCard, Lock, X, CircleCheck, HelpCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreditsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string; credit_balance: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Simulated Payment Modal States
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string; credits: number; isSubscription: boolean } | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "gpay">("card");

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

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedProduct) return;
    
    setIsProcessing(true);
    // Simulate interactive micro-payment gateway timeout
    await new Promise(r => setTimeout(r, 2200));

    const newBalance = user.credit_balance + selectedProduct.credits;
    const { error } = await supabase
      .from("profiles")
      .update({ credit_balance: newBalance })
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, credit_balance: newBalance });
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Let other parts of the site know
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("aura_balance_updated"));
      }

      // Automatically close modal after 2.5 seconds
      setTimeout(() => {
        setSelectedProduct(null);
        setIsSuccess(false);
        // Clear card inputs
        setCardNumber("");
        setCardName("");
        setExpiryDate("");
        setCvv("");
      }, 2500);
    } else {
      setIsProcessing(false);
      setToast(`Checkout failed.`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleFastPay = async () => {
    if (!user || !selectedProduct) return;
    setPaymentMethod("gpay");
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1800));

    const newBalance = user.credit_balance + selectedProduct.credits;
    const { error } = await supabase
      .from("profiles")
      .update({ credit_balance: newBalance })
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, credit_balance: newBalance });
      setIsProcessing(false);
      setIsSuccess(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("aura_balance_updated"));
      }

      setTimeout(() => {
        setSelectedProduct(null);
        setIsSuccess(false);
      }, 2500);
    } else {
      setIsProcessing(false);
      setToast(`Fast pay failed.`);
      setTimeout(() => setToast(null), 3000);
    }
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
              onClick={() => setSelectedProduct({ name: "Abonament Starter", price: "149 RON", credits: 20, isSubscription: true })}
              className="w-full py-4 rounded-full bg-[#FCFAFA] text-[#3A3331] border border-gray-100 font-medium hover:bg-[#FAF7F6] transition-all duration-300 shadow-sm active:scale-98"
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
              onClick={() => setSelectedProduct({ name: "Abonament Balance", price: "249 RON", credits: 40, isSubscription: true })}
              className="w-full py-4 rounded-full bg-[#C29D8D] hover:bg-[#A98273] text-white font-semibold shadow-[0_4px_20px_-4px_rgba(210,180,167,0.4)] hover:shadow-[0_8px_30px_-4px_rgba(210,180,167,0.5)] transition-all duration-300 relative z-10 active:scale-98"
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
            <h3 className="font-serif text-3xl text-[#FCFAFA] mb-2 font-light">Elite</h3>
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
              onClick={() => setSelectedProduct({ name: "Abonament Elite", price: "399 RON", credits: 75, isSubscription: true })}
              className="w-full py-4 rounded-full bg-[#FCFAFA] text-[#3A3331] font-medium hover:bg-white transition-all duration-300 active:scale-98"
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
                onClick={() => setSelectedProduct({ name: "+5 Credite Extra", price: "45 RON", credits: 5, isSubscription: false })}
                className="px-6 py-3 rounded-2xl bg-[#FCFAFA] border border-[#C29D8D]/30 text-[#3A3331] hover:bg-[#F5EFEB] hover:border-[#C29D8D] font-medium text-sm transition-all whitespace-nowrap flex flex-col items-center justify-center shadow-sm active:scale-98"
              >
                  <span className="font-semibold">+5 Credite</span>
                  <span className="text-xs font-light text-[#5C5351] mt-0.5">45 RON</span>
              </button>
              <button 
                onClick={() => setSelectedProduct({ name: "+10 Credite Extra", price: "80 RON", credits: 10, isSubscription: false })}
                className="px-6 py-3 rounded-2xl bg-[#FCFAFA] border border-[#C29D8D]/30 text-[#3A3331] hover:bg-[#F5EFEB] hover:border-[#C29D8D] font-medium text-sm transition-all whitespace-nowrap flex flex-col items-center justify-center shadow-sm active:scale-98"
              >
                  <span className="font-semibold">+10 Credite</span>
                  <span className="text-xs font-light text-[#5C5351] mt-0.5">80 RON</span>
              </button>
           </div>
        </motion.div>
      </div>

      {/* Simulated Premium Checkout Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isProcessing && !isSuccess) setSelectedProduct(null); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FCFAFA] rounded-[2.5rem] shadow-2xl border border-[#D2B4A7]/25 overflow-hidden p-8 z-10"
            >
              {/* Close Button */}
              {!isProcessing && !isSuccess && (
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-[#3A3331] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Success State */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-20 h-20 rounded-full bg-[#8F9D82]/10 border-2 border-[#8F9D82] text-[#8F9D82] flex items-center justify-center"
                  >
                    <Check className="w-10 h-10" strokeWidth={3} />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-[#3A3331]">Plată finalizată cu succes!</h3>
                    <p className="text-sm text-[#5C5351]">Tranzacția a fost înregistrată în siguranță.</p>
                  </div>
                  <div className="bg-white/80 border border-gray-100 px-6 py-4 rounded-2xl inline-flex flex-col items-center shadow-inner">
                    <span className="text-xs text-[#5C5351] uppercase tracking-wider font-light">Suplimentare balanță</span>
                    <span className="font-serif text-2xl text-[#3A3331] mt-1">+{selectedProduct.credits} Credite</span>
                  </div>
                  <p className="text-xs text-[#8F9D82] animate-pulse">Balanța ta a fost actualizată pe loc.</p>
                </div>
              ) : isProcessing ? (
                /* Processing State */
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-[#C29D8D]/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#C29D8D] animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#3A3331] animate-pulse">Sistemul procesează plata...</h3>
                    <p className="text-xs text-[#5C5351] font-light">Securizat prin conexiune criptată TLS 3D-Secure</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8F9D82] bg-[#8F9D82]/10 px-3 py-1 rounded-full">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Conexiune PCI-DSS complice</span>
                  </div>
                </div>
              ) : (
                /* Interactive Form Fields */
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs text-[#C29D8D] font-semibold uppercase tracking-widest">Finalizare comandă Anel Studios</span>
                    <h3 className="font-serif text-3xl text-[#3A3331]">{selectedProduct.name}</h3>
                    <div className="flex justify-between items-center bg-white border border-[#D2B4A7]/15 p-4 rounded-2xl mt-4">
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-[#5C5351]">Valoare pachet</span>
                        <span className="text-lg font-serif text-[#3A3331] font-semibold">{selectedProduct.price}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-xs text-[#5C5351]">Credite incluse</span>
                        <span className="font-semibold text-[#8F9D82]">{selectedProduct.credits} cr</span>
                      </div>
                    </div>
                  </div>

                  {/* Fast Checkout Select */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 rounded-xl border font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-[#3A3331] text-white border-transparent' : 'bg-white text-[#5C5351] border-gray-100 hover:bg-[#FCFAFA]'}`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Card de Credit
                    </button>
                    <button 
                      type="button"
                      onClick={handleFastPay}
                      className="py-3 bg-white hover:bg-gray-50 border border-gray-100 text-[#3A3331] rounded-xl font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 duration-200"
                    >
                      <span className="font-semibold">Google Pay</span>
                    </button>
                  </div>

                  {paymentMethod === "card" ? (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                      {/* Name fields */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-[#3A3331] uppercase tracking-wider font-medium">Nume pe card</label>
                        <input 
                          type="text" 
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="ALEXANDRU IONESCU"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D] focus:border-[#C29D8D] text-sm uppercase transition-colors"
                        />
                      </div>

                      {/* Card Number fields */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs text-[#3A3331] uppercase tracking-wider font-medium">Număr Card</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => {
                              // Auto whitespace groupings
                              const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = val.match(/\d{4,16}/g);
                              const match = matches && matches[0] || '';
                              const parts = [];

                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }

                              if (parts.length > 0) {
                                setCardNumber(parts.join(' '));
                              } else {
                                setCardNumber(val);
                              }
                            }}
                            placeholder="4000 1234 5678 9010"
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D] focus:border-[#C29D8D] text-sm transition-colors"
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-[#3A3331] uppercase tracking-wider font-medium font-semibold">Dată Expirare</label>
                          <input 
                            type="text" 
                            required
                            maxLength={5}
                            value={expiryDate}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9]/g, '');
                              if (val.length > 2) {
                                val = val.substring(0, 2) + '/' + val.substring(2, 4);
                              }
                              setExpiryDate(val);
                            }}
                            placeholder="Luna / Anul"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D] focus:border-[#C29D8D] text-sm text-center transition-colors font-mono"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs text-[#3A3331] uppercase tracking-wider font-medium font-semibold">Cod CVV</label>
                          <input 
                            type="password" 
                            required
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="•••"
                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D] focus:border-[#C29D8D] text-sm text-center font-mono tracking-widest transition-colors"
                          />
                        </div>
                      </div>

                      {/* Pay Button */}
                      <button 
                        type="submit"
                        disabled={isProcessing}
                        className="w-full py-4 rounded-full bg-[#C29D8D] hover:bg-[#A98273] text-white font-semibold text-sm transition-all shadow-[0_4px_15px_rgba(210,180,167,0.3)] mt-6 active:scale-98"
                      >
                        Efectuează Plata Securizată
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4 text-center">
                        <Lock className="w-3.5 h-3.5 text-[#8F9D82]" />
                        <span>Tranzacție criptată prin SSL Secure.</span>
                      </div>
                    </form>
                  ) : (
                    <div className="py-6 text-center space-y-4">
                      <p className="text-sm text-[#5C5351]">Te rugăm să confirmi plata rapidă prin aplicația instalată pe mobil.</p>
                      <button 
                        onClick={handleFastPay}
                        className="px-8 py-3 bg-[#3A3331] hover:bg-[#2A2321] text-white font-serif rounded-full transition-all text-sm inline-flex items-center gap-2"
                      >
                        Confirmă Google Pay
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
