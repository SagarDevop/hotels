"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Navigation, Sparkles, Map as MapIcon, Phone, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";


const nearbyPlaces = [
  { 
    name: "Shri Krishna Janmabhoomi", 
    distance: "1.2 km", 
    time: "5 min", 
    type: "Birthplace of Lord Krishna", 
    highlight: true,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.1!2d77.66!3d27.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973711111111111%3A0x1111111111111111!2sShri+Krishna+Janmasthan+Temple!5e0!3m2!1sen!2sin!4v1712648000000"
  },
  { 
    name: "Mathura Junction", 
    distance: "2 km", 
    time: "8 min", 
    type: "Major Railway Hub", 
    highlight: true,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.5!2d77.67!3d27.49!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3973712222222222%3A0x2222222222222222!2sMathura+Junction!5e0!3m2!1sen!2sin!4v1712648000000"
  },
  { 
    name: "Dwarkadhish Temple", 
    distance: "1.5 km", 
    time: "6 min", 
    type: "Historic Temple", 
    highlight: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.3!2d77.68!3d27.50!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3973713333333333%3A0x3333333333333333!2sDwarkadhish+Temple!5e0!3m2!1sen!2sin!4v1712648000000"
  },
  { 
    name: "Vishram Ghat", 
    distance: "1.8 km", 
    time: "7 min", 
    type: "Sacred River Ghat", 
    highlight: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.4!2d77.68!3d27.500!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3973714444444444%3A0x4444444444444444!2sVishram+Ghat!5e0!3m2!1sen!2sin!4v1712648000000"
  },
  { 
    name: "Birla Temple", 
    distance: "3 km", 
    time: "10 min", 
    type: "Grand Architecture", 
    highlight: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549!2d77.68!3d27.48!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3973715555555555%3A0x5555555555555555!2sBirla+Temple!5e0!3m2!1sen!2sin!4v1712648000000"
  },
  { 
    name: "Banke Bihari (Vrindavan)", 
    distance: "10 km", 
    time: "25 min", 
    type: "Legendary Temple", 
    highlight: false,
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546!2d77.69!3d27.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973716666666666%3A0x6666666666666666!2sShri+Bankey+Bihari+Ji+Temple!5e0!3m2!1sen!2sin!4v1712648000000"
  },
];

const HOTEL_MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.1345!2d77.6737!3d27.4924!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x3973711111111111%3A0x1111111111111111!2sNaari+Homestay+Mathura!5e0!3m2!1sen!2sin!4v1712648000000";

const Location = () => {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);

  const currentMapUrl = selectedPlace !== null ? nearbyPlaces[selectedPlace].mapUrl : HOTEL_MAP_URL;

  return (
    <section id="location" className="py-16 md:py-24 bg-surface-dark overflow-hidden">
      <div className="container mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full"
          >
            <MapIcon size={14} className="text-primary" />
            <span className="text-primary uppercase tracking-[0.25em] text-[10px] font-bold">Location Advantage</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-text leading-tight">
            Stay in the Heart of{" "}
            <br className="hidden md:block" />
            <span className="italic text-primary pr-2">Sacred Mathura</span>
          </h2>
          <p className="text-text-muted text-base md:text-lg font-light max-w-xl mx-auto">
            Experience the divine doorstep with major shrines just a short ride away. Click on a place to see it on the map.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Nearby Places List */}
            <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-text-muted/60">Major Shrines</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase">Distances from Homestay</span>
                </div>

                {nearbyPlaces.map((place, i) => (
                    <motion.div
                        key={place.name}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedPlace(selectedPlace === i ? null : i)}
                        className={`group relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedPlace === i 
                                ? "bg-white border-primary shadow-lg ring-1 ring-primary/20" 
                                : "bg-white/50 border-border hover:border-primary/30 hover:bg-white"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                selectedPlace === i 
                                    ? "bg-primary text-white scale-110" 
                                    : "bg-surface text-primary group-hover:bg-primary/10"
                            }`}>
                                <MapPin size={18} />
                                {place.highlight && (
                                    <div className="absolute -top-1 -right-1">
                                        <Sparkles size={12} className="text-primary fill-primary" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className={`text-[15px] font-semibold transition-colors ${selectedPlace === i ? "text-primary" : "text-text"}`}>
                                    {place.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] text-text-muted/80">{place.type}</span>
                                    <div className="w-1 h-1 rounded-full bg-border" />
                                    <span className="text-[11px] font-medium text-primary/80">{place.distance}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                            selectedPlace === i ? "bg-primary text-white border-primary" : "bg-surface border-border group-hover:border-primary/20"
                        }`}>
                            <Clock size={12} className={selectedPlace === i ? "text-white" : "text-primary"} />
                            <span className="text-xs font-bold tracking-tight">{place.time}</span>
                        </div>
                    </motion.div>
                ))}

                {/* Reset Selection Button */}
                {selectedPlace !== null && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedPlace(null)}
                        className="w-full py-3 bg-primary/5 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
                    >
                        <MapIcon size={14} />
                        Back to Homestay Location
                    </motion.button>
                )}

                {/* Open in Maps Detail */}
                <div className="pt-4 border-t border-border mt-4">
                    <p className="text-[11px] text-text-muted/60 uppercase tracking-widest font-bold mb-3 px-1">Navigation Tools</p>
                    <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace !== null ? encodeURIComponent(nearbyPlaces[selectedPlace].name + " Mathura") : encodeURIComponent(siteConfig.name + " Mathura")}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-text text-white font-bold text-sm uppercase tracking-[0.15em] p-4 rounded-xl hover:bg-primary hover:shadow-xl transition-all duration-300"
                    >
                        <Navigation size={16} />
                        Get Live Directions
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                </div>
            </div>

            {/* Map Frame & Details */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <motion.div
                    key={currentMapUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-square lg:aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white relative bg-surface"
                >
                    <iframe
                        src={currentMapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                        className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[1.05]"
                    />
                </motion.div>

                {/* Hotel Address Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between"
                >
                    <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 flex-shrink-0">
                            <MapIcon size={24} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-text tracking-tight uppercase">{siteConfig.name}</p>
                            <p className="text-[13px] text-text-muted/80 mt-0.5 leading-relaxed">
                                {siteConfig.address}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <a 
                            href={`tel:+${siteConfig.phone}`}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface border border-border px-5 py-2.5 rounded-xl text-sm font-bold text-text hover:bg-primary/5 hover:border-primary/20 transition-all"
                        >
                            <Phone size={15} className="text-primary" />
                            Call Us
                        </a>
                        <button 
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/10 hover:brightness-110 active:scale-95 transition-all"
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.name + " Mathura")}`, "_blank")}
                        >
                            <Navigation size={15} />
                            Go Now
                        </button>
                    </div>
                </motion.div>
                
                {/* Visual Hint */}
                <p className="text-center text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] opacity-40">
                    Trusted Location • Opp. Police Chowki • Secure Parking
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
