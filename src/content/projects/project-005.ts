import type { Project } from '$lib/types/project';

export const project005: Project = {
	id: 'prj-005',
	slug: 'calypso-deepwater-terminal',
	projectNumber: 'PRJ-005',
	title: 'Calypso Deepwater Energy & LNG Terminal',
	subtitle: 'Offshore gravity-based concrete substructure with heavy cryogenic piping topsides',
	category: 'Infrastructure & Bridges',
	location: 'St. John’s, Newfoundland',
	coordinates: '47.5615° N, 52.7126° W',
	year: 2023,
	client: 'North Atlantic Energy Consortium',
	architect: 'Maritime Civil Engineering Partners',
	role: 'Senior Marine Structural Consultant',
	area: '65,000 m² Deck Surface',
	floors: 'Offshore platform + topsides',
	duration: '36 Months',
	structuralSystem:
		'Post-Tensioned Concrete Gravity Base Structure (GBS) with Steel Tubular Space Frame Topsides',
	foundationType: 'Precast Concrete Suction Caissons & Gravity Skirts seated on Seabed',
	seismicZone: 'DNV-ST-0126 Offshore Marine & Ice-Impact Loading',
	concreteGrade: 'C70/85 High-Density Marine Durability Concrete with Microsilica',
	steelGrade: 'EN 10225 S460NH High-Toughness Offshore Structural Steel (-40°C CVN)',
	bimLod: 'LOD 400 Naval & Structural Co-Design',
	disciplines: [
		'Marine & Coastal Engineering',
		'Wave & Iceberg Impact Dynamics',
		'Post-Tensioned Marine Caissons',
		'Heavy-Lift Rigging Engineering',
		'Corrosion Cathodic Protection'
	],
	description:
		'Designed to withstand the harsh conditions of the North Atlantic, the Calypso Deepwater Terminal features a slip-formed concrete gravity base structure (GBS) capable of resisting direct 100-year wave surges (significant wave height Hs = 16.4m) and pack-ice kinetic forces. The topsides accommodate liquefied cryogenic fuel storage and ship-to-shore bunkering gantries.',
	challenge:
		'Dynamic interaction between drifting pack ice sheets and the vertical concrete shafts introduced cyclic impact forces that could induce low-cycle fatigue in structural rebar. Seawater salinity combined with cryogenic storage temperatures (-162°C) necessitated specialized crack-width control criteria (< 0.10mm).',
	approach:
		'We executed nonlinear dynamic fluid-structure interaction (FSI) simulations coupling wave spectra with three-dimensional finite element concrete plasticity models. Multi-axial post-tensioning tendons were anchored in thick serrated ice-breaking cones, deflecting advancing ice floes in flexural failure mode and reducing total lateral ice force by 48%.',
	outcome:
		'The GBS was slip-formed in dry dock, ballasted, towed 42 nautical miles offshore, and set down on the seabed within a 75mm positional tolerance. The structure received full DNV offshore certification and has operated continuously through two severe winter sea states without operational shutdown.',
	featured: false,
	metrics: [
		{ label: 'Design Wave Height', value: '16.4', unit: 'meters Hs' },
		{ label: 'GBS Concrete Mass', value: '142,000', unit: 'metric tons' },
		{ label: 'Topsides Heavy Lift', value: '12,500', unit: 'tons single pick' },
		{ label: 'Offshore Placement Accuracy', value: '±75', unit: 'mm on seabed' }
	],
	drawings: [
		{
			title: 'Gravity Base Ice-Cone Geometry & Post-Tensioning Layout',
			sheetNumber: 'MAR-040.1',
			scale: '1:100',
			discipline: 'Offshore Structural',
			description:
				'Serrated ice-breaking cone section, post-tensioned tendon ring layouts, and internal ballast cell bulkheads.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
			alt: 'Massive marine infrastructure terminal and heavy crane',
			caption: 'Offshore platform topsides integration and heavy-lift mooring system installation.',
			type: 'hero'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Dry Dock GBS Construction',
			duration: '14 Months',
			milestoneDate: 'Q4 2021',
			tolerance: 'Wall plumbness ±5mm over 45m',
			notes: 'Slip-forming four 45-meter high circular concrete shafts in deep dry dock basin.'
		},
		{
			phaseNumber: '02',
			name: 'Towing & Deepwater Ballasting',
			duration: '2 Months',
			milestoneDate: 'Q2 2022',
			tolerance: 'Towing speed 2.5 knots max',
			notes: 'Deepwater wet tow with 4 ocean-going tugs and GPS dynamic positioning.'
		},
		{
			phaseNumber: '03',
			name: 'Seabed Touchdown & Underbase Grouting',
			duration: '3 Months',
			milestoneDate: 'Q3 2022',
			tolerance: 'Inclination < 0.1 degree',
			notes: 'Penetration of steel skirts and pressure grouting of void space under basemat.'
		},
		{
			phaseNumber: '04',
			name: 'Topsides Float-Over & Hookup',
			duration: '8 Months',
			milestoneDate: 'Q2 2023',
			tolerance: 'Mating leg pin alignment ±15mm',
			notes: 'Dynamic barge float-over mating of 12,500-ton integrated process deck topsides.'
		}
	]
};
