"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; credit_balance: number } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth error:", error);
          setUser(null);
          return;
        }

        if (session?.user) {
          // Fetch real credit balance from public.profiles
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("credit_balance")
            .eq("id", session.user.id)
            .maybeSingle();
          
          if (profileError) {
             console.error("Profile error:", profileError.message || profileError);
          }

          setUser({
            email: session.user.email || "user@example.com",
            credit_balance: profile?.credit_balance || 0,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Supabase fetch failed:", err);
        setUser(null);
      }
    };

    fetchUser();
    
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        fetchUser();
      });

      const handleBalanceUpdate = () => {
        fetchUser();
      };
      if (typeof window !== "undefined") {
        window.addEventListener("aura_balance_updated", handleBalanceUpdate);
      }

      return () => {
        subscription?.unsubscribe();
        if (typeof window !== "undefined") {
          window.removeEventListener("aura_balance_updated", handleBalanceUpdate);
        }
      };
    } catch (err) {
      console.error("Auth listener error:", err);
    }
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-[#FCFAFA] shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-[#3A3331] flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <div className="w-2 h-2 rounded-full bg-[#FCFAFA]" />
          </div>
          <span className="font-serif text-xl tracking-wide text-[#3A3331] font-semibold">
            Anel
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-6 text-sm font-sans tracking-wide">
            {!user ? (
              <>
                <Link href="/credits" className="text-[#5C5351] hover:text-[#3A3331] transition-colors">Prețuri</Link>
                <Link href="/classes" className="text-[#5C5351] hover:text-[#3A3331] transition-colors">Studiouri partenere</Link>
                <Link href="/about" className="text-[#5C5351] hover:text-[#3A3331] transition-colors">Despre</Link>
                <Link href="/blog" className="text-[#5C5351] hover:text-[#3A3331] transition-colors">Blog</Link>
                <Link href="/contact" className="text-[#5C5351] hover:text-[#3A3331] transition-colors">Contact</Link>
              </>
            ) : (
              <>
                <Link 
                  href="/classes" 
                  className={`transition-colors duration-300 ${pathname === "/classes" ? "text-[#3A3331] font-semibold" : "text-[#5C5351] hover:text-[#3A3331]"}`}
                >
                  {t.classes}
                </Link>
                <Link 
                  href="/credits" 
                  className={`transition-colors duration-300 ${pathname === "/credits" ? "text-[#3A3331] font-semibold" : "text-[#5C5351] hover:text-[#3A3331]"}`}
                >
                  {t.credits}
                </Link>
                <Link 
                  href="/profile" 
                  className={`transition-colors duration-300 ${pathname === "/profile" ? "text-[#3A3331] font-semibold" : "text-[#5C5351] hover:text-[#3A3331]"}`}
                >
                  {t.profile}
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-[#FCFAFA] p-1 rounded-full border border-gray-100">
              <button
                onClick={() => setLang("en")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${lang === "en" ? "bg-white text-[#3A3331] shadow-sm" : "text-[#5C5351] hover:text-[#3A3331]"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ro")}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${lang === "ro" ? "bg-white text-[#3A3331] shadow-sm" : "text-[#5C5351] hover:text-[#3A3331]"}`}
              >
                RO
              </button>
            </div>

            {/* Credit Balance Pill */}
            {user && (
              <Link href="/profile" className="hidden sm:flex items-center space-x-2 bg-[#EAF0E4] border border-[#8F9D82]/30 px-4 py-1.5 rounded-full hover:bg-white transition-colors duration-300">
                <span className="w-2 h-2 rounded-full bg-[#8F9D82] animate-pulse" />
                <span className="text-sm font-medium text-[#8F9D82]">
                  {user.credit_balance} cr
                </span>
              </Link>
            )}

            {/* Account CTA */}
            {!user ? (
              <Link href="/auth/login" className="px-5 py-2 rounded-full bg-[#C29D8D] text-white text-sm font-semibold hover:bg-[#A98273] transition-colors duration-300 shadow-[0_4px_10px_-2px_rgba(210,180,167,0.4)] hover:shadow-[0_4px_15px_-2px_rgba(190,157,143,0.5)]">
                {t.login}
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="w-10 h-10 rounded-full bg-[#FCFAFA] border border-gray-100 flex items-center justify-center font-serif text-[#3A3331] hover:bg-white transition-colors duration-300 uppercase shadow-sm">
                  {user.email.charAt(0)}
                </Link>
                <button
                  onClick={handleLogOut}
                  className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-[#5C5351] hover:text-red-500 hover:bg-red-50 transition-colors duration-300"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <button
              className="lg:hidden p-2 text-[#3A3331]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg"
        >
          <div className="flex flex-col px-6 py-4 space-y-4 text-center">
            {!user ? (
              <>
                <Link href="/credits" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">Prețuri</Link>
                <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">Studiouri partenere</Link>
                <Link href="/about" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">Despre</Link>
                <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">Blog</Link>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">Contact</Link>
              </>
            ) : (
              <>
                <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">{t.classes}</Link>
                <Link href="/credits" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">{t.credits}</Link>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="py-2 text-[#5C5351] hover:text-[#3A3331]">{t.profile}</Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="py-2 text-red-500 hover:text-red-600"
                >
                  Deconectare
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
