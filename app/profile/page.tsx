"use client";

import { useLanguage } from "@/lib/language-context";
import { Booking, ClassSession, supabaseMock } from "@/lib/db";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; credit_balance: number } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [classes, setClasses] = useState<{ [key: string]: ClassSession }>({});

  const fetchState = async () => {
    try {
      // Check Auth first
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session?.user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("credit_balance")
        .eq("id", session.user.id)
        .maybeSingle();
        
      if (profileError) {
         console.error("Profile fetch error:", profileError.message || profileError);
      }

      setUser({
        email: session.user.email || "user@example.com",
        credit_balance: profile?.credit_balance || 0,
      });

      // Keeping mock data for bookings and classes since we don't have those tables strictly defined in this step
      const [bks, allCls, mockUser] = await Promise.all([
        supabaseMock.getBookings(),
        supabaseMock.getClasses(),
        supabaseMock.getUser()
      ]);
      
      // Sort bookings descending and filter for current user
      const sorted = bks
        .filter(b => b.user_id === mockUser.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Create lookup map for classes
      const clsMap: { [key: string]: ClassSession } = {};
      for (const c of allCls) {
        clsMap[c.id] = c;
      }
      setClasses(clsMap);
      setBookings(sorted);
    } catch (err) {
      console.error("Failed to fetch state:", err);
      // Redirect on unexpected error as a fallback
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    fetchState();
    
    // Fallback sync for mock DB parts
    const interval = setInterval(() => {
      supabaseMock.getBookings().then(current => {
        const sorted = current.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setBookings(sorted);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (bookingId: string) => {
    const res = await supabaseMock.cancelBooking(bookingId);
    if (res.success) {
      fetchState();
    } else {
      alert(res.message);
    }
  };

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-8 h-8 rounded-full border-2 border-[#D2B4A7] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-[#FCFAFA] py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col space-y-12">
        {/* Credits Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[2.5rem] bg-white p-10 md:p-16 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] overflow-hidden flex flex-col md:flex-row items-center justify-between"
        >
          {/* Glassmorphism ambient blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2B4A7]/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="z-10 text-center md:text-left mb-8 md:mb-0">
            <h1 className="font-serif text-4xl text-[#3A3331] mb-2">{user.email}</h1>
            <p className="text-[#5C5351] text-lg font-light tracking-wide">{t.activeBookings}: {bookings.length}</p>
          </div>

          <div className="z-10 flex flex-col items-center flex-shrink-0 bg-[#FCFAFA] p-8 rounded-[2rem] border border-gray-50 min-w-[240px]">
            <p className="text-[#5C5351] font-medium tracking-wide uppercase text-sm mb-4">
              {t.availableCredits}
            </p>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-7xl text-[#3A3331] leading-none">
                {user.credit_balance}
              </span>
              <span className="text-xl text-[#8F9D82] font-semibold uppercase tracking-widest">
                cr
              </span>
            </div>
          </div>
        </motion.div>

        {/* Timeline List (My Bookings) */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="w-full"
        >
          <h2 className="font-serif text-2xl text-[#3A3331] mb-8">{t.myBookings}</h2>
          
          <div className="flex flex-col space-y-6">
            {bookings.length === 0 ? (
              <div className="p-8 text-center text-[#5C5351] font-light bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.1)]">
                You have no active bookings.
              </div>
            ) : (
              bookings.map((booking, idx) => {
                const cls = classes[booking.class_id];
                if (!cls) return null;

                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    key={booking.id} 
                    className="group flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.1)] hover:shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D2B4A7] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex-1 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 w-full mb-4 md:mb-0">
                      <div className="w-full md:w-1/3 pr-6">
                        <span className="text-[#8F9D82] text-xs font-semibold uppercase tracking-wider mb-1 block">
                          {cls.focus}
                        </span>
                        <h3 className="font-serif text-xl text-[#3A3331]">{cls.title}</h3>
                        <p className="text-[#5C5351] text-sm flex items-center space-x-1 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{cls.studio}</span>
                        </p>
                      </div>

                      <div className="hidden md:flex border-l border-gray-100 h-12 mx-6" />

                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 text-[#3A3331]">
                        <div className="flex items-center space-x-2 bg-[#FCFAFA] px-4 py-2 rounded-xl">
                          <CalendarDays className="w-4 h-4 text-[#D2B4A7]" />
                          <span className="font-medium text-sm">{cls.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-[#FCFAFA] px-4 py-2 rounded-xl">
                          <Clock className="w-4 h-4 text-[#D2B4A7]" />
                          <span className="font-medium text-sm">{cls.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto text-right flex items-center md:flex-col justify-between md:justify-center">
                      <p className="font-serif text-xl text-[#3A3331] mb-0 md:mb-2 md:block">
                        -{cls.price} cr
                      </p>
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        className="flex items-center justify-center space-x-1 text-sm font-medium text-[#5C5351] hover:text-red-500 bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors duration-300 border border-transparent hover:border-red-100"
                      >
                        <X className="w-4 h-4" />
                        <span>{t.cancel}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
