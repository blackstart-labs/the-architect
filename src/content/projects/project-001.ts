import type { Project } from '$lib/types/project';

export const project001: Project = {
	id: 'prj-001',
	slug: 'apex-tower-mass-timber',
	projectNumber: 'PRJ-001',
	title: 'Apex Tower Mass Timber & Concrete Core',
	subtitle: '34-story hybrid glulam and post-tensioned core commercial tower',
	category: 'Mass Timber',
	location: 'Seattle, WA',
	coordinates: '47.6062° N, 122.3321° W',
	year: 2024,
	client: 'Cascadia Urban Development',
	architect: 'Mies & Partner Architects',
	role: 'Lead Structural Engineer & BIM Director',
	area: '48,500 m²',
	floors: 34,
	duration: '32 Months',
	structuralSystem: 'Glulam Columns + CLT Floor Panels with Cast-in-Place Concrete Shear Core',
	foundationType: 'Cast-in-Place Bored Piles with 2.8m Reinforced Raft Slab',
	seismicZone: 'SDC D₂ (High Seismic Risk)',
	concreteGrade: 'C50/60 (Core), C35/45 (Slabs)',
	steelGrade: 'ASTM A992 Grade 50 (Connection Plates)',
	bimLod: 'LOD 400 Fabrication Detailing',
	disciplines: [
		'Structural Engineering',
		'Mass Timber Analysis',
		'BIM LOD 400',
		'Wind Tunnel Telemetry',
		'Seismic Drift Verification'
	],
	description:
		'Apex Tower represents the vanguard of hybrid high-rise architecture on the Pacific Rim. Combining a stiff slip-formed reinforced concrete central core with a hyper-sustainable perimeter frame of glue-laminated Douglas Fir timber and 5-ply Cross-Laminated Timber (CLT) floor diaphragm slabs, the tower cuts embodied carbon by 42% relative to conventional post-tensioned concrete benchmarks.',
	challenge:
		'Differential vertical axial shortening between the stiff concrete core and the viscoelastic mass timber perimeter columns presented a major serviceability challenge over the 50-year building lifecycle. Additionally, Seattle’s high seismicity (SDC D₂) demanded ductile energy-dissipating nodes between the timber girders and concrete core walls.',
	approach:
		'Our team developed a nonlinear time-history finite element model in ETABS coupled with Grasshopper-based automated shortening compensation algorithms. Specialized slip-friction dampers with slotted Belleville spring washers were engineered for the core-to-timber drag strut connections, accommodating 28mm of differential creep without imparting secondary bending moments into the timber floor beams.',
	outcome:
		'The structure achieved full seismic and wind drift compliance (drift ratio < 1/520 under 10-year wind) while delivering column-free spans of 12 meters. Off-site CNC fabrication of 4,200 CLT panels enabled a 4-day floor erection cycle with zero reported on-site geometric clashes.',
	featured: true,
	metrics: [
		{ label: 'Embodied Carbon Savings', value: '-42%', unit: 'vs Baseline' },
		{ label: 'Maximum Floor Span', value: '12.0', unit: 'meters clear' },
		{ label: 'Timber Volume', value: '6,200', unit: 'm³ FSC Certified' },
		{ label: 'Structural Steel Tonnage', value: '450', unit: 'tons in nodes' }
	],
	drawings: [
		{
			title: 'General Structural Framing Plan — Level 16',
			sheetNumber: 'S-104.2',
			scale: '1:50',
			discipline: 'Structural',
			description:
				'Arrangement of glulam primary girders, secondary CLT slabs, and core shear wall boundary elements.'
		},
		{
			title: 'Core-to-Timber Ductile Moment Connection Detail',
			sheetNumber: 'S-502.1',
			scale: '1:10',
			discipline: 'Details',
			description:
				'Slotted friction connection with Belleville washer assemblies and grade 10.9 countersunk bolts.'
		},
		{
			title: 'Pile Cap & Bored Socket Schedule',
			sheetNumber: 'S-010.0',
			scale: '1:100',
			discipline: 'Geotechnical',
			description: 'Reinforced concrete mat thickness contours and 148 socketed pile coordinates.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
			alt: 'Apex Tower structural diagrid erection',
			caption:
				'Perimeter mass timber framing interface with central slip-formed core during erection.',
			type: 'hero'
		},
		{
			url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
			alt: 'Architectural drafting drawing table and blueprint',
			caption: 'Technical drafting documentation and connection stress distribution analysis.',
			type: 'detail'
		},
		{
			url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
			alt: 'Concrete and rebar foundation pour',
			caption: 'Monolithic raft foundation pour featuring high-density Grade 500B reinforcement.',
			type: 'construction'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Substructure & Deep Piles',
			duration: '7 Months',
			milestoneDate: 'Q2 2022',
			tolerance: '±10mm horizontal',
			notes: '148 bored cast-in-place piles socketed 3.5m into glacial till.'
		},
		{
			phaseNumber: '02',
			name: 'Slip-form Core Construction',
			duration: '6 Months',
			milestoneDate: 'Q4 2022',
			tolerance: 'Plumbness 1:1000',
			notes: 'Continuous slip-form hydraulic jacking at 3.2m per 24-hour cycle.'
		},
		{
			phaseNumber: '03',
			name: 'Mass Timber Frame Erection',
			duration: '11 Months',
			milestoneDate: 'Q3 2023',
			tolerance: '±2mm CNC node fits',
			notes: 'Offsite prefabricated glulam members installed via twin luffing cranes.'
		},
		{
			phaseNumber: '04',
			name: 'Envelope & MEP Fit-out',
			duration: '8 Months',
			milestoneDate: 'Q2 2024',
			tolerance: 'Air tightness < 0.1 m³/h·m²',
			notes: 'Unitized double-skin glass curtain facade and chilled-beam mechanical distribution.'
		}
	]
};
