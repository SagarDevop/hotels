"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Phone, 
  ArrowRight, 
  Map as MapIcon, 
  Star,
  ExternalLink,
  Info
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

// Types
interface LocationDetail {
  id: string;
  name: string;
  distance: string;
  time: string;
  benefit: string;
  mapUrl: string;
  icon: React.ReactNode;
}

const locations: LocationDetail[] = [
  {
    id: "janmabhoomi",
    name: "Shri Krishna Janmabhoomi",
    distance: "2.2 km",
    time: "10 mins",
    benefit: "Attend early morning darshan without travel stress",
    mapUrl: "https://www.google.com/maps?q=Shri+Krishna+Janmabhoomi+Mathura&output=embed",
    icon: <Star className="w-5 h-5 text-amber-500" />
  },
  {
    id: "vishram-ghat",
    name: "Vishram Ghat",
    distance: "2.5 km",
    time: "12 mins",
    benefit: "Experience peaceful Yamuna Aarti in the evening",
    mapUrl: "https://www.google.com/maps?q=Vishram+Ghat+Mathura&output=embed",
    icon: <Navigation className="w-5 h-5 text-blue-500" />
  },
  {
    id: "mathura-junction",
    name: "Mathura Junction",
    distance: "1.5 km",
    time: "5 mins",
    benefit: "Reach your stay quickly after arrival",
    mapUrl: "https://www.google.com/maps?q=Mathura+Junction&output=embed",
    icon: <MapIcon className="w-5 h-5 text-emerald-500" />
  },
  {
    id: "prem-mandir",
    name: "Prem Mandir",
    distance: "11.5 km",
    time: "25 mins",
    benefit: "Easy access to Vrindavan temples",
    mapUrl: "https://www.google.com/maps?q=Prem+Mandir+Vrindavan&output=embed",
    icon: <Star className="w-5 h-5 text-indigo-500" />
  }
];

const LocationAdvantage = () => {
  const [activeTab, setActiveTab] = useState<string>(locations[0].id);
  const activeLocation = locations.find(loc => loc.id === activeTab) || locations[0];

  const handleWhatsApp = () => {
    const message = `Hi, please send me directions to Naari Homestay from ${activeLocation.name}`;
    window.open(`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleDirections = () => {
    const dest = encodeURIComponent(`${siteConfig.name} Mathura`);
    const origin = encodeURIComponent(`${activeLocation.name} Mathura`);
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`, "_blank");
  };

  return (
    <section className="py-20 bg-background overflow-hidden relative" id="location">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[1px] w-8 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Location Advantage</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-secondary mb-6 leading-[1.1]"
            >
              Stay at the <span className="text-primary italic">Soul Center</span> <br className="hidden lg:block" /> of Mathura.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-muted text-lg max-w-xl"
            >
              Minutes from major shrines, seconds from tranquility. Experience the perfect gateway to your spiritual journey.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-primary/5 border border-primary/20 px-4 py-2 rounded-full"
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary font-bold text-xs uppercase tracking-wider">Most guests choose this location for quick temple access</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Location Cards */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            {locations.map((loc, idx) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveTab(loc.id)}
                className={cn(
                  "p-5 rounded-[2rem] border transition-all duration-500 cursor-pointer group relative overflow-hidden",
                  activeTab === loc.id 
                    ? "bg-white border-primary shadow-warm-lg ring-1 ring-primary/20" 
                    : "bg-surface/40 border-border hover:border-primary/40 hover:bg-white"
                )}
              >
                {/* Visual indicator for active state */}
                {activeTab === loc.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary"
                  />
                )}

                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
                    activeTab === loc.id ? "bg-primary text-white shadow-lg" : "bg-white border text-primary-dark group-hover:bg-primary/10"
                  )}>
                    {loc.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={cn(
                        "text-lg font-bold transition-colors",
                        activeTab === loc.id ? "text-primary" : "text-text"
                      )}>
                        {loc.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-dark rounded-lg border border-border">
                          <Clock className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-black uppercase text-text">{loc.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={cn(
                      "text-sm font-medium transition-colors mb-2",
                      activeTab === loc.id ? "text-text" : "text-text-muted"
                    )}>
                      {loc.benefit}
                    </p>
                    
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-text-muted/60">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>{loc.distance} from stay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Help Box */}
            <div className="pt-6 border-t border-border mt-6">
              <div className="warm-glass-solid p-6 rounded-[2rem] border border-primary/20 bg-surface/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-text">Need custom directions?</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleWhatsApp}
                    className="flex-1 bg-whatsapp text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-whatsapp/20"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    WhatsApp Directions
                  </button>
                  <button 
                    onClick={handleDirections}
                    className="flex-1 bg-secondary text-white px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black active:scale-95 transition-all shadow-lg shadow-black/10"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map and Info Overlay */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[400px] md:h-[500px] lg:h-full min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-black/5">
              
              {/* Map Iframe with Animated Presence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <iframe
                    src={activeLocation.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`Map of ${activeLocation.name}`}
                    className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[1.1]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Info Bar */}
              <div className="absolute top-6 left-6 right-6">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`info-${activeTab}`}
                  className="warm-glass p-5 rounded-3xl border border-white/40 shadow-xl flex items-center justify-between gap-4 backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                      {activeLocation.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-0.5">Destination</p>
                      <p className="text-lg font-serif font-bold text-secondary leading-none">{activeLocation.name}</p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xl font-black text-secondary">{activeLocation.time}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted whitespace-nowrap">Away from Naari stay</span>
                  </div>
                </motion.div>
              </div>

              {/* Directions Prompt Overlay (Bottom Right) */}
              <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDirections}
                  className="bg-white text-secondary px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-3 border border-border hover:border-primary/40 transition-all group"
                >
                  <Navigation className="w-4 h-4 text-primary" />
                  Guide Me There
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Secure Area Badge */}
              <div className="absolute bottom-6 left-6">
                <div className="bg-secondary/90 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest">Safe Dampier Nagar Zone</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Verification Line */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-[10px] text-text-muted font-black uppercase tracking-[0.4em] opacity-40"
        >
          Premium Family Sanctuary • Opp. Police Chowki • Trusted Stay
        </motion.p>
      </div>
    </section>
  );
};

export default LocationAdvantage;
