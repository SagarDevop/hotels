"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Waves, Users, Wind, Compass, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface RoomDetailModalProps {
    room: any;
    isOpen: boolean;
    onClose: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, isOpen, onClose }) => {
    // Lock background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!room) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    {/* Glassmorphism Backdrop */}
                    <div 
                        className="absolute inset-0 bg-secondary/80 backdrop-blur-xl" 
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-surface/40 backdrop-blur-3xl border border-white/5 flex flex-col lg:flex-row overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
                    >
                        {/* Cinematic Image Panel (60%) */}
                        <div className="relative w-full lg:w-[60%] h-[40vh] lg:h-auto overflow-hidden">
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2 }}
                                src={room.image} 
                                alt={room.name} 
                                className="h-full w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />
                            
                            <div className="absolute top-12 left-12 hidden lg:flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-primary/80 font-bold">Reside in</span>
                                <h2 className="text-5xl font-serif text-ivory tracking-wider">{room.name}</h2>
                            </div>
                        </div>

                        {/* Content Panel (40%) */}
                        <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 overflow-y-auto no-scrollbar relative">
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute top-8 right-8 text-ivory/20 hover:text-primary transition-colors p-2"
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-10">
                                {/* Emotional Header for Mobile */}
                                <div className="lg:hidden">
                                     <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-bold">Reside in</span>
                                     <h2 className="text-3xl font-serif text-ivory mt-2">{room.name}</h2>
                                </div>

                                {/* Architect's Vision Narrative */}
                                <div className="space-y-4">
                                     <span className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-60">The Architect's Vision</span>
                                     <p className="text-lg font-light text-ivory leading-relaxed italic">
                                        "{room.experience}"
                                     </p>
                                     <p className="text-ivory/50 font-light text-sm leading-relaxed">
                                        Designed by world-renowned architects to minimize the barrier between stone and sea. Every angle is calculated to capture the turquoise horizon, while hidden acoustics preserve the sacred silence of the Maldives.
                                     </p>
                                </div>

                                {/* Detailed Amenities */}
                                <div className="space-y-6">
                                     <span className="text-[10px] uppercase tracking-widest text-primary font-bold opacity-60">Sanctuary Features</span>
                                     <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                          {(room.features || []).map((f: string) => (
                                              <div key={f} className="flex items-center gap-3 text-ivory/70 text-[11px] uppercase tracking-widest">
                                                  <CheckCircle size={12} className="text-primary/60" />
                                                  {f}
                                              </div>
                                          ))}
                                          <div className="flex items-center gap-3 text-ivory/70 text-[11px] uppercase tracking-widest">
                                              <Waves size={12} className="text-primary/60" />
                                              Lagoon Access
                                          </div>
                                          <div className="flex items-center gap-3 text-ivory/70 text-[11px] uppercase tracking-widest">
                                              <Wind size={12} className="text-primary/60" />
                                              Climate Curated
                                          </div>
                                     </div>
                                </div>

                                {/* Booking Call to Action */}
                                <div className="pt-8 border-t border-white/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-widest text-ivory/40">Sanctuary Investment</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-serif text-ivory">${room.price}</span>
                                                <span className="text-xs text-ivory/40">/ Nightly</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                             <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Status</span>
                                             <span className="text-xs text-ivory/80">{room.scarcity}</span>
                                        </div>
                                    </div>

                                    <Button variant="primary" size="xl" className="w-full flex items-center justify-center gap-4 group/btn shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                                        Secure This Sanctuary
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </Button>
                                    
                                    <p className="text-[10px] text-center uppercase tracking-widest text-ivory/20">
                                        Complimentary Seaplane & Private Butler Included
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RoomDetailModal;
