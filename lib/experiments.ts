/**
 * A/B Testing Framework
 * Lightweight, cookie-persistent, and SSR-safe experiments.
 */
import { tracker } from './track';

export type Variant = 'A' | 'B';

export interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
  active: boolean;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'hero_messaging',
    name: 'Hero Headline & Text',
    variants: ['A', 'B'],
    active: true,
  },
  {
    id: 'hero_cta',
    name: 'Hero Call to Action',
    variants: ['A', 'B'],
    active: true,
  },
  {
    id: 'room_layout',
    name: 'Room Card Layout Style',
    variants: ['A', 'B'],
    active: true,
  },
  {
    id: 'urgency_tone',
    name: 'Urgency Message Tone',
    variants: ['A', 'B'],
    active: true,
  }
];

class ExperimentManager {
  private assignments: Record<string, Variant> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.load();
    }
  }

  private load() {
    // 1. Check for URL overrides (?test=hero_messaging:B)
    const params = new URLSearchParams(window.location.search);
    const override = params.get('test');
    if (override) {
      const [id, variant] = override.split(':');
      if (variant === 'A' || variant === 'B') {
        this.assignments[id] = variant;
        console.log(`[🧪 Experiment] Manual override for ${id}: ${variant}`);
      }
    }

    // 2. Load from cookies
    EXPERIMENTS.forEach(exp => {
      if (!this.assignments[exp.id]) {
        const cookie = this.getCookie(`exp_${exp.id}`);
        if (cookie === 'A' || cookie === 'B') {
          this.assignments[exp.id] = cookie;
        } else {
          // Assign new variant
          const assigned = Math.random() < 0.5 ? 'A' : 'B';
          this.assignments[exp.id] = assigned;
          this.setCookie(`exp_${exp.id}`, assigned, 30); // 30 days
        }
      }

      // Log exposure
      tracker.track({
        type: 'intent',
        category: 'Experiment',
        action: 'assignment',
        label: exp.id,
        metadata: { variant: this.assignments[exp.id], experiment_name: exp.name }
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`[🧪 Experiment] ${exp.name} assigned to Variant ${this.assignments[exp.id]}`);
      }
    });
  }

  public getVariant(experimentId: string): Variant {
    return this.assignments[experimentId] || 'A';
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  private setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }
}

export const experimentManager = typeof window !== 'undefined' 
  ? new ExperimentManager() 
  : { getVariant: () => 'A' } as any as ExperimentManager;
