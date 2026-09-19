import type { JournalArticle } from '$lib/types/article';

export const article002: JournalArticle = {
	id: 'art-002',
	slug: 'scan-to-bim-asbuilt-tolerances',
	paperNumber: 'PAPER-2024-02',
	title: 'Scan-to-BIM Point Cloud Registration & LOD 400 As-Built Tolerances',
	abstract:
		'The synthesis of high-density terrestrial laser scanning (TLS) with federated BIM models enables real-time geometric deviation analysis during steel erection and precast concrete placement. This technical report presents statistical error-distribution matrices and automated clash identification scripts deployed across major civic infrastructure projects.',
	publishedDate: 'January 28, 2024',
	category: 'Digital Engineering & VDC',
	readTimeMinutes: 9,
	disciplines: ['BIM LOD 400', 'Laser Scanning', 'Quality Assurance', 'ISO 19650'],
	doi: '10.1016/j.autcon.2023.105190',
	leadAuthor: {
		name: 'Marcus Vance',
		title: 'Principal Structural & BIM Engineer',
		credentials: 'PE, SE, CEng'
	},
	sections: [
		{
			heading: '01. Terrestrial Point Cloud Density & Registration Protocols',
			subheading: 'Eliminating Target Drift Across Subterranean and Multi-Story Sites',
			content: [
				'Accurate verification of structural steel anchor bolts and cast-in embed plates requires survey registration tolerances tighter than ±2.0mm across building footprints exceeding 100 meters.',
				'Deploying dual-axis compensator phase-shift scanners (Leica RTC360 / FARO Focus S350), scan networks were anchored to exterior geodetic control monuments using fixed spherical prism targets, reducing closure error to 0.8mm.'
			]
		},
		{
			heading: '02. Automated Cloud-to-Model Deviation Analysis',
			subheading: 'Color-Mapped Heatmaps for Out-of-Plumb Steel Members',
			content: [
				'Using custom Python scripts leveraging Open3D and Autodesk Revit APIs, point clouds were clipped automatically to bounding boxes of structural elements and compared against nominal LOD 400 geometry.',
				'AISC Code of Standard Practice (COSP) erection tolerances of L/500 were validated programmatically, highlighting out-of-tolerance column splices in chromatic heatmaps within two hours of on-site scanning.'
			]
		}
	],
	references: [
		'AISC 303-22: Code of Standard Practice for Steel Buildings and Bridges.',
		'ISO 19650-2: Organization and digitization of information about buildings and civil engineering works.',
		'buildingSMART: IFC4 Structural Elements Specification Guidelines.'
	]
};

export const article003: JournalArticle = {
	id: 'art-003',
	slug: 'synchronous-hydraulic-bridge-jacking',
	paperNumber: 'PAPER-2023-09',
	title: 'Synchronous Computerized Hydraulic Jacking Under Live Highway Loads',
	abstract:
		'Replacing deteriorated bridge rocker bearings with modern elastomeric and lead-rubber seismic isolators on active viaducts requires sub-millimeter displacement control. This paper details the hydraulic manifold control algorithms, temporary load-transfer frames, and structural monitoring networks utilized during the 48-span Hudson Viaduct rehabilitation.',
	publishedDate: 'September 19, 2023',
	category: 'Heavy Civil Infrastructure',
	readTimeMinutes: 14,
	disciplines: ['Bridge Engineering', 'Hydraulic Systems', 'Live-Load Jacking', 'Seismic Retrofit'],
	doi: '10.1061/(ASCE)BE.1943-5592.0001944',
	leadAuthor: {
		name: 'Marcus Vance',
		title: 'Principal Structural Engineer',
		credentials: 'PE, SE, CEng'
	},
	sections: [
		{
			heading: '01. The Challenge of Live-Traffic Bearing Extraction',
			subheading: 'Dynamic Amplification Factors and Span Deflection Constraints',
			content: [
				'Traditional bridge bearing replacement mandates full lane closures to protect steel plate girders from severe differential twist under live truck impacts. On the Hudson Viaduct, commuter traffic volumes rendered daytime closures impossible.',
				'The engineering challenge was to design a temporary hydraulic jacking bracket affixed directly to existing reinforced concrete pier caps that could lift 850-ton multi-girder spans by exactly 14mm while vehicles traversed the expansion joints above at highway speeds.'
			],
			formula: 'P_jack = 1.30 · D_DL + 1.50 · (L_LL + I_IM) · S_ratio'
		},
		{
			heading: '02. Closed-Loop Programmable Logic Controller (PLC) Hydraulics',
			subheading: 'Multi-Point Equal-Displacement Manifold Automation',
			content: [
				'A 16-channel hydraulic power unit with digital pressure transducers and linear variable differential transformers (LVDTs) was programmed to maintain differential vertical movement between any two adjacent girders under 0.50mm.',
				'When a heavy Class-8 vehicle crossed the span during jacking, high-speed proportional valves compensated within 20 milliseconds, holding the bridge deck strictly level and preventing localized fatigue tearing in the cross-frame welds.'
			]
		}
	],
	references: [
		'AASHTO LRFD Bridge Construction Specifications, 4th Edition.',
		'FHWA-HIF-16-027: Bridge Rehabilitation and Preservation Manual.',
		'Vance, M., and Thorne, D. H. (2023). "Micro-Displacement Synchronous Jacking for Seismic Isolation Upgrades." Transportation Research Record.'
	]
};
