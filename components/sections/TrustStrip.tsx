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
        {/* Mobile: Grid | Desktop: Row */}
        <div className="flex flex-wrap md:flex-row py-3 md:py-4 gap-y-2 gap-x-4 justify-center md:justify-between items-center text-center">
          {trustPoints.slice(0, 3).map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.5 }}
              className="flex items-center gap-1.5"
            >
              <div className="bg-emerald-500/10 p-1 rounded-full flex-shrink-0">
                <CheckCircle2 size={12} className="text-emerald-600 font-bold" />
              </div>
              <span className="text-[9px] md:text-[12px] font-black text-secondary uppercase tracking-tighter md:tracking-wider leading-none">
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
