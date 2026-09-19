import type { Project } from '$lib/types/project';

export const project002: Project = {
	id: 'prj-002',
	slug: 'hudson-viaduct-seismic-retrofit',
	projectNumber: 'PRJ-002',
	title: 'Hudson Viaduct Seismic Retrofit & Base Isolation',
	subtitle: '1.8km elevated multi-span highway viaduct dynamic stabilization under live traffic',
	category: 'Infrastructure & Bridges',
	location: 'Jersey City, NJ',
	coordinates: '40.7282° N, 74.0776° W',
	year: 2023,
	client: 'State Transportation Authority',
	architect: 'Infrastructure Design Bureau',
	role: 'Senior Seismic Analyst & Structural Specialist',
	area: '32,400 m² Deck Area',
	floors: '1.8 km linear',
	duration: '24 Months',
	structuralSystem: 'Continuous Steel Plate Girder Spans with Lead-Rubber Bearing (LRB) Isolation',
	foundationType: 'Drilled Shaft Groups with Reinforced Concrete Pier Bents',
	seismicZone: 'AASHTO Seismic Category C',
	concreteGrade: 'C45/55 Self-Consolidating High-Durability Concrete',
	steelGrade: 'AASHTO M270 Grade 50W (Weathering Steel)',
	bimLod: 'LOD 350 As-Built Infrastructure Federation',
	disciplines: [
		'Bridge Engineering',
		'Nonlinear Dynamic Time-History',
		'Lead-Rubber Bearing Design',
		'Live-Traffic Jacking Plans',
		'Structural Health Monitoring'
	],
	description:
		'The Hudson Viaduct carries over 95,000 vehicles daily over complex industrial rail corridors. Built in 1964, the aging steel girder structure required comprehensive seismic upgrading, expansion joint elimination, and pier bent strengthening to withstand 1,000-year return period earthquake ground motions without disruption to vital transit operations.',
	challenge:
		'Jacking 48 bridge spans weighing up to 850 metric tons each while keeping four lanes of commuter traffic open above required zero-tolerance jacking frames and real-time displacement telemetry. Concrete piers exhibited alkali-silica reaction (ASR) micro-fissures requiring carbon-fiber reinforcement wrapping.',
	approach:
		'Our team designed synchronous multi-point computer-controlled hydraulic jacking towers that lifted each span by exactly 14mm to extract legacy rocker bearings and install modern high-damping Lead-Rubber Bearings (LRBs). Nonlinear response spectrum analyses demonstrated a 68% reduction in base shear demand transferred to the substructure piers.',
	outcome:
		'All 96 bearing assemblies were replaced ahead of schedule without a single unplanned lane closure. Structural health monitoring (SHM) accelerometers confirm fundamental vibration periods shifted from 0.42s to 1.35s, isolating the superstructure from destructive ground resonance frequencies.',
	featured: true,
	metrics: [
		{ label: 'Seismic Base Shear Reduction', value: '-68%', unit: 'vs Fixed' },
		{ label: 'Total Isolated Spans', value: '48', unit: 'steel spans' },
		{ label: 'Live Traffic Capacity', value: '95,000', unit: 'vehicles/day' },
		{ label: 'Design Lifespan Extension', value: '+75', unit: 'years' }
	],
	drawings: [
		{
			title: 'Pier Bent Elevation & Bearing Pedestal Reconstruction',
			sheetNumber: 'BR-201.0',
			scale: '1:25',
			discipline: 'Structural Bridge',
			description:
				'Reinforced concrete pedestal extensions, post-tensioned anchor rods, and carbon fiber wrap zones.'
		},
		{
			title: 'Lead-Rubber Bearing Isolation Assembly & Jacking Plan',
			sheetNumber: 'BR-305.2',
			scale: '1:10',
			discipline: 'Mechanical/Bridge',
			description:
				'LRB vulcanized elastomer plates, internal lead core geometry, and 500-ton hydraulic jack placements.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80',
			alt: 'Elevated viaduct steel girder superstructure',
			caption:
				'Elevated highway steel girder system during synchronized hydraulic bearing replacement.',
			type: 'hero'
		},
		{
			url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
			alt: 'Precision engineering sensor installation',
			caption:
				'Triaxial accelerometer sensor array installed for dynamic structural health monitoring.',
			type: 'detail'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Nonlinear Dynamic Modeling',
			duration: '5 Months',
			milestoneDate: 'Q1 2022',
			tolerance: 'Modal period match ±3%',
			notes: 'Three-dimensional nonlinear time history analysis using 7 ground motion record pairs.'
		},
		{
			phaseNumber: '02',
			name: 'Substructure FRP Wrapping',
			duration: '7 Months',
			milestoneDate: 'Q3 2022',
			tolerance: 'Tensile modulus > 230 GPa',
			notes: 'Carbon-fiber polymer jacket confinement applied to all 24 pier columns.'
		},
		{
			phaseNumber: '03',
			name: 'Synchronous Hydraulic Jacking',
			duration: '9 Months',
			milestoneDate: 'Q2 2023',
			tolerance: 'Differential lift < 1.0mm across span',
			notes: 'Automated hydraulic jacking replacing 96 legacy steel rocker bearings with LRBs.'
		},
		{
			phaseNumber: '04',
			name: 'Expansion Joint Elimination',
			duration: '3 Months',
			milestoneDate: 'Q4 2023',
			tolerance: 'Continuity deck strip crack width < 0.15mm',
			notes: 'Conversion of multi-span simple joints into semi-integral continuous deck slabs.'
		}
	]
};
