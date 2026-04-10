"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EliteLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Fast — budget audience needs speed

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } 
                    }}
                    className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center overflow-hidden pointer-events-none"
                >
                    {/* Branding */}
                    <div className="relative flex flex-col items-center gap-4">
                        {/* Saffron Circle */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center">
                                <motion.div 
                                    animate={{ 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    className="w-3 h-3 bg-primary rounded-full" 
                                />
                            </div>
                        </motion.div>

                        <div className="flex flex-col items-center gap-1">
                            <motion.h1 
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="text-text font-serif text-lg tracking-[0.1em]"
                            >
                                NAARI HOMESTAY
                            </motion.h1>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="text-[8px] uppercase tracking-[0.4em] text-primary font-semibold"
                            >
                                Home-Stays-Home • Mathura
                            </motion.span>
                        </div>
                    </div>

                    {/* Progress Line */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-primary/10 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="h-full bg-primary/40 rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EliteLoader;
