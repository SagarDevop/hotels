"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { 
  Phone, 
  MapPin, 
  ArrowDown, 
  CheckCircle2, 
  Eye
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] md:min-h-[720px] lg:min-h-[850px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image — Mathura Janmabhoomi at golden hour */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85 z-10" />
        <img
          src="/assets/hero_real.jpg"
          alt="Naari Homestay Mathura — Authentic property view"
          className="h-full w-full object-cover object-center scale-[1.02]"
          loading="eager"
        />
      </div>

      {/* Warm ambient glow */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-tr from-rose-900/10 via-transparent to-amber-800/10 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-5 h-full flex flex-col justify-center pt-20 pb-24 md:pt-24 md:pb-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            
            {/* Location Badge (High Trust) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/90">
                Opp. Police Chowki • Dampier Nagar, Mathura
              </span>
            </motion.div>

            {/* Headline — Brilliantly Sharp & Specific */}
            <h1 className="text-[28px] md:text-5xl lg:text-[64px] font-serif leading-[1.2] md:leading-[1.1] tracking-[-0.02em] text-white drop-shadow-xl max-w-4xl px-2">
              Safe Family Stay <br className="hidden md:block" />
              <span className="text-primary-light italic">10 Mins</span> from Janmabhoomi
            </h1>

            {/* Subheadline — Hinglish for Relatability */}
            <p className="max-w-xl text-[14px] md:text-xl font-sans text-white/95 leading-relaxed font-light drop-shadow-sm px-4">
              Dampier Nagar ki shaant galiyon mein <span className="font-medium">AC rooms, ghar jaisa khana</span>, aur premium safety.
            </p>

            {/* DUAL CTA SYSTEM — The Conversion Engine */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full justify-center px-4"
            >
              {/* PRIMARY — WhatsApp (The Talker Path) */}
              <a
                href={`https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="whatsapp"
                  size="xl"
                  className="w-full sm:min-w-[340px] h-14 md:h-16 shadow-[0_12px_40px_rgba(37,211,102,0.4)] text-base md:text-lg gap-3 font-black uppercase tracking-wider"
                >
                  <WhatsAppIcon size={20} className="fill-white" />
                  Check Availability
                </Button>
              </a>

              {/* SECONDARY — View Rooms (The Decision Maker Path) */}
              <a href="#rooms" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:min-w-[280px] h-16 border-white/40 text-white hover:bg-white/10 hover:text-white gap-2 backdrop-blur-sm text-lg font-bold"
                >
                  <Eye size={20} />
                  View Rooms & Prices
                </Button>
              </a>
            </motion.div>

            {/* MICRO-TRUST & FRICTION REDUCERS */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[12px] md:text-[13px] text-white/80 font-semibold tracking-wide flex items-center gap-2"
              >
                <CheckCircle2 size={14} className="text-emerald-400" />
                100+ guests stayed • Family-safe location • No hidden charges
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="text-[11px] text-primary-light/90 font-bold uppercase tracking-[0.1em] flex flex-col items-center gap-1"
              >
                <span>💬 Usually replies within 5 minutes on WhatsApp</span>
                <span className="text-white/60 text-[10px] font-medium tracking-widest whitespace-nowrap">
                  🚀 85% Booked for the upcoming weekend — book now!
                </span>
              </motion.p>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-0 w-full z-50 flex flex-col items-center gap-1.5 pointer-events-none opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-medium">
          Start Your Yatra
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-primary-light/80"
        >
          <ArrowDown size={18} strokeWidth={2} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
