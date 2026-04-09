"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Users, Phone, MessageCircle, ShieldCheck, CreditCard, Tag, X, BedDouble } from "lucide-react";
import WhatsAppIcon from "@/components/ui/icons/WhatsAppIcon";
import Button from "@/components/ui/Button";
import LuxuryCalendar from "@/components/ui/LuxuryCalendar";

import { siteConfig } from "@/lib/siteConfig";

const roomTypes = [
    { id: 1, name: "King Deluxe Room", price: "2,500" },
    { id: 2, name: "Couple Deluxe Room", price: "2,000" },
    { id: 3, name: "Family Vacation Suite", price: "4,500" },
];

const BookingBar = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [bookingData, setBookingData] = useState({
        checkIn: null as Date | null,
        checkOut: null as Date | null,
        guests: "2 Guests",
        roomType: "King Deluxe Room",
    });
    const calendarRef = useRef<HTMLDivElement>(null);

    // Close calendar on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
                setShowCalendar(false);
            }
        };
        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCalendar]);

    const formatDateLong = (date: Date | null) => {
        if (!date) return "Select Date";
        return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const handleRangeSelect = (range: { start: Date | null, end: Date | null }) => {
        setBookingData(prev => ({ ...prev, checkIn: range.start, checkOut: range.end }));
    };

    // Calculate nights
    const nights = bookingData.checkIn && bookingData.checkOut
        ? Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const selectedRoom = roomTypes.find(r => r.name === bookingData.roomType);
    const totalPrice = nights > 0 && selectedRoom ? nights * parseInt(selectedRoom.price.replace(",", "")) : 0;

    const generateWhatsAppMessage = () => {
        const checkin = bookingData.checkIn ? formatDateLong(bookingData.checkIn) : "Not selected";
        const checkout = bookingData.checkOut ? formatDateLong(bookingData.checkOut) : "Not selected";
        return encodeURIComponent(
            `🙏 Namaste! I'd like to book a room at ${siteConfig.name}, Mathura.\n\n` +
            `📅 Check-in: ${checkin}\n` +
            `📅 Check-out: ${checkout}\n` +
            `🌙 Nights: ${nights}\n` +
            `👥 Guests: ${bookingData.guests}\n` +
            `🛏️ Room: ${bookingData.roomType}\n` +
            (totalPrice > 0 ? `💰 Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}\n` : ``) +
            `\nPlease confirm availability. Dhanyavaad!`
        );
    };

    return (
        <motion.section
            id="booking"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-40 container mx-auto px-4 py-6"
        >
            <div className="bg-white shadow-lg border border-border p-5 lg:p-7 rounded-2xl relative">
                {/* Section title */}
                <div className="mb-5 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif text-text">
                        Book Your <span className="italic text-primary">Sanctuary</span>
                    </h2>
                    <p className="text-sm text-text-muted mt-1.5">Select dates & room, then confirm via WhatsApp or call</p>
                </div>

                {/* Urgency Line */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-center mb-5">
                    <span className="text-sm text-amber-800 font-medium">
                        ⚡ Limited rooms available for upcoming Vrindavan Parikrama days — Book now!
                    </span>
                </div>

                {/* ===== BOOKING FORM ===== */}
                <div className="space-y-4">
                    {/* Row 1: Check-in + Check-out */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Check-in */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest text-primary font-bold">Check-in Date</label>
                            <div
                                onClick={() => setShowCalendar(true)}
                                className="flex items-center gap-3 bg-surface p-3.5 border border-border rounded-xl cursor-pointer hover:border-primary/40 transition-all group"
                            >
                                <CalendarIcon size={18} className="text-primary group-hover:scale-110 transition-transform" />
                                <span className={`text-sm ${bookingData.checkIn ? "text-text font-medium" : "text-text-muted"}`}>
                                    {bookingData.checkIn ? formatDateLong(bookingData.checkIn) : "Select check-in date"}
                                </span>
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest text-primary font-bold">Check-out Date</label>
                            <div
                                onClick={() => setShowCalendar(true)}
                                className="flex items-center gap-3 bg-surface p-3.5 border border-border rounded-xl cursor-pointer hover:border-primary/40 transition-all group"
                            >
                                <CalendarIcon size={18} className="text-primary group-hover:scale-110 transition-transform" />
                                <span className={`text-sm ${bookingData.checkOut ? "text-text font-medium" : "text-text-muted"}`}>
                                    {bookingData.checkOut ? formatDateLong(bookingData.checkOut) : "Select check-out date"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nights badge */}
                    {nights > 0 && (
                        <div className="flex items-center justify-center">
                            <span className="text-xs bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full">
                                🌙 {nights} Night{nights > 1 ? "s" : ""} Stay
                            </span>
                        </div>
                    )}

                    {/* Row 2: Guests + Room */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Guests */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest text-primary font-bold">Guests</label>
                            <div className="flex items-center gap-3 bg-surface p-3.5 border border-border rounded-xl">
                                <Users size={18} className="text-primary" />
                                <select
                                    value={bookingData.guests}
                                    onChange={(e) => setBookingData(prev => ({ ...prev, guests: e.target.value }))}
                                    className="bg-transparent border-none outline-none text-text text-sm w-full cursor-pointer"
                                >
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                    <option>Family (4+ Guests)</option>
                                </select>
                            </div>
                        </div>

                        {/* Room Type */}
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-widest text-primary font-bold">Room Type</label>
                            <div className="flex items-center gap-3 bg-surface p-3.5 border border-border rounded-xl">
                                <BedDouble size={18} className="text-primary" />
                                <select
                                    value={bookingData.roomType}
                                    onChange={(e) => setBookingData(prev => ({ ...prev, roomType: e.target.value }))}
                                    className="bg-transparent border-none outline-none text-text text-sm w-full cursor-pointer"
                                >
                                    {roomTypes.map(r => (
                                        <option key={r.id} value={r.name}>{r.name} — ₹{r.price}/night</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Price Summary */}
                    {totalPrice > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-green-700 font-medium">Estimated Total</span>
                                <p className="text-xs text-green-600 mt-0.5">{bookingData.roomType} × {nights} night{nights > 1 ? "s" : ""}</p>
                            </div>
                            <span className="text-2xl font-serif text-green-800 font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <a
                            href={`https://wa.me/${siteConfig.phone}?text=${generateWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="whatsapp"
                                size="lg"
                                className="w-full gap-2 text-sm font-bold"
                            >
                                <WhatsAppIcon size={18} />
                                Confirm on WhatsApp
                            </Button>
                        </a>
                        <a href={`tel:+${siteConfig.phone}`}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full gap-2 text-sm font-bold"
                            >
                                <Phone size={16} />
                                Call to Book: {siteConfig.phone}
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-text-muted">
                    <span className="flex items-center gap-1 text-accent-green font-semibold">
                        <ShieldCheck size={14} /> Free Cancellation
                    </span>
                    <span className="hidden sm:block text-border">•</span>
                    <span className="flex items-center gap-1">
                        <CreditCard size={14} className="text-primary" /> Pay at Property
                    </span>
                    <span className="hidden sm:block text-border">•</span>
                    <span className="flex items-center gap-1">
                        <Tag size={14} className="text-primary" /> Best Price Direct
                    </span>
                </div>
            </div>

            {/* ===== CALENDAR OVERLAY ===== */}
            <AnimatePresence>
                {showCalendar && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-[100]"
                            onClick={() => setShowCalendar(false)}
                        />

                        {/* Calendar Modal — centered */}
                        <motion.div
                            ref={calendarRef}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[110] flex justify-center md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                        >
                            <div className="relative">
                                {/* Close button */}
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 shadow-md transition-all"
                                >
                                    <X size={14} />
                                </button>

                                <LuxuryCalendar
                                    onRangeSelect={handleRangeSelect}
                                    initialStart={bookingData.checkIn}
                                    initialEnd={bookingData.checkOut}
                                    onClose={() => setShowCalendar(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default BookingBar;
