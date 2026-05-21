"use client";

import { useLanguage } from "@/lib/language-context";
import { ClassSession, supabaseMock, Booking } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Clock, CalendarDays, ExternalLink } from "lucide-react";

import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Component to handle pan and zoom when a marker is selected
const MapUpdater = ({ selectedClassId, classes }: { selectedClassId: string | null, classes: ClassSession[] }) => {
  const map = useMap();
  useEffect(() => {
    if (map && selectedClassId) {
      const cls = classes.find(c => c.id === selectedClassId);
      if (cls) {
        map.panTo({ lat: cls.lat, lng: cls.lng });
        map.setZoom(15);
      }
    }
  }, [map, selectedClassId, classes]);
  return null;
};

export default function ClassesClient({ mapsKey }: { mapsKey: string }) {
  const { t } = useLanguage();
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Filter State
  const [activityType, setActivityType] = useState<string>("All");
  const [timeOfDay, setTimeOfDay] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"none" | "low" | "high">("none");

  const router = useRouter();

  // Sync State
  const [hoveredClassId, setHoveredClassId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || mapsKey || '';
  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

  const fetchState = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    const [allClasses, allBookings, user] = await Promise.all([
      supabaseMock.getClasses(),
      session ? supabaseMock.getBookings() : Promise.resolve([]),
      supabaseMock.getUser()
    ]);
    setClasses(allClasses);
    setBookings(session ? allBookings.filter(b => b.user_id === user.id).map(b => b.class_id) : []);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchState();
    
    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const filteredClasses = classes.filter(
    (c) =>
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
       c.studio.toLowerCase().includes(search.toLowerCase()) ||
       c.focus.toLowerCase().includes(search.toLowerCase())) &&
      (activityType === "All" || c.activity_type === activityType) &&
      (timeOfDay === "All" || c.time_of_day === timeOfDay)
  );

  const sortedAndFilteredClasses = [...filteredClasses].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* List Partition (Left Side) */}
      <div className="w-full md:w-[40%] md:min-w-[400px] max-w-lg h-full bg-[#FCFAFA] border-r border-[#FCFAFA] flex flex-col z-10 shadow-[4px_0_24px_-8px_rgba(210,180,167,0.3)]">
        <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-20 flex flex-col space-y-4">
          <h1 className="font-serif text-3xl text-[#3A3331]">{t.classes}</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5351]" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#FCFAFA] border border-gray-100 text-[#3A3331] focus:outline-none focus:ring-2 focus:ring-[#D2B4A7]/30 focus:border-[#D2B4A7] transition-all font-sans"
            />
          </div>
          
          {/* Smart Filters */}
          <div className="flex flex-col space-y-3 pt-2">
            <div className="flex space-x-2 overflow-x-auto scrollbar-none pb-1">
              {["All", "Reformer", "Mat Pilates", "Yoga", "Barre"].map(type => (
                <button
                  key={type}
                  onClick={() => setActivityType(type)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activityType === type ? "bg-[#C29D8D] text-white" : "bg-[#FCFAFA] text-[#5C5351] hover:bg-[#FAF7F6] border border-gray-100 hover:text-[#3A3331]"}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 overflow-x-auto scrollbar-none pb-1">
              {["All", "Morning", "Afternoon", "Evening"].map(time => (
                <button
                  key={time}
                  onClick={() => setTimeOfDay(time)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${timeOfDay === time ? "bg-[#C29D8D] text-white" : "bg-[#FCFAFA] text-[#5C5351] hover:bg-[#FAF7F6] border border-gray-100 hover:text-[#3A3331]"}`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            {/* Sorting Pills */}
            <div className="flex items-center space-x-1.5 text-xs text-[#5C5351] pt-1 border-t border-gray-50 animate-fade-in">
              <span className="font-medium mr-1 uppercase tracking-wider text-[10px]">{t.sortByCredits || "Sortare cr:"}</span>
              <button 
                onClick={() => setSortBy("none")}
                className={`px-3 py-1 rounded-xl font-medium transition-all ${sortBy === "none" ? "bg-[#3A3331] text-white" : "bg-gray-100 text-[#5C5351] hover:bg-gray-200"}`}
              >
                {t.sortDefault || "Implicită"}
              </button>
              <button 
                onClick={() => setSortBy("low")}
                className={`px-3 py-1 rounded-xl font-medium transition-all ${sortBy === "low" ? "bg-[#8F9D82] text-white" : "bg-gray-100 text-[#5C5351] hover:bg-gray-200"}`}
              >
                {t.sortLowHigh || "Min-Max Cr"}
              </button>
              <button 
                onClick={() => setSortBy("high")}
                className={`px-3 py-1 rounded-xl font-medium transition-all ${sortBy === "high" ? "bg-[#A98273] text-white" : "bg-gray-100 text-[#5C5351] hover:bg-gray-200"}`}
              >
                {t.sortHighLow || "Max-Min Cr"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-4">
          {sortedAndFilteredClasses.map((cls, idx) => {
            const isBooked = bookings.includes(cls.id);
            const isFull = cls.booked_spots >= cls.spots_total;
            const isHovered = hoveredClassId === cls.id;
            const isSelected = selectedClassId === cls.id;

            return (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredClassId(cls.id)}
                onMouseLeave={() => setHoveredClassId(null)}
                onClick={() => setSelectedClassId(cls.id)}
                className={`bg-white p-5 rounded-3xl border transition-all cursor-pointer group flex flex-col space-y-4 ${
                  isSelected ? "border-[#D2B4A7] shadow-[0_4px_20px_-4px_rgba(210,180,167,0.3)] ring-1 ring-[#D2B4A7]/30" : 
                  isHovered ? "border-[#FAF7F6] shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)]" : "border-gray-50 shadow-sm hover:shadow-[0_4px_20px_-4px_rgba(210,180,167,0.15)]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[#8F9D82] text-xs font-semibold uppercase tracking-wider mb-1 block">
                      {cls.focus}
                    </span>
                    <h3 className="font-serif text-xl text-[#3A3331]">{cls.title}</h3>
                    <Link href={`/studios/${cls.studio_id}`} className="text-[#5C5351] hover:text-[#8F9D82] text-sm flex items-center space-x-1 mt-1 transition-colors group/studio">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{cls.studio}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/studio:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-xl text-[#3A3331] block">
                      {cls.price} cr
                    </span>
                    <span className="text-xs text-[#5C5351] font-medium">
                      {cls.booked_spots}/{cls.spots_total} {t.noSpots.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-[#3A3331] text-sm">
                  <div className="flex items-center space-x-1.5 bg-[#FCFAFA] px-3 py-1.5 rounded-xl border border-gray-100">
                    <CalendarDays className="w-4 h-4 text-[#D2B4A7]" />
                    <span>{cls.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-[#FCFAFA] px-3 py-1.5 rounded-xl border border-gray-100">
                    <Clock className="w-4 h-4 text-[#D2B4A7]" />
                    <span>{cls.time}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); !isBooked && !isFull && handleBook(cls.id); }}
                  disabled={isBooked || isFull}
                  className={`w-full py-3 rounded-2xl font-semibold tracking-wide transition-all duration-300 ${
                    isBooked
                      ? "bg-gray-50 text-[#5C5351] cursor-not-allowed"
                      : isFull
                      ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                      : "bg-[#C29D8D] hover:bg-[#A98273] text-white shadow-[0_4px_10px_-2px_rgba(210,180,167,0.4)] hover:shadow-[0_4px_15px_-2px_rgba(190,157,143,0.5)]"
                  }`}
                >
                  {isBooked ? t.alreadyBooked : isFull ? t.noSpots : t.book}
                </button>
              </motion.div>
            );
          })}
          {sortedAndFilteredClasses.length === 0 && (
            <div className="text-center text-[#5C5351] py-12 font-light">
              No classes found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Map Partition (Right Side) */}
      <div className="hidden md:block w-full h-full relative bg-[#FCFAFA] flex-1 p-6">
        {isClient && !hasValidKey && (
          <div className="absolute inset-0 p-12 flex items-center justify-center bg-gray-50 z-20">
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)] border border-gray-100 max-w-sm text-center">
              <MapPin className="w-8 h-8 text-[#D2B4A7] mx-auto mb-4" />
              <h2 className="font-serif text-xl text-[#3A3331] mb-2">Google Maps Key Required</h2>
              <p className="text-sm text-[#5C5351] mb-4">To view the live map of studios, please add your Google Maps Platform API key in AI Studio Secrets as <code className="bg-[#FAF7F6] px-1 rounded text-[#3A3331]">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.</p>
              <div className="text-xs text-gray-400">Settings &gt; Secrets</div>
            </div>
          </div>
        )}
        
        {isClient && hasValidKey && (
          <APIProvider apiKey={API_KEY} version="weekly">
            <div className="w-full h-[calc(100vh-120px)] rounded-3xl overflow-hidden relative shadow-[0_4px_20px_-4px_rgba(210,180,167,0.2)]">
              <Map
                defaultCenter={{ lat: 44.4355, lng: 26.1025 }}
                defaultZoom={13}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              disableDefaultUI={true}
              zoomControl={true}
            >
              <MapUpdater selectedClassId={selectedClassId} classes={classes} />
              
              {filteredClasses.map((cls) => {
                const isBooked = bookings.includes(cls.id);
                const isHovered = hoveredClassId === cls.id;
                const isSelected = selectedClassId === cls.id;
                const active = isHovered || isSelected;

                return (
                  <AdvancedMarker 
                    key={cls.id} 
                    position={{ lat: cls.lat, lng: cls.lng }} 
                    title={cls.title}
                    onClick={() => setSelectedClassId(cls.id)}
                    zIndex={active ? 100 : 1}
                  >
                     <div className={`transition-all duration-300 ${active ? 'scale-125' : 'scale-100'}`}>
                        <Pin 
                            background={isBooked ? '#3A3331' : (active ? '#BE9D8F' : '#D2B4A7')} 
                            borderColor={isBooked ? '#25201f' : (active ? '#a8897c' : '#bd9d8e')} 
                            glyphColor="#FCFAFA"
                        />
                    </div>
                  </AdvancedMarker>
                );
              })}
            </Map>
            </div>
          </APIProvider>
        )}
      </div>
    </div>
  );
}
