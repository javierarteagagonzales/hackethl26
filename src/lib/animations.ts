import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const heroStaggerTimeline = (container: HTMLElement) => {
  const timeline = gsap.timeline({ defaults: { ease: 'cubic.out' } });
  
  const badge = container.querySelector('[data-animate="badge"]');
  const heading = container.querySelector('[data-animate="heading"]');
  const description = container.querySelector('[data-animate="description"]');
  const button = container.querySelector('[data-animate="button"]');

  if (badge) {
    timeline.from(badge, { opacity: 0, y: 20 }, 0);
  }
  if (heading) {
    timeline.from(heading, { opacity: 0, y: 30 }, 0.1);
  }
  if (description) {
    timeline.from(description, { opacity: 0, y: 20 }, 0.2);
  }
  if (button) {
    timeline.from(button, { opacity: 0, y: 20, scale: 0.95 }, 0.3);
  }

  return timeline;
};

export const staggerChildrenTimeline = (container: HTMLElement, selector: string, stagger: number = 0.1) => {
  const timeline = gsap.timeline();
  const elements = container.querySelectorAll(selector);
  
  elements.forEach((el, i) => {
    timeline.from(el, { 
      opacity: 0, 
      y: 30,
      duration: 0.6,
      ease: 'cubic.out'
    }, i * stagger);
  });

  return timeline;
};

export const svgStrokeDashAnimation = (element: SVGPathElement, duration: number = 2) => {
  const length = element.getTotalLength();
  
  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(element, {
    strokeDashoffset: 0,
    duration: duration,
    ease: 'power2.inOut',
  });
};

export const createScrollTriggerAnimation = (
  selector: string,
  animation: (el: Element) => void,
  options?: Record<string, any>
) => {
  const elements = gsap.utils.toArray(selector) as Element[];
  
  elements.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      onEnter: () => animation(el),
      once: true,
      ...options,
    });
  });
};

export const parallaxScroll = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    scrollTrigger: {
      trigger: element,
      scrub: 1,
      markers: false,
    },
  });
};

export const countupAnimation = (element: HTMLElement, target: number, duration: number = 2) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: duration,
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toString();
    },
  });
};

// Word stagger variants for Framer Motion
export const wordStaggerVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  word: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        mass: 1,
        stiffness: 100,
      },
    },
  },
};
