"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight, ShieldCheck, Heart, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const FinalCTA = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMsg}`;

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="text-white text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Wait-list Open for June/July
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-[1.1]"
              >
                Don&apos;t Just Visit Mathura. <br />
                <span className="text-saffron-light">Stay with Family.</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Rooms at Naari are more than just a bed. It&apos;s the warmth of home food, the safety of a family, and the peace of mind you deserve.
              </motion.p>
              
              {/* Trust Lock Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: <ShieldCheck size={20} />, text: "No Advance Pressure" },
                  { icon: <Heart size={20} />, text: "Pay at Property" },
                  { icon: <Clock size={20} />, text: "Instant Direct Contact" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-white/90 text-sm font-medium"
                  >
                    <div className="p-2 rounded-lg bg-white/20">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right: Action Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Check Availability</h3>
                <p className="text-muted-foreground font-medium">Get a direct quote in 2 minutes</p>
              </div>
              
              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <button className="w-full bg-whatsapp text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:brightness-110 hover:-translate-y-1 transition-all">
                    <MessageCircle size={24} />
                    Confirm on WhatsApp
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  {/* Glowing text snippet */}
                  <span className="absolute -top-3 -right-2 bg-saffron text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                    FASTER
                  </span>
                </a>
                
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-border" />
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">OR</span>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>
                
                <a href={`tel:+${siteConfig.phone}`}>
                  <button className="w-full bg-primary/5 text-primary border-2 border-primary/20 hover:border-primary/40 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all">
                    <Phone size={20} />
                    Talk to the Owner
                  </button>
                </a>
              </div>
              
              <p className="text-center mt-8 text-xs text-muted-foreground font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-green-600" />
                Safe & Professional Booking Process
              </p>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
