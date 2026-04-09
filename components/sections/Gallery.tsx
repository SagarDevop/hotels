"use client";

import React from "react";
import { motion } from "framer-motion";

const images = [
  { src: "/assets/gallery_room_1.jpg", alt: "King Deluxe Bedroom — Spacious & Modern", span: "row-span-2 col-span-2" },
  { src: "/assets/gallery_bath_1.jpg", alt: "Clean & Modern Bathroom", span: "col-span-1" },
  { src: "/assets/gallery_corridor.jpg", alt: "Bright Interior Corridors", span: "col-span-1" },
  { src: "/assets/gallery_room_2.jpg", alt: "Interconnected Family Suite", span: "col-span-1" },
  { src: "/assets/gallery_bath_2.jpg", alt: "Premium Bathroom Fixtures", span: "col-span-1" },
  { src: "/assets/gallery_exterior.jpg", alt: "Peaceful Neighborhood View", span: "col-span-1" },
  { src: "/assets/gallery_room_3.jpg", alt: "Cozy Couple Retreat", span: "col-span-1" },
  { src: "/assets/gallery_decor.jpg", alt: "Authentic Decor Detail", span: "col-span-2" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-20 bg-surface">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10 space-y-3">
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-bold">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-serif text-text">
              A Glimpse of <span className="italic text-primary">Your Stay</span>
            </h2>
            <p className="text-text-muted text-base font-light">
              Real photos of our hotel, rooms, food, and nearby places
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-medium">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
