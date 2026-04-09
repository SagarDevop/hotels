"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/lib/siteConfig";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Rooms", href: "#rooms" },
    { name: "Location", href: "#location" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-400 px-4 py-3 lg:px-10",
        isScrolled ? "bg-white/97 backdrop-blur-md border-b border-border shadow-sm py-2" : "bg-white/80 backdrop-blur-sm py-3"
      )}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-text p-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Left Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-text-muted hover:text-primary text-sm uppercase tracking-widest transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <span className="text-lg lg:text-xl font-serif tracking-[0.1em] text-text font-bold leading-tight uppercase">
            {siteConfig.name}
          </span>
          <span className="text-[8px] tracking-[0.3em] uppercase text-primary font-semibold">
            {siteConfig.tagline}
          </span>
        </Link>

        {/* Right Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-text-muted hover:text-primary text-sm uppercase tracking-widest transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-1" />
          <a href="#rooms">
            <Button variant="primary" size="sm" className="hidden xl:flex">
              Book Now
            </Button>
          </a>
        </div>

        {/* Mobile Call Icon */}
        <a href={`tel:+${siteConfig.phone}`} className="lg:hidden p-2">
          <Phone size={20} className="text-primary" />
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex flex-col">
                <span className="text-lg font-serif tracking-[0.1em] text-text font-bold uppercase">{siteConfig.name}</span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-primary font-semibold">{siteConfig.tagline}</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-text p-1">
                <X size={26} />
              </button>
            </div>
            
            <div className="flex flex-col gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif text-text hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <a href={`tel:+${siteConfig.phone}`}>
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <Phone size={18} /> Call Now
                </Button>
              </a>
              <a href={`https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full gap-2">
                  <WhatsAppIcon size={18} /> WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
