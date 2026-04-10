"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BookingBar from "@/components/sections/BookingBar";
import Rooms from "@/components/sections/Rooms";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Story from "@/components/sections/Story";
import LocationAdvantage from "@/components/sections/LocationAdvantage";

import HeroPreviewStrip from "@/components/sections/HeroPreviewStrip";
import Amenities from "@/components/sections/Amenities";
import Food from "@/components/sections/Food";
import FAQ from "@/components/sections/FAQ";
import TrustStrip from "@/components/sections/TrustStrip";
import AfterDarshan from "@/components/sections/AfterDarshan";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

import PerfectFor from "@/components/sections/PerfectFor";
import Rules from "@/components/sections/Rules";
import HesitationBlock from "@/components/sections/HesitationBlock";
import FinalCTA from "@/components/sections/FinalCTA";
import Packages from "@/components/sections/Packages";
import Addons from "@/components/sections/Addons";
import ReferralSection from "@/components/sections/ReferralSection";
import DarshanPlanning from "@/components/sections/DarshanPlanning";
import { motion, useScroll, useSpring } from "framer-motion";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

import HighlightsMerged from "@/components/sections/HighlightsMerged";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] saffron-gradient z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* 🚀 HIGH-CONVERTING MOBILE FLOW (Phase 5) */}
      <main className="relative bg-background overflow-hidden flex-grow">
        <div className="flex flex-col">
          {/* 1. Value Proposition (Immediate Trust) */}
          <Hero />
          <TrustStrip />

          {/* 2. Selection & Urgency (Move Rooms High for Mobile) */}
          <Rooms />

          {/* 3. Social Proof (Move Reviews up to Section 3) */}
          <Reviews />

          {/* 4. The Benefit Block (Merged: Comfort, Food, Safety) */}
          <HighlightsMerged />

          {/* 5. Logistics (Map & Distance markers) */}
          <LocationAdvantage />

          {/* 6. Visual Proof (Gallery) */}
          <Gallery />

          {/* 7. Confidence & FAQ (Rules integrated into FAQ) */}
          <FAQ />
          
          {/* 8. Final Push */}
          <FinalCTA />
        </div>
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA />
    </div>
  );
}
