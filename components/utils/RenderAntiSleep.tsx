"use client";

import { useEffect } from 'react';

/**
 * Render's free tier spins down after 15 mins of inactivity.
 * This component pings the backend periodically to keep the instance warm
 * while any user has the website open.
 */
export default function RenderAntiSleep() {
  useEffect(() => {
    const ping = async () => {
      try {
        // Use a timestamp to prevent browser/CDN caching of the ping request
        const url = `/api/ping?t=${Date.now()}`;
        
        const response = await fetch(url, {
          cache: 'no-store',
          headers: {
            'x-ping-client': 'browser-anti-sleep'
          }
        });

        if (response.ok) {
          console.log('✅ Render Anti-Sleep: Ping successful');
        } else {
          console.warn('⚠️ Render Anti-Sleep: Ping status', response.status);
        }
      } catch (err) {
        console.error('❌ Render Anti-Sleep: Ping failed', err);
      }
    };

    // Initial ping on mount
    ping();

    // Ping every 5 minutes (well within the 15-min Render limit)
    const interval = setInterval(ping, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
