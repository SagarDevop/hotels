"use client";

import { useEffect } from 'react';

export default function RenderAntiSleep() {
  useEffect(() => {
    // Ping immediately on load
    const ping = async () => {
      try {
        await fetch('/api/ping');
        console.log('Render Anti-Sleep Ping Success');
      } catch (err) {
        console.error('Ping failed:', err);
      }
    };

    ping();

    // Interval: 10 minutes (Render sleep starts after 15 mins of inactivity)
    const interval = setInterval(ping, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component has no UI
}
