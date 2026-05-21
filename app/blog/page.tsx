"use client";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BookOpen, Calendar, Clock, X, Search, Sparkles, Filter, ChevronRight, Share2 } from "lucide-react";

interface Post {
  id: number;
  category: { ro: string; en: string };
  title: { ro: string; en: string };
  excerpt: { ro: string; en: string };
  content: { ro: string; en: string };
  readTime: string;
  date: string;
  img: string;
}

const ARTICLES_DATA: Post[] = [
  {
    id: 1,
    category: { ro: "Ghid Pilates", en: "Pilates Guide" },
    title: { 
      ro: "Reformer vs. Mat Pilates: Pe care să-l alegi?", 
      en: "Reformer vs. Mat Pilates: Which is right for you?" 
    },
    excerpt: {
      ro: "Află diferențele biomecanice cheie dintre exercițiile pe saltea și cele pe aparatul Reformer cu arcuri, și cum îți influențează ele progresul.",
      en: "Decode the biomechanical differences between sliding carriages and floor yoga mats, and how to optimize them according to your custom goals."
    },
    content: {
      ro: `Dacă ești la începutul călătoriei tale în universul Pilates, te-ai întrebat cu siguranță ce diferențe există între Pilates pe saltea (Mat Pilates) și cel pe aparatul Reformer.\n\n### 1. Rolul rezistenței și al arcurilor\nPe saltea, singura ta rezistență este gravitația și propria greutate corporală. Reformerul adaugă un sistem inteligent format din arcuri, scripeți și o placă mobilă (carriage). Arcurile pot fi folosite fie pentru a îngreuna mișcarea (scop hipertrofic / tonifiere), fie pentru a te asista în menținerea poziției corecte.\n\n### 2. Sănătatea coloanei și a posturii\nReformerul este ideal pentru reabilitare deoarece îți oferă un cadru ghidat de sprijin. Dacă ai probleme cu spatele sau gâtul, Reformerul te protejează, menținând pelvisul neutru.\n\n### 3. Mat Pilates: Fundația Mișcării\nNu subestima salteaua! Deoarece nu ai arcuri care să te susțină, Mat Pilates solicită intens musculatura abdominală profundă (Powerhouse) pentru a stabiliza trunchiul. Este o practică excelentă de control.\n\n**Recomandarea Anel:** Alternarea lor este secretul de aur. Încearcă 2 ședințe de Reformer pentru asistență și mobilizare, urmate de 1 ședință concentrată pe Mat pentru a-ți evalua controlul și rezistența musculară completă.`,
      en: `If you are entering the Pilates world, choosing between a floor mat and a Reformer carriage is a fundamental question.\n\n### 1. Spring-loaded tension vs. Bodyweight\nMat Pilates relies purely on gravity and your own biomechanical structure. The Reformer utilizes a system of spring tensions, ropes, and sliding platforms. This can act both as an assisted frame (ideal if recovering) or as a challenging progressive dynamic.\n\n### 2. Protecting the Spinal Alignment\nThe Reformer's carriage supports your head and spine, making it highly secure for rehabilitation or desk postural realignment.\n\n### 3. Mat Pilates: The Foundation of Control\nFloor work is incredibly challenging. Without carriage rails, your internal core or 'Powerhouse' must coordinate every micro-movement to prevent falling or tilting.\n\n**The Anel Choice:** Alternating is key. We suggest booking 2 Reformer sessions for mechanical flow, followed by 1 Mat class to build pristine core stabilization.`
    },
    readTime: "5 min read",
    date: "20 May 2026",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80"
  },
  {
    id: 2,
    category: { ro: "Stil de Viață", en: "Lifestyle" },
    title: { 
      ro: "5 Metode să scapi de durerea de spate la birou", 
      en: "5 Ways to alleviate lower back pain at your desk" 
    },
    excerpt: {
      ro: "Postura incorectă la birou ne afectează zilnic. Iată un set rapid de 5 mișcări și tehnici de respirație costală pe care le poți face pe scaun.",
      en: "Poor desk setup is silent poison for your spine. Learn 5 quick posture reset exercises and core breath techniques you can perform during meetings."
    },
    content: {
      ro: `Petrecem în medie 8 ore pe zi pe scaun, de cele mai multe ori curbați deasupra tastaturii. Această poziție pune o presiune artificială pe vertebrele lombare.\n\nIată o rutină de 5 minute pe care o poți face chiar la birou:\n\n1. **Respirația Costală Laterală:** Pune palmele pe coastele inferioare. Inspiră pe nas simțind cum coastele se lărgesc în exterior, apoi expiră lung pe gură strângând abdomenul.\n2. **Torsiunea pe Scaun:** Apucă spătarul scaunului cu ambele mâini și privește peste umăr. Menține 15 secunde pe fiecare parte.\n3. **Întinderea Musculaturii Pectorale:** Împletește degetele la spate și deschide pieptul orientând privirea spre tavan.\n4. **Glisarea Omoplaților:** Ridică umerii la urechi, rotește-i spre spate și coboară-i cât mai mult, relaxând gâtul.\n5. **Mobilitate pentru Șolduri (Poziția 4):** Pune glezna dreaptă peste genunchiul stâng și apleacă-te ușor în față cu spatele drept. Vei simți o eliberare instantă în mușchii gluteali.\n\nVizitează un studio de Pilates măcar de două ori pe săptămână pentru a adresa permanent aceste dezechilibre musculare!`,
      en: `Sitting for 8+ hours a day places excessive compressed weight on our lumbar spine.\n\nImplement this quick, silent desk routine to reset your neural pathways:\n\n1. **Lateral Rib Breathing:** Mirror your rib cage with your hands. Inhale through the nose expanding laterally; exhale long through pursed lips.\n2. **Seated Spinal Twist:** Hold the side of your office chair and look over your shoulder. hold for 15s on each side.\n3. **Interlocked Chest Opener:** Clasp your hands behind your back, pulling away to stretch the anterior shoulders.\n4. **Blade Scapular Glides:** Roll your shoulders backwards up to the ears, then compress them deep into your back pockets.\n5. **Seated Figure 4 Stretch:** Place your right ankle on your left knee and hinge your straight chest forward.\n\nKeep active and leverage of our multi-studio network to schedule dynamic core pilates twice a week to fix posture permanently.`
    },
    readTime: "4 min read",
    date: "14 May 2026",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"
  },
  {
    id: 3,
    category: { ro: "Nutriție & Energie", en: "Nutrition & Flow" },
    title: { 
      ro: "Mesele pre și post antrenament Pilates", 
      en: "Nutrition blueprint: Fueling your Pilates session" 
    },
    excerpt: {
      ro: "Ce mănânci înainte și după o clasă intensă influnțează direct felul în care te miști. Ghidul de nutriție pentru vitalitate și mobilitate.",
      en: "What you consume alters your flexibility and muscular stamina on the carriage. Discover the ideal foods to eat before and after."
    },
    content: {
      ro: `Pilates se bazează puternic pe implicarea mușchilor abdominali în profunzime, ceea ce înseamnă că un stomac prea plin va strica toată concentrarea și va crea disconfort fizic.\n\n### Înainte de Clasă (cu 1-2 ore)\nAlege carbohidrați ușor digerabili care îți oferă energie constantă:\n- O banană medie cu unt de migdale.\n- Un iaurt grecesc slab cu bobițe de merișoare.\n- O felie de pâine integrală cu avocado.\n*Evită:* Legumele bogate în fibre or alimentele prăjite.\n\n### După Clasă (în primele 45 de minute)\nEste timpul să îți alimentezi fibrele musculare întinse:\n- Un shake proteic combinat cu fructe verzi.\n- Somon la cuptor cu sparanghel sau broccoli.\n- Salată bogată de quinoa și cartof dulce.\n\nNu uita de hidratare! Încearcă să bei cel puțin 500ml de apă cu electroliți înainte și în timpul clasei.`,
      en: `Pilates requires deep engagement of your core. This means that having a heavy meal before class can severely affect your centering.\n\n### Pre-Workout (1-2 Hours Before)\nFocus on simple, easily digestible high-energy carbohydrates:\n- A medium banana with almond spread.\n- Low-fat Greek yogurt with antioxidant blueberries.\n- Avocado toast on whole grain slices.\n*Avoid:* High-fiber legumes or high-fat fried foods.\n\n### Post-Workout (Within 45 Minutes)\nOptimize protein synthesis and glycogen replacement:\n- A plant protein shake blended with spinach.\n- Baked salmon paired with steamed asparagus.\n- Quinoa bowl with roasted sweet potato.\n\nMake sure to replenish electrolytes dynamically after sweaty Reformer classes.`
    },
    readTime: "6 min read",
    date: "08 May 2026",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
  }
];

