# Award-Winning Animation Techniques Implemented

## Overview
The ETH Lima Hackathon 2026 website now features professional-grade animations using industry-standard techniques found on award-winning sites. All techniques are optimized for performance and accessibility.

## 1. SVG Path Animations (stroke-dashoffset)

**What it does:** Creates flowing lines that "draw" themselves on page load.

**Implementation:**
- `AnimatedSVGDivider.tsx` - Reusable SVG component with animated flowing curves
- Uses `stroke-dasharray` and `stroke-dashoffset` CSS properties
- GSAP animates the offset to create the drawing effect
- Gradient fills add visual depth

**Usage:**
```tsx
<AnimatedSVGDivider className="my-12" animated={isMounted} />
```

**CSS:**
```css
.svg-stroke-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: stroke-draw 2.5s cubic-bezier(0.42, 0, 0.58, 1) forwards;
}
```

**Benefits:**
- No image files needed (fully scalable vector)
- Smooth, performant GPU-accelerated animation
- Works at any resolution

---

## 2. CSS mix-blend-mode: screen for Text Readability

**What it does:** Makes white/light text readable over ANY background photo without opacity loss.

**Implementation:**
- Applied to hero heading and description: `mix-blend-mode: screen`
- Dark mode uses `lighten` blend mode instead
- Text remains fully opaque while adapting to background

**CSS:**
```css
.mix-blend-screen-text {
  mix-blend-mode: screen;
  opacity: 1;
}

.dark .mix-blend-screen-text {
  mix-blend-mode: lighten;
}
```

**Benefits:**
- No color degradation compared to opacity-reduced text
- Works automatically with any background
- Professional, premium feel

---

## 3. Locomotive Scroll with Momentum Inertia

**What it does:** Adds smooth scrolling with physics-based momentum in just a few lines.

**Implementation:**
- Initialized in `layout.tsx` with dynamic import
- Respects `prefers-reduced-motion` preference
- Configuration:
  - `smooth: true` - Physics-based smooth scroll
  - `multiplier: 1.2` - Scroll speed multiplier
  - `lerp: 0.1` - Inertia/easing curve

**Code:**
```javascript
new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1.2,
  lerp: 0.1,
  class: 'is-reveal'
});
```

**Benefits:**
- Premium, natural scrolling feel
- Lightweight alternative to custom scroll effects
- Improves perceived performance

---

## 4. GSAP Timeline with staggerChildren

**What it does:** Sequences multiple elements without writing individual animations.

**Implementation:**
- Hero section: Badge → Heading → Description → Button (0.1s stagger)
- Track cards: Stagger entrance with scroll trigger
- Sponsor logos: Scale and opacity with stagger
- Timeline items: Alternate side entrance

**Pattern:**
```typescript
// Hero stagger timeline
const timeline = gsap.timeline({ defaults: { ease: "cubic.out" } });
timeline.from(badge, { opacity: 0, y: 20 }, 0);
timeline.from(heading, { opacity: 0, y: 30 }, 0.1);
timeline.from(description, { opacity: 0, y: 20 }, 0.2);
timeline.from(button, { opacity: 0, y: 20, scale: 0.95 }, 0.3);
```

**Track card stagger:**
```typescript
gsap.from(cards, {
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.1,
  ease: "cubic.out",
  scrollTrigger: {
    trigger: tracksContainerRef.current,
    start: "top 80%",
  },
});
```

**Benefits:**
- Clean, maintainable animation code
- Coordinated sequences without duplication
- ScrollTrigger integration for view-based animations

---

## 5. CSS Custom Properties (CSS Variables)

**What it does:** Centralized color and timing system for instant theme switching.

**Implementation:**
```css
:root {
  /* Easing functions */
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Timing durations */
  --duration-fast: 0.3s;
  --duration-normal: 0.5s;
  --duration-slow: 0.8s;
  --duration-epic: 2s;
  --stagger-delay: 0.1s;
  
  /* Colors - brand */
  --color-coral: #e64a30;
  --color-orange: #f18a2e;
  --color-cyan: #3dbed5;
}

.dark {
  --color-bg-val: #0b0717;
  --color-accent-val: #c7f73a;
}
```

**Benefits:**
- Single source of truth for animation timing
- Theme switching updates all colors instantly
- Easy to adjust animation speeds globally
- Better maintainability

---

## 6. CSS object-position for Responsive Image Cropping

**What it does:** Controls exactly which region of an image shows on every screen size without media queries for each breakpoint.

**Implementation:**
```css
.object-position-focus {
  object-position: 50% 30%;  /* Desktop: show top 30% */
}

@media (max-width: 768px) {
  .object-position-focus {
    object-position: 50% 40%;  /* Mobile: show middle */
  }
}

/* Utility variants */
.object-pos-center { object-position: center; }
.object-pos-top { object-position: center top; }
.object-pos-bottom { object-position: center bottom; }
```

**Applied to:**
- Hero section background images
- About section images
- Sponsor logo containers

**Benefits:**
- Perfect crop on all devices
- No image distortion
- No need for server-side image cropping

---

## 7. CSS mask-image with linear-gradient

