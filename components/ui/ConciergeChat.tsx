"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Send, Phone, MessageCircle, 
  Sparkles, Calendar, Coffee, MapPin, 
  ChevronRight, BadgePercent, ShieldCheck,
  ArrowDown, Loader2
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";

const PHONE_NUMBER = siteConfig.phone;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  bookingReady?: boolean;
  whatsappUrl?: string;
}

interface ConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConciergeChat: React.FC<ConciergeProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `🙏 Namaste! Main Niyati hoon — ${siteConfig.name}, Mathura ki booking assistant.\n\nMain aapki kaise madad kar sakti hoon?\n\n• Room rates & booking\n• Janmabhoomi darshan tips\n• Family Suites with Kitchen\n• Vrindavan travel plan`,
        timestamp: new Date(),
      }]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Scroll detection
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollDown(scrollHeight - scrollTop - clientHeight > 80);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Detect booking intent for quick action buttons
  const hasBookingIntent = (text: string) => {
    const keywords = ["book", "booking", "reserve", "room", "kamra", "stay", "rukhna", "chahiye", "available", "price", "rate", "kitna"];
    return keywords.some(k => text.toLowerCase().includes(k));
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.text || "Kshama karein, kuch galat ho gaya. Kripya dubara try karein. 🙏",
        timestamp: new Date(),
        bookingReady: data.bookingReady || false,
        whatsappUrl: data.whatsappUrl || "",
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `Network issue — kripya direct call karein: ${siteConfig.phoneFormatted} 🙏`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "Room Rates", icon: "💰", msg: "Room rates kya hain?" },
    { label: "Janmabhoomi Darshan", icon: "🛕", msg: "Janmabhoomi darshan ke liye best time kya hai?" },
    { label: "Family Suite", icon: "👨‍👩‍👧‍👦", msg: "Family suite with kitchen ke baare mein batao" },
    { label: "Vrindavan Plan", icon: "🗺️", msg: "1 din ka Mathura-Vrindavan travel plan chahiye" },
  ];

  const sendQuickAction = (msg: string) => {
    setInput(msg);
    setTimeout(() => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: msg,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: msg }].map(m => ({ role: m.role, content: m.content })) }),
      })
        .then(r => r.json())
        .then(data => {
          setMessages(prev => [...prev, {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content: data.text,
            timestamp: new Date(),
            bookingReady: data.bookingReady,
            whatsappUrl: data.whatsappUrl,
          }]);
        })
        .catch(() => {
          setMessages(prev => [...prev, {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "Connection issue — kripya call karein: +91 95842 36145 🙏",
            timestamp: new Date(),
          }]);
        })
        .finally(() => setIsTyping(false));
    }, 100);
  };

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - only visible on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[200] hidden md:block"
            onClick={onClose}
          />

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className={cn(
              "fixed z-[210] flex flex-col bg-white overflow-hidden",
              // MOBILE: Full screen below status bar area
              "inset-0",
              // DESKTOP: Positioned card, away from edges & navbar
              "md:inset-auto md:bottom-6 md:right-6 md:w-[420px] md:h-[600px] md:rounded-2xl md:shadow-2xl md:border md:border-border"
            )}
          >
            {/* ===== HEADER ===== */}
            <div className="saffron-gradient px-4 py-3.5 flex items-center gap-3 relative z-10 flex-shrink-0 safe-area-top">
              {/* Close button on left for mobile feel */}
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors md:hidden"
              >
                <ArrowDown size={16} />
              </button>

              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-base flex-shrink-0">
                👩
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-serif text-sm font-bold tracking-wide">Niyati — Booking Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-[10px] font-medium">Online • {siteConfig.name}</span>
                </div>
              </div>

              {/* Desktop close */}
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 items-center justify-center text-white transition-colors hidden md:flex"
              >
                <X size={16} />
              </button>
            </div>

            {/* ===== MESSAGES AREA ===== */}
            <div 
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#FAFAF8] relative"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0 mt-1 text-xs">
                      👩
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap",
                    msg.role === "user" 
                      ? "bg-primary text-white rounded-br-sm" 
                      : "bg-white text-text border border-border rounded-bl-sm shadow-sm"
                  )}>
                    {msg.content}

                    {/* Booking Ready — Professional Buttons */}
                    {msg.bookingReady && msg.whatsappUrl && (
                      <div className="mt-4 pt-4 border-t border-green-200 space-y-2.5">
                        <p className="text-[10px] uppercase tracking-widest text-green-700 font-bold text-center">✅ Booking Confirm Karein</p>
                        <a 
                          href={msg.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 w-full py-3 px-4 bg-[#25D366] text-white rounded-xl hover:brightness-110 transition-all shadow-sm"
                        >
                          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <WhatsAppIcon size={18} className="fill-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">WhatsApp pe Confirm Karein</span>
                            <span className="text-[10px] text-white/80">{siteConfig.phoneFormatted}</span>
                          </div>
                        </a>
                        <a 
                          href={`tel:+${PHONE_NUMBER}`}
                          className="flex items-center gap-3 w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:brightness-110 transition-all shadow-sm"
                        >
                          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">Call Karke Book Karein</span>
                            <span className="text-[10px] text-white/80">{siteConfig.phoneFormatted}</span>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0 text-xs">
                    👩
                  </div>
                  <div className="bg-white text-text border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Loader2 size={13} className="text-primary animate-spin" />
                      <span className="text-[11px] text-text-muted">Niyati type kar rahi hai...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom button */}
            <AnimatePresence>
              {showScrollDown && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-primary text-white shadow-md flex items-center justify-center"
                >
                  <ArrowDown size={14} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ===== QUICK ACTIONS ===== */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-[#FAFAF8] border-t border-border flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
                {quickActions.map(a => (
                  <button
                    key={a.label}
                    onClick={() => sendQuickAction(a.msg)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white border border-border rounded-full text-[11px] font-medium text-text hover:bg-primary/5 hover:border-primary/25 transition-all whitespace-nowrap flex-shrink-0"
                  >
                    <span>{a.icon}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* ===== INPUT AREA ===== */}
            <div className="px-3 py-3 border-t border-border bg-white flex-shrink-0 safe-area-bottom">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Kuch bhi poochhein..."
                  className="flex-1 bg-[#F5F5F3] rounded-xl px-3.5 py-2.5 text-sm text-text outline-none border border-border focus:border-primary/40 transition-colors placeholder:text-text-muted/50"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0",
                    input.trim() && !isTyping
                      ? "bg-primary text-white shadow-warm-sm hover:brightness-110 cursor-pointer"
                      : "bg-[#F5F5F3] text-text-muted/40 cursor-not-allowed"
                  )}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConciergeChat;
