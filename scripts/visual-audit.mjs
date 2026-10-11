import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = process.env.AUDIT_URL || 'http://localhost:4173';
const directory = process.env.AUDIT_OUTPUT || '/tmp/opencode/visual-audit';
const viewports = [
	[320, 720],
	[375, 812],
	[390, 844],
	[430, 932],
	[768, 1024],
	[1024, 768],
	[1280, 800],
	[1440, 900],
	[1920, 1080]
];
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const report = [];
try {
	for (const [width, height] of viewports) {
		const page = await browser.newPage({ viewport: { width, height } });
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.addInitScript(() => {
			window.auditVitals = { lcp: 0, cls: 0, longTasks: [], events: [] };
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) window.auditVitals.lcp = e.startTime;
			}).observe({ type: 'largest-contentful-paint', buffered: true });
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) if (!e.hadRecentInput) window.auditVitals.cls += e.value;
			}).observe({ type: 'layout-shift', buffered: true });
			new PerformanceObserver((list) => {
				for (const e of list.getEntries())
					window.auditVitals.longTasks.push(Math.round(e.duration));
			}).observe({ type: 'longtask', buffered: true });
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) window.auditVitals.events.push(e.duration);
			}).observe({ type: 'event', buffered: true, durationThreshold: 16 });
		});
		await page.goto(baseURL);
		await page.evaluate(() => document.fonts.ready);
		await page.locator('.hero-visual img').evaluate((image) => image.decode());
		await page.screenshot({ path: `${directory}/${width}-hero.png` });
		const initial = await page.evaluate(() => ({
			vitals: { ...window.auditVitals },
			overflow: document.documentElement.scrollWidth > innerWidth,
			headingOverflow:
				document.querySelector('h1').scrollWidth > document.querySelector('h1').clientWidth,
			bodyFont: getComputedStyle(document.querySelector('.hero-description')).fontSize,
			renderers: document.querySelectorAll('canvas').length
		}));
		await page.locator('#projects').scrollIntoViewIfNeeded();
		await page.screenshot({ path: `${directory}/${width}-projects.png` });
		const start = Date.now();
		await page.locator('#construction-experience').scrollIntoViewIfNeeded();
		await expect(page.locator('.scene-fallback')).toHaveCount(0, { timeout: 15000 });
		const sceneLoadMs = Date.now() - start;
		for (const [index, name, title] of [
			[5, 'frame', 'Repeated floor construction'],
			[17, 'interior', 'Living & dining'],
			[18, 'balcony', 'Balcony & neighborhood']
		]) {
			await page.locator('#stage-select').selectOption(String(index));
			await expect(page.locator('.scene-info h2')).toHaveText(title, { timeout: 15000 });
			await page.evaluate((index) => {
				const option = document.querySelectorAll('#stage-select option')[index];
				const start = Number(option.dataset.progressStart),
					end = Number(option.dataset.progressEnd);
				const host = document.querySelector('#construction-experience');
				const top =
					host.getBoundingClientRect().top +
					scrollY +
					(host.offsetHeight - innerHeight) * (start + (end - start) * 0.65);
				window.scrollTo({ top, behavior: 'instant' });
			}, index);
			await page.waitForTimeout(500);
			await page.screenshot({ path: `${directory}/${width}-${name}.png` });
		}
		await page.locator('#contact').scrollIntoViewIfNeeded();
		await page.screenshot({ path: `${directory}/${width}-contact.png` });
		const final = await page.evaluate(() => ({
			vitals: window.auditVitals,
			overflow: document.documentElement.scrollWidth > innerWidth,
			brokenImages: [...document.images]
				.filter((i) => i.complete && !i.naturalWidth)
				.map((i) => i.src)
		}));
		report.push({ width, height, initial, sceneLoadMs, final, errors });
		for (const [selector, name] of [
			['#projects', 'projects-complete'],
			['#expertise', 'expertise-complete'],
			['#contact', 'contact-complete'],
			['footer', 'footer-complete']
		]) {
			await page.locator(selector).screenshot({ path: `${directory}/${width}-${name}.png` });
		}
		await page.close();
	}
} finally {
	await browser.close();
}
await writeFile(`${directory}/report.json`, JSON.stringify(report, null, 2));
console.log(
	JSON.stringify(
		report.map((r) => ({
			viewport: `${r.width}x${r.height}`,
			overflow: r.initial.overflow || r.final.overflow,
			headingOverflow: r.initial.headingOverflow,
			bodyFont: r.initial.bodyFont,
			lcpMs: Math.round(r.final.vitals.lcp),
			cls: r.final.vitals.cls.toFixed(4),
			maxEventMs: Math.max(0, ...r.final.vitals.events),
			sceneLoadMs: r.sceneLoadMs,
			errors: r.errors,
			brokenImages: r.final.brokenImages
		})),
		null,
		2
	)
);
