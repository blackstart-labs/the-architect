# 04 — Adding Projects

Projects are the core content model of the portfolio. Each project exists in its own file under `src/content/projects/`.

---

## Step 1: Create a Project File

Create a new file `src/content/projects/project-007.ts`:

```typescript
import type { Project } from '$lib/types/project';

export const project007: Project = {
	id: 'prj-007',
	slug: 'aurora-observatory-dome',
	projectNumber: 'PRJ-007',
	title: 'Aurora Geodetic Space Observatory',
	subtitle: 'Single-layer steel reticulated dome with active seismic dampening',
	category: 'Commercial High-Rise', // or 'Infrastructure & Bridges', etc.
	location: 'Tromsø, Norway',
	coordinates: '69.6492° N, 18.9553° E',
	year: 2024,
	client: 'Nordic Space Agency',
	architect: 'Geodetic Form Studio',
	role: 'Principal Structural Engineer',
	area: '14,200 m²',
	floors: 3,
	duration: '18 Months',
	structuralSystem: 'Spherical Reticulated Steel Space Frame on Base Isolators',
	foundationType: 'Rock Anchors into Granite Shield',
	seismicZone: 'Eurocode 8 Seismic Zone 2',
	concreteGrade: 'C45/55 High-Strength Frost-Resistant',
	steelGrade: 'EN 10025-4 S460ML Low-Temperature Steel',
	bimLod: 'LOD 400 Direct-to-Fabrication',
	disciplines: ['Space Trusses', 'Cold-Climate Steel', 'BIM LOD 400'],
	description: 'Full narrative describing the structural design...',
	challenge: 'Sub-zero temperatures and high wind vortex shedding...',
	approach: 'Nonlinear time-history analyses and cast steel nodes...',
	outcome: 'Zero vibration interference for astronomical instruments...',
	featured: true,
	metrics: [
		{ label: 'Clear Dome Span', value: '45.0', unit: 'meters' },
		{ label: 'Design Wind Speed', value: '240', unit: 'km/h' }
	],
	drawings: [
		{
			title: 'Dome Reticulated Node Geometry',
			sheetNumber: 'S-201.0',
			scale: '1:20',
			discipline: 'Structural',
			description: 'Arrangement of spherical pin-jointed nodes.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/...',
			alt: 'Aurora Observatory Dome',
			caption: 'Reticulated dome space frame during assembly.',
			type: 'hero'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Rock Anchors & Base Ring',
			duration: '4 Months',
			milestoneDate: 'Q2 2023',
			tolerance: '±1.0mm radial',
			notes: 'Post-tensioned tie-downs into granite.'
		}
	]
};
```

---

## Step 2: Register in `src/content/projects/index.ts`

Import and add `project007` to the `allProjects` array:

```typescript
import { project007 } from './project-007';

export const allProjects: Project[] = [
	// ... existing projects
	project007
];
```

The system will automatically:

1. Generate the `/projects/aurora-observatory-dome` dynamic route.
2. Add it to the filterable `/projects` catalog.
3. Include it in `/sitemap.xml` for search engines.
