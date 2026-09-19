import type { Service } from '$lib/types/service';
import { structuralEngineering } from './structural-engineering';
import { bimDigitalTwin } from './bim-digital-twin';
import {
	civilInfrastructure,
	seismicRetrofitting,
	geotechnicalFoundation,
	constructionSupervision
} from './civil-infrastructure';

export const allServices: Service[] = [
	structuralEngineering,
	bimDigitalTwin,
	civilInfrastructure,
	seismicRetrofitting,
	geotechnicalFoundation,
	constructionSupervision
];

export function getAllServices(): Service[] {
	return allServices;
}

export function getServiceBySlug(slug: string): Service | undefined {
	return allServices.find((s) => s.slug === slug);
}
