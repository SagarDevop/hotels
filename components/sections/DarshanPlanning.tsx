"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, Clock, Calendar, CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const DarshanPlanning = () => {
    return (
        <section id="planning" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-5">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-black/5 aspect-[4/5]">
                            <img 
                                src="/mathura_darshan_guide.png" 
                                alt="Local Darshan Guide at Naari Homestay"
                                className="h-full w-full object-cover"
                            />
                            
                            {/* Overlay Info */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white shadow-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Planning Available</span>
                                    </div>
                                    <h4 className="text-xl font-serif font-bold text-text mb-1">Meet Your Host Family</h4>
                                    <p className="text-xs text-text-muted italic">"We don't just host; we guide your spiritual journey."</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Right: Content Side */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-primary uppercase tracking-[0.3em] text-xs font-bold"
                            >
                                Local Intelligence
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-serif text-text leading-[1.1]"
                            >
                                Stop Googling. <br />
                                <span className="text-primary italic">Ask a Local.</span>
                            </motion.h2>
                            <p className="text-text-muted text-lg font-light leading-relaxed">
                                Avoid the tourist traps and congested routes. Our family has lived in Mathura for generations — we know the exact timings to avoid crowds and the secret paths that lead you straight to the heart of devotion.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { 
                                    icon: <Clock className="text-primary" size={24} />, 
                                    title: "Perfect Timing", 
                                    desc: "We tell you exactly when to reach for Aarti to get the best view." 
                                },
                                { 
                                    icon: <Map className="text-primary" size={24} />, 
                                    title: "Secret Paths", 
                                    desc: "Avoid the main road traffic with our local shortcut maps." 
                                },
                                { 
                                    icon: <Calendar className="text-primary" size={24} />, 
                                    title: "Custom Itinerary", 
                                    desc: "From 1-day quick trips to 3-day deep spiritual tours." 
                                },
                                { 
                                    icon: <CheckCircle className="text-primary" size={24} />, 
                                    title: "Trusted Autos", 
                                    desc: "We call the drivers we personally know and trust for your family." 
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/5 rounded-lg">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-text">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-text-muted leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="pt-6 border-t border-border"
                        >
                            <a 
                                href={`https://wa.me/${siteConfig.phone}?text=I'm staying at Naari. Can you help me plan my Mathura Darshan route?`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="bg-primary text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 group hover:brightness-110 shadow-xl shadow-primary/20 transition-all">
                                    <MessageCircle size={20} />
                                    Get My Free Darshan Plan
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>
                            <p className="mt-4 text-xs text-text-muted font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                                Available for all confirmed guests at ₹0 extra cost.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DarshanPlanning;
