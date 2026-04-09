"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Opposite Police Chowki — Extra Safe for Families",
  "Prime Dampier Nagar — No Traffic Hassle",
  "10 Min to Janmabhoomi Temple",
  "AC Rooms + Ghar Jaisa Khana"
];

const TrustStrip = () => {
  return (
    <div className="relative z-30 bg-surface border-y border-primary/10 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop: Single Row | Mobile: Horizontal Scroll */}
        <div className="flex overflow-x-auto no-scrollbar py-3 md:py-4 gap-6 md:gap-0 md:justify-between items-center whitespace-nowrap md:whitespace-normal">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 1.2, duration: 0.5 }}
              className="flex items-center gap-2.5 flex-shrink-0 md:flex-shrink"
            >
              <div className="bg-emerald-500/10 p-1 rounded-full flex-shrink-0">
                <CheckCircle2 size={16} className="text-emerald-600 font-bold" />
              </div>
              <span className="text-[11px] md:text-[13px] font-bold text-secondary uppercase tracking-wider leading-none">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
