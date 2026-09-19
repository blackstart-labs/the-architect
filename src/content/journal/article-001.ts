import type { JournalArticle } from '$lib/types/article';

export const article001: JournalArticle = {
	id: 'art-001',
	slug: 'mass-timber-creep-compensation',
	paperNumber: 'PAPER-2024-04',
	title: 'Nonlinear Creep Compensation in Mass Timber Hybrid High-Rise Buildings',
	abstract:
		'Differential vertical axial deformation between stiff reinforced concrete shear cores and viscoelastic mass timber perimeter columns presents significant serviceability challenges in tall hybrid buildings. This paper outlines a predictive analytical methodology using age-dependent creep coefficients and describes the mechanical design of ductile slip-friction drag struts to decouple gravity creep from lateral seismic shear transfer.',
	publishedDate: 'March 14, 2024',
	category: 'Structural Dynamics & Materials',
	readTimeMinutes: 12,
	disciplines: ['Mass Timber', 'Finite Element Analysis', 'Creep & Shrinkage', 'High-Rise Design'],
	doi: '10.1061/(ASCE)ST.1943-541X.0003892',
	leadAuthor: {
		name: 'Marcus Vance',
		title: 'Principal Structural Engineer',
		credentials: 'PE, SE, CEng'
	},
	sections: [
		{
			heading: '01. The Phenomenon of Differential Axial Shortening',
			subheading: 'Comparing Viscoelastic Creep of Glulam Columns with Cured Concrete Cores',
			content: [
				'In hybrid tall building typologies exceeding 20 stories, the central lateral force-resisting system (LFRS) is typically a slip-formed reinforced concrete core, while the gravity framing consists of heavy glue-laminated (glulam) Douglas Fir columns and Cross-Laminated Timber (CLT) floor diaphragms.',
				'While concrete exhibits initial autogenous shrinkage followed by gradual moisture loss and asymptotic creep over 3 to 5 years, mass timber displays pronounced orthotropic rheological behavior governed by ambient relative humidity cycles and sustained axial stress levels.',
				'Without deliberate engineering intervention, cumulative differential vertical settlement can reach 25mm to 40mm at the upper penthouses, creating unacceptable floor slope gradients (> 1:250) and inducing severe secondary flexural shears into floor framing connections.'
			],
			formula: 'ε_total(t) = σ_0 / E_0 · [1 + φ(t, t_0)] + ε_sh(t) + ε_th(t)'
		},
		{
			heading: '02. Predictive Analytical Modeling Workflow',
			subheading: 'Coupled Nonlinear Time-History Staging in CSI ETABS',
			content: [
				'To accurately forecast settlement envelopes, construction staging analyses must model column erection sequence, floor dead load increments, core slip-form casting schedules, and seasonal humidity fluctuations.',
				'Our framework uses Eurocode 5 creep factors adapted for Pacific Northwest coastal climatic data, running 120 discrete staged loading iterations over a 30-year design simulation horizon.'
			],
			technicalNotes: [
				'Glulam axial elastic modulus E_mean = 12,500 MPa with creep factor φ_def = 0.60',
				"Concrete core compressive strength f'c = 60 MPa with ACI 209R shrinkage parameters",
				'Permissible angular distortion limit established at β = 1/500 to protect interior glass demising walls'
			]
		},
		{
			heading: '03. Mechanical Decoupling via Slotted Belleville Dampers',
			subheading: 'Hardware Implementation at Core-to-Diaphragm Drag Struts',
			content: [
				'Rather than attempting to rigidly tie mass timber girders into the concrete core and accepting massive secondary moments, we engineered a slotted slip-friction connection incorporating Belleville disc spring washers.',
				'Under gravity creep movements, the connection slips smoothly with controlled frictional resistance (μ = 0.32), absorbing vertical differential displacement without distress. However, under lateral seismic or wind events exceeding 180 kN, the Belleville spring stack engages dynamically, locking the diaphragm into the core to transmit full diaphragmatic shear into the shear walls.'
			]
		}
	],
	references: [
		'ASCE 7-22: Minimum Design Loads and Associated Criteria for Buildings and Other Structures.',
		'Eurocode 5: Design of Timber Structures — Part 1-1: General Rules and Rules for Buildings (EN 1995-1-1).',
		'Vance, M., and Rostova, E. (2024). "Serviceability Metrics in 30+ Story Hybrid Mass Timber Edifices." Journal of Structural Engineering, 150(4).'
	]
};
