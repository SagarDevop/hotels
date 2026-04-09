"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
    onRangeSelect: (range: { start: Date | null, end: Date | null }) => void;
    initialStart?: Date | null;
    initialEnd?: Date | null;
    onClose?: () => void;
}

const LuxuryCalendar: React.FC<CalendarProps> = ({ onRangeSelect, initialStart, initialEnd, onClose }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [startDate, setStartDate] = useState<Date | null>(initialStart || null);
    const [endDate, setEndDate] = useState<Date | null>(initialEnd || null);
    const [selecting, setSelecting] = useState<"checkin" | "checkout">("checkin");

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days: (Date | null)[] = [];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Add empty slots for days before the 1st
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }
        for (let d = 1; d <= lastDay.getDate(); d++) {
            days.push(new Date(year, month, d));
        }
        return days;
    };

    const days = getDaysInMonth(currentMonth);

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const isWithinInterval = (day: Date, start: Date, end: Date) =>
        day > start && day < end;

    const isBefore = (d1: Date, d2: Date) => d1 < d2;

    const handleDateClick = (day: Date) => {
        if (isBefore(day, today)) return;

        if (selecting === "checkin") {
            setStartDate(day);
            setEndDate(null);
            setSelecting("checkout");
            onRangeSelect({ start: day, end: null });
        } else {
            // checkout
            if (isBefore(day, startDate!)) {
                // If selected date is before check-in, reset
                setStartDate(day);
                setEndDate(null);
                setSelecting("checkout");
                onRangeSelect({ start: day, end: null });
            } else if (startDate && isSameDay(day, startDate)) {
                // Same day — set checkout to next day
                const nextDay = new Date(day);
                nextDay.setDate(nextDay.getDate() + 1);
                setEndDate(nextDay);
                setSelecting("checkin");
                onRangeSelect({ start: startDate, end: nextDay });
            } else {
                setEndDate(day);
                setSelecting("checkin");
                onRangeSelect({ start: startDate, end: day });
            }
        }
    };

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const prevMonth = () => {
        const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
            setCurrentMonth(prev);
        }
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const formatDate = (d: Date | null) => d ? d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', weekday: 'short' }) : "Select";

    // Calculate nights
    const nights = startDate && endDate
        ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    return (
        <div className="p-5 bg-white border border-border shadow-xl w-full max-w-[360px] select-none rounded-2xl">
            {/* Check-in / Check-out header tabs */}
            <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                    onClick={() => setSelecting("checkin")}
                    className={cn(
                        "flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center",
                        selecting === "checkin"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                    )}
                >
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Check-in</span>
                    <span className={cn(
                        "text-sm font-semibold",
                        startDate ? "text-text" : "text-text-muted"
                    )}>
                        {formatDate(startDate)}
                    </span>
                </button>
                <button
                    onClick={() => setSelecting("checkout")}
                    className={cn(
                        "flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center",
                        selecting === "checkout"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                    )}
                >
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Check-out</span>
                    <span className={cn(
                        "text-sm font-semibold",
                        endDate ? "text-text" : "text-text-muted"
                    )}>
                        {formatDate(endDate)}
                    </span>
                </button>
            </div>

            {/* Nights indicator */}
            {nights > 0 && (
                <div className="text-center mb-3">
                    <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
                        {nights} Night{nights > 1 ? "s" : ""}
                    </span>
                </div>
            )}

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface"
                >
                    <ChevronLeft size={18} />
                </button>
                <h3 className="text-base font-serif text-text font-semibold tracking-wide">
                    {monthName}
                </h3>
                <button
                    onClick={nextMonth}
                    className="p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-surface"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <div key={d} className="text-[9px] uppercase tracking-widest text-text-muted font-bold text-center py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, i) => {
                    if (!day) {
                        return <div key={`empty-${i}`} className="h-10" />;
                    }

                    const isStart = startDate && isSameDay(day, startDate);
                    const isEnd = endDate && isSameDay(day, endDate);
                    const isSelected = isStart || isEnd;
                    const isRange = startDate && endDate && isWithinInterval(day, startDate, endDate);
                    const isPast = isBefore(day, today);
                    const isCurrent = isSameDay(day, today);

                    return (
                        <div
                            key={day.toISOString()}
                            onClick={() => !isPast && handleDateClick(day)}
                            className={cn(
                                "h-10 flex items-center justify-center text-sm transition-all relative cursor-pointer",
                                isPast ? "opacity-25 cursor-not-allowed" : "hover:bg-primary/10",
                                // Range background
                                isRange ? "bg-primary/8" : "",
                                // Start date
                                isStart ? "bg-primary text-white font-bold rounded-l-lg" : "",
                                // End date
                                isEnd ? "bg-primary text-white font-bold rounded-r-lg" : "",
                                // Both start and end = single day
                                isStart && isEnd ? "rounded-lg" : "",
                                // Start but no end yet
                                isStart && !endDate ? "rounded-lg" : "",
                                // Regular
                                !isSelected && !isRange ? "text-text rounded-lg" : "",
                                // Today highlight
                                isCurrent && !isSelected ? "ring-2 ring-primary/30 rounded-lg font-semibold text-primary" : ""
                            )}
                        >
                            {day.getDate()}
                        </div>
                    );
                })}
            </div>

            {/* Legend + Done button */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-text-muted">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-primary rounded-sm" />
                        <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-primary/10 rounded-sm" />
                        <span>Range</span>
                    </div>
                </div>
                {startDate && endDate && onClose && (
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:brightness-110 transition-all"
                    >
                        Done ✓
                    </button>
                )}
            </div>
        </div>
    );
};

export default LuxuryCalendar;
