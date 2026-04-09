"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Utensils, Wifi, Zap, Car, Navigation, PhoneCall, Wind, Camera, Coffee, Map, CheckCircle2, Heart, Refrigerator, ShoppingBag } from "lucide-react";


const amenities = [
  { icon: <Heart size={26} />, title: "Pet Friendly", desc: "100% Pet-friendly stay. Dogs & cats are welcome here!" },
  { icon: <Refrigerator size={26} />, title: "Kitchenette", desc: "Fridge & Coffee maker available for your convenience" },
  { icon: <ShieldCheck size={26} />, title: "Enhanced Safety", desc: "Opposite Police Chowki with 24/7 CCTV & security" },
  { icon: <Zap size={26} />, title: "Full Power Backup", desc: "100% Uninterrupted backup for AC & lights" },
  { icon: <Wifi size={26} />, title: "High-speed WiFi", desc: "Wireless internet connectivity in all guest rooms" },
  { icon: <Utensils size={26} />, title: "Pure Veg Foods", desc: "Delicious, home-style 100% vegetarian meals" },
  { icon: <ShoppingBag size={26} />, title: "Grocery On-site", desc: "In-house grocery shop for your daily essentials" },
  { icon: <Car size={26} />, title: "Car & Bike Rent", desc: "Easy parking and onsite bike/scooty rentals" },
  { icon: <Navigation size={26} />, title: "Travel Desk", desc: "Rail, bus, and taxi reservations at your service" },
  { icon: <PhoneCall size={26} />, title: "24/7 Service", desc: "Round-the-clock room service and assistance" },
  { icon: <Wind size={26} />, title: "Hot & Cold Water", desc: "24-hour geyser facility in all attached bathrooms" },
  { icon: <Coffee size={26} />, title: "Welcome Tea", desc: "Fresh 'Ghar-wali Chai' on arrival — our way of saying welcome" },
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
            Homestay Amenities
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text">
            Everything You <span className="italic text-primary">Need</span>
          </h2>
          <p className="text-text-muted text-base font-light leading-relaxed">
            We ensure your stay is comfortable, safe, and feels just like home.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {amenities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-primary/8 hover:border-primary/20 hover:shadow-warm-sm transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-warm">
                {item.icon}
              </div>
              <h3 className="text-sm md:text-base font-serif text-text font-semibold mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
