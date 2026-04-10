"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Car, UtensilsCrossed, MapPin, Wifi, CreditCard, Users, UserX, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/lib/siteConfig";

const faqs = [
  {
    icon: <Users size={18} />,
    question: "Do you allow unmarried couples?",
    answer: "To maintain a safe and comfortable environment for our family guests, we only permit families and married couples. A valid ID proof for all guests is mandatory at check-in."
  },
  {
    icon: <ShieldCheck size={18} />,
    question: "What ID proofs are accepted?",
    answer: "We accept original Aadhaar Cards, Voter IDs, or passports. Digital copies or soft copies are also acceptable for verification."
  },
  {
    icon: <Clock size={18} />,
    question: "What are the check-in and check-out timings?",
    answer: "Check-in is at 12:00 PM and check-out is at 11:00 AM. If the room is vacant, we are happy to provide early check-in for pilgrims arriving by early trains."
  },
  {
    icon: <UtensilsCrossed size={18} />,
    question: "Do you have a kitchen in the rooms?",
    answer: "Our 'Family Vacation Suite' comes with a private kitchenette, perfect for families who prefer home-cooked meals during long pilgrimage stays."
  },
  {
    icon: <MapPin size={18} />,
    question: "How far is Shri Krishna Janmabhoomi?",
    answer: "The Janmabhoomi temple is just 1.2 km away. Most of our guests prefer a quick 5-minute auto ride or a 15-minute walk through the local Mathura market."
  },
  {
    icon: <Car size={18} />,
    question: "Is safe parking available?",
    answer: "Yes, we have dedicated secure parking space right in front of the homestay. Being opposite the police chowki adds an extra layer of security for your vehicle."
  },
  {
    icon: <ShieldCheck size={18} />,
    question: "Is the location safe for families?",
    answer: "Absolutely. We are located directly opposite the Dampier Nagar Police Chowki. This is considered one of the safest and most premium residential areas in Mathura."
  },
  {
    icon: <CreditCard size={18} />,
    question: "How do I confirm my booking?",
    answer: "You can book directly via WhatsApp or Phone. No advance is required for most bookings; you can pay at the property during check-in."
  },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-5">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                    <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">Help Desk</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-text">
                        Frequently Asked <span className="italic text-primary">Questions</span>
                    </h2>
                    <p className="text-text-muted text-base font-light">
                        Clear answers to help you plan your spiritual journey
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-2.5">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                            className={cn(
                                "border rounded-xl overflow-hidden transition-all duration-300",
                                openIndex === i ? "border-primary/25 shadow-sm bg-white" : "border-border bg-surface hover:border-primary/15"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center gap-3 p-4 text-left"
                            >
                                <div className={cn(
                                    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                                    openIndex === i ? "bg-primary text-white" : "bg-primary/10 text-primary"
                                )}>
                                    {faq.icon}
                                </div>
                                <span className="flex-1 text-sm font-semibold text-text">{faq.question}</span>
                                <ChevronDown 
                                    size={16} 
                                    className={cn(
                                        "text-primary transition-transform flex-shrink-0",
                                        openIndex === i && "rotate-180"
                                    )}
                                />
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-4 pb-4 pl-16 text-sm text-text-muted leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
