export interface SiteConfig {
	name: string;
	title: string;
	credentials: string; // e.g. "PE, SE, CEng, MICE, LEED AP BD+C"
	firmName: string;
	tagline: string;
	description: string;
	headquarters: {
		city: string;
		stateCountry: string;
		coordinates: string;
		elevation: string;
		address: string;
	};
	contact: {
		email: string;
		phone: string;
		rfqEmail: string;
		availability: string;
	};
	navLinks: Array<{ label: string; href: string; code: string }>;
	socialLinks: Array<{ platform: string; url: string; handle: string }>;
	engineeringCodes: string[];
	softwareLicensing: string[];
}

export interface ExperienceItem {
	id: string;
	period: string;
	role: string;
	company: string;
	location: string;
	summary: string;
	keyProjects: string[];
	responsibilities: string[];
	structuralCodesUsed: string[];
}

export interface Certification {
	title: string;
	issuingBody: string;
	licenseNumber: string;
	activeStatus: string;
	jurisdiction: string;
}

export interface Testimonial {
	id: string;
	author: string;
	title: string;
	firm: string;
	roleType: 'Project Director' | 'Lead Architect' | 'General Contractor' | 'Managing Partner';
	projectName: string;
	year: number;
	quote: string;
	endorsementScope: string;
}
