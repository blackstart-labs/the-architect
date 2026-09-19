import type { Project } from '$lib/types/project';
import { project001 } from './project-001';
import { project002 } from './project-002';
import { project003 } from './project-003';
import { project004 } from './project-004';
import { project005 } from './project-005';
import { project006 } from './project-006';

export const allProjects: Project[] = [
	project001,
	project002,
	project003,
	project004,
	project005,
	project006
];

export function getAllProjects(): Project[] {
	return allProjects;
}

export function getFeaturedProjects(): Project[] {
	return allProjects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
	return allProjects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
	return allProjects.filter((p) => p.category === category);
}
