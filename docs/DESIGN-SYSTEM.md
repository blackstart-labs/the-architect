# Portfolio design system

## Audit

SvelteKit 2 / Svelte 5, TypeScript, Three.js, GSAP ScrollTrigger, Tailwind 4 and Lucide.
The construction already had deterministic progress and instanced geometry. Problems
were scattered scoped colors and sizes, 6–12px body/metadata text, undersized touch
targets, a static navigation state, remote font requests, missing canonical/social
metadata, and archived template routes publishing unverified identities and claims.

## Authoritative source

`src/styles/design-system.css` defines the palette, semantic type scale, 4px spacing,
1280px content / 1440px visual containers, gutters, radii, border, focus and motion.
`src/routes/layout.css` imports it; there is no alternate active theme.

- Body: Manrope variable, self-hosted Latin subset; 16px / 1.7.
- Technical labels: system monospace, 11px / 1.5; captions 12px.
- Headings: fluid display / H1 / H2 / H3 tokens, restrained 600 weight.
- Interactive targets: 44px minimum; principal buttons and fields 48px.
- Motion: 180ms ease-out for UI; no decorative perpetual animation.
- Layout breakpoints: mobile <600px, tablet 600–959px, laptop 960–1199px,
  desktop >=1200px. These contracts also govern the responsive scene layout.

## Components

`src/lib/ui/`: Container, Section, SectionHeading, Eyebrow, TechnicalLabel,
Button, PrimaryButton, SecondaryButton, TextLink, Divider, ImageWithCaption.

`src/lib/portfolio/components/`: SiteHeader, MobileNavigation, ProjectCard,
ProjectMetadata, ContactCTA, Footer, SEO and construction interface components.

The homepage uses all retained sections to answer distinct questions: what is the
portfolio about; which workflows are illustrated; what tasks require coordination;
how is a building constructed; and how can a project inquiry be sent.
Project inquiries are now delivered through the server-side Web3Forms integration;
the form exposes pending, confirmed success and retryable error states.

## Content & publishing

The supplied reference establishes the displayed name; it should be owner-confirmed.
The new site includes no invented qualifications, completed projects, employers,
clients, reviews or numerical outcomes. Earlier route templates are retained as
source, but redirect to relevant homepage sections. Unknown URLs remain real 404s.
