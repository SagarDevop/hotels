"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, ShieldAlert, Zap, TrendingUp, Search } from "lucide-react";

const comparisons = [
  {
    feature: "Street Noise & Quiet",
    generic: "High constant noise from temple tourists",
    naari: "Dampier Nagar (Safe, wide & silent zones)",
    icon: <Zap size={18} className="text-primary" />
  },
  {
    feature: "Personal Safety",
    generic: "Crowded narrow lanes with no security",
    naari: "Opposite Police Chowki — Extra safe for ladies & kids",
    icon: <ShieldAlert size={18} className="text-primary" />
  },
  {
    feature: "Food Hygiene",
    generic: "Oily, spicy, and mass-produced food",
    naari: "Home-cooked 'Ghar jaisa khana' (Pure Veg)",
    icon: <CheckCircle2 size={18} className="text-primary" />
  },
  {
    feature: "Car / Taxi Access",
    generic: "Inner lanes are blocked for cars/autos",
    naari: "Wide roads & easy access to temple junction",
    icon: <Search size={18} className="text-primary" />
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            <TrendingUp size={14} className="text-primary" />
            <span className="text-primary uppercase tracking-[0.25em] text-[10px] font-black">Decision Maker Guide</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-text leading-tight mb-4"
          >
            Why Smart Travelers <br className="hidden md:block" />
            Pick <span className="italic text-primary">Naari Homestay</span>
          </motion.h2>
          <p className="text-text-muted text-lg font-light">
            We are not just a hotel. We are the sanctuary you deserve after a tiring day.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {comparisons.map((item, i) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-3xl p-8 border border-border shadow-sm group hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-primary/5 transition-transform group-hover:scale-110">
                    {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-black text-secondary leading-tight">
                    {item.feature}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Generic Problem */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-border/50">
                    <div className="mt-1 bg-red-500/10 p-1 rounded-full">
                        <X size={14} className="text-red-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1 italic">Temple Area Hotels</span>
                        <p className="text-sm text-text-muted font-light leading-relaxed">
                            {item.generic}
                        </p>
                    </div>
                </div>

                {/* Naari Solution */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-emerald-500/20 shadow-md">
                    <div className="mt-1 bg-emerald-500 p-1 rounded-full">
                        <CheckCircle2 size={16} className="text-white fill-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-black mb-1">Naari Homestay</span>
                        <p className="text-base text-text font-bold leading-relaxed">
                            {item.naari}
                        </p>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emotional Confirmation */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
        >
            <p className="text-text font-serif italic text-xl md:text-2xl text-primary/80">
                &ldquo;Your family deserves a safe and peaceful sanctuary, not just a room.&rdquo;
            </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
