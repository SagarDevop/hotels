"use client";

import { useEffect } from 'react';
import { initPixels } from '@/lib/pixels';

/**
 * Client-side pixel initializer.
 */
const PixelInitializer = () => {
    useEffect(() => {
        initPixels();
    }, []);

    return null;
};

export default PixelInitializer;
