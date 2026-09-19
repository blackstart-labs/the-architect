import { error } from '@sveltejs/kit';
import { getServiceBySlug } from '$content/services';
import { allProjects } from '$content/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const service = getServiceBySlug(params.slug);

	if (!service) {
		throw error(404, {
			message: `Engineering service '${params.slug}' not found in the capability directory.`
		});
	}

	const relevantProjects = allProjects.filter((p) => service.caseStudySlugs.includes(p.slug));

	return {
		service,
		relevantProjects
	};
};
