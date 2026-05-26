'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedSVGDividerProps {
  className?: string;
  pathColor?: string;
  animated?: boolean;
}

export function AnimatedSVGDivider({ 
  className = '', 
  pathColor = 'currentColor',
  animated = true 
}: AnimatedSVGDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!animated || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',
    });
  }, [animated]);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-auto"
        style={{ minHeight: '60px' }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-val)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--color-accent-val)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent-val)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Main flowing curve */}
        <path
          ref={pathRef}
          d="M0,40 Q300,10 600,40 T1200,40 L1200,120 L0,120 Z"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Secondary accent curve */}
        <path
          d="M0,50 Q300,30 600,50 T1200,50"
          fill="none"
          stroke="var(--color-accent-val)"
          strokeWidth="1"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
