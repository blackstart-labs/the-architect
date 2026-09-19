import type { Service } from '$lib/types/service';

export const civilInfrastructure: Service = {
	id: 'srv-003',
	slug: 'civil-infrastructure',
	serviceCode: 'ENG-03',
	title: 'Heavy Civil Infrastructure & Bridge Engineering',
	tagline: 'Viaduct analysis, marine structures, stormwater hydraulics, and transport networks.',
	summary:
		'We design robust civil engineering infrastructure engineered for 100-year lifespans. Our expertise spans multi-span highway viaducts, marine offshore jetties, deep drainage conduits, and multimodal transit hubs.',
	scopeOverview:
		'We provide complete civil and bridge engineering services including hydrologic modeling, bridge live load rating (AASHTO HL-93), retaining wall design, utility relocation coordination, and heavy pavement structural analysis.',
	methodology: [
		'AASHTO LRFD multi-span bridge deck finite element modeling',
		'Hydrologic stormwater modeling and 100-year flood inundation analysis',
		'Staged erection analysis for post-tensioned segmental concrete box girders',
		'Soil-structure interaction (SSI) modeling for abutments and bridge piers',
		'Comprehensive life-cycle durability and chloride penetration modeling'
	],
	deliverables: [
		{
			code: 'DEL-03A',
			title: 'Bridge Structural Design & Load Rating Report',
			description:
				'AASHTO HL-93 design load rating, fatigue checks, deflection envelopes, and thermal movement calculations.',
			format: 'Technical Report / AASHTO BrR'
		},
		{
			code: 'DEL-03B',
			title: 'Civil Grading, Utility & Alignment Plans',
			description:
				'Full civil package including horizontal/vertical alignments, cross-sections, cut/fill earthwork volumes, and drainage schematics.',
			format: 'Civil 3D / DWG / PDF'
		}
	],
	standards: [
		{
			code: 'AASHTO LRFD Bridge 9th Ed.',
			organization: 'AASHTO',
			title: 'LRFD Bridge Design Specifications'
		},
		{
			code: 'AREMA Manual',
			organization: 'AREMA',
			title: 'American Railway Engineering and Maintenance-of-Way'
		},
		{
			code: 'DNVGL-ST-0126',
			organization: 'DNV GL',
			title: 'Support Structures for Offshore Wind Turbines and Marine Plants'
		}
	],
	softwareStack: [
		'Autodesk Civil 3D',
		'Bentley OpenBridge Modeler',
		'MIDAS Civil',
		'HEC-RAS Hydraulic Modeling'
	],
	caseStudySlugs: ['hudson-viaduct-seismic-retrofit', 'calypso-deepwater-terminal'],
	typicalTimeline: '12 to 36 Weeks per capital project phase'
};

export const seismicRetrofitting: Service = {
	id: 'srv-004',
	slug: 'seismic-retrofitting',
	serviceCode: 'ENG-04',
	title: 'Seismic Evaluation & Base Isolation Retrofitting',
	tagline: 'ASCE 41 nonlinear pushover analysis, lead-rubber bearings, and fluid viscous dampers.',
	summary:
		'We protect critical infrastructure, historic landmarks, and essential facilities from catastrophic seismic events. By integrating state-of-the-art base isolation and supplemental damping systems, we keep facilities operational immediately following major earthquakes.',
	scopeOverview:
		'We perform ASCE 41-17 Tier 1, 2, and 3 seismic evaluations of existing structures, designing targeted interventions such as buckling-restrained braced frames (BRBF), carbon-fiber polymer (CFRP) column jackets, and elastomer base isolation assemblies.',
	methodology: [
		'Site-specific ground motion hazard characterization and synthetic record scaling',
		'Nonlinear static pushover and nonlinear dynamic time-history analysis (NDTHA)',
		'Component-level fragility curve development and FEMA P-58 loss assessment',
		'Design of customized lead-rubber bearings (LRBs) and viscous wall dampers',
		'Micro-displacement live jacking plans and shoring design for occupied retrofits'
	],
	deliverables: [
		{
			code: 'DEL-04A',
			title: 'ASCE 41-17 Seismic Vulnerability Dossier',
			description:
				'Identification of collapse mechanisms, deficient beam-column joints, soft-story vulnerabilities, and retrofit alternatives.',
			format: 'Engineering Assessment Dossier'
		},
		{
			code: 'DEL-04B',
			title: 'Base Isolation Specification & Bearing Schedules',
			description:
				'Elastomer formulation properties, lead core shear moduli, vertical stiffness tolerances, and cyclic testing protocols.',
			format: 'AASHTO/ASCE Specification'
		}
	],
	standards: [
		{
			code: 'ASCE 41-17',
			organization: 'ASCE',
			title: 'Seismic Evaluation and Retrofit of Existing Buildings'
		},
		{
			code: 'FEMA P-58',
			organization: 'FEMA',
			title: 'Seismic Performance Assessment of Buildings'
		},
		{
			code: 'AASHTO Guide Spec for Seismic Isolation',
			organization: 'AASHTO',
			title: 'Guide Specifications for Seismic Isolation Design'
		}
	],
	softwareStack: [
		'Perform-3D',
		'CSI ETABS Nonlinear',
		'OpenSees Finite Element Framework',
		'SeismoSignal'
	],
	caseStudySlugs: ['hudson-viaduct-seismic-retrofit'],
	typicalTimeline: '6 to 18 Weeks'
};

