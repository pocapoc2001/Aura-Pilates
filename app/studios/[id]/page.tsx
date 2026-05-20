"use client";

import { useLanguage } from "@/lib/language-context";
import { Studio, ClassSession, supabaseMock, Booking } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { use } from "react";
import { MapPin, Star, CalendarDays, Clock, Check, ShowerHead, Car, Droplets, Coffee, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  
  const [studio, setStudio] = useState<Studio | null>(null);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [bookings, setBookings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchState = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    const [fetchedStudio, allClasses, allBookings, user] = await Promise.all([
      supabaseMock.getStudioById(id),
      supabaseMock.getClasses(),
      session ? supabaseMock.getBookings() : Promise.resolve([]),
      supabaseMock.getUser()
    ]);
    if (fetchedStudio) {
      setStudio(fetchedStudio);
      setClasses(allClasses.filter(c => c.studio_id === id));
    }
    setBookings(session ? allBookings.filter(b => b.user_id === user.id).map(b => b.class_id) : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchState();
  }, [id]);

  const handleBook = async (classId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login");
      return;
    }

    const res = await supabaseMock.bookClass(classId);
    if (res.success) {
      fetchState();
    } else {
      alert(res.message);
    }
  };

  // Helper to map amenity names to icons
  const getAmenityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('shower')) return <ShowerHead className="w-5 h-5 text-[#D2B4A7]" />;
    if (n.includes('park')) return <Car className="w-5 h-5 text-[#D2B4A7]" />;
    if (n.includes('water')) return <Droplets className="w-5 h-5 text-[#D2B4A7]" />;
    if (n.includes('matcha') || n.includes('coffee')) return <Coffee className="w-5 h-5 text-[#D2B4A7]" />;
    return <Check className="w-5 h-5 text-[#D2B4A7]" />;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#D2B4A7] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col space-y-4">
        <h1 className="font-serif text-3xl text-[#3A3331]">Studio not found</h1>
        <Link href="/classes" className="text-[#D2B4A7] hover:underline">Return to Classes</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-[#FCFAFA] pb-24">
      {/* Editorial Header */}
      <div className="w-full bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col space-y-6">
          <Link href="/classes" className="inline-flex items-center space-x-2 text-[#5C5351] hover:text-[#3A3331] transition-colors w-max">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Back</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
            <div>
              <h1 className="font-serif text-5xl text-[#3A3331] mb-4">{studio.name}</h1>
              <div className="flex items-center space-x-6 text-[#5C5351]">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-[#3A3331]">{studio.rating}</span>
                  <span className="text-sm">Google Reviews</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Bucharest</span>
                </div>
              </div>
            </div>
            <div className="text-[#3A3331] font-light max-w-md leading-relaxed border-l border-gray-200 pl-6">
              {studio.description}
            </div>
          </div>
        </div>
      </div>

      {/* Masonry-style Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
          {studio.images[0] && (
            <div className="md:col-span-2 h-full rounded-[2.5rem] overflow-hidden relative group">
              <Image src={studio.images[0]} alt="Studio" fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
            </div>
          )}
          <div className="flex flex-col space-y-6 h-full">
            {studio.images[1] && (
              <div className="flex-1 rounded-[2.5rem] overflow-hidden relative group">
                <Image src={studio.images[1]} alt="Studio" fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            )}
            {studio.images[2] && (
              <div className="flex-1 rounded-[2.5rem] overflow-hidden relative group hidden md:block">
                <Image src={studio.images[2]} alt="Studio" fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 pt-8">
        {/* Left Column: Amenities */}
        <div className="md:col-span-1 flex flex-col space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-[#3A3331] mb-6">Premium Amenities</h3>
            <div className="flex flex-col space-y-4">
              {studio.amenities.map(amenity => (
                <div key={amenity} className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="bg-[#FCFAFA] p-2 rounded-xl">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="font-medium text-[#3A3331]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Classes */}
        <div className="md:col-span-2 flex flex-col space-y-8">
          <h3 className="font-serif text-2xl text-[#3A3331] mb-2">Upcoming Sessions</h3>
          <div className="flex flex-col space-y-4">
            {classes.length === 0 ? (
               <div className="p-8 text-center text-[#5C5351] font-light bg-white rounded-3xl border border-gray-100">
                 No upcoming classes at this studio.
               </div>
            ) : (
              classes.map((cls, idx) => {
                const isBooked = bookings.includes(cls.id);
                const isFull = cls.booked_spots >= cls.spots_total;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    key={cls.id}
                    className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(210,180,167,0.1)] hover:shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] transition-shadow relative overflow-hidden group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D2B4A7] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex-1 mb-4 md:mb-0">
                      <span className="text-[#8F9D82] text-xs font-semibold uppercase tracking-wider mb-1 block">
                        {cls.focus}
                      </span>
                      <h4 className="font-serif text-xl text-[#3A3331]">{cls.title}</h4>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-[#5C5351] font-medium">
                        <div className="flex items-center space-x-1.5">
                          <CalendarDays className="w-4 h-4 text-[#D2B4A7]" />
                          <span>{cls.date}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-[#D2B4A7]" />
                          <span>{cls.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center justify-between md:items-end w-full md:w-auto h-full space-y-0 md:space-y-4">
                      <div className="text-right">
                        <span className="font-serif text-2xl text-[#3A3331] block">
                          {cls.price} cr
                        </span>
                        <span className="text-xs text-[#5C5351] font-medium block">
                          {cls.booked_spots}/{cls.spots_total} {t.noSpots.toLowerCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => !isBooked && !isFull && handleBook(cls.id)}
                        disabled={isBooked || isFull}
                        className={`px-8 py-3 rounded-2xl font-semibold tracking-wide transition-all duration-300 ${
                          isBooked
                            ? "bg-gray-50 text-[#5C5351] cursor-not-allowed"
                            : isFull
                            ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                            : "bg-[#C29D8D] hover:bg-[#A98273] text-white shadow-[0_4px_10px_-2px_rgba(210,180,167,0.4)] hover:shadow-[0_4px_15px_-2px_rgba(190,157,143,0.5)]"
                        }`}
                      >
                        {isBooked ? t.alreadyBooked : isFull ? t.noSpots : t.book}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
