# 08 — Animation System

The portfolio uses a centralized motion architecture powered by **GSAP** and **GSAP ScrollTrigger**.

---

## Architectural Principles

1. **No Scroll Listeners**: Raw `window.addEventListener('scroll')` is strictly forbidden. ScrollTrigger handles scroll telemetry.
2. **GPU Properties**: Animations only target `transform` and `opacity` to maintain 60 FPS on mobile devices.
3. **Accessibility**: Respects the user's `prefers-reduced-motion` operating system setting automatically.

---

## Motion Presets (`src/lib/motion/presets.ts`)

### 1. `fadeReveal(element, delay)`

Fades an element upward into view when it enters the viewport.

### 2. `maskReveal(element, delay)`

Unmasks an element from bottom to top using dynamic CSS `clip-path`.

### 3. `staggerReveal(elements, stagger)`

Staggers an array of cards or list items with a consistent 0.1s offset.

### 4. `technicalDraw(svgElement)`

Animates technical blueprint SVG strokes as if drawn by a drafting plotter using `strokeDashoffset`.

### 5. `parallax(element, speed)`

Provides subtle vertical offset relative to scroll position.
