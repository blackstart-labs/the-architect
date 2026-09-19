import { error } from '@sveltejs/kit';
import { getArticleBySlug, allArticles } from '$content/journal';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticleBySlug(params.slug);

	if (!article) {
		throw error(404, {
			message: `Journal paper '${params.slug}' not found in the technical archives.`
		});
	}

	const otherArticles = allArticles.filter((a) => a.slug !== article.slug);

	return {
		article,
		otherArticles
	};
};
