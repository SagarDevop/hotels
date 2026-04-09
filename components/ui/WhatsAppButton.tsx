"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";

import { siteConfig } from "@/lib/siteConfig";

const PHONE_NUMBER = siteConfig.phone;

const WhatsAppButton = () => {
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${siteConfig.whatsappMsg}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-[90] group"
            aria-label="Book via WhatsApp"
        >
            {/* Pulse Ring */}
            <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-whatsapp"
            />

            {/* Button */}
            <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-3 bg-whatsapp text-white pl-5 pr-4 py-3.5 rounded-full shadow-lg shadow-whatsapp/30 hover:shadow-xl hover:shadow-whatsapp/40 transition-shadow"
            >
                <span className="text-sm font-bold hidden sm:block">
                    Book on WhatsApp
                </span>
                <WhatsAppIcon size={22} className="fill-white" />
            </motion.div>

            {/* Mobile: Simplified icon-only */}
            <style jsx>{`
                @media (max-width: 640px) {
                    .wa-label { display: none; }
                }
            `}</style>
        </motion.a>
    );
};

export default WhatsAppButton;
