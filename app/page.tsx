"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Search, Clock, Smartphone, ListFilter, ShieldCheck, ChevronDown } from "lucide-react";
import { useState } from "react";

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
  return (
    <div className="flex-1 flex flex-col w-full bg-[#FCFAFA] selection:bg-[#C29D8D] selection:text-white">
      {/* 2. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
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

      {/* 6. PRICING PREVIEW CARD */}
      <section className="w-full bg-[#EAE1DF]/30 py-32 px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-[#3A3331] mb-6">Investește în tine</h2>
              <p className="text-[#5C5351] mb-16 text-lg font-light max-w-xl">Alege un model flexibil care pune experiența și confortul tău pe primul loc, fără compromisuri.</p>
              
              <div className="w-full max-w-lg bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-[#C29D8D]/10 border border-[#C29D8D]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-6 py-2 bg-[#C29D8D] text-white text-xs font-bold uppercase tracking-wider rounded-bl-2xl">Cel mai popular</div>
                  
                  <h3 className="text-2xl font-serif text-[#3A3331] mb-2 text-left">Abonament Premium</h3>
                  <div className="flex items-baseline gap-2 mb-8 text-left">
                      <span className="text-6xl font-serif text-[#3A3331] tracking-tight">179</span>
                      <span className="text-xl text-[#5C5351]">RON / lună</span>
                  </div>

                  <div className="space-y-4 mb-10 text-left">
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Acces la toate studiourile partenere</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Fara taxe ascunse</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#F5EFEB] flex items-center justify-center flex-shrink-0 text-[#C29D8D]">
                              <Check className="w-4 h-4" />
                          </div>
                          <span className="text-[#5C5351]">Anulare oricând, direct din cont</span>
                      </div>
                  </div>

                  <Link href="/credits" className="w-full py-5 rounded-2xl bg-[#3A3331] text-white font-semibold text-center hover:bg-[#2A2321] transition-colors flex items-center justify-center">
                      Vreau Abonament
                  </Link>

                  <div className="mt-8 pt-6 border-t border-[#3A3331]/5 flex items-center justify-center gap-2 text-sm text-[#5C5351]">
                      <ShieldCheck className="w-5 h-5 text-[#C29D8D]" />
                      <span>Garanție 10 zile - Banii înapoi garantat</span>
                  </div>
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
                  <h3 className="font-serif text-2xl font-bold text-white mb-6">Aura</h3>
                  <p className="font-light text-sm text-[#FCFAFA]/60 max-w-xs">
                      Rețeaua ta premium de studiouri tip boutique Pilates și wellness. Găsește-ți echilibrul în fiecare zi.
                  </p>
              </div>
              <div>
                  <h4 className="font-medium text-white mb-6 uppercase tracking-wider text-sm">Companie</h4>
                  <ul className="space-y-4 text-sm font-light">
                      <li><a href="#" className="hover:text-white transition-colors">Despre Noi</a></li>
                      <li><a href="/classes" className="hover:text-white transition-colors">Studiouri Partenere</a></li>
                      <li><a href="/credits" className="hover:text-white transition-colors">Prețuri</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Pentru Companii</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-medium text-white mb-6 uppercase tracking-wider text-sm">Resurse</h4>
                  <ul className="space-y-4 text-sm font-light">
                      <li><a href="#" className="hover:text-white transition-colors">Blog Wellness</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Ghid pentru Începători</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Centru de Ajutor (FAQ)</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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
              <p>© 2026 Aura Wellness. Toate drepturile rezervate.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
                  <a href="#" className="hover:text-white transition-colors">Politică de Confidențialitate</a>
              </div>
          </div>
      </footer>
    </div>
  );
}

