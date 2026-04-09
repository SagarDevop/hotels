"use client";

import { useEffect, useRef } from 'react';
import { tracker } from '@/lib/track';

/**
 * Global Behavior Tracker
 * Monitors scroll depth, time on page, and user frustration (rage clicks).
 */
const GlobalTracker = () => {
    const scrollMarkers = useRef(new Set<number>());
    const lastClickTime = useRef(0);
    const clickCount = useRef(0);
    const lastClickPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // --- 1. Timing Heartbeats ---
        const intervals = [10, 30, 60, 180, 300]; // seconds
        const timers: NodeJS.Timeout[] = intervals.map(sec => 
            setTimeout(() => {
                tracker.track({
                    type: 'timing',
                    category: 'Engagement',
                    action: `time_on_page_${sec}s`,
                    value: sec
                });
            }, sec * 1000)
        );

        // --- 2. Scroll Depth Tracking ---
        const handleScroll = () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollPercent = Math.round((scrollTop + winHeight) / docHeight * 100);

            [25, 50, 75, 100].forEach(threshold => {
                if (scrollPercent >= threshold && !scrollMarkers.current.has(threshold)) {
                    scrollMarkers.current.add(threshold);
                    tracker.track({
                        type: 'scroll',
                        category: 'Engagement',
                        action: `scroll_depth_${threshold}%`,
                        value: threshold
                    });
                }
            });
        };

        // --- 3. Rage Click Detection ---
        const handleRageClick = (e: MouseEvent) => {
            const now = Date.now();
            const timeDiff = now - lastClickTime.current;
            const dist = Math.sqrt(
                Math.pow(e.clientX - lastClickPos.current.x, 2) + 
                Math.pow(e.clientY - lastClickPos.current.y, 2)
            );

            if (timeDiff < 500 && dist < 50) {
                clickCount.current++;
            } else {
                clickCount.current = 1;
            }

            if (clickCount.current >= 4) {
                tracker.track({
                    type: 'error',
                    category: 'UXFrustration',
                    action: 'rage_click_detected',
                    metadata: { 
                        x: e.clientX, 
                        y: e.clientY,
                        target: (e.target as HTMLElement)?.tagName || 'unknown'
                    }
                });
                clickCount.current = 0; // Reset
            }

            lastClickTime.current = now;
            lastClickPos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('click', handleRageClick, { passive: true });

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleRageClick);
        };
    }, []);

    return null; // Invisible component
};

export default GlobalTracker;
