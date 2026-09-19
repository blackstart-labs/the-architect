# 13 — Performance Optimization

Performance is treated as an architectural requirement. The template targets 95+ Core Web Vitals scores.

---

## 3D Optimization Techniques

1. **Procedural Geometry**:
   Initial stages generate lightweight procedural geometries instead of blocking page load with 20 MB asset downloads.

2. **Capped Pixel Ratio**:
   `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` prevents mobile GPUs from thermal throttling on high-DPI screens.

3. **Lifecycle Cleanup**:
   All WebGL contexts and geometries are explicitly disposed in `onDestroy()` via `SceneManager.dispose()`.

4. **Font Preconnects**:
   Preconnect links to Google Fonts CDN are placed in the `<head>` of `app.html` with `display=swap`.

5. **Reduced Motion**:
   When `prefers-reduced-motion` is detected, 3D camera sweeps and heavy ScrollTrigger timelines are disabled, offering clean keyboard-accessible phase selectors.
