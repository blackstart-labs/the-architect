import { allProjects } from '$content/projects';
import { allServices } from '$content/services';
import { allArticles } from '$content/journal';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const domain = url.origin;

	const staticRoutes = [
		'',
		'/about',
		'/projects',
		'/services',
		'/process',
		'/experience',
		'/journal',
		'/contact'
	];

	const projectRoutes = allProjects.map((p) => `/projects/${p.slug}`);
	const serviceRoutes = allServices.map((s) => `/services/${s.slug}`);
	const articleRoutes = allArticles.map((a) => `/journal/${a.slug}`);

	const allRoutes = [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...articleRoutes];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(path) => `  <url>
    <loc>${domain}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.startsWith('/projects') ? '0.8' : '0.7'}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
