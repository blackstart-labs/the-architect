export interface ProjectMetric {
	label: string;
	value: string;
	unit?: string;
	standard?: string;
}

export interface ProjectDrawing {
	title: string;
	sheetNumber: string;
	scale: string;
	discipline: string;
	description: string;
	svgPath?: string;
}

export interface ProjectMedia {
	url: string;
	alt: string;
	caption: string;
	type: 'hero' | 'construction' | 'schematic' | 'detail';
}

export interface ConstructionPhase {
	phaseNumber: string;
	name: string;
	duration: string;
	milestoneDate: string;
	tolerance: string;
	notes: string;
}

export interface Project {
	id: string;
	slug: string;
	projectNumber: string;
	title: string;
	subtitle: string;
	category:
		| 'Commercial High-Rise'
		| 'Infrastructure & Bridges'
		| 'Mass Timber'
		| 'Substructure & Geotechnical'
		| 'Transit & Aviation'
		| 'Seismic Retrofit';
	location: string;
	coordinates: string;
	year: number;
	client: string;
	architect: string;
	role: string;
	area: string;
	floors: number | string;
	duration: string;
	structuralSystem: string;
	foundationType: string;
	seismicZone: string;
	concreteGrade: string;
	steelGrade: string;
	bimLod: string;
	disciplines: string[];
	description: string;
	challenge: string;
	approach: string;
	outcome: string;
	featured: boolean;
	metrics: ProjectMetric[];
	drawings: ProjectDrawing[];
	media: ProjectMedia[];
	phases: ConstructionPhase[];
}
