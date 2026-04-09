"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Wifi, Car, IndianRupee } from "lucide-react";

const highlights = [
  {
    icon: <MapPin size={26} />,
    title: "Near Janmabhoomi",
    desc: "Just 1.2 km from Shri Krishna Janmabhoomi",
  },
  {
    icon: <IndianRupee size={26} />,
    title: "Starting ₹2,000",
    desc: "Premium rooms for families & seekers",
  },
  {
    icon: <Wifi size={26} />,
    title: "AC + Free WiFi",
    desc: "High-speed internet in every room",
  },
  {
    icon: <Car size={26} />,
    title: "Safe Parking",
    desc: "Secure space right opposite Police Chowki",
  },
];

const HeroPreviewStrip = () => {
    return (
        <section className="relative z-30 -mt-16 pb-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-white/95 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-xl shadow-black/5 flex flex-col items-center text-center group hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-secondary font-bold text-sm uppercase tracking-wider mb-1">
                                {item.title}
                            </h3>
                            <p className="text-secondary/60 text-[11px] leading-tight max-w-[140px]">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroPreviewStrip;
