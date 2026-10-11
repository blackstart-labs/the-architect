import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { sendInquiry } from '$lib/server/contact';
import { contactRetryAfter } from '$lib/server/contact-rate-limit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url, getClientAddress }) => {
	if (request.headers.get('origin') !== url.origin)
		return json(
			{ success: false, message: 'Please send your inquiry from this website.' },
			{ status: 403 }
		);
	if (!request.headers.get('content-type')?.startsWith('application/json'))
		return json({ success: false, message: 'Invalid request format.' }, { status: 415 });
	const text = await request.text();
	if (text.length > 20000)
		return json({ success: false, message: 'Your inquiry is too long.' }, { status: 413 });
	let input: unknown;
	try {
		input = JSON.parse(text);
	} catch {
		return json({ success: false, message: 'Invalid inquiry.' }, { status: 400 });
	}
	const retryAfter = contactRetryAfter(getClientAddress());
	if (retryAfter)
		return json(
			{
				success: false,
				message: 'Too many inquiries. Please wait a few minutes before trying again.'
			},
			{ status: 429, headers: { 'Retry-After': String(retryAfter), 'Cache-Control': 'no-store' } }
		);
	const result = await sendInquiry(input, env.WEB3FORMS_ACCESS_KEY);
	return json(
		{ success: result.status === 200, message: result.message },
		{ status: result.status, headers: { 'Cache-Control': 'no-store' } }
	);
};
