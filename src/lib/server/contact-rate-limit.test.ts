import { expect, it } from 'vitest';
import { createContactRateLimit } from './contact-rate-limit';

it('limits repeated attempts, isolates addresses and expires old windows', () => {
	const retryAfter = createContactRateLimit(2, 10000);
	expect(retryAfter('one', 1000)).toBe(0);
	expect(retryAfter('one', 2000)).toBe(0);
	expect(retryAfter('one', 3000)).toBe(8);
	expect(retryAfter('two', 3000)).toBe(0);
	expect(retryAfter('one', 11000)).toBe(0);
});
