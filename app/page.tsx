"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Search, Clock, Smartphone, ListFilter, ShieldCheck, ChevronDown, Award, TrendingUp, Sparkles, Star, Zap, Activity } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#3A3331]/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <span className="font-serif text-xl md:text-2xl text-[#3A3331] group-hover:text-[#C29D8D] transition-colors">{question}</span>
        <ChevronDown className={`w-6 h-6 text-[#A98273] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[#5C5351] leading-relaxed text-lg font-light">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  // Calculator State
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(2);
  const [preferredClassType, setPreferredClassType] = useState<"reformer" | "mat" | "mixed">("mixed");

  const classesPerMonth = workoutsPerWeek * 4;
  const creditsMultiplier = preferredClassType === "reformer" ? 2 : preferredClassType === "mat" ? 1 : 1.5;
  const estimatedCredits = Math.ceil(classesPerMonth * creditsMultiplier);

  // Suggested Plan Decision
  let recommendedPlanName = isRo ? "Abonament Starter" : "Starter Subscription";
  let recommendedPlanCredits = 20;
  let recommendedPlanPrice = "149 RON";

  if (estimatedCredits > 40) {
    recommendedPlanName = isRo ? "Abonament Elite" : "Elite Subscription";
    recommendedPlanCredits = 75;
    recommendedPlanPrice = "399 RON";
  } else if (estimatedCredits > 20) {
    recommendedPlanName = isRo ? "Abonament Balance" : "Balance Subscription";
    recommendedPlanCredits = 40;
    recommendedPlanPrice = "249 RON";
  }

  return (
    <div className="flex-1 flex flex-col w-full bg-[#FCFAFA] selection:bg-[#C29D8D] selection:text-white">
      {/* 2. HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-6 lg:pt-8 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#FCFAFA] via-[#FCFAFA] to-[#F5EFEB]/50 -z-20" />
        <div className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-[#C29D8D]/15 blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#C29D8D]/10 blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10">
          
          <div className="flex flex-col items-start text-left w-full">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#3A3331] max-w-2xl"
            >
              Acces flexibil la cele mai bune studiouri de Pilates și Wellness.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-lg md:text-xl text-[#5C5351] font-light tracking-wide max-w-xl leading-relaxed"
            >
              Un singur abonament. Acces nelimitat la zeci de studiouri premium de Reformer, Mat Pilates și Yoga din orașul tău.
            </motion.p>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-col sm:flex-row items-center gap-6 w-full"
            >
              <Link 
                href="/credits" 
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#C29D8D] hover:bg-[#A98273] text-white rounded-3xl transition-all duration-300 shadow-xl shadow-[#C29D8D]/20 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-sm tracking-widest uppercase font-semibold">Vezi Prețurile</span>
              </Link>
              <Link 
                href="/classes" 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-[#3A3331] border border-[#3A3331]/10 hover:border-[#3A3331]/30 hover:bg-[#FCFAFA] rounded-3xl transition-all duration-300 w-full sm:w-auto hover:shadow-lg text-sm tracking-widest uppercase font-semibold"
              >
                Explorează Studiourile
              </Link>
            </motion.div>
          </div>

          <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full mx-auto max-w-lg lg:max-w-none aspect-[4/5] lg:aspect-square bg-[#F5EFEB] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl shadow-[#3A3331]/5 group flex flex-col items-center justify-center"
          >
            {/* The clickable link that overlays everything */}
            <Link href="/classes" className="absolute inset-0 z-30" aria-label="Explore classes on map" />
            
            {/* The actual map (pointer events disabled so clicks pass through to the link) */}
            <div className="absolute inset-0 pointer-events-none filter saturate-[0.85] contrast-125 opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-[1.5s] ease-out">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182570.8354226194!2d25.922097960309995!3d44.4377063462615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1716301385966!5m2!1sro!2sro" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Bucharest studios"
                ></iframe>
            </div>

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

            {/* Descriptive Content placed at the bottom */}
            <div className="absolute bottom-10 left-8 right-8 pointer-events-none text-white z-20">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                     <MapPin className="w-5 h-5 text-white" />
                   </div>
                   <h3 className="font-serif text-3xl">Descoperă Harta</h3>
                </div>
                <p className="font-light text-white/90 text-base max-w-sm mt-4 leading-relaxed">
                  Alege din 10+ studiouri premium partenere din București și rezervă clasa perfectă pentru azi.
                </p>
                
                <div className="mt-8 inline-flex items-center text-sm font-semibold tracking-widest uppercase text-white bg-white/10 px-6 py-3 rounded-full backdrop-blur-md group-hover:bg-white/20 transition-all">
                    Vezi Studiourile <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. ACTIVITY PILLS */}
      <section className="w-full py-10 bg-white border-y border-[#3A3331]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 whitespace-nowrap overflow-x-auto no-scrollbar flex items-center space-x-4 md:justify-center">
            {["Reformer Pilates", "Mat Pilates", "Aero Yoga", "Vinyasa Flow", "Barre", "Stretching & Mobility", "Postură"].map((pill, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-[#F5EFEB] border border-[#C29D8D]/20 text-[#3A3331] font-medium text-sm flex-shrink-0 hover:bg-[#EAE1DF] transition-colors cursor-default">
                    {pill}
                </div>
            ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="w-full bg-[#F5EFEB]/30 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#3A3331] mb-20">Cum funcționează?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#C29D8D] shadow-sm mb-8 border border-[#C29D8D]/10">
                        <Smartphone strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#3A3331] mb-4">1. Alege abonamentul</h3>
                    <p className="text-[#5C5351] font-light leading-relaxed">Creează cont în sub 60 de secunde și achiziționează pachetul care ți se potrivește.</p>
                </motion.div>
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#C29D8D] shadow-sm mb-8 border border-[#C29D8D]/10">
                        <Search strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#3A3331] mb-4">2. Rezervă din aplicație</h3>
                    <p className="text-[#5C5351] font-light leading-relaxed">Cauți studioul preferat pe hartă, verifici programul și rezervi clasa dorită instant, fără telefoane.</p>
                </motion.div>
                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#C29D8D] shadow-sm mb-8 border border-[#C29D8D]/10">
                        <Clock strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#3A3331] mb-4">3. Mergi la clasă</h3>
                    <p className="text-[#5C5351] font-light leading-relaxed">Prezinți rezervarea la recepție și te bucuri de antrenamentul tău. Simplu și rapid.</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 3.5. INTERACTIVE CALCULATOR */}
      <section id="credits-calculator" className="w-full bg-[#FCFAFA] py-24 border-b border-[#3A3331]/5 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C29D8D] font-semibold text-xs tracking-widest uppercase mb-3 block">
              {isRo ? "Instrument Interactiv" : "Interactive Tool"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3A3331] mb-4 font-light">
              {isRo ? "Calculator Credite & Recomandare" : "Calculate Your Vibe & Credits"}
            </h2>
            <p className="text-[#5C5351] font-light leading-relaxed text-sm md:text-base">
              {isRo 
                ? "Află rapid de câte credite ai nevoie lunar în funcție de stilul și frecvența antrenamentelor tale preferate."
                : "Easily estimate your monthly credit needs based on your training style and frequency."}
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-[#D2B4A7]/20 shadow-2xl shadow-[#C29D8D]/5 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Input Side */}
            <div className="space-y-8">
              {/* Step 1: Frequency */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[#3A3331] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F5EFEB] text-[#C29D8D] font-serif text-xs font-bold flex items-center justify-center">1</span>
                  {isRo ? "Cât de des vrei să te antrenezi pe săptămână?" : "How many sessions per week?"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setWorkoutsPerWeek(num)}
                      className={`py-3.5 rounded-2xl font-serif text-lg font-medium transition-all ${
                        workoutsPerWeek === num 
                          ? "bg-[#C29D8D] text-white shadow-md shadow-[#C29D8D]/25" 
                          : "bg-[#F5EFEB]/40 hover:bg-[#F5EFEB]/80 text-[#3A3331]"
                      }`}
                    >
                      {num === 4 ? `${num}+` : num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#5C5351] font-light px-1">
                  <span>{isRo ? "Aproape deloc" : "Occasional"}</span>
                  <span>{isRo ? "Activ & Dedicat" : "Active & Dedicated"}</span>
                </div>
              </div>

              {/* Step 2: Workout Type */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[#3A3331] uppercase tracking-wide flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F5EFEB] text-[#C29D8D] font-serif text-xs font-bold flex items-center justify-center">2</span>
                  {isRo ? "Ce tip de clase preferi în general?" : "What core classes do you prefer?"}
                </label>
                <div className="space-y-2">
                  {[
                    { id: "mat", roName: "Mat Pilates & Yoga (1 cr/clasă)", enName: "Mat Pilates & Yoga (1 cr/class)" },
                    { id: "reformer", roName: "Reformer Pilates Premium (2 cr/clasă)", enName: "Premium Reformer Pilates (2 cr/class)" },
                    { id: "mixed", roName: "Stil mixt / Alternat (1.5 cr/clasă)", enName: "Mixed / Alternated (1.5 cr/class)" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setPreferredClassType(style.id as any)}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between border ${
                        preferredClassType === style.id 
                          ? "border-[#C29D8D] bg-[#F5EFEB]/20 text-[#3A3331]" 
                          : "border-gray-100 hover:bg-gray-50 text-[#5C5351]"
                      }`}
                    >
                      <span>{isRo ? style.roName : style.enName}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${preferredClassType === style.id ? "border-[#C29D8D]" : "border-gray-300"}`}>
                        {preferredClassType === style.id && <div className="w-2 h-2 rounded-full bg-[#C29D8D]" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Side */}
            <div className="bg-[#F5EFEB]/30 rounded-3xl p-6 md:p-8 border border-dashed border-[#C29D8D]/20 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-[#8F9D82]/10 text-[#8F9D82] text-[10px] font-bold uppercase tracking-wider inline-block">
                  {isRo ? "Obiectiv lunar estimat" : "Estimated Monthly Scope"}
                </span>

                <div className="grid grid-cols-2 gap-4 divide-x divide-gray-200/50 mt-2">
                  <div className="space-y-1 text-left">
                    <span className="text-3xl md:text-4xl font-serif text-[#3A3331] font-semibold block">{classesPerMonth}</span>
                    <span className="text-[10px] text-[#5C5351] font-light uppercase tracking-wider">{isRo ? "clase / lună" : "classes / month"}</span>
                  </div>
                  <div className="pl-4 space-y-1 text-left">
                    <span className="text-3xl md:text-4xl font-serif text-[#C29D8D] font-bold block">{estimatedCredits}</span>
                    <span className="text-[10px] text-[#5C5351] font-light uppercase tracking-wider">{isRo ? "credite necesare" : "credits needed"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200/40 space-y-3 text-left">
                <span className="text-xs text-[#5C5351] block font-light">
                  {isRo ? "Abonament lunar recomandat pentru tine:" : "Financially optimal plan for you:"}
                </span>
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100">
                  <div className="space-y-0.5">
                    <span className="font-serif font-semibold text-sm text-[#3A3331] block">{recommendedPlanName}</span>
                    <span className="text-xs text-[#8F9D82] font-medium block">
                      {isRo ? `Include ${recommendedPlanCredits} Credite` : `Includes ${recommendedPlanCredits} Credits`}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-lg text-[#3A3331]">{recommendedPlanPrice}</span>
                </div>
              </div>

              <Link
                href="/credits"
                className="w-full py-4 rounded-2xl bg-[#3A3331] hover:bg-[#2A2321] text-white text-xs font-semibold tracking-widest uppercase text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{isRo ? "Cumpără / Vezi Detalii" : "Choose Subscription"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE "WHY US" BENEFITS */}
      <section className="w-full bg-[#FCFAFA] py-32 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-1/2 space-y-12">
                  <div>
                      <h2 className="font-serif text-4xl md:text-5xl text-[#3A3331] leading-tight mb-6">De ce să ne alegi pe noi?</h2>
                      <p className="text-[#5C5351] text-lg font-light">Ai control total asupra timpului și energiei tale. Nu te mai bloca la un singur studio.</p>
                  </div>
                  
                  <div className="space-y-10">
                      <div className="flex gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#F5EFEB] flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-6 h-6 text-[#A98273]" />
                          </div>
                          <div>
                              <h3 className="text-xl font-medium text-[#3A3331] mb-2">Timpul tău contează</h3>
                              <p className="text-[#5C5351] font-light">Alegi sala din drumul tău, lângă casă sau birou. Economisești timp petrecut în trafic.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#F5EFEB] flex items-center justify-center flex-shrink-0">
                              <ListFilter className="w-6 h-6 text-[#A98273]" />
                          </div>
                          <div>
                              <h3 className="text-xl font-medium text-[#3A3331] mb-2">Fără căutări inutile</h3>
                              <p className="text-[#5C5351] font-light">Toate clasele, antrenorii și studiourile de calitate sunt deja agregate într-o singură aplicație.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-[#F5EFEB] flex items-center justify-center flex-shrink-0">
                              <Clock className="w-6 h-6 text-[#A98273]" />
                          </div>
                          <div>
                              <h3 className="text-xl font-medium text-[#3A3331] mb-2">Flexibilitate totală</h3>
                              <p className="text-[#5C5351] font-light">Azi alegi o clasă intensă de Reformer în centru, mâine o sesiune relaxantă de Yoga în cartier.</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="w-full lg:w-1/2">
                 <div className="w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] bg-[#3A3331] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-[#3A3331]/20">
                     <div className="absolute inset-0 bg-gradient-to-tr from-[#3A3331] to-[#4A4240] -z-10" />
                     <div className="text-[#FCFAFA] relative z-10">
                         <h3 className="font-serif text-3xl font-light mb-4">Rețeaua ta de wellness.</h3>
                         <p className="text-[#C29D8D] uppercase tracking-widest text-sm font-medium">Oriunde te afli</p>
                     </div>
                     <div className="relative z-10 w-full flex-grow mt-8 rounded-2xl overflow-hidden border border-black/10">
                         <Image 
                             src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop"
                             alt="Femeie practicând Pilates la Reformer"
                             fill
                             className="object-cover"
                             referrerPolicy="no-referrer"
                         />
                     </div>
                 </div>
              </div>
          </div>
      </section>

      {/* 5.5. COMPARISON SECTION */}
      <section className="w-full bg-[#F5EFEB]/30 py-24 px-6 border-y border-[#3A3331]/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C29D8D] font-semibold text-xs tracking-widest uppercase mb-3 block">
              {isRo ? "Libertate vs. Constrângere" : "Freedom vs. Constraint"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3A3331] font-light">
              {isRo ? "Abonament Clasic vs. Ecosistemul Anel" : "Traditional Pass vs. The Anel Network"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-white/60 rounded-[2rem] p-8 border border-gray-150 opacity-80">
              <h3 className="font-serif text-lg text-gray-500 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                {isRo ? "Abonament la un singur studio clasic" : "Single Traditional Studio Pass"}
              </h3>
              <ul className="space-y-4">
                {[
                  isRo ? "Te plictisești rapid făcând același tip de exercițiu mereu." : "Get bored easily repeating the same class style.",
                  isRo ? "Legat contractual de o singură locație fixă geografic." : "Contractually locked to a single physical address.",
                  isRo ? "Pierzi toate clasele nefolosite la finalul lunii în curs." : "Lose all unused sessions at the end of each billing cycle.",
                  isRo ? "Taxe de înscriere inițiale și anulare anevoioasă." : "Steep initiation fees and annoying cancellation policies.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-500 font-light">
                    <span className="text-red-400 mt-1 font-semibold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Anel Way */}
            <div className="bg-[#3A3331] text-white rounded-[2rem] p-8 border border-transparent shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 bg-[#C29D8D] text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                {isRo ? "Recomandat" : "Recommended"}
              </div>
              <h3 className="font-serif text-lg mb-6 flex items-center gap-2 text-[#C29D8D]">
                <Sparkles className="w-4 h-4 animate-pulse text-[#C29D8D]" />
                {isRo ? "Abonamentul Unic Anel Wellness" : "The Anel Multi-Studio Passport"}
              </h3>
              <ul className="space-y-4">
                {[
                  isRo ? "Varietate absolută: Reformer, Mat Pilates, Yoga și Barre dintr-un singur cont." : "Infinite variety: Reformer, Mat Pilates, Yoga & Barre.",
                  isRo ? "Flexibilitate geografică totală în 10+ studiouri de top din oraș." : "Total geographic freedom across 10+ premium boutique studios.",
                  isRo ? "Păstrezi creditele nefolosite pentru luna viitoare în siguranță (până la 5/10 cr)." : "Roll over unused credits to next month safely (up to 5/10 cr).",
                  isRo ? "Anulezi instant oricând dorești cu un singur click direct din contul tău." : "Instant digital cancellation with 1 automated click.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm font-light">
                    <Check className="text-[#8F9D82] mt-1 shrink-0 w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PREVIEW CARD */}
      <section className="w-full bg-[#EAE1DF]/30 py-32 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-[#3A3331] mb-6">Investește în tine</h2>
              <p className="text-[#5C5351] mb-16 text-lg font-light max-w-xl">Alege un model flexibil care pune experiența și confortul tău pe primul loc, fără compromisuri.</p>
              
              <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-[#C29D8D]/10 border border-[#C29D8D]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-6 py-2 bg-[#8F9D82] text-white text-xs font-bold uppercase tracking-wider rounded-bl-2xl">Începe Acum</div>
                  
                  <h3 className="text-2xl font-serif text-[#3A3331] mb-2 text-left">Abonament Starter</h3>
                  <div className="flex items-baseline gap-2 mb-8 text-left">
                      <span className="text-6xl font-serif text-[#3A3331] tracking-tight">149</span>
                      <span className="text-xl text-[#5C5351]">RON / lună</span>
                  </div>

                  <div className="space-y-4 mb-10 text-left">
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Acces la clase Mat Pilates</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Păstrezi maxim 5 credite nefolosite pentru luna viitoare</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Anulare oricând, direct din cont</span>
                      </div>
                  </div>

                  <Link href="/credits" className="w-full py-5 rounded-2xl bg-[#FCFAFA] text-[#3A3331] border border-gray-100 font-medium hover:bg-[#FAF7F6] transition-colors flex items-center justify-center shadow-sm">
                      Vezi Toate Abonamentele
                  </Link>

                  <div className="mt-8 pt-6 border-t border-[#3A3331]/5 flex flex-col items-center justify-center gap-2 text-sm text-[#5C5351]">
                      <span className="text-[#C29D8D] font-medium tracking-wide uppercase text-xs">Primești 20 Credite</span>
                  </div>
              </div>
          </div>
      </section>

      {/* 6.5. TESTIMONIALS SECTION */}
      <section className="w-full bg-[#FCFAFA] py-24 px-6 border-b border-[#3A3331]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C29D8D] font-semibold text-xs tracking-widest uppercase mb-3 block">
              {isRo ? "Comunitatea Anel" : "The Anel Circle"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3A3331] font-light">
              {isRo ? "Ce spun membrii noștri premium" : "Loved by our movement community"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: isRo 
                  ? "Anel mi-a schimbat rutina absolut. Pot face Reformer în Floreasca marți, și Mat în Cotroceni vineri, folosind același abonament!"
                  : "Anel completely revolutionized my weekly flow. Premium Reformer classes in Floreasca on Tuesday, Mat Pilates in Cotroceni on Friday—all with 1 card!",
                author: "Diana M., Floreasca",
                role: isRo ? "Membru de 8 luni" : "Member for 8 months",
                rating: 5,
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&fit=crop"
              },
              {
                quote: isRo 
                  ? "Ca trainer, recomand Anel membrilor mei. Flexibilitatea și libertatea de a alege stilul optim de wellness previne plafonarea."
                  : "As an instructor, I encourage clients to use Anel. Diverse approaches keep training engaging and guarantee rapid full-body realignment.",
                author: "Andrei R., Instructor Pilates",
                role: "Lead Trainer Partner",
                rating: 5,
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop"
              },
              {
                quote: isRo 
                  ? "Sistemul cu credite e genial. În lunile în care am concedii ori călătorii, reportez până la 5 credite în luna viitoare. Nu pierd nimic!"
                  : "The rollover is amazing. If I go on holiday, I can securely carry over up to 5 credits to next month. No losses, total respect for members.",
                author: "Ana-Maria S., Business Analyst",
                role: isRo ? "Membru Elite" : "Elite Member",
                rating: 5,
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#F5EFEB]/30 p-8 rounded-[2rem] border border-[#D2B4A7]/10 flex flex-col justify-between space-y-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#C29D8D] text-transparent" />
                    ))}
                  </div>
                  <p className="text-sm text-[#5C5351] font-light italic leading-relaxed text-left">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#C29D8D]/20">
                    <Image 
                      src={t.img} 
                      alt={t.author} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif font-medium text-sm text-[#3A3331]">{t.author}</h4>
                    <p className="text-[10px] text-[#C29D8D] uppercase tracking-wider mt-0.5 font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="w-full py-32 px-6 bg-[#FCFAFA]">
          <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-[#3A3331] mb-16 text-center">Întrebări Frecvente</h2>
              <div className="flex flex-col gap-2">
                  <FAQItem 
                    question="Cum funcționează abonamentul?"
                    answer="Cumperi un abonament lunar care îți populează contul cu credite. Cu aceste credite poți rezerva clase la oricare dintre studiourile noastre partenere, direct din aplicație. Diferite clase pot avea costuri diferite în credite, permițându-ți flexibilitate maximă."
                  />
                  <FAQItem 
                    question="Când se activează abonamentul?"
                    answer="Abonamentul tău se activează instantaneu în momentul în care ai efectuat plata cu succes. Poți începe să îți rezervi prima clasă chiar din acel minut."
                  />
                  <FAQItem 
                    question="Pot anula oricând?"
                    answer="Da! Nu există contracte pe termen lung. Poți întrerupe sau anula abonamentul în orice moment cu un singur click din setările contului tău, fără taxe de anulare."
                  />
                  <FAQItem 
                    question="Ce se întâmplă dacă epuizez creditele?"
                    answer="Dacă îți epuizezi creditele înainte de finalul lunii, poți oricând să faci un top-up (o reîncărcare) direct din contul tău, achiziționând credite suplimentare exact când ai nevoie de ele."
                  />
              </div>
          </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="w-full bg-[#3A3331] py-20 px-6 text-[#FCFAFA]/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
              <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-6">Anel</h3>
                  <p className="font-light text-sm text-[#FCFAFA]/60 max-w-xs">
                      Rețeaua ta premium de studiouri tip boutique Pilates și wellness. Găsește-ți echilibrul în fiecare zi.
                  </p>
              </div>
              <div>
                  <h4 className="font-medium text-white mb-6 uppercase tracking-wider text-sm">Companie</h4>
                  <ul className="space-y-4 text-sm font-light">
                      <li><Link href="/about" className="hover:text-white transition-colors">Despre Noi</Link></li>
                      <li><Link href="/classes" className="hover:text-white transition-colors">Studiouri Partenere</Link></li>
                      <li><Link href="/credits" className="hover:text-white transition-colors">Prețuri</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-medium text-white mb-6 uppercase tracking-wider text-sm">Resurse</h4>
                  <ul className="space-y-4 text-sm font-light">
                      <li><Link href="/blog" className="hover:text-white transition-colors">Blog Wellness</Link></li>
                      <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-medium text-white mb-6 uppercase tracking-wider text-sm">Aplicație</h4>
                  <div className="flex flex-col gap-4">
                      <div className="w-32 h-10 border border-[#FCFAFA]/20 rounded-lg flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors text-xs tracking-wide">
                          App Store
                      </div>
                      <div className="w-32 h-10 border border-[#FCFAFA]/20 rounded-lg flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors text-xs tracking-wide">
                          Google Play
                      </div>
                  </div>
              </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-[#FCFAFA]/10 flex flex-col md:flex-row justify-between items-center text-xs font-light text-[#FCFAFA]/40">
              <p>© 2026 Anel Wellness. Toate drepturile rezervate.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
                  <a href="#" className="hover:text-white transition-colors">Politică de Confidențialitate</a>
              </div>
          </div>
      </footer>
    </div>
  );
}

