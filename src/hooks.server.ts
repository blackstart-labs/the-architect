import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	// Keep earlier template source without publishing its unverified identity and claims.
	const legacy: Record<string, string> = {
		about: 'expertise',
		experience: 'expertise',
		services: 'expertise',
		process: 'construction-experience',
		projects: 'projects',
		journal: 'expertise',
		contact: 'contact'
	};
	const section = legacy[event.url.pathname.split('/')[1]];
	if (section) redirect(308, `/#${section}`);
	const response = await resolve(event);

	// Security Headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
	);

	// Production CSP Compatible with WebGL and Google Fonts
	response.headers.set(
		'Content-Security-Policy',
		`default-src 'self'; script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; connect-src 'self'${dev ? ' ws: wss:' : ''}; frame-ancestors 'none'; base-uri 'self'; object-src 'none';`
	);
	if (event.url.pathname !== '/' && !event.url.pathname.startsWith('/_app/')) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	return response;
};
