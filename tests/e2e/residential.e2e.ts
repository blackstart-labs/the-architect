import { test, expect } from '@playwright/test';

test('scroll, reverse scroll and stage jumps stay synchronized', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	await page.locator('#construction-experience').scrollIntoViewIfNeeded();
	await expect(page.locator('.scene-fallback')).toHaveCount(0, { timeout: 15000 });
	await page.locator('#stage-select').selectOption('3');
	await expect(page.locator('.scene-info h2')).toHaveText('Foundation system');
	await page.locator('#stage-select').selectOption('5');
	await expect(page.locator('.scene-info h2')).toHaveText('Repeated floor construction');
	await page.locator('#stage-select').selectOption('14');
	await expect(page.locator('.scene-info h2')).toHaveText('From foundation to finish.');
	await page.getByRole('button', { name: 'Explore the Interior' }).click();
	await expect(page.locator('.scene-info h2')).toHaveText('Main entrance');
	await page.locator('#stage-select').selectOption('0');
	await expect(page.locator('.scene-info h2')).toHaveText('Site survey');
	await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'instant' }));
	await expect(page.locator('.scene-percentage > span').first()).not.toHaveText('0%');
	expect(errors).toEqual([]);
});

test('mobile navigation, no overflow and confirmed contact delivery', async ({ page }) => {
	await page.route('**/api/contact', (route) =>
		route.fulfill({ json: { success: true, message: 'Your inquiry has been sent.' } })
	);
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await page.getByRole('button', { name: 'Open navigation' }).click();
	await page.getByRole('link', { name: 'Contact', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
	await page.getByLabel('Your name').fill('Test Owner');
	await page.getByLabel('Email address').fill('owner@example.com');
	await page.getByLabel('Tell me about your project').fill('Residential coordination in Dhaka.');
	await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
	await expect(page.getByRole('status')).toContainText('Your inquiry has been sent.');
	await expect(page.getByLabel('Your name')).toHaveValue('');
});

test('reduced motion preserves stage navigation and a complete readable summary', async ({
	page
}) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	await expect(page.locator('.experience')).toHaveClass(/reduced/);
	await page.locator('.experience-summary summary').click();
	await expect(page.locator('.summary-grid article')).toHaveCount(23);
	await expect(page.locator('.summary-grid article').last()).toContainText(
		'representative studies'
	);
});

test('WebGL failure preserves usable stage controls and explanations', async ({ page }) => {
	await page.addInitScript(() => {
		const original = HTMLCanvasElement.prototype.getContext;
		HTMLCanvasElement.prototype.getContext = function (
			this: HTMLCanvasElement,
			type: string,
			...args: unknown[]
		) {
			if (type.startsWith('webgl')) return null;
			return Reflect.apply(original, this, [type, ...args]);
		} as typeof original;
	});
	await page.goto('/');
	await page.locator('#construction-experience').scrollIntoViewIfNeeded();
	await expect(page.locator('.scene-fallback')).toContainText('Lightweight view', {
		timeout: 15000
	});
	await page.locator('#stage-select').selectOption('8');
	await expect(page.locator('.scene-info h2')).toHaveText('MEP rough-in');
});
