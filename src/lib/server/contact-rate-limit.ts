// Per-process abuse protection. Multi-instance deployments should also use an edge rate limit.
export function createContactRateLimit(limit = 5, windowMs = 10 * 60 * 1000) {
	const attempts = new Map<string, { count: number; expires: number }>();
	return (address: string, now = Date.now()) => {
		for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
		const entry = attempts.get(address);
		if (entry && entry.count >= limit) return Math.max(1, Math.ceil((entry.expires - now) / 1000));
		if (entry) entry.count++;
		else {
			// Fail closed rather than evict active limits when the bounded map is full.
			if (attempts.size >= 5000) return Math.ceil(windowMs / 1000);
			attempts.set(address, { count: 1, expires: now + windowMs });
		}
		return 0;
	};
}

export const contactRetryAfter = createContactRateLimit();
