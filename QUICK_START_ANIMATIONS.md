# Quick Start: Using Award-Winning Animations

## What's Included

Your ETH Lima website now has professional-grade animations used on award-winning sites:

✓ **SVG flowing lines** - Animated SVG dividers with stroke-dashoffset  
✓ **Readable text overlays** - CSS mix-blend-mode for any background  
✓ **Smooth scrolling** - Locomotive Scroll with momentum inertia  
✓ **Staggered sequences** - GSAP timelines for coordinated animations  
✓ **Theme switching** - CSS custom properties for instant color updates  
✓ **Smart image cropping** - CSS object-position for all devices  
✓ **Edge fading** - CSS mask-image for professional photo blending  
✓ **Glass morphism** - Premium glassmorphic card effects  

---

## Using Each Animation

### 1. Add Flowing SVG Divider

```tsx
import { AnimatedSVGDivider } from '@/components/AnimatedSVGDivider';

<AnimatedSVGDivider className="my-12" animated={true} />
```

### 2. Make Text Readable Over Any Image

```tsx
<h1 className="mix-blend-screen-text">
  Your Heading
</h1>
```

This automatically works in light and dark modes!

### 3. Add Smooth Momentum Scrolling

Already enabled globally via Locomotive Scroll. Just scroll normally and feel the physics-based inertia.

### 4. Stagger Elements on Entrance

```tsx
<div className="grid gap-4">
  <div className="stagger-item">Item 1</div>
  <div className="stagger-item">Item 2</div>
  <div className="stagger-item">Item 3</div>
</div>
```

Items will animate in sequence automatically!

### 5. Use GSAP for Custom Sequences

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// In useEffect:
gsap.from(cardsRef.current, {
  opacity: 0,
  y: 30,
  stagger: 0.1,
  ease: 'cubic.out',
  scrollTrigger: {
    trigger: cardsRef.current,
    start: 'top 80%',
  },
});
```

### 6. Fade Photos at Edges

```tsx
{/* Horizontal fade (left & right) */}
<img src="/image.jpg" className="mask-fade-horizontal" />

{/* Vertical fade (bottom) */}
<img src="/image.jpg" className="mask-fade-vertical-bottom" />

{/* Custom crop point */}
<img src="/image.jpg" className="object-pos-top" />
```

### 7. Create Glass Card Effects

```tsx
<div className="glass-card p-6">
  Your content here
</div>
```

Automatically blurs background and adds premium appearance!

---

## CSS Animation Classes Reference

```css
/* Text effects */
.mix-blend-screen-text          /* Readable text over any image */

/* Image masking */
.mask-fade-horizontal           /* Fade on left & right edges */
.mask-fade-vertical-bottom      /* Fade at bottom edge */
.mask-fade-vertical-top         /* Fade at top edge */

/* Image positioning */
.object-pos-center              /* Center crop */
.object-pos-top                 /* Top crop */
.object-pos-bottom              /* Bottom crop */
.object-pos-left                /* Left crop */
.object-pos-right               /* Right crop */
.object-position-focus          /* Smart responsive crop */

/* Glass effects */
.glass-card                     /* Existing glass effect */
.glass-premium                  /* Enhanced glass with more blur */

/* Animations */
.stagger-item                   /* CSS-based stagger animation */
.svg-stroke-draw                /* SVG drawing animation */
.live-dot                       /* Pulsing status indicator */

/* Patterns */
.pattern-dots                   /* Subtle dot background */
.pattern-grid                   /* Grid line background */

/* Gradients */
.text-gradient-sunset           /* Coral → Teal gradient text */
.text-gradient-bootcamp         /* Lime → Blue gradient text */
.bg-gradient-sunset             /* Background gradient */
.bg-gradient-bootcamp           /* Background gradient */

/* Premium effects */
.nav-link-premium               /* Animated underline on hover */
.vibrant-border                 /* Gradient border effect */
```

---

## CSS Custom Properties (Variables)

```css
/* Available in :root for custom animations */

/* Easing functions */
--ease-smooth         /* cubic-bezier(0.22, 1, 0.36, 1) */
--ease-bounce         /* cubic-bezier(0.34, 1.56, 0.64, 1) */
--ease-power-in       /* cubic-bezier(0.42, 0, 1, 1) */
--ease-power-out      /* cubic-bezier(0, 0, 0.58, 1) */

/* Timing durations */
--duration-fast       /* 0.3s */
--duration-normal     /* 0.5s */
--duration-slow       /* 0.8s */
--duration-epic       /* 2s */
--stagger-delay       /* 0.1s */

