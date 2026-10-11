import { env } from '$env/dynamic/private';

export function siteOrigin(requestOrigin: string) {
	const origin = new URL(env.PUBLIC_SITE_URL || env.ORIGIN || requestOrigin);
	if (!['http:', 'https:'].includes(origin.protocol))
		throw new Error('Site origin must use HTTP or HTTPS');
	return origin.origin;
}
export function escapeXml(value: string) {
	return value.replace(
		/[<>&"']/g,
		(character) =>
			({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!
	);
}
