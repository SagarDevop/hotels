"use client";

import React from "react";
import { siteConfig } from "@/lib/siteConfig";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Phone, MapPin, Mail, ArrowRight, ChevronRight, Sparkles, Smartphone } from "lucide-react";

import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";



const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary text-white/70 pt-16 pb-8">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-xl font-serif tracking-[0.1em] text-white font-bold uppercase">{siteConfig.name}</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-primary-light/60">{siteConfig.tagline}</span>
            </div>
            
            <p className="text-sm font-light leading-relaxed max-w-xs text-white/50">
              Mathura&apos;s most trusted family sanctuary, offering the warmth of home 
              and the convenience of being minutes away from Lord Krishna&apos;s birthplace.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex gap-3">
              <a href={`tel:+${siteConfig.phone}`}>
                <Button variant="primary" size="sm" className="gap-2">
                  <Phone size={14} /> Call Now
                </Button>
              </a>
              <a href={`https://wa.me/${siteConfig.phone}?text=${siteConfig.whatsappMsg}`} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="sm" className="gap-2">
                  <WhatsAppIcon size={14} /> WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">Explore</span>
            <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Our Rooms', href: '#rooms' },
                  { label: 'Location', href: '#location' },
                  { label: 'Reviews', href: '#reviews' },
                  { label: 'Gallery', href: '#gallery' },
                  { label: 'FAQs', href: '#faq' },
                ].map(link => (
                    <Link key={link.label} href={link.href} className="text-sm hover:text-primary transition-colors font-light">{link.label}</Link>
                ))}
            </div>
          </div>

          {/* Nearby Places */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">Mathura Sites</span>
            <div className="flex flex-col gap-2.5">
                {siteConfig.landmarks.map(landmark => (
                    <span key={landmark.name} className="text-sm font-light">{landmark.name} ({landmark.distance})</span>
                ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">Contact Us</span>
            <div className="flex flex-col gap-4">
                <a href={`tel:+${siteConfig.phone}`} className="flex items-center gap-3 group">
                    <Smartphone size={18} className="text-primary" />
                    <span className="text-sm font-light group-hover:text-primary transition-colors">{siteConfig.phoneFormatted}</span>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
                    <Mail size={18} className="text-primary" />
                    <span className="text-sm font-light group-hover:text-primary transition-colors">{siteConfig.email}</span>
                </a>
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-light leading-relaxed">
                        {siteConfig.address}
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-widest text-white/30">
                © 2026 {siteConfig.name}, {siteConfig.location}
            </div>
            
            <div className="text-[10px] uppercase tracking-widest text-white/30">
              Premium Homestay • Safe for Families • Near Janmabhoomi
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
