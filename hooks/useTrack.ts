"use client";

import { useCallback, useRef, useEffect } from 'react';
import { tracker } from '@/lib/track';

/**
 * Universal tracking hook for luxury components.
 */
export const useTrack = (componentName: string) => {
  const isVisible = useRef(false);
  const startTime = useRef(0);

  // Track simple interactions
  const trackAction = useCallback((action: string, metadata?: Record<string, any>) => {
    tracker.track({
        type: 'click',
        category: componentName,
        action,
        metadata
    });
  }, [componentName]);

  // Track "Intent" (e.g. mouse enter, hover duration)
  const trackIntent = useCallback((action: string, metadata?: Record<string, any>) => {
    tracker.track({
        type: 'intent',
        category: componentName,
        action,
        metadata
    });
  }, [componentName]);

  // Track visibility duration
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            isVisible.current = true;
            startTime.current = Date.now();
            tracker.track({
                type: 'timing',
                category: componentName,
                action: 'visibility_start',
            });
        } else if (isVisible.current) {
            const duration = (Date.now() - startTime.current) / 1000;
            isVisible.current = false;
            tracker.track({
                type: 'timing',
                category: componentName,
                action: 'visibility_end',
                value: duration,
                metadata: { duration_seconds: duration }
            });
        }
    }, { threshold: 0.1 });

    // Note: This requires the component to provide a ref to observe, 
    // but for now we'll just return the tracking functions.
    // The component can call a registerRef if needed.

    return () => observer.disconnect();
  }, [componentName]);

  return { trackAction, trackIntent };
};
