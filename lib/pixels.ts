/**
 * Luxury Retargeting & Pixel Manager
 * Handles Meta Pixel and Google Ads events for recovery campaigns.
 */
import { tracker } from './track';

// PLACEHOLDERS: Replace these with your actual IDs in production
const FB_PIXEL_ID = '123456789012345'; 
const GA_CONVERSION_ID = 'AW-1122334455';

export const initPixels = () => {
    if (typeof window === 'undefined') return;

    // --- Meta Pixel Base ---
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return; n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    (window as any).fbq('init', FB_PIXEL_ID);
    (window as any).fbq('track', 'PageView');

    // --- Google Ads Base ---
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONVERSION_ID}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(arguments); }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_CONVERSION_ID);
};

export const trackViewContent = (name: string, category: string, price?: number) => {
    if (typeof window === 'undefined') return;

    (window as any).fbq('track', 'ViewContent', {
        content_name: name,
        content_category: category,
        value: price,
        currency: 'USD'
    });

    (window as any).gtag('event', 'view_item', {
        items: [{ item_name: name, item_category: category, price }]
    });

    tracker.track({ type: 'intent', category: 'Pixel', action: 'ViewContent', label: name });
};

export const trackInitiateCheckout = (value?: number) => {
    if (typeof window === 'undefined') return;

    (window as any).fbq('track', 'InitiateCheckout', { value, currency: 'USD' });
    
    (window as any).gtag('event', 'begin_checkout', { value, currency: 'USD' });

    tracker.track({ type: 'conversion', category: 'Pixel', action: 'InitiateCheckout', value });
};

export const trackLead = (type: string) => {
    if (typeof window === 'undefined') return;

    (window as any).fbq('track', 'Lead', { content_name: type });

    (window as any).gtag('event', 'generate_lead', { method: type });

    tracker.track({ type: 'conversion', category: 'Pixel', action: 'Lead', label: type });
};

// Session Persistence for Personalization
export const saveIntentDates = (start: Date | null, end: Date | null) => {
    if (typeof window === 'undefined' || !start || !end) return;
    localStorage.setItem('sanctuary_intent_dates', JSON.stringify({
        start: start.toISOString(),
        end: end.toISOString()
    }));
};

export const getIntentDates = () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('sanctuary_intent_dates');
    return data ? JSON.parse(data) : null;
};
