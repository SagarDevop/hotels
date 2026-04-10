"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Utensils, MapPin, Zap, Coffee, CheckCircle2 } from "lucide-react";

/**
 * Merged Highlights section for Mobile CRO.
 * Consolidates 'AfterDarshan', 'WhyChooseUs', 'Amenities', and 'Food'.
 */
const highlights = [
  {
    icon: <ShieldCheck className="text-emerald-600" />,
    title: "100% Family Safe",
    desc: "Opposite Police Chowki. Dampier Nagar is Mathura's safest premium zone.",
    bg: "bg-emerald-50"
  },
  {
    icon: <Utensils className="text-amber-600" />,
    title: "Ghar Jaisa Khana",
    desc: "Pure vegetarian, home-style meals prepared with love and hygiene.",
    bg: "bg-amber-50"
  },
  {
    icon: <MapPin className="text-secondary" />,
    title: "Prime Location",
    desc: "10 mins to Janmabhoomi. Wide roads = No city traffic noise.",
    bg: "bg-blue-50"
  },
  {
    icon: <Zap className="text-primary" />,
    title: "Modern Comfort",
    desc: "AC Rooms + 100% Power Backup + High Speed WiFi for every guest.",
    bg: "bg-primary/5"
  }
];

const HighlightsMerged = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="max-w-xl mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary uppercase tracking-[0.3em] text-[10px] font-black block mb-3"
          >
            The Naari Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif text-text leading-tight"
          >
            Why Families <br /> 
            <span className="italic text-primary-dark">Trust Us</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[2rem] border border-border/50 hover:border-primary/20 transition-all ${item.bg}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 shrink-0">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Social Proof Strip */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 flex flex-wrap gap-4 items-center justify-center border-t border-border pt-8"
        >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                <CheckCircle2 size={14} className="text-emerald-600" />
                No Advance Booking Required
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Pure Veg Property
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Managed by Host Family
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HighlightsMerged;
