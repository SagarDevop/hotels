"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";

import { siteConfig } from "@/lib/siteConfig";

const PHONE_NUMBER = siteConfig.phone;

const StickyMobileCTA = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${siteConfig.whatsappMsg}`;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[85] lg:hidden"
                >
                    {/* Urgency Badge */}
                    <div className="flex justify-center mb-[-12px] relative z-10 px-6">
                        <div className="bg-rose-600 text-[10px] text-white font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-rose-500 animate-pulse">
                            🔥 85% Booked for Weekend
                        </div>
                    </div>

                    <div className="bg-white/97 backdrop-blur-lg border-t border-border px-4 py-3 pt-5 pb-safe flex gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
                        <a href={`tel:+${PHONE_NUMBER}`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary py-3 rounded-xl font-black uppercase tracking-wider text-[11px] hover:bg-primary/5 transition-all">
                                <Phone size={16} />
                                Ask Availability
                            </button>
                        </a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 relative">
                            <motion.button 
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-full flex items-center justify-center gap-2 bg-whatsapp text-white py-3 rounded-xl font-black uppercase tracking-wider text-[11px] shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:brightness-110 transition-all"
                            >
                                <WhatsAppIcon size={16} />
                                Book on WhatsApp
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyMobileCTA;
