import { describe, expect, it, vi } from 'vitest';
import { sendInquiry } from './contact';

const input = {
	name: 'Test owner',
	email: 'owner@example.com',
	message: 'Residential coordination in Dhaka.',
	botcheck: ''
};
describe('Web3Forms inquiry delivery', () => {
	it('validates input and spam traps before contacting the provider', async () => {
		const transport = vi.fn<typeof fetch>();
		for (const invalid of [
			{ ...input, email: 'invalid' },
			{ ...input, name: ' ' },
			{ ...input, message: '' },
			{ ...input, botcheck: 'spam' }
		])
			expect((await sendInquiry(invalid, 'test-key', transport)).status).toBe(400);
		expect(transport).not.toHaveBeenCalled();
	});
	it('fails safely when no private key is configured', async () => {
		const transport = vi.fn<typeof fetch>();
		expect((await sendInquiry(input, undefined, transport)).status).toBe(503);
		expect(transport).not.toHaveBeenCalled();
	});
	it('sends the key only in the server-to-provider request and requires confirmed success', async () => {
		const transport = vi
			.fn<typeof fetch>()
			.mockResolvedValue(new Response(JSON.stringify({ success: true })));
		const result = await sendInquiry(input, 'private-test-key', transport);
		expect(result.status).toBe(200);
		expect(JSON.parse(String(transport.mock.calls[0][1]?.body))).toMatchObject({
			...input,
			access_key: 'private-test-key'
		});
		expect(JSON.stringify(result)).not.toContain('private-test-key');
	});
	it('never reports success for a rejected, malformed or unreachable provider response', async () => {
		for (const response of [
			new Response(JSON.stringify({ success: false }), { status: 200 }),
			new Response(JSON.stringify({ success: true }), { status: 400 }),
			new Response('not json')
		]) {
			expect(
				(await sendInquiry(input, 'test-key', vi.fn<typeof fetch>().mockResolvedValue(response)))
					.status
			).toBe(502);
		}
		expect(
			(
				await sendInquiry(
					input,
					'test-key',
					vi.fn<typeof fetch>().mockRejectedValue(new Error('network'))
				)
			).status
		).toBe(502);
	});
});
