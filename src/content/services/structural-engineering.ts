import type { Service } from '$lib/types/service';

export const structuralEngineering: Service = {
	id: 'srv-001',
	slug: 'structural-engineering',
	serviceCode: 'ENG-01',
	title: 'Performance-Based Structural Engineering',
	tagline:
		'High-rise superstructure analysis, nonlinear dynamics, and hybrid framing optimization.',
	summary:
		'We provide primary structural engineering design for commercial towers, long-span civic cantilevers, and complex architectural geometries. Utilizing nonlinear response spectrum finite element modeling, we optimize materials for carbon minimization, seismic resilience, and constructability.',
	scopeOverview:
		'From early-stage conceptual framing comparisons to issued-for-construction (IFC) structural calculations and fabrication drawings, we engineer structures to exceed code baselines for serviceability, footfall vibration, wind drift, and progressive collapse resistance.',
	methodology: [
		'Parametric generative framing options modeling in Rhino/Grasshopper',
		'Three-dimensional nonlinear response history FEA in CSI ETABS and SAP2000',
		'Wind tunnel pressure tap testing and aeroelastic aerodynamic optimization',
		'Embodied carbon life-cycle assessment (LCA) targeting SE2050 commitments',
		'Automated reinforcement scheduling and Tekla structural detailing coordination'
	],
	deliverables: [
		{
			code: 'DEL-01A',
			title: 'Structural Basis of Design Report (BOD)',
			description:
				'Comprehensive design criteria, gravity/lateral load combinations, geotechnical soil-structure assumptions, and code variances.',
			format: 'PDF / Technical Dossier'
		},
		{
			code: 'DEL-01B',
			title: 'Nonlinear Dynamic Calculation Package',
			description:
				'Full computational proof including modal periods, inter-story drift ratios, P-Delta stability, and connection moment capacities.',
			format: 'Mathcad / Python Notebook / PDF'
		},
		{
			code: 'DEL-01C',
			title: 'Signed & Sealed Structural Drawing Sets',
			description:
				'General notes, foundation layouts, core shear wall schedules, column schedules, beam elevations, and connection details.',
			format: 'Revit DWG / PDF / IFC'
		}
	],
	standards: [
		{
			code: 'ASCE 7-22',
			organization: 'ASCE',
			title: 'Minimum Design Loads and Associated Criteria for Buildings'
		},
		{
			code: 'AISC 360-22',
			organization: 'AISC',
			title: 'Specification for Structural Steel Buildings'
		},
		{
			code: 'ACI 318-19',
			organization: 'ACI',
			title: 'Building Code Requirements for Structural Concrete'
		},
		{
			code: 'EN 1992 & EN 1993',
			organization: 'CEN',
			title: 'Eurocode 2 (Concrete) & Eurocode 3 (Steel)'
		}
	],
	softwareStack: [
		'CSI ETABS Ultimate',
		'SAP2000 v25',
		'Rhino 8 + Karamba3D',
		'IDEA StatiCa',
		'AutoCAD / Revit'
	],
	caseStudySlugs: ['apex-tower-mass-timber', 'helix-cultural-center-cantilever'],
	typicalTimeline: '8 to 24 Weeks per design phase'
};