**What it does:** Creates smooth photo edge fading without Photoshop exports.

**Implementation:**
```css
.mask-fade-horizontal {
  mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
}

.mask-fade-vertical-bottom {
  mask-image: linear-gradient(to bottom, white 60%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, white 60%, transparent);
}
```

**Applied to:**
- Sponsor marquee (horizontal fade on edges)
- Hero section (vertical fade at bottom)
- Timeline SVG lines

**Benefits:**
- Perfect gradient transparency
- No image processing needed
- Hardware accelerated
- Works with any background

---

## 8. Stagger Animation Helper Classes

**What it does:** Applies cascading entrance animations with CSS.

**Implementation:**
```css
.stagger-item {
  animation: stagger-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.stagger-item:nth-child(1) { animation-delay: 0s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.2s; }
/* ... up to 8 items */

@keyframes stagger-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Applied to:**
- Track cards
- Timeline items
- Any `.stagger-item` element

**Benefits:**
- Pure CSS animation (no JavaScript needed)
- Perfect for static content
- Automatic delay calculation
- Fallback when GSAP isn't needed

---

## 9. Premium Glass Morphism Effects

**Implementation:**
```css
.glass-premium {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.dark .glass-premium {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Applied to:**
- Card components
- Hero terminal window
- About section image container

**Benefits:**
- Modern, premium aesthetic
- Works with any background
- Hardware accelerated blur effect
- Theme-aware styling

---

## 10. Smooth Scroll Behavior

**CSS:**
```css
html {
  scroll-behavior: smooth;
}
```

**Combined with:**
- Locomotive Scroll for momentum
- Smooth scroll to anchor links
- Framer Motion for component transitions

**Benefits:**
- Professional navigation feel
- Better user experience
- Respects `prefers-reduced-motion`

---

## Performance Optimizations

1. **GPU Acceleration:**
   - Use `transform` and `opacity` for all animations
   - Avoid animating `width`, `height`, `position`
   - Example: Use `scale()` instead of width changes

2. **Lazy Loading:**
   - GSAP ScrollTrigger defers animations until elements are visible
   - `scrollTrigger.once: true` prevents re-triggering

3. **Reduced Motion Support:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     /* All animations disabled */
     animation: none !important;
     transition: none !important;
   }
   ```

4. **Code Splitting:**
   - Locomotive Scroll loaded dynamically in layout
   - GSAP plugins registered only when needed
   - Libraries only initialize on mount

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| SVG stroke-dashoffset | ✓ | ✓ | ✓ | ✓ |
| mix-blend-mode | ✓ | ✓ | ✓ | ✓ |
| Smooth scroll | ✓ | ✓ | ✓ | ✓ |
| GSAP animations | ✓ | ✓ | ✓ | ✓ |
| CSS custom properties | ✓ | ✓ | ✓ | ✓ |
| object-position | ✓ | ✓ | ✓ | ✓ |
| mask-image | ✓ | ✓ | ✓ (webkit) | ✓ |
| backdrop-filter | ✓ | ✓ | ✓ | ✓ |

---

## Files Modified/Created

### New Files
- `src/lib/animations.ts` - GSAP animation utilities and helpers
- `src/components/AnimatedSVGDivider.tsx` - Reusable SVG divider component
- `src/components/AnimatedTimeline.tsx` - Animated timeline component with scroll triggers
- `ANIMATION_TECHNIQUES.md` - This documentation

### Modified Files
- `src/app/page.tsx` - Integrated GSAP, animations, and component imports
- `src/app/layout.tsx` - Added Locomotive Scroll initialization
- `src/app/globals.css` - Added 140+ lines of animation keyframes, utilities, and CSS variables
- `package.json` - Added `gsap` and `locomotive-scroll` dependencies

---

## Quick Reference: Using These Techniques

### Add a stagger animation to any section:
```tsx
<div ref={containerRef}>
  <div className="stagger-item">Item 1</div>
  <div className="stagger-item">Item 2</div>
  <div className="stagger-item">Item 3</div>
</div>
```

### Add mix-blend-mode text:
```tsx
<h1 className="mix-blend-screen-text">
  Your heading here
</h1>
```

### Create a fade-out effect on images:
```tsx
<img 
  src="/image.jpg" 
  className="mask-fade-vertical-bottom"
/>
```

### Add custom GSAP animations:
```tsx
import { heroStaggerTimeline } from '@/lib/animations';

// In useEffect:
const timeline = heroStaggerTimeline(containerRef.current);
```

---

## Next Steps for Further Enhancement

1. **Add particle effects** - Use Tsparticles for interactive backgrounds
2. **Implement Lottie animations** - For complex illustrations
3. **Add scroll parallax** - Using GSAP parallaxScroll utility
4. **Create page transitions** - Using Framer Motion + Next.js layout animations
5. **Add sound effects** - For interaction feedback
6. **Implement infinite scrolling** - With scroll-driven animations

---

## Resources

- [GSAP Documentation](https://greensock.com/gsap/)
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/)
- [CSS mix-blend-mode MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
- [CSS mask-image MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)
- [object-position MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)

---

**Last Updated:** May 26, 2026
**Status:** Production Ready ✓
