"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, CreditCard, Car, ShieldCheck, Ban, UserX } from "lucide-react";

const rules = [
  {
    icon: <UserX size={20} />,
    title: "Unmarried Couples Not Allowed",
    desc: "Only families and married couples are permitted to check in.",
    important: true,
  },
  {
    icon: <CreditCard size={20} />,
    title: "Valid ID Proof Required",
    desc: "Aadhaar Card, Voter ID, or Passport required at check-in for all guests.",
    important: true,
  },
  {
    icon: <Clock size={20} />,
    title: "Check-in 12:00 PM | Check-out 11:00 AM",
    desc: "Early check-in or late check-out available on request (subject to availability).",
    important: false,
  },
  {
    icon: <Car size={20} />,
    title: "Free Parking Available",
    desc: "Spacious parking for cars, bikes, and autos. No extra charges.",
    important: false,
  },
  {
    icon: <Ban size={20} />,
    title: "No Smoking in Rooms",
    desc: "Smoking is strictly prohibited inside rooms. Designated area available outside.",
    important: false,
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Pay at Hotel",
    desc: "No advance payment needed. Pay directly at the time of check-in.",
    important: false,
  },
];

const Rules = () => {
  return (
    <section id="rules" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
            Hotel Policies
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-text leading-tight">
            Important Information{" "}
            <span className="italic text-primary">for Guests</span>
          </h2>
          <p className="text-text-muted text-base font-light">
            Please read these guidelines before booking to ensure a smooth stay
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                rule.important
                  ? "bg-amber-50 border-amber-200"
                  : "bg-white border-border hover:border-primary/20"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  rule.important
                    ? "bg-amber-100 text-amber-700"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {rule.icon}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text flex items-center gap-2">
                  {rule.title}
                  {rule.important && (
                    <AlertTriangle size={14} className="text-amber-600" />
                  )}
                </h4>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;
