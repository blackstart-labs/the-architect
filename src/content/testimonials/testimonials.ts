import type { Testimonial } from '$lib/types/site';

export const testimonials: Testimonial[] = [
	{
		id: 'tst-01',
		author: 'Elena Rostova, AIA',
		title: 'Design Partner',
		firm: 'Mies & Partner Architects',
		roleType: 'Lead Architect',
		projectName: 'Apex Tower Mass Timber',
		year: 2024,
		quote:
			'Marcus Vance bridges the gap between architectural ambition and uncompromising structural rigor. His innovative slip-friction core damper detail resolved 28mm of differential timber creep while preserving our 12-meter open floor plates without heavy perimeter columns.',
		endorsementScope: 'Mass Timber Structural Engineering & Creep Compensation Modeling'
	},
	{
		id: 'tst-02',
		author: 'David H. Thorne, PE',
		title: 'Chief Engineer of Bridges',
		firm: 'State Transportation Authority',
		roleType: 'Project Director',
		projectName: 'Hudson Viaduct Seismic Retrofit',
		year: 2023,
		quote:
			'Jacking 48 active bridge spans under live rush-hour commuter traffic without a millimeter of unexpected differential deflection was a masterclass in synchronous hydraulic engineering. The structural health data matches their finite element model predictions with astounding fidelity.',
		endorsementScope: 'Seismic Evaluation, Hydraulic Jacking Protocols & SHM Sensor Telemetry'
	},
	{
		id: 'tst-03',
		author: 'Jean-Luc Tremblay',
		title: 'Vice President of Construction',
		firm: 'Nordic Infrastructure & Transit JV',
		roleType: 'General Contractor',
		projectName: 'Metro Line 4 Intermodal Station',
		year: 2024,
		quote:
			'The LOD 400 BIM model delivered by Vance Engineering was the cleanest dataset we have ever poured against. Zero clashes on-site between 140 tons of rebar, pre-action fire risers, and structural arch formwork saved us at least eight weeks on the critical excavation path.',
		endorsementScope: 'LOD 400 openBIM Coordination & Rock Cavern Structural Supervision'
	}
];
