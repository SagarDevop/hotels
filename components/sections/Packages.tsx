"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Users, MapPin, Coffee, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const Packages = () => {
    return (
        <section id="packages" className="py-24 bg-surface/50 relative overflow-hidden">
            <div className="container mx-auto px-5 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary uppercase tracking-[0.3em] text-xs font-bold bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-4"
                    >
                        Special Offers
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-text leading-tight mb-4"
                    >
                        Stress-Free <span className="italic text-primary">Yatra Packages</span>
                    </motion.h2>
                    <p className="text-text-muted text-lg font-light">
                        Hand-crafted experiences to make your pilgrimage smooth, spiritual, and valuable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {siteConfig.packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-border hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative group"
                        >
                            {idx === 0 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-saffron text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg z-20">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-serif font-bold text-text mb-2 group-hover:text-primary transition-colors">
                                    {pkg.name}
                                </h3>
                                <p className="text-text-muted italic text-sm">{pkg.desc}</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {pkg.includes.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-50 text-green-600 p-1 rounded-full">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-text/80 text-sm font-medium leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-border mt-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Special Price</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-serif font-black text-text">₹{pkg.price}</span>
                                            <span className="text-xs text-text-muted font-medium">all-inc*</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-surface rounded-2xl border border-border italic text-[10px] text-primary font-bold uppercase tracking-tighter">
                                        For: {pkg.bestFor}
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/${siteConfig.phone}?text=Hi, I'm interested in the "${pkg.name}" (₹${pkg.price}). Please share more details.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className="w-full bg-whatsapp text-white py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 shadow-lg hover:brightness-110 active:scale-95 transition-all">
                                        <MessageCircle size={18} />
                                        Inquire on WhatsApp
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-text-muted max-w-xl mx-auto text-sm italic">
                        &ldquo;We take care of the logistics (food, transport, paths) so you can focus entirely on your prayer and devotion.&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Packages;
