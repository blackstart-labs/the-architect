import type { Project } from '$lib/types/project';

export const project003: Project = {
	id: 'prj-003',
	slug: 'nordic-geothermal-substructure',
	projectNumber: 'PRJ-003',
	title: 'Nordic Geothermal Substructure & Deep Basements',
	subtitle: '5-level subterranean thermal energy vault carved into granitic bedrock',
	category: 'Substructure & Geotechnical',
	location: 'Reykjavik, Iceland',
	coordinates: '64.1466° N, 21.9426° W',
	year: 2023,
	client: 'Orka Geothermal Systems',
	architect: 'Nordic Baseworks Studio',
	role: 'Geotechnical & Substructure Structural Specialist',
	area: '18,200 m²',
	floors: '5 levels subterranean (-22m)',
	duration: '20 Months',
	structuralSystem: 'Post-Tensioned Watertight Diaphragm Walls with Rock Dowel Anchors',
	foundationType: 'Granite Rock Anchorage with Monolithic Basement Mat Slab',
	seismicZone: 'Eurocode 8 Volcanic & Tectonic Zone',
	concreteGrade: 'C60/75 Sulfate-Resistant Silica-Fume Concrete',
	steelGrade: 'Stainless Rebar Grade 1.4462 Duplex (High Thermal Brine Resistance)',
	bimLod: 'LOD 400 Underground Coordination',
	disciplines: [
		'Deep Excavation Analysis',
		'Thermal Stress FEA',
		'Hydrostatic Waterproofing',
		'Bedrock Dowel Detailing',
		'Corrosion Resistance Modeling'
	],
	description:
		'Constructed directly adjacent to active thermal fissures, this 5-story subterranean research and energy exchange facility houses industrial heat exchangers, turbine halls, and deep geothermal piping conduits operating at sustained temperatures of 85°C amidst acidic sulfur-laden groundwater conditions.',
	challenge:
		'Extreme thermal gradients across the perimeter concrete perimeter walls induced severe restraint stresses and cracking potential. Simultaneously, 22 meters of hydrostatic groundwater head exerted massive uplift forces exceeding 210 kPa across the basement footprint.',
	approach:
		'We specified low-heat sulfate-resistant slag cement reinforced with corrosion-immune Duplex stainless steel in outer splash zones. Plaxis 3D thermal-mechanical coupled models guided the installation of 320 prestressed hollow-core grouted rock anchors driven 18 meters into solid basalt to resist hydrostatic buoyancy and seismic ground rupture.',
	outcome:
		'The structure achieved complete hydrostatic seal with zero seepage observed across 8,500m² of subterranean diaphragm walling. Thermographic imaging verified temperature isolation, preventing heat loss into adjacent sensitive permafrost strata.',
	featured: false,
	metrics: [
		{ label: 'Subterranean Excavation Depth', value: '22.0', unit: 'meters' },
		{ label: 'Hydrostatic Head Resisted', value: '2.1', unit: 'bar pressure' },
		{ label: 'Rock Anchors Installed', value: '320', unit: 'hollow-core units' },
		{ label: 'Thermal Shielding Delta', value: '65°C', unit: 'internal to external' }
	],
	drawings: [
		{
			title: 'Diaphragm Wall Section & Waterstop Keyway Detail',
			sheetNumber: 'GEO-101.4',
			scale: '1:20',
			discipline: 'Geotechnical',
			description:
				'Dual-barrier hydrophilic bentonite waterstops and post-tensioned horizontal anchor ties.'
		}
	],
	media: [
		{
			url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
			alt: 'Deep rock excavation pit and shoring wall',
			caption: 'Subterranean excavation pit reinforced with shotcrete and tensioned rock dowels.',
			type: 'hero'
		}
	],
	phases: [
		{
			phaseNumber: '01',
			name: 'Controlled Rock Blasting & Shoring',
			duration: '6 Months',
			milestoneDate: 'Q2 2022',
			tolerance: 'Overbreak < 150mm',
			notes:
				'Precision pre-split blasting preventing shockwave propagation into nearby geothermal wells.'
		},
		{
			phaseNumber: '02',
			name: 'Rock Anchor Drilling & Proofing',
			duration: '5 Months',
			milestoneDate: 'Q4 2022',
			tolerance: 'Tension lock-off 1.25x proof load',
			notes: '320 anchors grouted with non-shrink high-early sulfate-resistant mortar.'
		},
		{
			phaseNumber: '03',
			name: 'Watertight Basemat Pour',
			duration: '4 Months',
			milestoneDate: 'Q2 2023',
			tolerance: 'Waterproofing continuity 100%',
			notes:
				'1.8m thick raft poured with integrated internal cooling pipes to control hydration heat.'
		}
	]
};
