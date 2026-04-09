"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, X } from "lucide-react";

const notifications = [
  { icon: <Calendar size={14} />, text: "Peak yatra season — book early for preferred rooms", label: "Season Alert" },
  { icon: <Users size={14} />, text: "4 rooms booked in the last 24 hours", label: "Activity" },
  { icon: <Calendar size={14} />, text: "Weekend rooms filling up fast — plan ahead", label: "Availability" },
];

const UrgencyToast = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Initial delay before first toast
        const initialTimer = setTimeout(() => {
            setVisible(true);
        }, 8000);

        return () => clearTimeout(initialTimer);
    }, []);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
                // Wait for exit animation before switching index
                setTimeout(() => {
                    setIndex((prev) => (prev + 1) % notifications.length);
                    // Short delay before showing the next one
                    setTimeout(() => setVisible(true), 4000);
                }, 500); 
            }, 8000); // 8 seconds display time

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className="fixed top-20 left-4 right-4 md:top-auto md:bottom-24 md:left-5 md:right-auto md:w-auto z-[80] pointer-events-none flex justify-center md:justify-start">
            <AnimatePresence mode="wait">
                {visible && (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                        }}
                        className="bg-white/95 backdrop-blur-md border border-border/50 rounded-xl flex items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)] min-w-[300px] max-w-[340px] pointer-events-auto relative overflow-hidden p-3.5"
                    >
                         {/* Progress Bar Timer */}
                         <motion.div 
                            className="absolute bottom-0 left-0 h-[3px] bg-primary/40"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 8, ease: "linear" }}
                         />

                         <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {notifications[index].icon}
                         </div>
                         <div className="flex flex-col pr-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">
                                    {notifications[index].label}
                                </span>
                                <div className="w-1 h-1 rounded-full bg-primary/30" />
                                <span className="text-[9px] text-text-muted/60 font-medium">Just now</span>
                            </div>
                            <span className="text-[13px] text-text-muted leading-snug mt-1 font-medium italic">
                                "{notifications[index].text}"
                            </span>
                         </div>
                         <button 
                            className="absolute top-2 right-2 text-text-muted/30 hover:text-primary transition-colors p-1"
                            onClick={() => setVisible(false)}
                         >
                            <X size={14} />
                         </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UrgencyToast;
