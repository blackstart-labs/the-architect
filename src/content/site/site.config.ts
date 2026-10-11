import type { SiteConfig } from '$lib/types/site';

export const siteConfig: SiteConfig = {
	name: 'Marcus Vance',
	title: 'Principal Structural & BIM Engineer',
	credentials: 'PE, SE, CEng, MICE, LEED AP BD+C',
	firmName: 'Vance Engineering & BIM Consultancy',
	tagline:
		'Precision structural analysis, computational BIM, and resilient infrastructure engineering.',
	description:
		'Commercial-grade engineering consultancy specializing in performance-based seismic design, mass timber hybrid framing, deep substructure retaining systems, and ISO 19650 Level 3 BIM digital twins.',
	headquarters: {
		city: 'Dhaka',
		stateCountry: 'Bangladesh',
		coordinates: '23.7937° N, 90.4066° E',
		elevation: '+8.500m DATUM',
		address: 'Gulshan Avenue, Circle-2, Dhaka 1212, Bangladesh'
	},
	contact: {
		email: 'contact@vance-engineering.com.bd',
		phone: '+880 1711-000000',
		rfqEmail: 'proposals@vance-engineering.com.bd',
		availability:
			'Currently accepting prime structural engineering commissions and peer reviews in Bangladesh.'
	},
	navLinks: [
		{ label: 'Projects', href: '/projects', code: '01' },
		{ label: 'Services', href: '/services', code: '02' },
		{ label: 'Process', href: '/process', code: '03' },
		{ label: 'Studio', href: '/about', code: '04' },
		{ label: 'Insights', href: '/journal', code: '05' },
		{ label: 'Contact', href: '/contact', code: '06' }
	],
	socialLinks: [
		{
			platform: 'LinkedIn',
			url: 'https://linkedin.com/in/marcus-vance-pe',
			handle: 'in/marcus-vance-pe'
		},
		{ platform: 'GitHub', url: 'https://github.com/vance-structural', handle: 'vance-structural' },
		{
			platform: 'ResearchGate',
			url: 'https://researchgate.net/profile/Marcus-Vance',
			handle: 'Marcus-Vance'
		}
	],
	engineeringCodes: [
		'BNBC 2020 (Bangladesh National Building Code)',
		'ACI 318-19 (Building Code Requirements for Structural Concrete)',
		'AISC 360-22 (Structural Steel Buildings)',
		'ASCE 7-22 (Minimum Design Loads)',
		'RAJUK Building Construction Rules',
		'ISO 19650-1/-2 (BIM Information Management)'
	],
	softwareLicensing: [
		'CSI ETABS 21 & SAP2000 v25',
		'Autodesk Revit 2025 & Navisworks Manage',
		'Tekla Structures 2024',
		'Rhino 8 + Grasshopper + Karamba3D',
		'Plaxis 2D/3D (Geotechnical Finite Element)',
		'IDEA StatiCa (Nonlinear Connection Analysis)'
	]
};
