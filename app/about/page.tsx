"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Shield, Award, Users, Smile } from "lucide-react";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  return (
    <div className="flex-1 flex flex-col w-full bg-[#FCFAFA] selection:bg-[#C29D8D] selection:text-white" id="about-page-view">
      {/* Hero Header */}
      <section className="relative w-full py-20 md:py-28 px-6 overflow-hidden border-b border-[#3A3331]/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAFA] via-[#FCFAFA] to-[#F5EFEB]/30 -z-20" />
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#C29D8D]/10 blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C29D8D]/10 text-[#C29D8D] text-[11px] font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{isRo ? "POVESTEA NOASTRĂ" : "OUR STORY"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-[#3A3331] font-light leading-tight tracking-tight"
          >
            {isRo 
              ? "Reînviem libertatea de mișcare și conexiune" 
              : "Unlocking freedom through premium movement"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#5C5351] font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {isRo
              ? "Misiunea Anel este să ofere pasionaților de Pilates, Yoga și Barre din București un pașaport unic de acces la cele mai bune studiouri boutique din oraș."
              : "Anel is an all-in-one boutique fitness passport designed to unlock the most exclusive Reformer, Mat Pilates, and Yoga studios in Bucharest."}
          </motion.p>
        </div>
      </section>

      {/* Main Vision Narrative */}
      <section className="w-full py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 text-left">
          <span className="text-[#C29D8D] font-semibold text-xs tracking-widest uppercase block">
            {isRo ? "DE CE EXISTĂM" : "THE SPARK"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3A3331] font-light">
            {isRo ? "Împotriva rutinei monotone și a contractelor restrictive" : "No boring gym routines, no lock-in contracts"}
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[#5C5351] font-light leading-relaxed">
            <p>
              {isRo
                ? "Am observat că sistemele tradiționale te forțează să alegi un singur studio fix, devenind o barieră în fața diversității de care corpul tău are nevoie. Fiecare studio din București are instructori geniali, arome unice de design și un accent special: de la Reformer atletic la sesiuni meditative de Yin Yoga."
                : "We felt the friction of traditional passes. Booking one studio means limiting your body's innate calling for diversity. Some days require high-intensity training on a premium Reformer, while other days require a restorative and centering breath on a yoga mat."}
            </p>
            <p>
              {isRo
                ? "Anel a fost creată pentru a unifica aceste temple mici de wellness. Cu un singur cont digital și o balanță flexibilă bazată pe credite, poți explora mereu studiouri noi lângă birou ori casă, experimentând cursuri menite să-ți perfecționeze ritmul."
                : "Anel was built to unify these premium boutique sanctuaries. Armed with just one digital account and flexible rolling credits, you can map out and visit gorgeous locations close to your office or home."}
            </p>
          </div>
        </div>

        {/* Visual Bento Stats Block */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F5EFEB]/40 border border-[#D2B4A7]/15 p-8 rounded-[2rem] text-left space-y-2">
            <span className="text-4xl md:text-5xl font-serif text-[#C29D8D] font-bold block">10+</span>
            <span className="text-xs text-[#3A3331] font-semibold uppercase tracking-wider block">
              {isRo ? "Studiouri Boutique" : "Premium Studios"}
            </span>
          </div>

          <div className="bg-[#3A3331] text-[#FCFAFA] p-8 rounded-[2rem] text-left space-y-2 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#C29D8D]/20 blur-md pointer-events-none" />
            <span className="text-4xl md:text-5xl font-serif text-[#FCFAFA] font-light block">40+</span>
            <span className="text-xs text-[#C29D8D] font-semibold uppercase tracking-wider block">
              {isRo ? "Clase Zilnice" : "Daily Booking Slots"}
            </span>
          </div>

          <div className="bg-[#F5EFEB]/20 border border-[#D2B4A7]/10 p-8 rounded-[2rem] text-left col-span-2 space-y-2">
            <span className="text-4xl md:text-5xl font-serif text-[#3A3331] font-semibold block">98.4%</span>
            <span className="text-xs text-[#5C5351] font-semibold uppercase tracking-wider block">
              {isRo ? "Membri Multumiți cu Sistemul de Rollover" : "User Satisfaction with rolling credit policy"}
            </span>
            <p className="text-xs text-gray-400 font-light max-w-sm pt-2">
              {isRo ? "Dacă nu consumi toate creditele din abonament, poți reporta până la 10 credite automat luna viitoare." : "Unused credits carry over to prevent waste."}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full bg-[#F5EFEB]/20 py-24 px-6 border-y border-[#3A3331]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#C29D8D] font-semibold text-xs tracking-widest uppercase block mb-3">
              {isRo ? "VALORILE NOASTRE" : "WHAT GUIDES US"}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3A3331] font-light">
              {isRo ? "Standardul de Aur în Mișcare" : "Curating Premium Partnerships Only"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <Award className="w-6 h-6 text-[#C29D8D]" />,
                roTitle: "Selecție Strictă",
                enTitle: "Vetted Sanctuaries",
                roDesc: "Fiecare studio din rețea este inspectat individual pentru garantarea unui confort remarcabil, echipamente Reformer sigure și traineri talentați.",
                enDesc: "Every location is hand-picked. From state-of-the-art Reformers to ambient aromatherapy levels, we guarantee top-tier luxury."
              },
              {
                icon: <Shield className="w-6 h-6 text-[#C29D8D]" />,
                roTitle: "Rollover Echitabil",
                enTitle: "No Credit Waste",
                roDesc: "Viața intervine peste program. De aceea, la prelungire, creditele rămase nu dispar instant, ci rămân active pentru luna următoare.",
                enDesc: "Traditional memberships thrive on you not showing up. We don't. We roll over unused credits so you can utilize what you paid for."
              },
              {
                icon: <Smile className="w-6 h-6 text-[#C29D8D]" />,
                roTitle: "Comunitate Unită",
                enTitle: "Inclusive Movement",
                roDesc: "Promovăm un spirit necompetitiv. Indiferent dacă ești absolut începător sau avansat, ești binevenit în orice studio partener Anel.",
                enDesc: "We facilitate zero-judgment zones. From beginners taking their first steps on a carriage to core veterans, everyone belongs."
              }
            ].map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-start space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB]/60 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl font-medium text-[#3A3331]">
                  {isRo ? val.roTitle : val.enTitle}
                </h3>
                <p className="text-xs md:text-sm text-[#5C5351] font-light leading-relaxed">
                  {isRo ? val.roDesc : val.enDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full py-24 px-6 bg-[#FCFAFA] flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl bg-[#EAE1DF]/30 p-10 md:p-16 rounded-[3rem] border border-[#D2B4A7]/10 w-full space-y-6">
          <h3 className="font-serif text-3xl md:text-4xl text-[#3A3331] font-light">
            {isRo ? "Următorul tău antrenament te așteaptă" : "Your movement routine redefined"}
          </h3>
          <p className="text-sm md:text-base text-[#5C5351] font-light max-w-sm mx-auto leading-relaxed">
            {isRo ? "Creează un cont pe platformă în mai puțin de un minut și rezervă prima ta clasă boutique chiar astăzi." : "Set up your credentials under a minute and register for an amazing session near you."}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/credits"
              className="px-8 py-4 bg-[#C29D8D] text-white hover:bg-[#A98273] rounded-2xl text-xs font-semibold tracking-widest uppercase transition-all shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>{isRo ? "Alege Abonament" : "Join Anel Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/classes"
              className="px-8 py-4 bg-white text-[#3A3331] border border-gray-150 hover:bg-[#FCFAFA] rounded-2xl text-xs font-semibold tracking-widest uppercase transition-all inline-flex items-center justify-center"
            >
              {isRo ? "Vezi Studiourile" : "Explore Studios"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
