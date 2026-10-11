import { test, expect } from '@playwright/test';

test('homepage has a complete semantic portfolio and crawlable project links', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Rakib Hasan.*Civil Engineer/);
	await expect(page.locator('h1')).toHaveCount(1);
	await expect(page.locator('h1')).toContainText('Building Better.');
	await expect(page.locator('#stage-select option')).toHaveCount(23);
	await expect(page.locator('.project-card')).toHaveCount(3);
	await expect(page.locator('.project-card a[href="#construction-experience"]')).toHaveCount(2);
	await expect(page.locator('html')).toHaveAttribute('lang', 'en-BD');
});

test('project dialog manages focus and Escape correctly', async ({ page }) => {
	await page.goto('/');
	await page.locator('.desktop-nav a[href="#projects"]').click();
	const control = page.getByRole('button', { name: 'View structural & concrete works' });
	await control.click();
	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Close project details' })).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).toHaveCount(0);
	await expect(control).toBeFocused();
});

test('metadata and structured data describe only the real scope', async ({ page, request }) => {
	await page.goto('/');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'http://localhost:4173/'
	);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		/social-residence.webp$/
	);
	const graph = JSON.parse(
		(await page.locator('script[type="application/ld+json"]').textContent()) || '{}'
	)['@graph'];
	expect(graph.map((item: { '@type': string }) => item['@type'])).toEqual([
		'Person',
		'WebSite',
		'VisualArtwork'
	]);
	expect(JSON.stringify(graph)).not.toContain('sameAs');
	const image = await request.get('/images/social-residence.webp');
	expect(image.status()).toBe(200);
});

test('legacy template routes redirect without exposing unverified claims', async ({ request }) => {
	for (const [path, location] of [
		['/about', '/#expertise'],
		['/projects/apex-tower-mass-timber', '/#projects'],
		['/contact', '/#contact']
	]) {
		const response = await request.get(path, { maxRedirects: 0 });
		expect(response.status()).toBe(308);
		expect(response.headers().location).toBe(location);
	}
});

test('unknown routes return a useful real 404', async ({ page }) => {
	const response = await page.goto('/unmapped-coordinate-xyz');
	expect(response?.status()).toBe(404);
	await expect(page.locator('h1')).toHaveText('This page is not on the plan.');
	await expect(page.getByRole('link', { name: 'Return to the portfolio' })).toHaveAttribute(
		'href',
		'/'
	);
});

test('robots and sitemap use the canonical site and do not publish old demo projects', async ({
	request
}) => {
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.status()).toBe(200);
	const xml = await sitemap.text();
	expect(xml).toContain('<loc>http://localhost:4173</loc>');
	expect(xml).not.toContain('apex-tower');
	const robots = await request.get('/robots.txt');
	expect(robots.status()).toBe(200);
	expect(await robots.text()).toContain('Sitemap: http://localhost:4173/sitemap.xml');
});
