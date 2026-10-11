export const owner = { name: 'Md. Rakib Hasan', role: 'Civil Engineer', location: 'Bangladesh' };
export const navigation = [
	{ label: 'Home', href: '#home' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Expertise', href: '#expertise' },
	{ label: 'The Build', href: '#construction-experience' },
	{ label: 'Contact', href: '#contact' }
];
export interface ProjectStudy {
	category: string;
	title: string;
	description: string;
	tags: string[];
	image: string;
	srcset?: string;
	alt: string;
	detail: string;
}
export const projects: ProjectStudy[] = [
	{
		category: 'Residential building',
		title: 'Ten-storey residential concept',
		description:
			'A representative study of structural coordination, floor-by-floor construction and residential façade detailing.',
		tags: ['RCC structure', 'Construction sequencing'],
		image: '/images/residence-render.webp',
		srcset: '/images/residence-render-600.webp 600w, /images/residence-render.webp 1200w',
		alt: 'Conceptual ten-storey residential building with shaded balconies in a Dhaka-inspired setting',
		detail:
			'Explore fifteen construction stages and eight interior-to-exterior scenes. The floor convention is Ground Floor and Floors 01–09. Geometry, foundations and service routes are illustrative, not certified engineering drawings.'
	},
	{
		category: 'Structural & concrete works',
		title: 'Reinforcement to concrete',
		description:
			'An illustrative inspection workflow covering reinforcement, formwork, concrete placement and curing.',
		tags: ['Reinforcement', 'Quality checks'],
		image: '/images/reinforcement-study.svg',
		alt: 'Illustration of reinforcement cages, slab reinforcement and concrete formwork',
		detail:
			'Check reinforcement placement, cover, formwork alignment and drawing requirements before placement. Curing, inspection and appropriate stripping times follow. This study demonstrates coordination tasks, not a completed client commission.'
	},
	{
		category: 'Construction planning',
		title: 'Quantities, materials & progress',
		description:
			'A planning study connecting drawing information, quantity takeoff and material requirements to site progress.',
		tags: ['Quantity takeoff', 'BOQ & planning'],
		image: '/images/planning-study.svg',
		alt: 'Illustration of a residential floor plan, quantity schedule and construction planning tools',
		detail:
			'Quantity takeoff links drawing information to a BOQ. Material planning, progress records and cost and schedule coordination support execution. No project cost, client or verified quantities are represented.'
	}
];
