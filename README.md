# The Architect · Civil Engineering Portfolio

The current homepage is a Bangladesh-focused editorial portfolio with a real,
scroll-controlled Three.js residential construction study: **15 construction stages,
10 above-ground floors (Ground + 01–09), and 8 interior-to-exterior scenes**.

**Deployment:** see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Use Node 24.x,
`npm ci`, `npm run build`, and `ORIGIN=https://your-domain.example npm start`.

All current homepage projects are representative studies. The inquiry form submits
through a server-side Web3Forms endpoint, using `WEB3FORMS_ACCESS_KEY` from `.env`.
The access key is not shipped to the browser. Prior template pages and their
content are retained below for historical context, not as verified owner credentials.

The active design system is documented in [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).
Validation results and limitations are in [docs/VALIDATION.md](docs/VALIDATION.md).
Run `npm run check`, `npm run lint`, and `npm test` for automated checks.
With a running production server, `AUDIT_URL=http://localhost:3000 npm run audit:visual`
captures all nine responsive viewport sizes. Legacy template URLs redirect to
the relevant homepage sections; the active hero uses responsive local WebP images.

---

## Previous template documentation (archived)

> High-performance structural engineering and architectural studio portfolio featuring an interactive, scroll-driven 3D WebGL construction lifecycle of **Dhaka Central Mall** (Gulshan Avenue, Dhaka, Bangladesh).

