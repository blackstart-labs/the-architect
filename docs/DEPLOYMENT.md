# Deploy the civil-engineering portfolio

The existing SvelteKit project is preserved. The new portfolio is served at `/`.
It uses real procedural Three.js scenes, with no downloaded models or required API keys.

## Node hosting (Render, Railway, a VPS, or a container)

Requires Node 24.x.

```sh
npm ci
npm run check
npm run build
ORIGIN=https://your-domain.example HOST=0.0.0.0 PORT=3000 npm start
```

Configure the host's build command as `npm ci && npm run build`, and its start
command as `npm start`. Set `ORIGIN` to the real HTTPS public URL. The production
output is `build/`; `npm run preview` is for local testing, not production hosting.
The host must provide HTTPS. Use the platform's supplied `PORT` when available.
Set `WEB3FORMS_ACCESS_KEY` in the ignored `.env` file or your hosting provider's
private environment settings. `npm start` loads `.env` when present. Never prefix
this key with `PUBLIC_`, commit `.env`, or include it in client-side form fields.
The form posts to `/api/contact`; only the server calls Web3Forms.
The endpoint includes server validation, a spam-trap field, a provider timeout and
a bounded per-process limit of five inquiries per address per ten minutes. For
multiple instances, add a shared/edge rate limit. When using a reverse proxy,
configure adapter-node's trusted client-address header only if that proxy strips
visitor-supplied copies of the header.

`package-lock.json` is the reproducible npm deployment lockfile.

## Vercel

`svelte.config.js` selects the Vercel adapter when `VERCEL=1` (set automatically
by Vercel), and the standalone Node adapter elsewhere. `vercel.json` explicitly
selects SvelteKit and resets the output directory to automatic detection rather
than the incorrect `public` directory. Vercel builds generate `.vercel/output/`
with both static assets and a server function, including `/api/contact`.

In Vercel project settings, use the SvelteKit framework preset and Node 24.x.
Remove any Output Directory override set to `public`; do not set it to `build`
or deploy only the client files. Keep the build command as `npm run build`.

Add `WEB3FORMS_ACCESS_KEY` as a private environment variable for Production and
Preview. The Git-ignored local `.env` is intentionally not uploaded. Set
`PUBLIC_SITE_URL` to the real production origin for canonical and sharing URLs.
Do not set `ORIGIN` to a local development address on Vercel.

Reproduce and validate the deployment artifact locally:

```sh
VERCEL=1 npm run build
node scripts/check-vercel-output.mjs
```

`npm start` remains for standalone Node hosting, not Vercel serverless functions.

## Verification

```sh
npm run check
npm run test:unit -- --run
npx playwright install chromium
npm run test:e2e
npm run build
```

## Owner details and scope

- The displayed name follows the supplied reference image. Confirm it before publishing.
- No verified years, qualifications, completed-project counts, clients or approvals are claimed on the new homepage.
- All project categories and building scenes are clearly labeled representative studies.
- The model has exactly ten above-ground storeys: Ground Floor and Floors 01–09.
- Construction time is compressed. Foundation dimensions and service routes are conceptual, not construction documents.
- The real-time model is a simplified architectural study, not a photorealistic commissioned render.
- The contact form validates, disables submission while sending, and reports success only when Web3Forms returns a successful HTTP response and `success: true`. Failed submissions retain the draft. Confirm the Web3Forms recipient in the provider dashboard before publishing. Automated tests mock delivery and do not send real inquiries.
- Previous route templates remain in the repository to preserve existing work. Their URLs permanently redirect to the relevant homepage sections. Their demonstration credentials and claims are not published or included in the sitemap.
- The previous in-progress homepage is retained at `src/lib/components/LegacyHome.svelte`, not rendered at `/`.

## Experience architecture

- `src/lib/portfolio/Portfolio.svelte`: editorial homepage and contact UI.
- `stages.ts`: typed, weighted intervals for 15 construction stages and 8 interior scenes.
- `building.ts`: reusable geometry/materials and instanced repeated components.
- `scene.ts`: deterministic geometry state and explicit human-scale camera waypoints.
- `ConstructionExperience.svelte`: lazy scene initialization, ScrollTrigger synchronization, stage controls, readable summary and disposal.

The canvas renders on demand, not in an idle animation loop. The hero uses a local
optimized WebP architectural render and does not initialize another WebGL renderer.
Manrope is self-hosted. Mobile uses capped
pixel ratios and disables shadows. Reduced-motion mode shortens the scroll region;
the camera uses discrete, static stage views; the complete readable stage summary and stage selector remain available. WebGL
failure retains a lightweight visual and the same stage explanations.
