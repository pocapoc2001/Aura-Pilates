"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ro";

const translations = {
  en: {
    heroTitle: "Elevate Your Practice",
    heroSub: "Flexible access to top-notch Pilates studios through a premium credit ecosystem. Optimize your longevity and structural performance.",
    prop1: "Tailored Sessions",
    prop1Sub: "Curated experiences for your mind and body.",
    prop2: "Elite Studios",
    prop2Sub: "Access the most exclusive locations globally.",
    prop3: "Smart Credit System",
    prop3Sub: "Book and manage your sessions intelligently.",
    explore: "Explore Classes",
    classes: "Classes",
    profile: "Profile",
    login: "Log in",
    myBookings: "My Bookings",
    cancel: "Cancel",
    book: "Reserve",
    alreadyBooked: "Already Booked",
    noSpots: "Full",
    credits: "Credits",
    availableCredits: "Available Credits",
    activeBookings: "Active Bookings",
    searchPlaceholder: "Search by studio, focus...",
    mapView: "Map View",
    classDetails: "Class Details",
    refundSuccess: "Refunded 2 credits.",
  },
  ro: {
    heroTitle: "Perfecționează-ți Practica",
    heroSub: "Acces flexibil la studiouri de Pilates de top printr-un ecosistem premium de credite. Optimizează longevitatea și performanța structurală.",
    prop1: "Sesiuni Personalizate",
    prop1Sub: "Experiențe create special pentru minte și corp.",
    prop2: "Studiouri de Elită",
    prop2Sub: "Acces la cele mai exclusiviste locații la nivel global.",
    prop3: "Sistem Inteligent de Credite",
    prop3Sub: "Rezervă și gestionează-ți sesiunile inteligent.",
    explore: "Explorează Clase",
    classes: "Clase",
    profile: "Profil",
    login: "Conectare",
    myBookings: "Rezervările Mele",
    cancel: "Anulează",
    book: "Rezervă",
    alreadyBooked: "Deja rezervat",
    noSpots: "Ocupat",
    credits: "Credite",
    availableCredits: "Credite Disponibile",
    activeBookings: "Rezervări Active",
    searchPlaceholder: "Căutare studio, focus...",
    mapView: "Hartă",
    classDetails: "Detalii Clasă",
    refundSuccess: "Refundat 2 credite.",
  },
};

type Translations = typeof translations.en;

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Allow persisting language choice via localStorage if needed
  useEffect(() => {
    const stored = localStorage.getItem("aura_lang") as Language;
    if (stored && (stored === "en" || stored === "ro")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(stored);
    }
  }, []);

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("aura_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
