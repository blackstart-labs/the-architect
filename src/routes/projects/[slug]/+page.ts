import { error } from '@sveltejs/kit';
import { getProjectBySlug, allProjects } from '$content/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, {
			message: `Project dossier '${params.slug}' not found in the engineering archives.`
		});
	}

	const relatedProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 2);

	return {
		project,
		relatedProjects
	};
};
