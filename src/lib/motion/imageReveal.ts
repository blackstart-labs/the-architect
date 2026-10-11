import { getGsap, prefersReducedMotion } from './gsap';

export function animateImageMaskReveal(container: HTMLElement, delay = 0) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();

	return gsap.fromTo(
		container,
		{ clipPath: 'polygon(0% 15%, 100% 15%, 100% 100%, 0% 100%)', opacity: 0.2, scale: 0.98 },
		{
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			opacity: 1,
			scale: 1,
			duration: 1.2,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: container,
				start: 'top 88%',
				toggleActions: 'play none none none'
			}
		}
	);
}

export function animateParallax(element: HTMLElement, speed = 0.15) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();

	return gsap.to(element, {
		yPercent: speed * 30,
		ease: 'none',
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: 0.5
		}
	});
}
