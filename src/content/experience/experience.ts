import type { ExperienceItem, Certification } from '$lib/types/site';

export const certifications: Certification[] = [
	{
		title: 'Professional Engineer (PE) — Civil / Structural',
		issuingBody: 'The Institution of Engineers, Bangladesh (IEB) & BPERB',
		licenseNumber: 'PE-098421',
		activeStatus: 'Active & In Good Standing',
		jurisdiction: 'Bangladesh'
	},
	{
		title: 'Enlisted Structural Engineer (Category-A)',
		issuingBody: 'Capital Development Authority (RAJUK)',
		licenseNumber: 'RAJUK-SE-54129',
		activeStatus: 'Active & In Good Standing',
		jurisdiction: 'Dhaka, Bangladesh'
	},
	{
		title: 'Chartered Engineer & Fellow (FIEB, CEng)',
		issuingBody: 'Institution of Engineers, Bangladesh (IEB)',
		licenseNumber: 'FIEB-649022',
		activeStatus: 'Fellow Member (FIEB)',
		jurisdiction: 'Bangladesh & International'
	},
	{
		title: 'LEED AP Building Design + Construction (BD+C)',
		issuingBody: 'Green Building Certification Institute (GBCI)',
		licenseNumber: 'LEED-1087431',
		activeStatus: 'Credentialed Professional',
		jurisdiction: 'Bangladesh & International'
	}
];

export const experienceTimeline: ExperienceItem[] = [
	{
		id: 'exp-01',
		period: '2019 — Present',
		role: 'Principal Structural & BIM Engineer',
		company: 'Vance Engineering & BIM Consultancy',
		location: 'Dhaka, Bangladesh',
		summary:
			'Directing an independent structural engineering and computational BIM consultancy in Dhaka. Serving as Engineer of Record (EOR) on major commercial shopping malls, high-rise developments, and deep subterranean foundation systems across Bangladesh.',
		keyProjects: [
			'Dhaka Central Mall 7-Story Commercial Development',
			'Gulshan Commercial Tower Hybrid RCC Frame',
			'Subterranean Multilevel Retention & Raft Foundation'
		],
		responsibilities: [
			'Stamping and sealing structural drawings, BNBC calculation dossiers, and foundation specifications',
			'Overseeing nonlinear response spectrum finite element analyses for wind and seismic actions in Zone 2',
			'Managing federated openBIM LOD 400 coordination workflows and clash resolution matrices',
			'Providing independent structural peer review on complex urban foundations and deep excavations'
		],
		structuralCodesUsed: ['BNBC 2020', 'ACI 318-19', 'AISC 360-22', 'RAJUK Rules', 'ISO 19650']
	},
	{
		id: 'exp-02',
		period: '2014 — 2019',
		role: 'Senior Associate / Lead Structural Specialist',
		company: 'Premier Engineering Consultants',
		location: 'Dhaka, Bangladesh',
		summary:
			'Led multidisciplinary engineering design teams on high-seismicity commercial high-rises, airport terminal roofs, and long-span cable-stayed pedestrian bridges.',
		keyProjects: [
			'Transbay Terminal Transit Center Roof Trusses',
			'Financial District 48-Story Concrete Outrigger Tower',
			'Canary Wharf Crossrail Substructure'
		],
		responsibilities: [
			'Developed nonlinear pushover models in Perform-3D to evaluate building collapse margins',
			'Pioneered computational Grasshopper-to-Revit structural automation pipelines',
			'Managed client relationships with Pritzker-winning architectural design teams'
		],
		structuralCodesUsed: ['ASCE 41-17', 'Eurocode 2, 3 & 8', 'FEMA P-58', 'AISC 341 Seismic']
	},
	{
		id: 'exp-03',
		period: '2009 — 2014',
		role: 'Project Structural Engineer',
		company: 'Thornton Tomasetti',
		location: 'Chicago, IL',
		summary:
			'Performed detailed structural design, wind engineering coordination, and dynamic footfall vibration analysis for sports arenas and tall buildings.',
		keyProjects: [
			'Chicago Riverfront Cantilever Office Structure',
			'NFL Stadium Long-Span Retractable Roof Trusses',
			'Deep Rock-Socketed Foundation Groups'
		],
		responsibilities: [
			'Formulated complex steel connection details with IDEA StatiCa finite element component models',
			'Calculated differential column shortening for supertall concrete and composite columns',
			'Witnessed full-scale wind tunnel boundary layer tests at boundary facilities'
		],
		structuralCodesUsed: ['AISC 360-10', 'ACI 318-08', 'Chicago Building Code', 'AWS D1.1']
	}
];
