"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if credentials are placeholders or improperly set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
          process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') || 
          !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
        setError('Configurare lipsă: Te rugăm să adaugi NEXT_PUBLIC_SUPABASE_URL și NEXT_PUBLIC_SUPABASE_ANON_KEY în meniul Settings -> Secrets pentru a funcționa autentificarea.');
        setLoading(false);
        return;
      }

      const { error: authError } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      console.error("Auth action failed:", err);
      if (err instanceof Error && err.message.includes("Failed to fetch")) {
        setError("Network error: Could not connect to authentication service. Please check your Supabase configuration.");
      } else {
        setError("An unexpected error occurred during authentication.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-[#FCFAFA] py-24 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D2B4A7]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] border border-gray-100 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#3A3331] flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-3 rounded-full bg-[#FCFAFA]" />
          </div>
          <h1 className="font-serif text-3xl text-[#3A3331] mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-[#5C5351] font-light">
            {isLogin 
              ? "Sign in to manage your premium wellness routine." 
              : "Join our exclusive network of elite studios."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#5C5351] ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FCFAFA] border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-2 focus:ring-[#D2B4A7]/30 focus:border-[#D2B4A7] transition-all font-sans"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#5C5351] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#FCFAFA] border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-2 focus:ring-[#D2B4A7]/30 focus:border-[#D2B4A7] transition-all font-sans"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#C29D8D] hover:bg-[#A98273] text-white font-semibold shadow-[0_4px_10px_-2px_rgba(210,180,167,0.4)] hover:shadow-[0_4px_20px_-2px_rgba(190,157,143,0.5)] transition-all flex items-center justify-center space-x-2 mt-4 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Sign Up"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button" 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-sm text-[#5C5351] hover:text-[#3A3331] transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-6 text-[#5C5351] text-xs font-light text-center w-full">
        <Link href="/" className="hover:text-[#3A3331] underline decoration-gray-200 underline-offset-4 transition-colors">
          Return to home
        </Link>
      </div>
    </div>
  );
}
