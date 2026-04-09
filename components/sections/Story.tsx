"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Heart, CheckCircle2, ThumbsUp, Star, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";


const trustPoints = [
  { icon: <Shield size={20} />, title: "Unmatched Safety", desc: "Located opposite dampened police chowki — Mathura's safest enclave." },
  { icon: <Heart size={20} />, title: "Home-Style Hospitality", desc: "We are a family-run stay, not a hotel. Come as a guest, stay as family." },
  { icon: <CheckCircle2 size={20} />, title: "Minutes from Shrines", desc: "Save time in traffic; Shri Krishna Janmabhoomi is just 10 mins away." },
  { icon: <ThumbsUp size={20} />, title: "Private Kitchen Suites", desc: "Cook your own meals in our family suites — perfect for long stays." },
];

const Story = () => {
    return (
        <section id="why-us" className="py-16 md:py-20 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-5">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                            <img 
                                src="/assets/exterior_real.jpg" 
                                alt="Naari Homestay — authentic premium family stay in Mathura" 
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {/* Floating Stats Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-4 -right-2 md:right-8 z-20 bg-white p-4 rounded-xl shadow-md border border-border hidden md:block"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />)}
                                </div>
                                <span className="text-base font-bold text-text">4.9</span>
                            </div>
                            <p className="text-xs text-text-muted">Mathura&apos;s most-loved family homestay</p>
                        </motion.div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="space-y-7"
                    >
                        <div className="space-y-3">
                            <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">The Naari Experience</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-text leading-tight">
                                A House Becomes a Home,{" "}
                                <span className="italic text-primary">When Family is Near</span>
                            </h2>
                            <p className="text-text-muted text-base font-light leading-relaxed max-w-xl">
                                At Naari Homestay, we don&apos;t just offer a room; we offer a sanctuary. 
                                Located in the heart of Mathura&apos;s safest neighborhood, our homestay 
                                is designed for those who seek the warmth of home while on their spiritual journey.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {trustPoints.map((point, i) => (
                                <motion.div
                                    key={point.title}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 * i }}
                                    className="flex gap-3 p-3.5 bg-white rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all group"
                                >
                                    <div className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-text mb-0.5">{point.title}</h4>
                                        <p className="text-xs text-text-muted leading-relaxed">{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Special Note */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                            <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-900/80 leading-relaxed">
                                <strong>Perfect for Long Stays:</strong> Planning a 7+ day spiritual immersion? 
                                Ask about our special long-stay rates and private kitchen access.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border">
                            <div className="text-center">
                                <span className="text-2xl font-serif text-primary font-bold">1000+</span>
                                <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mt-1">Families Hosted</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-serif text-primary font-bold">100%</span>
                                <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mt-1">Safety Record</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-serif text-primary font-bold">10m</span>
                                <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mt-1">To Janmabhoomi</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Story;
