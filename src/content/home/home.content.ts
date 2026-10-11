import type { ConstructionStage } from '$lib/types/construction';

export const constructionStages: ConstructionStage[] = [
	{
		index: 0,
		stageNumber: '01',
		discipline: 'Urban Planning & Site Reconnaissance',
		title: 'Site Survey & Dhaka Urban Context',
		subtitle: 'Urban plot establishment along Gulshan Avenue commercial corridor, Dhaka',
		elevation: '+0.000m DATUM',
		datumCoord: 'BM-01 // 23.7937°N 90.4066°E',
		keyMetric: {
			label: 'Site Boundary Area',
			value: '3,850 m² Commercial Plot',
			tolerance: '±5mm geodetic boundary'
		},
		specs: [
			{ label: 'Location', value: 'Gulshan Avenue, Dhaka, Bangladesh' },
			{ label: 'Sub-Soil Profile', value: 'Madhupur Clay over Dense Sand' },
			{ label: 'Proposed FFL', value: '+1.200m above road level' },
			{ label: 'Regulatory Code', value: 'RAJUK & BNBC 2020 Compliant' }
		],
		engineeringNote:
			'Establishing primary site control network with Leica Nova MS60 scanning total station. Boundary tied to Survey of Bangladesh (SOB) geodetic pillars along the commercial road frontage.',
		cameraPosition: { x: 24, y: 12, z: 32 },
		cameraTarget: { x: 0, y: 2, z: 5 }
	},
	{
		index: 1,
		stageNumber: '02',
		discipline: 'Surveying & Geomatics',
		title: 'Site Survey & Benchmark Datum',
		subtitle: 'Total station topographic triangulation and geotechnical borehole array',
		elevation: '+0.000m DATUM',
		datumCoord: 'BENCHMARK +0.000 // FFL +1.200m',
		keyMetric: {
			label: 'Standard Penetration',
			value: 'N₆₀ = 28-42 blows/ft',
			tolerance: '±3mm survey closure'
		},
		specs: [
			{ label: 'Grid Lines', value: 'Grid A-E (Transverse) / 1-5 (Longitudinal)' },
			{ label: 'Borehole Array', value: '12 exploratory boreholes to 45m' },
			{ label: 'Groundwater Table', value: '-4.200m below existing GL' },
			{ label: 'Seismic Zone', value: 'Zone 2 (PGA = 0.20g)' }
		],
		engineeringNote:
			'Benchmark datum established on concrete pillar monument. Grid lines A through E and 1 through 5 laid out with laser total station across the 36m x 26m building footprint.',
		cameraPosition: { x: 18, y: 6, z: 24 },
		cameraTarget: { x: 2, y: 1, z: 8 }
	},
	{
		index: 2,
		stageNumber: '03',
		discipline: 'Architectural Engineering',
		title: 'Architectural Concept & CAD Footprint',
		subtitle:
			'2D technical floor plans and structural grid generating the commercial retail volume',
		elevation: '+1.200m FFL',
		datumCoord: 'CAD-LAYER // ARCH-FP-01',
		keyMetric: {
			label: 'Retail Footprint',
			value: '936 m² per floor (36m x 26m)',
			tolerance: 'Bay span 8.0m x 8.0m'
		},
		specs: [
			{ label: 'Building Typology', value: '7-Story Commercial Shopping Mall' },
			{ label: 'Central Void', value: '16m x 10m Multi-Story Atrium' },
			{ label: 'Vertical Cores', value: 'Twin RCC elevator & fire stair shafts' },
			{ label: 'Entrance Canopy', value: 'Double-height vehicular drop-off' }
		],
		engineeringNote:
			'AutoCAD and MicroStation floor layouts coordinated with BNBC egress widths. The 8m x 8m column grid provides unobstructed retail sightlines around the central atrium void.',
		cameraPosition: { x: 10, y: 22, z: 22 },
		cameraTarget: { x: 0, y: 1, z: 0 }
	},
	{
		index: 3,
		stageNumber: '04',
		discipline: 'Digital Engineering & VDC',
		title: 'Revit BIM Coordination & Exploded Model',
		subtitle: 'Federated multidisciplinary model: architecture, RCC frame, and primary MEP systems',
		elevation: '+26.000m MODEL ROOF',
		datumCoord: 'BIM-FEDERATION // LOD 400',
		keyMetric: {
			label: 'Clash Audit',
			value: '0 Hard Interferences',
			tolerance: 'Navisworks 100% verified'
		},
		specs: [
			{ label: 'Discipline Integration', value: 'Architecture + RCC Structure + MEP' },
			{ label: 'Clash Resolution', value: 'Duct-to-beam conflicts eliminated' },
			{ label: 'Modeling Standard', value: 'ISO 19650 openBIM IFC4' },
			{ label: 'Exploded View', value: 'Layered vertical system separation' }
		],
		engineeringNote:
			'Signature exploded BIM coordination view separates roof terrace, glass curtain wall, floor slabs, RCC column matrix, and MEP routing to demonstrate zero clashes before ground breaking.',
		cameraPosition: { x: 18, y: 20, z: 26 },
		cameraTarget: { x: 0, y: 8, z: 0 }
	},
	{
		index: 4,
		stageNumber: '05',
		discipline: 'Geotechnical & Earth Retention',
		title: 'Subterranean Excavation & Shoring',
		subtitle:
			'Cut to -5.500m formation level for basement parking and mechanical plant with perimeter shoring',
		elevation: '-5.500m BASEMENT FFL',
		datumCoord: 'PIT B1 // FORMATION LEVEL',
		keyMetric: {
			label: 'Excavation Volume',
			value: '14,800 m³ Earthwork',
			tolerance: 'Wall delta < 3mm'
		},
		specs: [
			{ label: 'Basement Function', value: 'Subterranean Customer Parking & Pumps' },
			{ label: 'Shoring System', value: 'Contiguous bored pile retention wall' },
			{ label: 'Dewatering System', value: 'Perimeter deep-well sump pumps' },
			{ label: 'Excavation Ramp', value: '1:7 slope south access ramp' }
		],
		engineeringNote:
			'Excavation cut to -5.50m formation level with continuous inclinometer monitoring of adjacent structures. Stepped earth berms and dewatering wells maintain stable slope equilibrium.',
		cameraPosition: { x: 16, y: 7, z: 20 },
		cameraTarget: { x: 0, y: -2, z: 2 }
	},
	{
		index: 5,
		stageNumber: '06',
		discipline: 'Deep Foundation Engineering',
		title: 'Bored Piling & Reinforced Raft Foundation',
		subtitle:
			'Cast-in-place concrete piles, rebar cages, monolithic pile caps, and perimeter tie beams',
		elevation: '-24.000m PILE TOE',
		datumCoord: 'PILE GRID 4x4 // 16 PRINCIPAL GROUPS',
		keyMetric: {
			label: 'Working Pile Capacity',
			value: '3,800 kN per Ø1000 pile',
			tolerance: 'Plumbness 1:120'
		},
		specs: [
			{ label: 'Pile Dimension', value: 'Ø1,000mm bored cast-in-place' },
			{ label: 'Embedment Depth', value: '24.0m into dense silty sand' },
			{ label: 'Raft Thickness', value: '1,400mm monolithic C35 concrete' },
			{ label: 'Waterproofing', value: 'SBS torch-on membrane beneath blinding' }
		],
		engineeringNote:
			'16 principal pile clusters connected by 1200x800mm reinforced concrete grade tie beams and a monolithic raft foundation designed to resist hydrostatic uplift and differential settlement.',
		cameraPosition: { x: 10, y: 6.5, z: 18 },
		cameraTarget: { x: 0, y: -1, z: 2 }
	},
	{
		index: 6,
		stageNumber: '07',
		discipline: 'Reinforced Concrete Structure',
		title: 'RCC Structural Frame (Levels 1–6)',
		subtitle:
			'Heavy reinforced concrete columns, moment-resisting transfer beams, and central lift shear core',
		elevation: '+24.800m ROOF BEAM LEVEL',
		datumCoord: 'RCC FRAME // C40 CONCRETE',
		keyMetric: {
			label: 'Compressive Strength',
			value: "f'c = 40 MPa (5,800 psi)",
			tolerance: 'Vertical plumb ±4mm'
		},
		specs: [
			{ label: 'Column Size', value: '800mm x 800mm RCC tied columns' },
			{ label: 'Shear Wall Core', value: '300mm double-curtain rebar core' },
			{ label: 'Floor-to-Floor', value: '4.2m Ground / 3.8m Upper Retail' },
			{ label: 'Moment Frame', value: 'Special Moment Resisting Frame (SMRF)' }
		],
		engineeringNote:
			'Dual structural system: concrete moment frames resist gravity while central shear cores absorb seismic and tropical cyclone wind lateral shears, framed around the central open atrium void.',
		cameraPosition: { x: 14, y: 14, z: 22 },
		cameraTarget: { x: 0, y: 6, z: 0 }
	},
	{
		index: 7,
		stageNumber: '08',
		discipline: 'Structural Slabs & Cantilevers',
		title: 'Post-Tensioned Slabs & Diaphragms',
		subtitle:
			'Post-tensioned horizontal diaphragms with central atrium cutout and entrance canopy projection',
		elevation: '+21.000m LEVEL 6 SLAB',
		datumCoord: 'SLAB DIAPHRAGM // THK 225mm',
		keyMetric: {
			label: 'Atrium Opening',
			value: '16.0m x 10.0m Clear Void',
			tolerance: 'Deflection < L/480'
		},
		specs: [
			{ label: 'Slab System', value: '225mm unbonded post-tensioned flat plate' },
			{ label: 'Drop Panels', value: '2.4m x 2.4m x 150mm thick at columns' },
			{ label: 'Entrance Canopy', value: '5.5m cantilevered steel-concrete frame' },
			{ label: 'Roof Slab', value: '250mm insulated waterproof deck' }
		],
		engineeringNote:
			'Monolithic post-tensioned slabs span 8m bays with drop panels preventing punching shear. The central 16m x 10m opening forms the public atrium volume through all retail levels.',
		cameraPosition: { x: 16, y: 18, z: 24 },
		cameraTarget: { x: 0, y: 9, z: 0 }
	},
	{
		index: 8,
		stageNumber: '09',
		discipline: 'Building Envelope & Solar Control',
		title: 'Curtain Wall Facade & Solar Louver Fins',
		subtitle:
			'Double-glazed commercial storefront glazing with vertical aluminum sun louvers and canopy',
		elevation: '+24.800m PARAPET TOP',
		datumCoord: 'ENVELOPE // LOW-E IGU + BRISE-SOLEIL',
		keyMetric: {
			label: 'Solar Heat Gain',
			value: 'SHGC = 0.28 (Louver Block 45%)',
			tolerance: 'Wind suction 2.2 kPa'
		},
		specs: [
			{ label: 'Curtain Wall', value: 'Double-glazed 28mm Low-E structural glass' },
			{ label: 'Solar Louvers', value: 'Architectural champagne aluminum vertical fins' },
			{ label: 'Spandrel Panels', value: '4mm PVDF coated aluminum composite' },
			{ label: 'Entrance Canopy', value: 'Laminated glass & structural steel overhang' }
		],
		engineeringNote:
			'Vertical aluminum fins tuned to Dhaka’s sun angles minimize solar heat gain along the southwest facade while preserving clear visibility into multi-level retail storefronts.',
		cameraPosition: { x: 12, y: 14, z: 21 },
		cameraTarget: { x: 0, y: 8, z: 4 }
	},
	{
		index: 9,
		stageNumber: '10',
		discipline: 'Mechanical, Electrical & Piping',
		title: 'MEP Infrastructure & Rooftop Chiller Plant',
		subtitle:
			'Central chilled water HVAC plant, electrical busducts, fire sprinklers, and rooftop cooling towers',
		elevation: '+27.500m ROOFTOP PLANT',
		datumCoord: 'MEP-CHILLER // 1,200 TR PLANT',
		keyMetric: {
			label: 'Cooling Capacity',
			value: '1,200 Tons Refrigeration (TR)',
			tolerance: 'Noise < 55 dBA at boundary'
		},
		specs: [
			{ label: 'Chiller Equipment', value: 'Twin centrifugal water-cooled chillers' },
			{ label: 'Cooling Towers', value: 'Induced-draft crossflow towers on roof' },
			{ label: 'Air Handling', value: 'Floor-by-floor VAV AHU compartments' },
			{ label: 'Emergency Power', value: '1,500 kVA standby diesel generator' }
		],
		engineeringNote:
			'Cinematic MEP X-Ray reveals the internal ductwork distribution beneath floor slabs. Rooftop acoustic screens house cooling towers and chillers with vibration-isolated inertia bases.',
		cameraPosition: { x: 8, y: 15, z: 18 },
		cameraTarget: { x: 0, y: 9, z: 2 }
	},
	{
		index: 10,
		stageNumber: '11',
		discipline: 'Commercial Interior Architecture',
		title: 'Multi-Level Central Atrium & Escalators',
		subtitle:
			'Grand central public atrium with crisscrossing escalators, retail shopfronts, and polished terrazzo',
		elevation: '+5.400m LEVEL 2 ATRIUM',
		datumCoord: 'INTERIOR ATRIUM // PUBLIC COMMERCE',
		keyMetric: {
			label: 'Vertical Mobility',
			value: '6,000 Persons / hr Escalators',
			tolerance: 'Balustrade load 1.5 kN/m'
		},
		specs: [
			{ label: 'Atrium Height', value: '6 floors open volume with natural skylight' },
			{ label: 'Escalators', value: 'Heavy-duty commercial glass-balustrade units' },
			{ label: 'Flooring', value: 'Epoxy terrazzo with brass movement joints' },
			{ label: 'Shopfronts', value: 'Frameless 12mm tempered retail display glass' }
		],
		engineeringNote:
			'Camera enters the double-height entrance and looks up through the atrium. Crisscrossing escalators link retail levels, illuminated by recessed linear LEDs and perimeter storefront lights.',
		cameraPosition: { x: 0, y: 4.8, z: 6.0 },
		cameraTarget: { x: 0, y: 7.2, z: -1.5 }
	},
	{
		index: 11,
		stageNumber: '12',
		discipline: 'Civil Infrastructure & Landscape',
		title: 'Civic Entrance Plaza, Canopy & Drop-Off',
		subtitle:
			'Vehicular drop-off driveway, security bollards, pedestrian plaza pavers, and native Dhaka street trees',
		elevation: '+1.200m PLAZA FINISH',
		datumCoord: 'CIVIC PLAZA // GULSHAN FRONTAGE',
		keyMetric: {
			label: 'Pedestrian Capacity',
			value: '1,200 m² Civic Forecourt',
			tolerance: 'Drainage slope 1:80'
		},
		specs: [
			{ label: 'Vehicular Access', value: 'One-way drop-off loop with security booth' },
			{ label: 'Paving System', value: 'Granite cobblestone & interlocking pavers' },
			{ label: 'Security Bollards', value: 'K4 crash-rated retractable stainless bollards' },
			{ label: 'Landscaping', value: 'Native frangipani, date palms & evergreen planters' }
		],
		engineeringNote:
			'Civic forecourt buffers pedestrian circulation from busy Gulshan traffic. The grand entrance canopy shelters arriving visitors, flanked by drought-tolerant native urban greenery.',
		cameraPosition: { x: 14, y: 8, z: 24 },
		cameraTarget: { x: 0, y: 3.5, z: 8 }
	},
	{
		index: 12,
		stageNumber: '13',
		discipline: 'Handover & Commercial Operation',
		title: 'Completed Dhaka Central Mall',
		subtitle:
			'Fully operational commercial landmark with evening facade lighting and vibrant retail presence',
		elevation: '+24.800m COMPLETED ROOF',
		datumCoord: 'COMMISSIONED // AS-BUILT HANDOVER',
		keyMetric: {
			label: 'Gross Built Area',
			value: '7,500 m² Commercial Mall',
			tolerance: '100% BNBC Code Certified'
		},
		specs: [
			{ label: 'Occupancy', value: 'Retail, Fashion, Food Court & Entertainment' },
			{ label: 'Parking Capacity', value: '180 Vehicles in Basement & Surface' },
			{ label: 'Operational Status', value: 'Opened to Public · Full Commissioning' },
			{ label: 'Evening Lighting', value: 'Circadian retail glow & warm facade accents' }
		],
		engineeringNote:
			'Final hero dusk elevation: the completed mall glows against the evening Dhaka sky, displaying its active multi-level atrium, illuminated storefronts, and contemporary architectural brise-soleil.',
		cameraPosition: { x: 22, y: 16, z: 30 },
		cameraTarget: { x: 0, y: 8, z: 4 }
	}
];
