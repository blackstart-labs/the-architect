export interface ServiceDeliverable {
	code: string;
	title: string;
	description: string;
	format: string;
}

export interface ServiceStandard {
	code: string;
	organization: string;
	title: string;
}

export interface Service {
	id: string;
	slug: string;
	serviceCode: string;
	title: string;
	tagline: string;
	summary: string;
	scopeOverview: string;
	methodology: string[];
	deliverables: ServiceDeliverable[];
	standards: ServiceStandard[];
	softwareStack: string[];
	caseStudySlugs: string[];
	typicalTimeline: string;
}
