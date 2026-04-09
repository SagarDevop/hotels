"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, MapPin, BadgePercent, CheckCircle2 } from "lucide-react";

const doubts = [
  {
    icon: <ShieldCheck className="text-primary" size={32} />,
    title: "Is it safe for families?",
    answer: "100%. We are located directly opposite a Police Chowki. Our property is gated, CCTV-monitored, and run by a local family living on-site.",
    tag: "Security First"
  },
  {
    icon: <Sparkles className="text-primary" size={32} />,
    title: "How clean are the rooms?",
    answer: "We follow 'Ghar Jaisi Safai'. Fresh linens, sanitized bathrooms, and daily housekeeping. Our 5-star reviews specifically highlight our hygiene.",
    tag: "Hygiene Guaranteed"
  },
  {
    icon: <MapPin className="text-primary" size={32} />,
    title: "Is it far from the temples?",
    answer: "We are in Dampier Nagar—the most peaceful, VIP area of Mathura. Just 10 mins from Janmabhoomi, but away from the noise and crowd congestion.",
    tag: "Prime Location"
  },
  {
    icon: <BadgePercent className="text-primary" size={32} />,
    title: "Are there hidden charges?",
    answer: "No hidden taxes or service fees. What we quote on WhatsApp is what you pay. We even offer a 'Pay at Property' option for your peace of mind.",
    tag: "Transparent Pricing"
  }
];

const HesitationBlock = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 tracking-wide uppercase"
          >
            Aapke Mann Mein Sawal?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Still Thinking? Let us clear the air.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg italic"
          >
            "Pilgrimage is about peace. We ensure nothing disturbs your spiritual journey."
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {doubts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-warm-sm border border-border/50 hover:shadow-warm-md transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-2 block">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 p-6 bg-saffron/5 border border-saffron/20 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left max-w-3xl mx-auto"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=naari${i}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-foreground font-medium">
            Join <span className="font-bold text-primary">250+ Families</span> who chose Naari this Yatra season.
          </p>
          <div className="flex items-center gap-1 text-green-600 font-bold">
            <CheckCircle2 size={18} />
            <span>Highly Trusted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HesitationBlock;