export default function BlogPage() {
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingArticle, setReadingArticle] = useState<Post | null>(null);

  // Extract categories dynamically
  const categories = ["All", ...Array.from(new Set(ARTICLES_DATA.map(p => isRo ? p.category.ro : p.category.en)))];

  // Filtering
  const filteredArticles = ARTICLES_DATA.filter((post) => {
    const postTitle = (isRo ? post.title.ro : post.title.en).toLowerCase();
    const postExcerpt = (isRo ? post.excerpt.ro : post.excerpt.en).toLowerCase();
    const postCat = isRo ? post.category.ro : post.category.en;

    const matchesSearch = postTitle.includes(searchQuery.toLowerCase()) || postExcerpt.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || postCat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 flex flex-col w-full bg-[#FCFAFA] selection:bg-[#C29D8D] selection:text-white" id="blog-page-view">
      {/* Editorial Header */}
      <section className="relative w-full py-16 md:py-24 px-6 border-b border-[#3A3331]/5 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAFA] to-[#F5EFEB]/20 -z-10" />
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[#C29D8D] font-bold text-xs tracking-widest uppercase block">
            {isRo ? "REVISTA ANEL" : "ANEL MAGAZINE"}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#3A3331] font-light">
            {isRo ? "Jurnalul de Well-being" : "The Core Journal"}
          </h1>
          <p className="text-[#5C5351] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {isRo 
              ? "Lecturi atent curatoriate despre tehnici Pilates, sfaturi de nutriție, controlul posturii și echilibru mental."
              : "Carefully curated reads covering biomechanics, costal breathing, and mindful routines."}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 justify-between items-center border-b border-gray-100">
        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold tracking-wide uppercase transition-colors whitespace-nowrap ${
                selectedCategory === cat 
                  ? "bg-[#3A3331] text-[#FCFAFA]" 
                  : "bg-white text-[#5C5351] border border-gray-100 hover:bg-[#F5EFEB]/30"
              }`}
            >
              {cat === "All" ? (isRo ? "Toate" : "All") : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRo ? "Caută articole..." : "Search magazine..."}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D]"
          />
        </div>
      </section>

      {/* Magazine Cards Grid */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Img frame */}
                <div className="relative aspect-[16/10] w-full bg-[#F5EFEB] overflow-hidden">
                  <Image
                    src={article.img}
                    alt={isRo ? article.title.ro : article.title.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#FCFAFA]/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-[#3A3331] uppercase tracking-wider shadow-sm">
                    {isRo ? article.category.ro : article.category.en}
                  </div>
                </div>

                {/* Info Text */}
                <div className="px-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-[#3A3331] group-hover:text-[#C29D8D] transition-colors leading-snug">
                    {isRo ? article.title.ro : article.title.en}
                  </h3>

                  <p className="text-xs md:text-sm text-[#5C5351] font-light leading-relaxed line-clamp-3">
                    {isRo ? article.excerpt.ro : article.excerpt.en}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-4">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="w-full py-3.5 bg-[#F5EFEB]/50 hover:bg-[#F5EFEB] text-[#3A3331] rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{isRo ? "Citește Articolul" : "Read Full Article"}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#5C5351] font-light">
              {isRo ? "Nu am găsit articole care să corespundă căutării." : "No articles match your search parameters."}
            </div>
          )}
        </div>
      </section>

      {/* Pop-up Reading Modal */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#FCFAFA] rounded-[2.5rem] shadow-2xl border border-[#D2B4A7]/20 p-6 md:p-10 z-10 max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F5EFEB]/80 hover:bg-gray-150 text-[#3A3331] transition-all z-20"
                aria-label="Close Article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Hero header in modal */}
                <div className="space-y-3">
                  <span className="text-[10px] bg-[#C29D8D]/10 text-[#C29D8D] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {isRo ? readingArticle.category.ro : readingArticle.category.en}
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#3A3331] font-light leading-snug">
                    {isRo ? readingArticle.title.ro : readingArticle.title.en}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span>{readingArticle.date}</span>
                    <span>•</span>
                    <span>{readingArticle.readTime}</span>
                  </div>
                </div>

                {/* Scaled cover image */}
                <div className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={readingArticle.img}
                    alt={isRo ? readingArticle.title.ro : readingArticle.title.en}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main Body Content formatted */}
                <div className="text-left text-[#3A3331] text-sm md:text-base font-light leading-relaxed space-y-4 max-w-3xl mx-auto whitespace-pre-wrap">
                  {isRo ? readingArticle.content.ro : readingArticle.content.en}
                </div>

                {/* Footer of modal */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Anel Journal © 2026</span>
                  <button className="flex items-center gap-1.5 hover:text-[#C29D8D] transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isRo ? "Partajează" : "Share"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
