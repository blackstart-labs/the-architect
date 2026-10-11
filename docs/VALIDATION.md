# Portfolio validation

Validated locally on 11 October 2026 using Chromium and the production Node adapter.
These are laboratory checks, not field Core Web Vitals or a guarantee on mobile hardware.

## Automated checks

- Svelte / TypeScript: zero errors and warnings.
- Full Prettier / ESLint (`npm run lint`): passes.
- Unit tests: 5 files, 15 tests, including private-key handling, validation,
  rate limits, spam traps and provider failures.
- Browser tests: 17 passing tests covering metadata, redirects, 404s, dialogs, mobile
  navigation, forward/reverse scrolling, stage selection, reduced motion and WebGL failure.
- axe WCAG A/AA scan: no detected violations on the homepage. This is not a
  substitute for a complete manual accessibility assessment.
- Node production build and `npm start`: verified locally with explicit ORIGIN/HOST/PORT.

## Rendered viewport review

The reproducible `npm run audit:visual` script captures hero, projects, structural
frame, living/dining, balcony and contact at 320×720, 375×812, 390×844, 430×932,
768×1024, 1024×768, 1280×800, 1440×900 and 1920×1080. Complete-section captures
also cover expertise and footer. Screenshots and raw metrics default to
`/tmp/opencode/visual-audit/` and have been visually reviewed.

No horizontal overflow, clipped H1, broken image or browser page error was detected.
The review corrected a laptop scene/text overlap, a mobile progress-label size
error, low-contrast captions, font-swap layout shifts, and a balcony view aimed
at empty sky. Scene information has a dedicated layout track rather than covering
the building. On mobile/tablet it sits below the canvas; short landscape uses a
compact side-by-side composition.

## Performance observations

In the final local unthrottled production run, observed LCP was approximately 0.15–0.67s,
CLS 0.0002–0.008, and observed event durations reached 200ms. Event durations are
diagnostic samples, **not** a certified INP result. Real network, GPU and mobile
testing remains necessary after deployment. Initial font / hero assets are local;
the hero has responsive WebP sources. Construction code loads near the scene,
renders on demand and disposes its GPU resources. Interior shadows and mobile
shadow maps are disabled. The lazily loaded Three.js chunk still produces Vite's
500kB bundle warning; it is not included in the initial UI chunk.

## Publishing limitations

Set the real deployment origin and confirm the owner's name and role before
publishing. Web3Forms delivery uses a private environment key and server endpoint.
Confirm its recipient configuration; automated tests mock provider responses and
do not establish live email receipt. No actual deployment, credentials,
completed commissions, engineering certification or client approval is claimed.