/* Colors (brand) */
--color-coral         /* #e64a30 */
--color-orange        /* #f18a2e */
--color-cyan          /* #3dbed5 */
--color-teal          /* #2ca89f */
--color-ink           /* #0b0717 */
--color-cream         /* #fff8ee */

/* Theme colors */
--color-bg-val        /* Dynamic background color */
--color-fg-val        /* Dynamic foreground color */
--color-accent-val    /* Dynamic accent color */

/* Glass effects */
--glass-bg            /* Glassmorphic background */
--glass-border        /* Glassmorphic border */
--glass-hover-border  /* Hover state border */
```

---

## Animation Performance Tips

1. **Use GSAP for complex sequences**
   - Timeline for coordinating multiple elements
   - ScrollTrigger for scroll-based animations

2. **Use CSS for simple effects**
   - Stagger items with `.stagger-item`
   - One-off effects with keyframe animations
   - Always prefer `transform` and `opacity`

3. **Respect user preferences**
   - All animations respect `prefers-reduced-motion`
   - Automatically disabled for accessibility

4. **Optimize images**
   - Use `object-position` instead of cropping images
   - Use `mask-image` instead of Photoshop fades
   - Lazy load images when possible

---

## Accessibility

All animations:
- ✓ Respect `prefers-reduced-motion` setting
- ✓ Don't interfere with keyboard navigation
- ✓ Maintain color contrast ratios
- ✓ Include proper ARIA labels
- ✓ Work without JavaScript

To disable animations for a user:

```css
/* Add to individual elements */
@media (prefers-reduced-motion: reduce) {
  .your-element {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Browser Compatibility

All techniques work in:
- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

WebKit prefix automatically applied to `mask-image` and backdrop-filter.

---

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Main page with animations
│   ├── layout.tsx            # Locomotive Scroll initialization
│   └── globals.css           # All animation keyframes & utilities
├── components/
│   ├── AnimatedSVGDivider.tsx   # SVG divider component
│   └── AnimatedTimeline.tsx     # Timeline component with scroll triggers
└── lib/
    └── animations.ts          # GSAP utilities & helpers

ANIMATION_TECHNIQUES.md         # Detailed documentation
QUICK_START_ANIMATIONS.md      # This file
```

---

## Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.12.0",           // Animation library
    "locomotive-scroll": "^4.1.0" // Scroll library
  }
}
```

Both are already installed and ready to use!

---

## Next: Add Your Own Animations

1. **Simple CSS animation:**
   ```css
   @keyframes fadeInUp {
     from { opacity: 0; transform: translateY(20px); }
     to { opacity: 1; transform: translateY(0); }
   }
   
   .my-element {
     animation: fadeInUp 0.6s var(--ease-smooth);
   }
   ```

2. **GSAP animation:**
   ```ts
   import gsap from 'gsap';
   
   gsap.to('.my-element', {
     duration: 1,
     rotation: 360,
     ease: 'back.out'
   });
   ```

3. **Scroll-triggered animation:**
   ```ts
   gsap.from('.my-element', {
     opacity: 0,
     scrollTrigger: {
       trigger: '.my-element',
       start: 'top 80%',
     }
   });
   ```

---

## Troubleshooting

**Animations not running?**
- Check that `isMounted` is true in your component
- Verify ScrollTrigger is registered with `gsap.registerPlugin(ScrollTrigger)`
- Check browser console for errors

**Text not readable over image?**
- Ensure `.mix-blend-screen-text` is applied
- Check that text color is light enough
- Verify image has enough contrast

**Smooth scroll not working?**
- Locomotive Scroll initializes on mount
- Check that page has enough content to scroll
- Verify no CSS conflicts with `scroll-behavior`

**Performance issues?**
- Reduce number of animated elements
- Use `once: true` in ScrollTrigger to animate only once
- Check that animations use `transform` and `opacity`
- Profile in DevTools Performance tab

---

## Resources

- 📚 [ANIMATION_TECHNIQUES.md](./ANIMATION_TECHNIQUES.md) - Full documentation
- 🎨 [GSAP Documentation](https://greensock.com/gsap/)
- 🚂 [Locomotive Scroll Docs](https://locomotivemtl.github.io/locomotive-scroll/)
- 📖 [MDN CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- ♿ [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Need help?** Check ANIMATION_TECHNIQUES.md for detailed examples and explanations of each technique.

Last Updated: May 26, 2026