export const geotechnicalFoundation: Service = {
	id: 'srv-005',
	slug: 'geotechnical-foundation',
	serviceCode: 'ENG-05',
	title: 'Geotechnical Engineering & Deep Substructures',
	tagline: 'Deep retaining walls, secant shoring, socketed pile groups, and foundation mats.',
	summary:
		'We engineer the subterranean interface where superstructures meet challenging geological formations. From deep excavations in high-density urban settings to offshore marine foundations and rock anchors, we ensure total ground stability.',
	scopeOverview:
		'Our geotechnical and substructure engineering covers deep excavation shoring (secant, diaphragm, tangent pile walls), tieback anchor design, settlement risk assessments for adjacent heritage buildings, and high-capacity pile group optimizations.',
	methodology: [
		'Plaxis 2D/3D geotechnical finite element soil-structure interaction analysis',
		'Deformation prediction of multi-strutted deep urban excavation pits',
		'Pile driving dynamics and Osterberg cell high-strain proof load evaluation',
		'Hydrogeological seepage modeling and subterranean dewatering recharge design',
		'Real-time geotechnical instrumentation (piezometers, inclinometers, AMTS)'
	],
	deliverables: [
		{
			code: 'DEL-05A',
			title: 'Geotechnical Baseline & Foundation Design Report (GBR)',
			description:
				'Geological strata cross-sections, groundwater regimes, allowable bearing capacities, and pile socket parameters.',
			format: 'Technical Report / GBR'
		},
		{
			code: 'DEL-05B',
			title: 'Excavation Support System (SOE) Drawing Sets',
			description:
				'Secant wall layouts, tieback anchor angles, waler beam schedules, corner strut details, and instrumentation plans.',
			format: 'Civil / Structural DWG & PDF'
		}
	],
	standards: [
		{ code: 'FHWA-NHI-16-072', organization: 'FHWA', title: 'Micropile Design and Construction' },
		{ code: 'AASHTO LRFD Substructure', organization: 'AASHTO', title: 'Section 10 Foundations' },
		{ code: 'Eurocode 7 (EN 1997)', organization: 'CEN', title: 'Geotechnical Design' }
	],
	softwareStack: [
		'Plaxis 2D / 3D',
		'GEO5 Retaining Wall Suite',
		'LPile / Group 2024',
		'GeoStudio SEEP/W'
	],
	caseStudySlugs: ['nordic-geothermal-substructure', 'apex-tower-mass-timber'],
	typicalTimeline: '8 to 20 Weeks'
};

export const constructionSupervision: Service = {
	id: 'srv-006',
	slug: 'construction-supervision',
	serviceCode: 'ENG-06',
	title: 'Construction Administration & Site Supervision',
	tagline: 'On-site technical surveillance, shop drawing review, and structural peer review.',
	summary:
		'High-performance designs require uncompromising on-site execution. We provide rigorous construction administration, verifying that reinforcing steel, concrete batching, structural welding, and post-tensioning strictly adhere to engineering intent.',
	scopeOverview:
		'Our team acts as the engineer of record (EOR) on-site, managing submittals, requests for information (RFIs), structural steel shop drawing audits, concrete cylinder break test evaluations, and non-conformance reports (NCRs).',
	methodology: [
		'Rapid electronic shop drawing and RFI turnaround via Procore / BIM 360',
		'On-site pre-pour reinforcement placement, rebar lap length, and cover inspections',
		'Post-tensioning tendon elongation measurements and hydraulic jack calibration reviews',
		'Ultrasonic and magnetic particle weld examination witnessing',
		'Structural peer review and independent third-party value engineering audits'
	],
	deliverables: [
		{
			code: 'DEL-06A',
			title: 'Site Observation & Non-Conformance Logs',
			description:
				'Daily photographic site inspection reports, rebar sign-off certificates, and deficiency tracking ledgers.',
			format: 'Cloud Log / PDF'
		},
		{
			code: 'DEL-06B',
			title: 'Special Inspection Final Sign-off Certificate',
			description:
				'Formal regulatory sign-off confirming the completed structure matches approved building permit documents.',
			format: 'Official Regulatory Certification'
		}
	],
	standards: [
		{ code: 'IBC Chapter 17', organization: 'ICC', title: 'Special Inspections and Tests' },
		{ code: 'AWS D1.1/D1.1M', organization: 'AWS', title: 'Structural Welding Code — Steel' },
		{ code: 'ACI 301-20', organization: 'ACI', title: 'Specifications for Concrete Construction' }
	],
	softwareStack: [
		'Procore',
		'Autodesk Construction Cloud (ACC)',
		'Bluebeam Revu',
		'Matterport 3D Scanning'
	],
	caseStudySlugs: ['helix-cultural-center-cantilever', 'apex-tower-mass-timber'],
	typicalTimeline: 'Duration of Construction (12 to 36 Months)'
};
