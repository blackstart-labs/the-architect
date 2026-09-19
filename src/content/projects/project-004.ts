import type { Project } from '$lib/types/project';

export const project004: Project = {
	id: 'prj-004',
	slug: 'metro-line-4-intermodal-station',
	projectNumber: 'PRJ-004',
	title: 'Metro Line 4 Intermodal Transit Cavern',
	subtitle: 'Deep-bore rail interchange with 28m column-free vaulted passenger concourse',
	category: 'Transit & Aviation',
	location: 'Montreal, Canada',
	coordinates: '45.5017° N, 73.5673° W',
	year: 2024,
	client: 'Société de Transport Métropolitain',
	architect: 'Atelier Urbanisme Transit',
	role: 'BIM Lead & Senior Underground Structural Engineer',
	area: '42,000 m²',
	floors: '4 levels below surface (-32m)',
	duration: '38 Months',
	structuralSystem:
		'Reinforced Shotcrete Primary Lining + Cast-in-Place Concrete Arch Vault with Precast Mezzanines',
	foundationType: 'Direct Bedrock Invert Bearing with High-Strength Tie-Down Micropiles',
	seismicZone: 'NBCC Zone 3 (Moderate Seismic)',
	concreteGrade: 'C50/60 Fiber-Reinforced Self-Consolidating Concrete (Vault Arch)',
	steelGrade: 'Grade 500W High-Ductility Rebar + Structural Steel Suspended Ties',
	bimLod: 'LOD 500 Digital Twin for Asset Operations',
	disciplines: [
		'Underground Cavern Modeling',
		'BIM LOD 500 & COBie',
		'Steel Fiber Shotcrete Analysis',
		'Tunnel Boring Machine Interfacing',
		'Vibration Mitigation'
	],
	description:
		'Serving as the interchange hub connecting two regional subway lines with an express airport rail link, this massive 32-meter deep rock cavern spans 28 meters column-free. The project pioneered end-to-end openBIM (IFC4) from parametric structural analysis in Grasshopper to live asset operation sensors in a facility digital twin.',
	challenge:
		'Mining a 28-meter wide cavern directly beneath historic masonry foundations and active municipal utility corridors required limiting surface ground settlements to under 6mm. The convergence of three dual-track tunnel boring machines (TBMs) at odd angles created complex structural stress concentrations in the portal collars.',
	approach:
		'We deployed 3D finite element stress-redistribution simulations using FLAC3D, specifying sequential excavation method (SEM/NATM) rounds with lattice girders and high-dosage steel-fiber shotcrete. The inner architectural vault was cast with self-consolidating concrete using a custom robotic traveling steel arch formwork system.',
	outcome:
		'Surface settlement was verified by optical automated total stations at a maximum of 3.8mm—well beneath the 6mm threshold. The resulting LOD 500 digital twin with embedded RFID sensors was handed over directly to the transit authority’s maintenance systems, accelerating commissioning by 4 months.',
	featured: true,
	metrics: [
		{ label: 'Clear Cavern Arch Span', value: '28.0', unit: 'meters' },
		{ label: 'Maximum Settlement', value: '3.8', unit: 'mm (limit 6mm)' },
		{ label: 'BIM Clash Resolution Rate', value: '100%', unit: 'prior to pour' },
		{ label: 'Passenger Throughput', value: '180,000', unit: 'passengers/day' }
	],
	drawings: [
		{
			title: 'Transverse Cavern Cross-Section & Arch Reinforcement',
			sheetNumber: 'TUN-202.1',
			scale: '1:50',
			discipline: 'Tunnels/Structural',
			description:
				'Primary shotcrete thickness, radial rock bolts pattern, and secondary reinforced concrete inner liner.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
			alt: 'Massive vaulted concrete transit cavern arch',
			caption:
				'Finished 28-meter clear span concrete arch concourse illuminated by indirect lighting.',
			type: 'hero'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Crown Pilot Drift Mining',
			duration: '9 Months',
			milestoneDate: 'Q3 2021',
			tolerance: 'Excavation perimeter ±25mm',
			notes:
				'Sequential excavation of upper top-heading with immediate fiber shotcrete application.'
		},
		{
			phaseNumber: '02',
			name: 'Bench Lowering & Invert Pour',
			duration: '11 Months',
			milestoneDate: 'Q2 2022',
			tolerance: 'Invert bearing capacity > 2.5 MPa',
			notes: 'Sequential lowering of lower bench in 4-meter advances.'
		},
		{
			phaseNumber: '03',
			name: 'Traveling Arch Formwork Concrete Casting',
			duration: '10 Months',
			milestoneDate: 'Q1 2023',
			tolerance: 'Surface curvature tolerance ±3mm',
			notes: 'Robotic steel gantry casting 12-meter arch segments continuously.'
		},
		{
			phaseNumber: '04',
			name: 'Suspended Mezzanines & BIM LOD 500 As-Built',
			duration: '8 Months',
			milestoneDate: 'Q3 2024',
			tolerance: 'LOD 500 COBie parameter completeness 99.8%',
			notes: 'Steel tension rod mezzanine platforms and digital twin verification.'
		}
	]
};
