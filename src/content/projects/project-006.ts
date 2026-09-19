import type { Project } from '$lib/types/project';

export const project006: Project = {
	id: 'prj-006',
	slug: 'helix-cultural-center-cantilever',
	projectNumber: 'PRJ-006',
	title: 'Helix Cultural Center & Suspended Auditorium',
	subtitle: '42-meter column-free steel cantilevered auditorium over active river embankment',
	category: 'Commercial High-Rise',
	location: 'Chicago, IL',
	coordinates: '41.8781° N, 87.6298° W',
	year: 2024,
	client: 'Civic Cultural Endowment',
	architect: 'Studio Form & Structure',
	role: 'Principal Structural Engineer & Computational Specialist',
	area: '26,500 m²',
	floors: '6 levels (42m cantilever projection)',
	duration: '28 Months',
	structuralSystem: 'Three-Dimensional Steel Diagrid Space Truss with Tuned Mass Dampers (TMD)',
	foundationType: 'Bored Caissons Socketed into Chicago Hardpan with Rock Sockets',
	seismicZone: 'SDC B / Wind Governed (Lake Michigan Gale Speeds)',
	concreteGrade: 'C40/50 Lightweight Aggregate Floor Slabs',
	steelGrade: 'ASTM A913 Grade 65 with High CVN Toughness',
	bimLod: 'LOD 400 Direct-to-Fabrication CNC Interoperability',
	disciplines: [
		'Long-Span Cantilever Mechanics',
		'Tuned Mass Damper Optimization',
		'Computational Topology Optimization',
		'Wind Tunnel Aerodynamics',
		'Erection Staging Camber Calculation'
	],
	description:
		'Hovering dramatically 18 meters above the Chicago River, the Helix Cultural Center projects a 42-meter clear cantilever housing an 850-seat acoustic symphonic concert hall. The structure utilizes an exposed three-dimensional steel diagrid truss with cast steel nodes and twin bi-directional tuned mass dampers to deliver absolute acoustic and pedestrian vibration tranquility.',
	challenge:
		'Cantilever tip deflection under shifting live loads (auditorium occupancy changes of up to 1,200 people) could induce perceptible footfall bounce and secondary glass facade distortion. Chicago wind vortex shedding off Lake Michigan posed aeroelastic resonant flutter risks requiring dynamic mitigation.',
	approach:
		'We integrated parametric topology optimization in Karamba3D to locate ideal diagonal truss load paths, reducing total steel weight by 220 metric tons. Twin 18-ton pendulum tuned mass dampers (TMDs) equipped with eddy-current electromagnetic damping units were concealed within the roof framing to tune acceleration levels below 0.5%g under peak winds.',
	outcome:
		'Actual tip deflection during full auditorium load testing measured 19mm, matching our pre-camber computational prediction within 1.5mm. The building has hosted premier international philharmonic performances with background acoustic NC-15 noise criteria fully satisfied.',
	featured: true,
	metrics: [
		{ label: 'Clear Cantilever Length', value: '42.0', unit: 'meters projection' },
		{ label: 'Tuned Mass Damper Weight', value: '2 x 18', unit: 'metric tons' },
		{ label: 'Pedestrian Acceleration', value: '< 0.45%g', unit: 'vibration limit' },
		{ label: 'Acoustic Criteria', value: 'NC-15', unit: 'symphonic certified' }
	],
	drawings: [
		{
			title: 'Primary Cantilever Diagrid Truss Elevation & Node Matrix',
			sheetNumber: 'S-301.0',
			scale: '1:50',
			discipline: 'Structural Steel',
			description:
				'Geometry of heavy W14x730 tension chords, diagonal compression struts, and cast steel nodal junctions.'
		},
		{
			title: 'Tuned Mass Damper Mechanical Anchorage & Cable Suspension',
			sheetNumber: 'M-402.3',
			scale: '1:15',
			discipline: 'Structural Dynamics',
			description:
				'Pendulum suspension arms, eddy-current magnetic brake gaps, and motion limit stops.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
			alt: 'Modern architectural steel diagrid and glass cantilever',
			caption: 'Cantilevered symphonic auditorium floating above the urban river corridor.',
			type: 'hero'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Substructure & Anchor Caissons',
			duration: '7 Months',
			milestoneDate: 'Q2 2022',
			tolerance: 'Anchor bolt pattern ±1.5mm',
			notes:
				'Deep rock-socketed caissons resisting massive uplift tension at the rear truss anchorage.'
		},
		{
			phaseNumber: '02',
			name: 'Temporary Shoring Tower Erection',
			duration: '4 Months',
			milestoneDate: 'Q4 2022',
			tolerance: 'Hydraulic jack leveling ±1mm',
			notes: 'Temporary barge-mounted shoring towers supporting truss assembly over the river.'
		},
		{
			phaseNumber: '03',
			name: 'Diagrid Steel Truss Erection & Welding',
			duration: '9 Months',
			milestoneDate: 'Q3 2023',
			tolerance: 'Pre-camber elevation +48mm at tip',
			notes: 'Complete penetration ultrasonic weld testing across 180 critical moment joints.'
		},
		{
			phaseNumber: '04',
			name: 'Decentering Jack-Down & TMD Tuning',
			duration: '3 Months',
			milestoneDate: 'Q4 2023',
			tolerance: 'Frequency tuning ±0.02 Hz',
			notes:
				'Stepwise hydraulic decentering transferring 3,400 tons onto the cantilever foundation.'
		}
	]
};
