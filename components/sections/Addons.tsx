"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, Car, Map, Clock, Plus, Zap } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const iconMap: Record<string, React.ReactNode> = {
  thali: <Utensils size={24} />,
  auto: <Map size={24} />,
  pickup: <Car size={24} />,
  late: <Clock size={24} />,
};

const Addons = () => {
  return (
    <section id="addons" className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-serif font-bold text-text mb-4"
            >
              Enhance Your <span className="text-primary italic">Comfort</span>
            </motion.h2>
            <p className="text-text-muted">
              Pre-book these small conveniences to make your spiritual journey 
              completely hassle-free.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-saffron/10 text-saffron-dark px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-saffron/20"
          >
            <Zap size={14} className="fill-saffron" />
            Most Pilgrims Add These
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.addons.map((addon, i) => (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-border hover:border-primary/20 hover:shadow-xl transition-all group overflow-hidden relative"
            >
              {/* Decorative Plus Icon */}
              <div className="absolute -top-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                <Plus size={80} strokeWidth={4} />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {iconMap[addon.id] || <Plus size={24} />}
                </div>
                
                <h3 className="text-lg font-bold text-text mb-2 tracking-tight">
                  {addon.name}
                </h3>
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  {addon.desc}
                </p>
                
                <div className="flex items-baseline gap-1 pt-4 border-t border-border/50">
                  <span className="text-2xl font-black text-text">₹{addon.price}</span>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">/person*</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-6 bg-white border border-primary/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <Zap size={20} />
            </div>
            <div>
                <h4 className="font-bold text-text">Pro Tip: Pre-book Add-ons via WhatsApp</h4>
                <p className="text-sm text-text-muted">It helps us prepare better and guarantees availability during rush hours.</p>
            </div>
          </div>
          <a 
            href={`https://wa.me/${siteConfig.phone}?text=Hi, I want to add some services to my booking.`}
            className="shrink-0"
          >
            <button className="px-8 py-3 bg-whatsapp text-white rounded-xl font-bold text-sm hover:brightness-110 shadow-lg transition-all">
                Add to Booking
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Addons;
