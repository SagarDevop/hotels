"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";

const Reviews = () => {
    const reviews = siteConfig.reviews || [];
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % reviews.length);
    const prev = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    if (reviews.length === 0) return null;

    return (
        <section id="reviews" className="py-20 md:py-28 bg-surface-dark relative overflow-hidden">
            <div className="container mx-auto px-5">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                     <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-primary uppercase tracking-[0.3em] text-sm font-black block mb-4"
                     >
                        Verified Guest Stories
                     </motion.span>
                     <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-text leading-tight mb-6"
                     >
                        Trusted by <span className="italic text-primary">100+ Families</span>
                     </motion.h2>
                     {/* Google Rating Badge */}
                     <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-border shadow-sm">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
                        </div>
                        <span className="text-base font-black text-text">4.9/5</span>
                        <div className="w-[1px] h-4 bg-border mx-1" />
                        <span className="text-xs text-text-muted font-bold tracking-wide uppercase">Real Guest Experience</span>
                     </div>
                </div>

                {/* Review Cards (Mobile: Stacked | Desktop: Focus Single) */}
                <div className="relative max-w-4xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                        <motion.div
                            key={reviews[index].id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-primary/10 shadow-xl flex flex-col items-center text-center relative max-w-2xl"
                        >
                            {/* Quote Icon */}
                            <Quote size={40} className="text-primary/5 absolute top-10 left-10" />

                            <div className="space-y-6">
                                {/* Stars */}
                                <div className="flex gap-1 justify-center">
                                    {Array(reviews[index].rating).fill(0).map((_, s) => (
                                        <Star key={s} size={18} className="fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-lg md:text-2xl text-text leading-relaxed font-serif font-medium italic">
                                    &ldquo;{reviews[index].text}&rdquo;
                                </p>
                            </div>

                            <div className="flex flex-col items-center pt-8 mt-8 border-t border-border w-full">
                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-black text-xl mb-3 shadow-inner">
                                    {reviews[index].name[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-text flex items-center gap-2 justify-center">
                                        {reviews[index].name}
                                        <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-500/10" />
                                    </span>
                                    <span className="text-xs text-text-muted font-black tracking-widest uppercase mt-1">
                                        {reviews[index].location} • {reviews[index].tag}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center gap-4 mt-8 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:justify-between md:px-[-60px] md:pointer-events-none">
                        <button onClick={prev} className="md:pointer-events-auto p-4 bg-white border border-border rounded-full text-text-muted hover:text-primary hover:border-primary/40 shadow-lg transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={next} className="md:pointer-events-auto p-4 bg-white border border-border rounded-full text-text-muted hover:text-primary hover:border-primary/40 shadow-lg transition-all">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Proof strip */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-60">
                    {["Safe for Solo Female Travelers", "Verified by 500+ Yatra Families", "GST Tax Invoice Available"].map(proof => (
                        <div key={proof} className="flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-secondary">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            {proof}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
