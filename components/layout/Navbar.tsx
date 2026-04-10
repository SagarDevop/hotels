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
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hydration Guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Robust Scroll Lock & Stacking Context Elevation
  useEffect(() => {
    const main = document.querySelector('main');
    const html = document.documentElement;
    const body = document.body;

    if (mobileMenuOpen) {
      // Lock Body
      body.classList.add('menu-open'); // Trigger CSS overrides
      body.style.overflow = 'hidden';
      body.style.height = '100dvh';
      body.style.touchAction = 'none';
      html.style.overflow = 'hidden';
      
      // Force 'main' container to win the stacking context war
      if (main) {
        main.style.zIndex = '2000';
        main.style.position = 'relative';
      }
    } else {
      // Restore
      body.classList.remove('menu-open');
      body.style.overflow = '';
      body.style.height = '';
      body.style.touchAction = '';
      html.style.overflow = '';
      if (main) {
        main.style.zIndex = '';
      }
    }

    return () => {
      body.classList.remove('menu-open');
      body.style.overflow = '';
      body.style.height = '';
      body.style.touchAction = '';
      html.style.overflow = '';
      if (main) main.style.zIndex = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update isScrolled
      setIsScrolled(currentScrollY > 50);

      // Handle visibility (Hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Rooms", href: "#rooms" },
    { name: "Location", href: "#location" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  // Safety guard: Hidden until mounted to prevent flash, but ALWAYS render structural div
  return (
    <div className={cn("contents", !mounted && "invisible")}>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full px-4 py-3 lg:px-10 transition-all duration-500",
          mobileMenuOpen ? "z-[5001] opacity-0" : "z-[4000]",
          isVisible ? "nav-visible" : "nav-hidden",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-md py-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button 
            id="mobile-menu-toggle"
            className="lg:hidden flex items-center gap-2 text-text p-2 -ml-2 relative z-[5002] pointer-events-auto group"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-surface border border-border/50 rounded-full shadow-sm group-hover:bg-ivory transition-colors">
              <Menu size={20} className="text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mt-0.5">Menu</span>
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
            <span className="text-lg lg:text-xl font-serif tracking-[0.1em] text-text font-bold leading-tight uppercase text-center">
              {siteConfig.name}
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-primary font-black">
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
          <div className="lg:hidden flex items-center gap-2">
            <a href={`tel:+${siteConfig.phone}`} className="p-2 w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
              <Phone size={18} className="text-primary" />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop for click-to-close */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[5004]"
            />
            
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 150 }}
              className="fixed inset-y-0 left-0 w-[90%] max-w-[400px] z-[5005] bg-surface flex flex-col p-6 md:p-12 shadow-2xl overflow-y-auto"
              style={{ backgroundColor: '#FFF7ED' }}
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <span className="text-2xl font-serif tracking-[0.05em] text-text font-bold uppercase leading-tight">
                    {siteConfig.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-4 h-px bg-primary" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-primary font-black">
                      {siteConfig.tagline.split('•')[1] || siteConfig.tagline}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center bg-white border border-border rounded-full text-text shadow-sm transition-all active:scale-90 hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-4xl font-serif text-text hover:text-primary transition-all duration-300 flex items-center justify-between group py-2 border-b border-border/30"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[10px] font-sans font-black text-primary/40 mt-1 italic">0{i+1}</span>
                        {link.name}
                      </span>
                      <motion.span 
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4"
                >
                  <a href="#rooms" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="lg" className="w-full h-16 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-warm-lg btn-saffron-hover">
                      Book Your Stay Now
                    </Button>
                  </a>
                </motion.div>
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-5 border-t border-border/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-black">Quick Assistance</span>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-text">{siteConfig.phoneFormatted}</span>
                    <span className="text-[10px] text-text-muted">Available 24/7 for pilgrims</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <a href={`tel:+${siteConfig.phone}`} className="flex-1">
                    <Button variant="outline" size="lg" className="w-full gap-2 h-14 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border-2 bg-white">
                      <Phone size={14} className="text-primary" /> Call
                    </Button>
                  </a>
                  <a href={`https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="whatsapp" size="lg" className="w-full gap-2 h-14 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm">
                      <WhatsAppIcon size={14} /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

  );
};

export default Navbar;
