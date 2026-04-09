"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, ShieldCheck, Moon, Map as MapIcon } from "lucide-react";

const AfterDarshan = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-dark relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="1" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Image side - Emotional relief visual */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-5 relative group"
            >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover:rotate-1 transition-transform duration-700">
                    <img 
                       src="/assets/story_mathura.png" 
                       alt="Quiet sanctuary at Naari Homestay Mathura" 
                       className="h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 md:bottom-10 md:right-[-30px] bg-white p-6 rounded-[2rem] shadow-xl border border-primary/10 max-w-[200px] backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-2">
                        <Moon size={20} className="text-primary fill-primary/10" />
                        <span className="text-xs font-black uppercase tracking-widest text-text">Quiet Zone</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed font-medium">
                        Dampier Nagar lanes are 4x wider and 10x quieter than temple streets.
                    </p>
                </div>
            </motion.div>

            {/* Content side - Problem/Solution psychology */}
            <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full"
                    >
                        <MapIcon size={14} className="text-primary" />
                        <span className="text-primary uppercase tracking-[0.25em] text-[10px] font-bold">Pilgrim Psychology</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif text-secondary leading-[1.1] tracking-tight"
                    >
                        After Darshan, <br />
                        <span className="italic text-primary">Where Do You Rest?</span>
                    </motion.h2>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6 max-w-2xl"
                >
                    <p className="text-text-muted text-lg md:text-xl font-light leading-relaxed">
                        Mathura’s temples are divine, but the <span className="text-secondary font-medium">crowds, noise, and hours of walking</span> can leave you and your family exhausted.
                    </p>
                    <p className="text-text text-base md:text-lg font-normal leading-relaxed">
                        You don’t want to struggle with narrow city traffic or cramped streets when all you need is a <span className="text-primary underline underline-offset-4 decoration-primary/30">hot shower, home-cooked food, and a quiet bed</span>.
                    </p>
                    <p className="text-text bg-primary/5 p-6 rounded-2xl border-l-4 border-primary font-medium italic italic-bold">
                        Naari Homestay is your peaceful sanctuary—located in the clean, wide lanes of Dampier Nagar, where the only sound you&apos;ll hear is peace.
                    </p>
                </motion.div>

                {/* Quick hooks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: <ShieldCheck size={18} />, text: "Family Safe & Private" },
                        { icon: <Coffee size={18} />, text: "Pure Home-Style Meals" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-text font-bold text-xs uppercase tracking-widest border border-border p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:border-primary/20">
                            <span className="text-primary">{item.icon}</span>
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default AfterDarshan;
