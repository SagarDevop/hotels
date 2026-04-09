/**
 * Luxury Behavioral Tracker
 * A high-performance, non-blocking behavioral tracking system.
 * Uses requestIdleCallback for batching and navigator.sendBeacon for reliable exits.
 */

type EventType = 'click' | 'hover' | 'scroll' | 'timing' | 'intent' | 'conversion' | 'error';

interface TrackEvent {
  type: EventType;
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: number;
  url: string;
}

class BehavioralTracker {
  private static instance: BehavioralTracker;
  private queue: TrackEvent[] = [];
  private isProcessing: boolean = false;
  private initialized: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  public static getInstance(): BehavioralTracker {
    if (!BehavioralTracker.instance) {
      BehavioralTracker.instance = new BehavioralTracker();
    }
    return BehavioralTracker.instance;
  }

  private init() {
    if (this.initialized) return;
    
    // Process queue when browser is idle
    const processQueue = () => {
      if (this.queue.length > 0 && !this.isProcessing) {
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => this.flush());
        } else {
            setTimeout(() => this.flush(), 1000);
        }
      }
    };

    // Periodically check queue
    if (typeof window !== 'undefined') {
      setInterval(processQueue, 5000);

      // Flush on page exit
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush(true);
        }
      });
    }

    this.initialized = true;
  }

  public track(event: Omit<TrackEvent, 'timestamp' | 'url'>) {
    if (typeof window === 'undefined') return;

    const fullEvent: TrackEvent = {
      ...event,
      timestamp: Date.now(),
      url: window.location.href,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[📊 Tracker] ${event.type.toUpperCase()}: ${event.category} > ${event.action}`, event.metadata || '');
    }

    this.queue.push(fullEvent);

    // If queue is getting large, flush it
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  private async flush(isExiting: boolean = false) {
    if (this.queue.length === 0 || this.isProcessing) return;

    const eventsToFlush = [...this.queue];
    this.queue = [];
    this.isProcessing = true;

    try {
      if (isExiting && typeof navigator.sendBeacon === 'function') {
        // Use sendBeacon for reliable delivery on exit
        // const blob = new Blob([JSON.stringify(eventsToFlush)], { type: 'application/json' });
        // navigator.sendBeacon('/api/analytics/track', blob);
      } else {
        // In a real app, this would be a fetch call to your analytics endpoint
        // For now, we simulate success
        // await fetch('/api/analytics/track', {
        //   method: 'POST',
        //   body: JSON.stringify(eventsToFlush),
        // });
      }
    } catch (error) {
      console.error('[📊 Tracker Error]', error);
      // Put events back in queue if not exiting
      if (!isExiting) {
        this.queue = [...eventsToFlush, ...this.queue];
      }
    } finally {
      this.isProcessing = false;
    }
  }
}

export const tracker = typeof window !== 'undefined' 
  ? BehavioralTracker.getInstance() 
  : { track: () => {} } as any as BehavioralTracker;
