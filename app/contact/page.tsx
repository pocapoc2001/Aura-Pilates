"use client";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, Check, AlertCircle, Sparkles } from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();
  const isRo = lang === "ro";

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("support");
  const [formMessage, setFormMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API gateway speed delay
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset fields
    setFormName("");
    setFormEmail("");
    setFormMessage("");

    // Hide toast after 4 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 4500);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#FCFAFA] selection:bg-[#C29D8D] selection:text-white" id="contact-page-view">
      {/* Toast message for success */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#8F9D82] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-[#8F9D82]/20"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold uppercase tracking-wider block">
                {isRo ? "Mesaj Trimis Cu Succes!" : "Message Sent Successfully!"}
              </span>
              <span className="text-[11px] font-light text-white/90 block">
                {isRo 
                  ? "Echipa noastra te va contacta în maximum 4 ore lucratoare."
                  : "We'll get back to you within 4 business hours."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="relative w-full py-16 md:py-24 px-6 text-center overflow-hidden border-b border-[#3A3331]/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAFA] to-[#F5EFEB]/25 -z-10" />
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[#C29D8D] font-bold text-xs tracking-widest uppercase block">
            {isRo ? "REȚEAUA ANEL" : "STAY IN TOUCH"}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#3A3331] font-light">
            {isRo ? "Suntem aici să te ajutăm" : "Connect with Anel"}
          </h1>
          <p className="text-[#5C5351] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {isRo
              ? "Ai întrebări despre credite, rollover sau vrei să îți înregistrezi propriul studio în rețeaua noastră? Trimite-ne un mesaj instantaneu."
              : "Questions about your subscription, rolled credits, or interested in listing your pilates studio? Reach out to us."}
          </p>
        </div>
      </section>

      {/* Main Grid: Form Left, details Right */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Form Section (Left 7-cols) */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#D2B4A7]/15 shadow-xl shadow-[#C29D8D]/5 text-left">
          <h2 className="font-serif text-2xl md:text-3xl text-[#3A3331] mb-6 font-light">
            {isRo ? "Trimite un mesaj rapid" : "Write us directly"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs text-[#3A3331] uppercase tracking-wider font-semibold">
                  {isRo ? "Numele tău" : "Your Name"}
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Alexandru Ionescu"
                  className="w-full px-4 py-3 rounded-xl bg-[#FCFAFA] border border-gray-150 text-sm text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D]"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs text-[#3A3331] uppercase tracking-wider font-semibold">
                  {isRo ? "Adresă Email" : "Your Email"}
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="alexandru@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FCFAFA] border border-gray-150 text-sm text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D]"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs text-[#3A3331] uppercase tracking-wider font-semibold">
                {isRo ? "Subiect / Tip solicitare" : "Inquiry Type"}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: "support", ro: "Suport Tehnic / Credite", en: "Support / Credits" },
                  { id: "partner", ro: "Devino Studio Partener", en: "Become Partner Studio" },
                  { id: "other", ro: "Întrebare Generală", en: "General Inquiries" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormType(option.id)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      formType === option.id
                        ? "border-[#C29D8D] bg-[#F5EFEB]/30 text-[#3A3331]"
                        : "border-gray-150 hover:bg-[#FCFAFA] text-[#5C5351]"
                    }`}
                  >
                    <span>{isRo ? option.ro : option.en}</span>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-1 ${formType === option.id ? "border-[#C29D8D]" : "border-gray-300"}`}>
                      {formType === option.id && <div className="w-1.5 h-1.5 rounded-full bg-[#C29D8D]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs text-[#3A3331] uppercase tracking-wider font-semibold">
                {isRo ? "Mesajul tău" : "Message Detail"}
              </label>
              <textarea
                required
                rows={5}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder={isRo ? "Scrie cel puțin câteva rânduri..." : "Tell us how we can assist you..."}
                className="w-full px-4 py-3 rounded-xl bg-[#FCFAFA] border border-gray-150 text-sm text-[#3A3331] focus:outline-none focus:ring-1 focus:ring-[#C29D8D] font-light leading-relaxed"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#3A3331] hover:bg-[#2A2321] text-white text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{isRo ? "Se trimite..." : "Sending..."}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{isRo ? "Trimite Mesaj Securizat" : "Send Secure Message"}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info Card & Map (Right 5-cols) */}
        <div className="lg:col-span-5 space-y-8 text-left">
          {/* Classic Details */}
          <div className="bg-[#F5EFEB]/30 rounded-[2.5rem] p-8 border border-[#D2B4A7]/15 space-y-6">
            <h3 className="font-serif text-xl text-[#3A3331] font-semibold">
              {isRo ? "Informații de Contact" : "Anel Headquarters"}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100 shrink-0">
                  <Mail className="w-4 h-4 text-[#C29D8D]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">{isRo ? "Email Suport" : "Email Enquiries"}</span>
                  <a href="mailto:hello@anelstudios.ro" className="text-sm font-semibold text-[#3A3331] hover:text-[#C29D8D] transition-colors">
                    hello@anelstudios.ro
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100 shrink-0">
                  <Phone className="w-4 h-4 text-[#C29D8D]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">{isRo ? "Linie Telefonică directă" : "Hotline Call"}</span>
                  <a href="tel:+40722000000" className="text-sm font-semibold text-[#3A3331] hover:text-[#C29D8D] transition-colors">
                    +40 (722) 000 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100 shrink-0">
                  <MapPin className="w-4 h-4 text-[#C29D8D]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">Office</span>
                  <span className="text-sm text-[#3A3331] font-light">
                    {isRo ? "Strada George Enescu 23, Floreasca, București" : "George Enescu St 23, Floreasca, Bucharest"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-gray-100 shrink-0">
                  <Clock className="w-4 h-4 text-[#C29D8D]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">{isRo ? "Program Răspuns" : "Response Hours"}</span>
                  <span className="text-sm text-[#3A3331] font-light">
                    {isRo ? "Luni - Vineri: 09:00 - 18:00" : "Monday - Friday: 09:00 - 18:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map Visual */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-150 aspect-[16/10] relative shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182570.8354226194!2d25.922097960309995!3d44.4377063462615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1716301385966!5m2!1sro!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              title="Anel headquarters Location map"
              className="grayscale contrast-125 saturate-50"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
