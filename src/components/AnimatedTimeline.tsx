'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface AnimatedTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function AnimatedTimeline({ events, className = '' }: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !lineRef.current) return;

    const line = lineRef.current;
    const length = line.getTotalLength();

    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(line, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      duration: 1,
      ease: 'none',
    });

    // Animate timeline items
    const items = containerRef.current.querySelectorAll('[data-timeline-item]');
    items.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
          markers: false,
        },
      });
    });
  }, [events]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        ref={svgRef}
        className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 overflow-visible"
        viewBox="0 0 2 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-val)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent-val)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent-val)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={lineRef}
          d="M 1 0 L 1 1000"
          stroke="url(#timelineGradient)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative space-y-12 md:space-y-20">
        {events.map((event, i) => (
          <div
            key={i}
            data-timeline-item
            className={`flex gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Content */}
            <div className="flex-1">
              <div className="glass-card p-6">
                <time className="text-sm font-mono text-accent">
                  {event.date}
                </time>
                <h3 className="mt-2 text-xl font-bold text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-cyan-500 opacity-20 blur" />
                <div className="relative h-6 w-6 rounded-full border-2 border-accent bg-background" />
              </div>
            </div>

            {/* Spacer for odd items */}
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
