"use client";

import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, Clock, ChefHat } from "lucide-react";

const foodFeatures = [
  {
    icon: <Leaf size={22} />,
    title: "Pure Vegetarian",
    desc: "Fresh, satvik food prepared with care",
  },
  {
    icon: <ChefHat size={22} />,
    title: "Home-Style Cooking",
    desc: "Simple meals — just like ghar ka khana",
  },
  {
    icon: <Clock size={22} />,
    title: "Early Breakfast",
    desc: "Available early for morning temple visits",
  },
  {
    icon: <UtensilsCrossed size={22} />,
    title: "Thali Available",
    desc: "Dal, roti, sabzi, rice — complete meal",
  },
];

const Food = () => {
  return (
    <section id="food" className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
                Dining
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-text leading-tight">
                Simple & <span className="italic text-primary">Tasty Meals</span>
              </h2>
              <p className="text-text-muted text-base font-light leading-relaxed max-w-lg">
                We serve limited but fresh, home-style vegetarian food. 
                No fancy restaurant claims — just clean, wholesome meals 
                to fuel your yatra.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {foodFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 p-3.5 bg-surface rounded-xl group hover:shadow-sm transition-all"
                >
                  <div className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-0.5">{feature.title}</h4>
                    <p className="text-xs text-text-muted">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Honest Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <span className="font-semibold">🍽️ Note:</span> We focus on quality over 
                variety. Freshly prepared meals at reasonable prices. Menu may be limited 
                but everything is cooked fresh.
              </p>
            </div>
          </motion.div>

          {/* Food Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative z-10 aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img 
                src="/assets/food_thali.png"
                alt="Simple vegetarian thali — home style meals at Shri Ganga Vatika"
                className="h-full w-full object-cover"
              />
              {/* Overlay Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <h3 className="text-white font-serif text-lg mb-1">Freshly Prepared Meals</h3>
                <div className="flex flex-wrap gap-2">
                  {["Breakfast", "Lunch", "Dinner", "Snacks", "Tea/Coffee"].map(item => (
                    <span key={item} className="text-[11px] bg-white/20 text-white/90 px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Food;
