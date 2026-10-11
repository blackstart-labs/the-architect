import { getGsap, prefersReducedMotion } from './gsap';

export function animateTextReveal(
	container: HTMLElement,
	options: { delay?: number; stagger?: number } = {}
) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	const lines = container.querySelectorAll('.line-mask-inner');
	if (!lines.length) return;

	return gsap.fromTo(
		lines,
		{ y: '110%', opacity: 0 },
		{
			y: '0%',
			opacity: 1,
			duration: 1.0,
			stagger: options.stagger ?? 0.12,
			delay: options.delay ?? 0.1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: container,
				start: 'top 90%',
				toggleActions: 'play none none none'
			}
		}
	);
}

export function animateSubtitleReveal(element: HTMLElement, delay = 0.3) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();

	return gsap.fromTo(
		element,
		{ opacity: 0, y: 18 },
		{
			opacity: 1,
			y: 0,
			duration: 0.9,
			delay,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 92%',
				toggleActions: 'play none none none'
			}
		}
	);
}
