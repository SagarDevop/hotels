"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Users, Heart, Backpack, Clock } from "lucide-react";

const perfectFor = [
  { icon: <Heart size={20} />, text: "Families seeking unmatched safety opposite a Police Chowki" },
  { icon: <Users size={20} />, text: "Long-stay pilgrims (7+ days) needing private kitchens" },
  { icon: <Clock size={20} />, text: "Visitors who want a peaceful local neighborhood stay" },
  { icon: <Backpack size={20} />, text: "Travelers who prioritize cleanliness over hotel luxury" },
];

const notFor = [
  "Those looking for a corporate hotel atmosphere",
  "Guests expecting room service bell-boys or elevators",
  "Luxury seekers needing valet parking or pools",
];

const PerfectFor = () => {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
            Stay Alignment
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-text leading-tight">
            Is Naari Homestay{" "}
            <span className="italic text-primary">Right for You?</span>
          </h2>
          <p className="text-text-muted text-base font-light">
            We value your comfort — choose us for a safe, homely spiritual stay
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Perfect For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-accent-green/20"
          >
            <h3 className="flex items-center gap-2 text-accent-green font-bold text-base mb-5">
              <CheckCircle2 size={20} />
              You&apos;ll Love Us If...
            </h3>
            <div className="space-y-4">
              {perfectFor.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="text-accent-green flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <span className="text-sm text-text leading-relaxed font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Not For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-accent-red/15"
          >
            <h3 className="flex items-center gap-2 text-accent-red font-bold text-base mb-5">
              <XCircle size={20} />
              Maybe Not For You If...
            </h3>
            <div className="space-y-4">
              {notFor.map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <XCircle size={18} className="text-accent-red/50 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-muted leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-surface rounded-lg">
              <p className="text-xs text-text-muted leading-relaxed italic">
                💡 <strong>Home-Stays-Home:</strong> We are a family-run residence, not a commercial hotel. We offer warmth and safety, not bells and whistles.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PerfectFor;
