import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('the portfolio has no WCAG A/AA axe violations', async ({ page }) => {
	await page.goto('/');
	const audit = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(audit.violations).toEqual([]);
});

test('mobile menu returns focus and the scene adapts to a short landscape viewport', async ({
	page
}) => {
	await page.setViewportSize({ width: 844, height: 390 });
	await page.goto('/');
	await page.getByRole('button', { name: 'Open navigation' }).click();
	await expect(page.locator('#mobile-navigation a').first()).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
	await page.locator('#construction-experience').scrollIntoViewIfNeeded();
	await expect(page.locator('.scene-fallback')).toHaveCount(0, { timeout: 15000 });
	await page.locator('#stage-select').selectOption('5');
	await expect(page.locator('.scene-info h2')).toHaveText('Repeated floor construction');
	const bounds = await page.locator('#stage-select').boundingBox();
	expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(390);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
