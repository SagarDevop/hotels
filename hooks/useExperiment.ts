"use client";

import { useState, useEffect } from 'react';
import { experimentManager, Variant } from '@/lib/experiments';
import { tracker } from '@/lib/track';

/**
 * Hook to access A/B testing variants.
 */
export const useExperiment = (experimentId: string): Variant => {
  const [variant, setVariant] = useState<Variant>('A');

  useEffect(() => {
    const assigned = experimentManager.getVariant(experimentId);
    setVariant(assigned);

    // Specifically track exposure to this experiment in this component
    tracker.track({
        type: 'intent',
        category: 'ExperimentExposure',
        action: experimentId,
        metadata: { variant: assigned }
    });
  }, [experimentId]);

  return variant;
};
