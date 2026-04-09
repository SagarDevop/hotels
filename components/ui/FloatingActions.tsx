"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Bot, Navigation } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import ConciergeChat from "@/components/ui/ConciergeChat";

import { siteConfig } from "@/lib/siteConfig";

const PHONE_NUMBER = siteConfig.phone;

const FloatingActions = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    `🙏 Namaste! I'd like to book a room at ${siteConfig.name}, Mathura. Please share availability.`
  )}`;

  const googleMapsUrl = siteConfig.mapLink;

  const actions = [
    {
      id: "directions",
      icon: <Navigation size={22} />,
      label: "Directions",
      bg: "bg-indigo-600",
      shadow: "shadow-[0_4px_16px_rgba(79,70,229,0.3)]",
      pulse: false,
      href: googleMapsUrl,
      onClick: undefined,
    },
    {
      id: "chat",
      icon: <Bot size={22} />,
      label: "Chat with Niyati",
      bg: "bg-primary",
      shadow: "shadow-[0_4px_16px_rgba(232,148,26,0.35)]",
      pulse: false,
      href: undefined,
      onClick: () => setChatOpen(true),
    },
    {
      id: "call",
      icon: <Phone size={22} />,
      label: "Call Now",
      bg: "bg-blue-600",
      shadow: "shadow-[0_4px_16px_rgba(37,99,235,0.3)]",
      pulse: false,
      href: `tel:+${PHONE_NUMBER}`,
      onClick: undefined,
    },
    {
      id: "whatsapp",
      icon: <WhatsAppIcon size={22} className="fill-white" />,
      label: "WhatsApp",
      bg: "bg-[#25D366]",
      shadow: "shadow-[0_4px_16px_rgba(37,211,102,0.35)]",
      pulse: true,
      href: whatsappUrl,
      onClick: undefined,
    },
  ];

  return (
    <>
      {/* Chat Window */}
      <ConciergeChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating Action Column — hide when chat is open to avoid overlap */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="fixed bottom-36 right-4 md:bottom-6 md:right-5 z-[90] flex flex-col items-center gap-3"
          >
          {actions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.1, type: "spring", stiffness: 400, damping: 20 }}
              className={`relative group ${action.id === "call" || action.id === "whatsapp" ? "hidden md:block" : ""}`}
            >
              {/* Tooltip — on the LEFT side */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+8px)] bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {action.label}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-secondary rotate-45" />
              </div>

              {/* Pulse ring for WhatsApp */}
              {action.pulse && (
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full ${action.bg}`}
                />
              )}

              {/* Button */}
              {action.href ? (
                <a href={action.href} target={action.id === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative w-13 h-13 rounded-full ${action.bg} ${action.shadow} text-white flex items-center justify-center cursor-pointer hover:brightness-110 transition-all`}
                  >
                    {action.icon}
                  </motion.div>
                </a>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={action.onClick}
                  className={`relative w-13 h-13 rounded-full ${action.bg} ${action.shadow} text-white flex items-center justify-center cursor-pointer hover:brightness-110 transition-all`}
                >
                  {action.icon}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;
