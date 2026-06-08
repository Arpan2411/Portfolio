"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08,        // Animation interpolation factor (0.0 to 1.0)
        duration: 1.2,     // Duration of the smooth transition in seconds
        syncTouch: true    // The modern replacement for smoothTouch
      }}
    >
      {children}
    </ReactLenis>
  );
}