[![Built with SvelteKit](https://img.shields.io/badge/SvelteKit_2-Svelte_5_Runes-FF3E00?style=flat-square&logo=svelte)](https://svelte.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_Engine-0496FF?style=flat-square&logo=three.js)](https://threejs.org/)
[![GSAP 3](https://img.shields.io/badge/GSAP_3-ScrollTrigger-88CE02?style=flat-square&logo=greensock)](https://greensock.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS_v4-Styling-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Code Compliance](https://img.shields.io/badge/Codes-BNBC_2020_%7C_RAJUK_%7C_ACI_318-E5A93C?style=flat-square)](#engineering-standards--compliance)
[![Tests](https://img.shields.io/badge/Tests-Vitest_%2B_Playwright-brightgreen?style=flat-square)](#quality-assurance--testing)

---

## Overview

**The Architect** is a digital portfolio for a Chartered Civil & Structural Engineer (PE, FIEB, CEng) enlisted with RAJUK and the Institution of Engineers, Bangladesh (IEB).

The flagship centerpiece is an interactive **13-stage scroll-driven 3D construction simulation** of **Dhaka Central Mall**—a 7-story contemporary commercial development at Gulshan Avenue, Dhaka. Users scrub through the entire lifecycle of a complex urban project, from initial geodetic surveying and deep bored piling to post-tensioned slab casting, curtain wall solar brise-soleil installation, MEP chiller commissioning, and grand public opening.

---

## Signature 3D Construction Experience

Built with **Three.js** and **GSAP ScrollTrigger**, the simulation renders at 60 FPS with zero external model dependencies via custom procedural geometries:

- **Centripetal Catmull-Rom Camera Flight Spline**: Smooth, continuous $C^1$ flight trajectory eliminating camera lateral whiplash, jerk, and velocity dead-zones.
- **Synchronized Inertial Damping**: Tight GSAP scrub damping coupled with Three.js exponential vector lerping (`0.12` factor) for buttery, physical responsiveness.
- **Exploded Multidisciplinary BIM View (Stage 04)**: Real-time procedural vertical separation of structural slabs, moment-resisting RCC frames, glass curtain walls, and internal MEP services.
- **Subterranean Excavation & Bored Piling (Stages 05–06)**: Dynamic earth retention cut down to `-5.500m` formation level, displaying a 4×4 grid of Ø1,000mm bored cast-in-place concrete piles, rebar cages, and monolithic raft caps.
- **Curtain Wall Facade & Solar Brise-Soleil (Stage 09)**: Double-glazed Low-E structural curtain wall with vertical champagne/bronze aluminum sun louvers engineered for Dhaka’s high solar angles.
- **MEP X-Ray Transparency Mode (Stage 10)**: Real-time envelope transparency reveals ceiling chilled-water ductwork, fire suppression manifolds, and rooftop crossflow cooling towers.
- **Interior Public Atrium & Escalators Walkthrough (Stage 11)**: First-person camera flight through the grand multi-level atrium, showcasing crisscrossing commercial escalators, glass balustrades, polished terrazzo floors, and retail shopfronts.
- **Civic Entrance Forecourt & Plaza (Stage 12)**: Vehicular drop-off driveway, security bollards, granite interlocking pavers, and tropical Dhaka street trees.
- **Twilight Commissioning & Handover (Stage 13)**: Architectural golden-hour to dusk lighting transition with circadian retail illumination and warm facade floodlights.
- **Architectural Telemetry HUD & Stepper Rail**: Fixed non-blocking telemetry card displaying geodetic datums, engineering tolerances, and an interactive 13-stage scrubber rail.

---

## 13 Construction Stages Summary

| Stage  | Milestone Name                              |      Elevation Datum      | Key Technical Metric / Tolerance                 |
| :----: | :------------------------------------------ | :-----------------------: | :----------------------------------------------- |
| **01** | **Site Survey & Dhaka Urban Context**       |      `+0.000m DATUM`      | Boundary: 3,850 m² Commercial Plot (Tol: ±5mm)   |
| **02** | **Topographic Survey & Control Datum**      |    `+1.850m BENCHMARK`    | Datum Closure: 1:50,000 Geodetic First-Order     |
| **03** | **Architectural Footprint & CAD Grid**      |  `±0.000m GROUND LEVEL`   | Column Grid: 8.0m × 8.0m Structural Matrix       |
| **04** | **Revit BIM Coordination & Exploded Model** |  `+24.800m MODEL EXTENT`  | LOD 400 Multidisciplinary Clash Zero             |
| **05** | **Subterranean Excavation & Shoring**       |  `-5.500m BASEMENT FFL`   | Excavation Volume: 14,800 m³ Earthwork           |
| **06** | **Bored Piling & Reinforced Raft**          |    `-24.000m PILE TOE`    | Working Pile Capacity: 3,800 kN per Ø1000 pile   |
| **07** | **RCC Structural Frame (Levels 1–6)**       |   `+24.800m ROOF BEAM`    | Compressive Strength: f'c = 40 MPa (5,800 psi)   |
| **08** | **Post-Tensioned Slabs & Diaphragms**       |  `+21.000m LEVEL 6 SLAB`  | Atrium Opening: 16.0m × 10.0m Clear Void         |
| **09** | **Curtain Wall Facade & Solar Fins**        |  `+24.800m PARAPET TOP`   | Solar Heat Gain: SHGC = 0.28 (Louver Block 45%)  |
| **10** | **MEP Infrastructure & Rooftop Chiller**    | `+27.500m ROOFTOP PLANT`  | Cooling Capacity: 1,200 Tons Refrigeration (TR)  |
| **11** | **Multi-Level Central Atrium & Escalators** | `+5.400m LEVEL 2 ATRIUM`  | Vertical Mobility: 6,000 Persons / hr Escalators |
| **12** | **Civic Entrance Plaza, Canopy & Drop-Off** |  `+1.200m PLAZA FINISH`   | Pedestrian Forecourt: 1,200 m² Civic Space       |
| **13** | **Completed Dhaka Central Mall**            | `+24.800m COMPLETED ROOF` | Gross Built Area: 7,500 m² Commercial Mall       |

---

## Technology Stack

### Frontend & UI

- **[SvelteKit 2](https://kit.svelte.dev/)** with **[Svelte 5](https://svelte.dev/)** (Runes reactivity: `$state`, `$derived`, `$props`)
- **[TailwindCSS v4](https://tailwindcss.com/)** with modern CSS grid, glassmorphism backdrop filters, and custom color tokens
- **[Lucide Svelte](https://lucide.dev/)** for technical iconography

### 3D Graphics & Animation

- **[Three.js](https://threejs.org/)** (WebGLRenderer, `PCFShadowMap`, directional sun, hemisphere sky fill, warm interior spotlights)
- **[GSAP 3 & ScrollTrigger](https://greensock.com/)** for scroll-pinned timeline orchestration and stage progression
- **Procedural Materials**: Architectural concrete with roughness mapping, tinted Low-E glass, champagne metallic solar fins, asphalt road, and terrazzo

### Validation & Testing

- **[Zod](https://zod.dev/)** schema validation for RFQ inquiries and technical data contracts
- **[Vitest](https://vitest.dev/)** for unit and content regression tests
- **[Playwright](https://playwright.dev/)** for cross-browser end-to-end testing and scroll verification

---

## Project Structure

```text
the-architect/
├── src/
│   ├── app.html                        # Base HTML template with Google Fonts (Outfit & JetBrains Mono)
│   ├── app.css                         # TailwindCSS v4 imports and theme variables
│   ├── content/                        # Strongly typed engineering data content
│   │   ├── contact/                    # RFQ configuration and office coordinates
│   │   ├── experience/                 # Licensure, education, and career milestones
│   │   ├── home/                       # Dhaka Central Mall 13-stage specifications
│   │   ├── projects/                   # Case studies (Apex Tower, Meghna Crossing, etc.)
│   │   ├── services/                   # Formal engineering service deliverables
│   │   └── site/                       # Studio metadata, codes, and geodetic datum
│   ├── lib/
│   │   ├── components/
│   │   │   ├── construction/           # ConstructionScroll.svelte & HUD overlays
│   │   │   ├── navigation/             # Engineering navigation bar & footer
│   │   │   └── ui/                     # Reusable cards, headers, and modal components
│   │   ├── motion/
│   │   │   └── construction/           # timeline.ts (Catmull-Rom splines & GSAP ScrollTrigger)
│   │   ├── three/
│   │   │   └── scenes/                 # construction-scene.ts (Dhaka Central Mall 3D model)
│   │   └── tests/                      # Vitest unit test suites
│   └── routes/
│       ├── +page.svelte                # Home page with hero, 3D experience & project matrix
│       ├── about/+page.svelte          # Studio leadership & professional credentials
│       ├── contact/+page.svelte        # RFQ dispatch & engineering contact form
│       ├── projects/                   # Portfolio case study directory & detail routes
│       └── services/                   # Engineering capabilities & scope of work
├── tests/
│   └── e2e/                            # Playwright end-to-end test suites
├── playwright.config.ts                # E2E test runner configuration
└── vite.config.ts                      # Vite build pipeline with SvelteKit & Tailwind plugins
```

---

## Engineering Standards & Compliance

All building specifications and structural parameters throughout the site adhere to:

- **BNBC 2020** — _Bangladesh National Building Code_ (Seismic Zone 2 / Dhaka, Wind Speed 65.7 m/s, Occupancy Group F)
- **RAJUK** — _Dhaka Metropolitan Building Construction Rules_ (FAR, setback, and fire safety provisions)
- **IEB / BPERB** — _Institution of Engineers, Bangladesh_ Professional Licensure Standards
- **ACI 318-19** — _Building Code Requirements for Structural Concrete_
- **AISC 360-16** — _Specification for Structural Steel Buildings_
- **ISO 19650** — _BIM Level 2 Information Management Standards_

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm** or **bun** / **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/maruf/the-architect.git
cd the-architect

# Install dependencies
npm install
```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Quality Assurance & Testing

```bash
# Run Svelte & TypeScript static analysis (0 errors, 0 warnings)
npm run check

# Run Vitest unit tests
npm run test:unit

# Run Playwright end-to-end test suite
npm run test:e2e

# Run the complete test suite (Unit + E2E)
npm test
```

### Production Build

```bash
# Compile production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## License

Private repository · All Rights Reserved © Marcus Vance Engineering Studio.
