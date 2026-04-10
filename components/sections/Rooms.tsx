"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Users, Phone, Star, Heart, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const AUTO_PLAY_INTERVAL = 7000;

const rooms = [
  {
    id: 1,
    name: "King Deluxe Room",
    tagline: "Perfect for couples who want space, silence, and comfort after a long day of visiting temples.",
    price: "2,500",
    image: "/assets/room_king_real.jpg",
    highlight: "Most Booked",
    badgeIcon: <Star size={12} className="fill-white" />,
    size: "~280 sq ft",
    capacity: "2 Guests",
    features: ["King Bed", "Premium AC", "Free WiFi", "Smart TV", "Modern Shower"],
    bestFor: "Couples & Solo Travelers",
    scarcity: "Only 2 rooms left for this weekend!"
  },
  {
    id: 2,
    name: "Couple Deluxe Room",
    tagline: "Cozy & reliable base for spiritual seekers who prioritize peace and cleanliness at a great price.",
    price: "2,000",
    image: "/assets/room_couple_real.jpg",
    highlight: "Best for Couples",
    badgeIcon: <Heart size={12} className="fill-white" />,
    size: "~200 sq ft",
    capacity: "2 Guests",
    features: ["Double Bed", "AC", "Free WiFi", "Hot Water", "Tea Maker"],
    bestFor: "Budget-conscious Couples",
    scarcity: "8 families viewed this today"
  },
  {
    id: 3,
    name: "Family Vacation Suite",
    tagline: "Massive private home with a kitchen — so the kids can play and elders can relax without any stress.",
    price: "4,500",
    image: "/assets/room_family_real.jpg",
    highlight: "Best for Families",
    badgeIcon: <Users size={12} className="fill-white" />,
    size: "~600 sq ft",
    capacity: "6+ Guests",
    features: ["2 Bedrooms", "Private Kitchen", "Dining Area", "2 Bathrooms", "Laundry"],
    bestFor: "Large Families & Groups",
    scarcity: "Top rated for group stay"
  },
];

const Rooms = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    if (isPaused || typeof window === "undefined" || window.innerWidth >= 768) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, scroll]);

  const generateBookingMsg = (roomName: string, price: string) => {
    return encodeURIComponent(
      `Hi, I’m planning a Mathura darshan trip. I'd like to book the "${roomName}" (₹${price}/night). Please share availability & photos.`
    );
  };

  return (
    <section id="rooms" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4"
          >
            <TrendingUp size={14} className="text-primary" />
            <span className="text-primary uppercase tracking-[0.25em] text-[10px] font-bold">Stay Options</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-text leading-tight mb-4"
          >
            Rest Like <span className="italic text-primary">Family</span>
          </motion.h2>
          <p className="text-text-muted text-lg font-light">
            Each room is designed to be your quiet sanctuary. Clean, secure, and purely peaceful.
          </p>
        </div>

        <div 
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 z-20 pointer-events-none">
            <button 
              onClick={() => scroll('left')}
              className={cn(
                "w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-border transition-all pointer-events-auto",
                !canScrollLeft && "opacity-0 scale-90"
              )}
            >
              <ChevronLeft size={20} className="text-text" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={cn(
                "w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-border transition-all pointer-events-auto",
                !canScrollRight && "opacity-0 scale-90"
              )}
            >
              <ChevronRight size={20} className="text-text" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 px-2 md:px-0 snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {rooms.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-border hover:border-primary/25 shadow-sm hover:shadow-xl transition-all duration-500 min-w-[85vw] md:min-w-0 snap-center"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={room.image}
                    alt={`${room.name} at Naari Homestay`}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                      <div className="bg-primary text-white text-[11px] uppercase tracking-widest font-black flex items-center gap-2 px-4 py-2 rounded-full shadow-lg">
                          {room.badgeIcon}
                          {room.highlight}
                      </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl flex flex-col items-end">
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Starting at</span>
                      <div className="flex items-center gap-1">
                          <span className="text-2xl font-serif text-text font-black">₹{room.price}</span>
                          <span className="text-xs text-text-muted font-medium">/night</span>
                      </div>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow gap-4">
                  <div className="space-y-2">
                      <h3 className="text-2xl font-serif text-text font-bold">
                          {room.name}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed font-normal italic">
                          &ldquo;{room.tagline}&rdquo;
                      </p>
                  </div>

                  <div className="flex items-center gap-2 text-rose-500 font-bold text-[11px] uppercase tracking-wider bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                      <TrendingUp size={12} />
                      {room.scarcity}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border mt-1">
                      {room.features.slice(0, 4).map(f => (
                          <span key={f} className="text-[10px] bg-surface text-text font-bold uppercase tracking-tight px-3 py-1 rounded-lg border border-border">
                              {f}
                          </span>
                      ))}
                  </div>

                  <div className="text-[11px] text-primary space-x-2 font-black uppercase tracking-widest pt-1">
                      <span>Best for:</span>
                      <span className="text-text">{room.bestFor}</span>
                  </div>

                  <div className="mt-auto pt-6 flex gap-3">
                      <a 
                          href={`https://wa.me/${siteConfig.phone}?text=${generateBookingMsg(room.name, room.price)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                      >
                          <Button variant="whatsapp" size="md" className="w-full gap-2 text-xs font-black uppercase tracking-widest h-14 rounded-2xl">
                              <WhatsAppIcon size={16} />
                              Book Now
                          </Button>
                      </a>
                      <a href={`tel:+${siteConfig.phone}`} className="flex-shrink-0">
                          <Button variant="outline" size="md" className="h-14 w-14 p-0 rounded-2xl flex items-center justify-center">
                              <Phone size={18} />
                          </Button>
                      </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-text-muted/60 font-bold uppercase tracking-[0.1em]">
            Instant Confirmation • Group Discounts Available
        </p>
      </div>
    </section>
  );
};

export default Rooms;
