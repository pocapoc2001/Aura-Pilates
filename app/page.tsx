"use client";

import { useLanguage } from "@/lib/language-context";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Leaf, MapPin, Zap } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-48 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D2B4A7]/10 blur-3xl -z-10 pointer-events-none" />
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-[#3A3331] max-w-4xl"
        >
          {t.heroTitle}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-[#5C5351] font-light tracking-wide max-w-2xl leading-relaxed"
        >
          {t.heroSub}
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12"
        >
          <Link 
            href="/classes" 
            className="group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#C29D8D] hover:bg-[#A98273] text-white rounded-3xl transition-all duration-500 overflow-hidden shadow-lg shadow-[#C29D8D]/20"
          >
            <span className="relative z-10 font-semibold tracking-wide">
              {t.explore}
            </span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* Value Props Section */}
      <section className="w-full bg-white py-32 px-6 flex-1 flex flex-col justify-center border-t border-[#FCFAFA]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FCFAFA] flex items-center justify-center text-[#D2B4A7]">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#3A3331] mb-3">{t.prop1}</h3>
              <p className="text-[#5C5351] leading-relaxed font-light">{t.prop1Sub}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FCFAFA] flex items-center justify-center text-[#D2B4A7]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#3A3331] mb-3">{t.prop2}</h3>
              <p className="text-[#5C5351] leading-relaxed font-light">{t.prop2Sub}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FCFAFA] flex items-center justify-center text-[#D2B4A7]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#3A3331] mb-3">{t.prop3}</h3>
              <p className="text-[#5C5351] leading-relaxed font-light">{t.prop3Sub}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
