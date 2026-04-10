import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds

const Reviews = () => {
    const reviews = siteConfig.reviews || [];
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % reviews.length);
        setProgress(0);
    }, [reviews.length]);

    const prev = useCallback(() => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        setProgress(0);
    }, [reviews.length]);

    // Auto-play logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            next();
        }, AUTO_PLAY_INTERVAL);

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + (100 / (AUTO_PLAY_INTERVAL / 100)), 100));
        }, 100);

        return () => {
            clearInterval(interval);
            clearInterval(progressInterval);
        };
    }, [isPaused, next]);

    if (reviews.length === 0) return null;

    return (
        <section id="reviews" className="py-20 md:py-32 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[100px] -ml-20 -mb-20" />

            <div className="container mx-auto px-5 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20"
                     >
                        Honest Guest Reviews
                     </motion.div>
                     <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif text-text leading-tight mb-8"
                     >
                        What Families <br /> 
                        <span className="italic text-primary">Say About Us</span>
                     </motion.h2>

                     {/* Premium Rating Badge */}
                     <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-border">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
                            <div className="flex flex-col items-start leading-none">
                                <div className="flex gap-1 mb-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-500 text-yellow-500" />)}
                                </div>
                                <span className="text-sm font-black text-text">4.9/5 Rating</span>
                            </div>
                            <div className="w-[1px] h-8 bg-border" />
                            <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase">180+ Reviews</span>
                        </div>
                     </div>
                </div>

                {/* Main Carousel Wrapper */}
                <div 
                    className="relative max-w-5xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="min-h-[420px] md:min-h-[460px] flex items-center justify-center pt-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                <div className="grid md:grid-cols-5 gap-0 md:gap-8 items-stretch bg-white rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-border/50">
                                    {/* Left: Real Face Image */}
                                    <div className="md:col-span-2 relative h-[250px] md:h-full min-h-[300px]">
                                        <img 
                                            src={reviews[index].image} 
                                            alt={reviews[index].name} 
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                                        
                                        {/* Status Badge */}
                                        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Stay Verified</span>
                                        </div>
                                    </div>

                                    {/* Right: Content Section */}
                                    <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-between bg-gradient-to-br from-white to-primary/5">
                                        <div className="space-y-8">
                                            <Quote size={48} className="text-primary/10 mb-[-20px] md:mb-[-40px]" />
                                            
                                            <p className="text-xl md:text-2xl text-text leading-relaxed font-serif italic relative z-10">
                                                &ldquo;{reviews[index].text}&rdquo;
                                            </p>

                                            <div className="flex gap-1">
                                                {Array(reviews[index].rating).fill(0).map((_, s) => (
                                                    <Star key={s} size={16} className="fill-yellow-500 text-yellow-500" />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between mt-12 pt-8 border-t border-border/50">
                                            <div>
                                                <h4 className="text-xl font-bold text-text flex items-center gap-2">
                                                    {reviews[index].name}
                                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                                </h4>
                                                <p className="text-[11px] text-text-muted font-black tracking-[0.2em] uppercase mt-1">
                                                    {reviews[index].location} • {reviews[index].tag}
                                                </p>
                                            </div>
                                            
                                            {/* Progress Bar (Timer) */}
                                            <div className="hidden md:block w-32 h-1 bg-border/30 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-primary"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Overlays */}
                    <div className="absolute top-[85%] md:top-1/2 left-0 right-0 md:-translate-y-1/2 flex justify-center md:justify-between px-6 md:px-[-40px] gap-4 z-20">
                        <button 
                            onClick={prev} 
                            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border border-border rounded-full shadow-xl text-text hover:text-primary hover:border-primary/50 transition-all active:scale-95"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={next} 
                            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border border-border rounded-full shadow-xl text-text hover:text-primary hover:border-primary/50 transition-all active:scale-95"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Trust Ticker (Mobile optimized) */}
                <div className="mt-20 py-8 border-y border-border/50 flex flex-wrap justify-center gap-x-12 gap-y-6">
                    {[
                        { label: "Families Only", icon: <CheckCircle2 size={16} /> },
                        { label: "100% Secure", icon: <CheckCircle2 size={16} /> },
                        { label: "Ghar ka Khana", icon: <Star size={14} className="fill-current" /> },
                        { label: "Safe for Women", icon: <CheckCircle2 size={16} /> }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/80">
                            <span className="text-emerald-600">{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
