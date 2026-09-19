import { describe, it, expect } from 'vitest';
import { allProjects, getProjectBySlug, getFeaturedProjects } from '$content/projects';
import { constructionStages } from '$content/home/home.content';
import { allServices, getServiceBySlug } from '$content/services';
import { allArticles, getArticleBySlug } from '$content/journal';
import { siteConfig } from '$content/site/site.config';
import { DefaultContactAdapter } from '$lib/utils/contactAdapter';

describe('Engineering Portfolio Content Validation', () => {
	it('should validate siteConfig integrity', () => {
		expect.assertions(4);
		expect(siteConfig.name).toBeTruthy();
		expect(siteConfig.credentials).toContain('PE');
		expect(siteConfig.navLinks.length).toBeGreaterThan(5);
		expect(siteConfig.engineeringCodes.length).toBeGreaterThan(3);
	});

	it('should have 13 complete construction stages', () => {
		expect.assertions(4);
		expect(constructionStages).toHaveLength(13);
		expect(constructionStages[0].stageNumber).toBe('01');
		expect(constructionStages[12].stageNumber).toBe('13');
		expect(constructionStages.every((s) => s.cameraPosition && s.cameraTarget)).toBe(true);
	});

	it('should validate all projects have unique slugs and required metadata', () => {
		expect.assertions(6);
		expect(allProjects.length).toBeGreaterThanOrEqual(6);

		const slugs = allProjects.map((p) => p.slug);
		const uniqueSlugs = new Set(slugs);
		expect(uniqueSlugs.size).toBe(allProjects.length);

		const featured = getFeaturedProjects();
		expect(featured.length).toBeGreaterThan(0);

		const project1 = getProjectBySlug('apex-tower-mass-timber');
		expect(project1).toBeDefined();
		expect(project1?.structuralSystem).toBeTruthy();
		expect(project1?.metrics.length).toBeGreaterThan(0);
	});

	it('should validate all engineering services', () => {
		expect.assertions(4);
		expect(allServices.length).toBeGreaterThanOrEqual(6);

		const structural = getServiceBySlug('structural-engineering');
		expect(structural).toBeDefined();
		expect(structural?.deliverables.length).toBeGreaterThan(0);
		expect(structural?.softwareStack.length).toBeGreaterThan(0);
	});

	it('should validate technical journal monographs', () => {
		expect.assertions(3);
		expect(allArticles.length).toBeGreaterThanOrEqual(3);

		const article1 = getArticleBySlug('mass-timber-creep-compensation');
		expect(article1).toBeDefined();
		expect(article1?.sections.length).toBeGreaterThan(1);
	});

	it('should test contact submission adapter', async () => {
		expect.assertions(3);
		const adapter = new DefaultContactAdapter();

		// Failure case
		const invalidResult = await adapter.submit({
			name: '',
			email: '',
			inquiryType: 'test',
			message: ''
		});
		expect(invalidResult.success).toBe(false);

		// Success case
		const validResult = await adapter.submit({
			name: 'Elena Rostova',
			email: 'elena@example.com',
			inquiryType: 'prime-structural',
			message: 'Structural feasibility request for new 40-story mass timber tower.'
		});
		expect(validResult.success).toBe(true);
		expect(validResult.confirmationId).toContain('RFQ-');
	});
});
