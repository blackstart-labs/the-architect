import type { RequestHandler } from './$types';
import { siteOrigin, escapeXml } from '$lib/seo';

export const GET: RequestHandler = ({ url }) => {
	const domain = escapeXml(siteOrigin(url.origin));

	// Only the verified-scope landing experience is part of the public portfolio.
	const allRoutes = [''];

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
