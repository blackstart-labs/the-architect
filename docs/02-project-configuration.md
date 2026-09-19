# 02 — Project Configuration

The Engineering Portfolio System is designed with a strict boundary between core logic and client configuration. Buyers customize identity, credentials, office coordinates, and social handles from a single configuration module without modifying Svelte components.

---

## Site Identity Configuration

Open `src/content/site/site.config.ts`:

```typescript
export const siteConfig: SiteConfig = {
	name: 'Marcus Vance',
	title: 'Principal Structural & BIM Engineer',
	credentials: 'PE, SE, CEng, MICE, LEED AP BD+C',
	firmName: 'Vance Engineering & BIM Consultancy',
	tagline:
		'Precision structural analysis, computational BIM, and resilient infrastructure engineering.',
	headquarters: {
		city: 'New York',
		stateCountry: 'NY, United States',
		coordinates: '40.7128° N, 74.0060° W',
		elevation: '+12.450m DATUM',
		address: '375 Hudson Street, Suite 800, New York, NY 10014'
	},
	contact: {
		email: 'm.vance@vance-engineering.com',
		phone: '+1 (212) 555-0194',
		rfqEmail: 'proposals@vance-engineering.com',
		availability: 'Accepting select commissions for Q3/Q4.'
	},
	engineeringCodes: [
		'ASCE 7-22 (Minimum Design Loads)',
		'AISC 360-22 (Structural Steel Buildings)',
		'ACI 318-19 (Structural Concrete)',
		'EN 1990 - EN 1998 (Eurocodes)'
	]
};
```

---

## Modifying Navigation Links

The navigation bar dynamically builds from `siteConfig.navLinks`. To add or reorder navigation items, edit the array:

```typescript
navLinks: [
	{ label: 'Overview', href: '/', code: '00' },
	{ label: 'Projects', href: '/projects', code: '01' },
	{ label: 'Services', href: '/services', code: '02' },
	{ label: 'Process', href: '/process', code: '03' },
	{ label: 'Experience', href: '/experience', code: '04' },
	{ label: 'Journal', href: '/journal', code: '05' },
	{ label: 'About', href: '/about', code: '06' },
	{ label: 'Contact', href: '/contact', code: '07' }
];
```
