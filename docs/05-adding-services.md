# 05 — Adding Services

Engineering disciplines are represented as strongly-typed service models located in `src/content/services/`.

---

## Creating a Service

1. Define the service in `src/content/services/`:

```typescript
import type { Service } from '$lib/types/service';

export const windEngineering: Service = {
	id: 'srv-007',
	slug: 'wind-engineering-aerodynamics',
	serviceCode: 'ENG-07',
	title: 'Boundary-Layer Wind Engineering & Aerodynamics',
	tagline:
		'High-frequency force balance testing, vortex shedding suppression, and pedestrian comfort.',
	summary: 'Detailed explanation of wind aerodynamic testing...',
	scopeOverview: 'What the aerodynamicist actually does...',
	methodology: [
		'Boundary layer wind tunnel (BLWT) model fabrication at 1:400 scale',
		'High-frequency base balance (HFBB) dynamic overturning moment acquisition',
		'Computational Fluid Dynamics (CFD) eddy simulation in OpenFOAM'
	],
	deliverables: [
		{
			code: 'DEL-07A',
			title: 'Aeroelastic Wind Tunnel Dossier',
			description: '10,000-year return storm force envelopes and cladding pressures.',
			format: 'Technical Report / PDF'
		}
	],
	standards: [
		{
			code: 'ASCE 49-21',
			organization: 'ASCE',
			title: 'Wind Tunnel Testing for Buildings and Other Structures'
		}
	],
	softwareStack: ['OpenFOAM CFD', 'CSI ETABS Dynamic Link', 'MATLAB Aeroelastic Toolbox'],
	caseStudySlugs: ['apex-tower-mass-timber'],
	typicalTimeline: '6 to 12 Weeks'
};
```

2. Register in `src/content/services/index.ts`:
   Add `windEngineering` to the `allServices` array.
   The system automatically generates the `/services/wind-engineering-aerodynamics` URL and adds it to the capability matrix.
