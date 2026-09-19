import { test, expect } from '@playwright/test';

test.describe('Engineering Portfolio E2E Verifications', () => {
	test('homepage loads with engineering hero, 3D viewport, and 13 stages', async ({ page }) => {
		await page.goto('/');

		// Check primary header and title
		await expect(page).toHaveTitle(/Marcus Vance/);
		await expect(page.locator('h1')).toContainText('Engineered for');

		// Check 3D container & HUD
		const hud = page.locator('#construction-experience');
		await expect(hud).toBeVisible();
		await expect(page.locator('text=Stage 01 / 13')).toBeVisible();

		// Check phase scrubber buttons
		const stageButtons = page.locator('button[title*="Site Survey"]');
		await expect(stageButtons.first()).toBeVisible();
	});

	test('navigation allows browsing to projects and detailed case study', async ({ page }) => {
		await page.goto('/');

		// Navigate to projects
		await page.click('nav a[href="/projects"]');
		await expect(page).toHaveURL('/projects');
		await expect(page.locator('h2').first()).toBeVisible();

		// Inspect Apex Tower project
		await page.click('a[href="/projects/apex-tower-mass-timber"]');
		await expect(page).toHaveURL('/projects/apex-tower-mass-timber');
		await expect(page.locator('h1')).toContainText('Apex Tower');

		// Check technical specification table
		await expect(page.locator('text=Structural System:').first()).toBeVisible();
		await expect(page.locator('text=SEISMIC CRITERIA')).toBeVisible();
	});

	test('services directory and service detail work properly', async ({ page }) => {
		await page.goto('/services');
		await expect(page.locator('h2').first()).toBeVisible();

		// Click on Performance-Based Structural Engineering
		await page.click('a[href="/services/structural-engineering"]');
		await expect(page).toHaveURL('/services/structural-engineering');
		await expect(page.locator('h1')).toContainText('Performance-Based Structural Engineering');
		await expect(page.locator('text=FORMAL ENGINEERING DELIVERABLES')).toBeVisible();
	});

	test('contact form validates required inputs and submits successfully', async ({ page }) => {
		await page.goto('/contact');
		await expect(page.locator('h3')).toContainText('Request for Qualifications');

		// Attempt submit with empty fields
		await page.click('button[type="submit"]');
		await expect(page.locator('text=Principal or organization name required.')).toBeVisible();

		// Fill in valid data
		await page.fill('#name', 'Dr. Katherine Bell, PE');
		await page.fill('#email', 'k.bell@structural-allies.com');
		await page.fill(
			'#message',
			'Requesting structural peer review for high-rise commercial tower foundation mat.'
		);

		await page.click('button[type="submit"]');

		// Await success screen
		await expect(page.locator('text=Engineering RFQ Received')).toBeVisible({ timeout: 5000 });
		await expect(page.locator('text=Reference Docket:')).toBeVisible();
	});

	test('404 error page renders with architectural blueprint theme on invalid route', async ({
		page
	}) => {
		await page.goto('/unmapped-coordinate-xyz');
		await expect(page.locator('h1')).toContainText('Coordinate Unmapped');
		await expect(page.locator('text=RETURN TO PRIMARY OVERVIEW 00')).toBeVisible();
	});

	test('sitemap.xml and robots.txt are accessible', async ({ request }) => {
		const sitemap = await request.get('/sitemap.xml');
		expect(sitemap.status()).toBe(200);
		const sitemapText = await sitemap.text();
		expect(sitemapText).toContain('<urlset');
		expect(sitemapText).toContain('/projects/apex-tower-mass-timber');

		const robots = await request.get('/robots.txt');
		expect(robots.status()).toBe(200);
		const robotsText = await robots.text();
		expect(robotsText).toContain('Sitemap:');
	});
});
