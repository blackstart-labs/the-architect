import type { PageServerLoad } from './$types';
import { siteOrigin } from '$lib/seo';
export const load: PageServerLoad = ({ url }) => {
	const origin = siteOrigin(url.origin);
	return { canonical: `${origin}/`, socialImage: `${origin}/images/social-residence.webp` };
};
