import type { Service } from '$lib/types/service';

export const bimDigitalTwin: Service = {
	id: 'srv-002',
	slug: 'bim-digital-twin',
	serviceCode: 'ENG-02',
	title: 'Computational BIM & Digital Twin Engineering',
	tagline:
		'LOD 400 fabrication detailing, multidisciplinary clash resolution, and ISO 19650 compliance.',
	summary:
		'We bridge the gap between design engineering and on-site trade fabrication. Deploying openBIM (IFC4) protocols and custom computational scripts, we eliminate field conflicts before concrete is poured or steel is cut.',
	scopeOverview:
		'Our BIM practice oversees federated multidisciplinary modeling across structural, architectural, MEP, and civil domains. We deliver production-ready fabrication models, automated quantity take-offs, 4D construction schedule sequencing, and COBie asset databases for owners.',
	methodology: [
		'Establishment of project BIM Execution Plan (BEP) in strict alignment with ISO 19650',
		'Automated rule-based geometric clash detection in Navisworks Manage and Solibri',
		'Scan-to-BIM terrestrial laser point cloud registration (FARO / Leica)',
		'Direct-to-CNC parametric interoperability for precast concrete and structural timber',
		'COBie data validation and API integration with enterprise asset management systems'
	],
	deliverables: [
		{
			code: 'DEL-02A',
			title: 'Project BIM Execution Plan (BEP)',
			description:
				'CDE protocols, modeling standards, coordinate datum setup, LOD matrices, and clash resolution frequency.',
			format: 'ISO 19650 Specification Dossier'
		},
		{
			code: 'DEL-02B',
			title: 'LOD 400 Federated IFC Coordination Models',
			description:
				'Fully resolved, zero-clash architectural, structural, and MEP models ready for sub-contractor shop fabrication.',
			format: 'IFC4 / RVT / NWD'
		},
		{
			code: 'DEL-02C',
			title: 'BCF Clash Audit & Issue Resolution Ledger',
			description:
				'Timestamped BIM Collaboration Format (BCF) issue ledger with assigned trade accountability and tracking.',
			format: 'BCF 2.1 / Cloud Tracker'
		}
	],
	standards: [
		{
			code: 'ISO 19650-1 & 2',
			organization: 'ISO',
			title:
				'Organization and digitization of information about buildings and civil engineering works'
		},
		{
			code: 'AIA G202-2020',
			organization: 'AIA',
			title: 'Building Information Modeling Protocol Form'
		},
		{
			code: 'buildingSMART IFC4',
			organization: 'buildingSMART',
			title: 'Industry Foundation Classes Data Standard'
		}
	],
	softwareStack: [
		'Autodesk Revit 2025',
		'Navisworks Manage',
		'Solibri Model Checker',
		'Tekla Structures',
		'Autodesk Construction Cloud (ACC)'
	],
	caseStudySlugs: ['metro-line-4-intermodal-station', 'apex-tower-mass-timber'],
	typicalTimeline: 'Continuous throughout design & construction lifecycle'
};
