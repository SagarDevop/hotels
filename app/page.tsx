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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-background overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] saffron-gradient z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* Sections — Optimized Conversion Flow (Phase 2) */}
      <div className="flex flex-col">
        <Hero />
        <TrustStrip />

        {/* EMOTION: The 'Why' (Rest & Relief) */}
        <AfterDarshan />

        {/* LOGIC: The 'Comparison' (Obvious Choice) */}
        <WhyChooseUs />

        {/* HIGH VALUE: Bundled Packages (Phase 4) */}
        <Packages />

        {/* SELECTION: The 'Rooms' (Scarcity & Choice) */}
        <Rooms />

        {/* FEATURES: Property Amenities (Newly Added) */}
        <Amenities />

        {/* UPSELL: Enhance the Stay (Phase 4) */}
        <Addons />

        {/* LOCAL GUIDANCE: Expert Darshan Planning (Visual) */}
        <DarshanPlanning />

        {/* COMFORT: Food and Amenity Proof */}
        <Food />
        
        {/* LOGISTICS: Map & Location Advantage */}
        <LocationAdvantage />

        {/* PERSUASION: Trust & Proof */}
        <Reviews />
        <Rules />
        <FAQ />
        
        {/* VISUALS: Final Look */}
        <Gallery />

        {/* FINAL CLOSURE: Hesitation Removal & Last Push */}
        <HesitationBlock />

        {/* VIRALITY: Referral and Incentives */}
        <ReferralSection />
        
        <FinalCTA />
      </div>

      <Footer />

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA />
    </main>
  );
}
