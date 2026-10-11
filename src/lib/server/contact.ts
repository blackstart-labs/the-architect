import { z } from 'zod';

const inquiry = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.email().max(200),
	message: z.string().trim().min(1).max(3000),
	botcheck: z.string().max(0).optional()
});

export async function sendInquiry(
	input: unknown,
	accessKey: string | undefined,
	transport: typeof fetch = fetch
) {
	const parsed = inquiry.safeParse(input);
	if (!parsed.success)
		return {
			status: 400,
			message: 'Please enter a valid name, email address and project description.'
		};
	if (!accessKey)
		return {
			status: 503,
			message: 'Contact delivery is temporarily unavailable. Please try again later.'
		};
	try {
		const response = await transport('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				...parsed.data,
				access_key: accessKey,
				subject: 'Civil engineering portfolio — project inquiry',
				from_name: 'Portfolio project inquiries'
			}),
			signal: AbortSignal.timeout(15000)
		});
		const data: unknown = await response.json();
		if (
			!response.ok ||
			!data ||
			typeof data !== 'object' ||
			!('success' in data) ||
			data.success !== true
		) {
			return { status: 502, message: 'Your inquiry could not be sent. Please try again.' };
		}
		return { status: 200, message: 'Your inquiry has been sent. Thank you for getting in touch.' };
	} catch {
		return { status: 502, message: 'Contact delivery could not be reached. Please try again.' };
	}
}
