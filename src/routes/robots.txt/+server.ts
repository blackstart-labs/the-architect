import type { RequestHandler } from './$types';
import { siteOrigin } from '$lib/seo';
export const GET: RequestHandler = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin(url.origin)}/sitemap.xml\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
