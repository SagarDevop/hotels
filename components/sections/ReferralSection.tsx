"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Gift, Share2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const ReferralSection = () => {
  const [referralMsg, setReferralMsg] = useState("");

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : "";
    const msg = encodeURIComponent(
      `Hi! I'm planning a trip to Mathura and found this amazing family homestay 'Naari Homestay'. They have great family packages and home-style food. Check it out: ${origin}`
    );
    setReferralMsg(msg);
  }, []);

  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-5">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-warm-sm border border-border relative overflow-hidden group">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
            <Gift size={160} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-saffron/20 border border-saffron/30 px-3 py-1 rounded-full text-saffron-dark text-[10px] font-black uppercase tracking-widest mb-6">
                <Gift size={12} />
                Spread the Peace
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-4">
                Refer a Friend, <span className="text-primary italic">Get ₹500 Off</span>
              </h2>
              <p className="text-text-muted text-lg max-w-lg mx-auto lg:mx-0 font-light">
                Spiritual journeys are better with company. Share your experience with friends and family, and we&apos;ll reward your next visit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <a 
                href={`https://wa.me/?text=${referralMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none"
              >
                <button className="w-full bg-whatsapp text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all">
                  <Share2 size={20} />
                  Share on WhatsApp
                  <ArrowRight size={16} />
                </button>
              </a>
              <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-border flex items-center gap-3 text-sm text-text-muted font-medium">
                <Users size={18} className="text-primary" />
                <span>25+ Pilgrims referred last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralSection;
