import { getGsap, prefersReducedMotion } from './gsap';

export function fadeReveal(element: HTMLElement, delay = 0) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	return gsap.fromTo(
		element,
		{ opacity: 0, y: 20 },
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			delay,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		}
	);
}

export function maskReveal(element: HTMLElement, delay = 0) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	return gsap.fromTo(
		element,
		{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 30 },
		{
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			y: 0,
			duration: 1.0,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: element,
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		}
	);
}

export function staggerReveal(elements: HTMLElement[] | NodeListOf<HTMLElement>, stagger = 0.1) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	if (!elements || elements.length === 0) return;
	return gsap.fromTo(
		elements,
		{ opacity: 0, y: 25 },
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			stagger,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: elements[0],
				start: 'top 85%',
				toggleActions: 'play none none none'
			}
		}
	);
}

export function technicalDraw(svgElement: SVGElement) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	const paths = svgElement.querySelectorAll('path, line, rect, circle');
	if (!paths.length) return;

	paths.forEach((path) => {
		const p = path as SVGGeometryElement;
		const length = p.getTotalLength ? p.getTotalLength() : 200;
		gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
		gsap.to(p, {
			strokeDashoffset: 0,
			duration: 1.6,
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: svgElement,
				start: 'top 80%',
				toggleActions: 'play none none none'
			}
		});
	});
}

export function parallax(element: HTMLElement, speed = 0.2) {
	if (prefersReducedMotion()) return;
	const { gsap } = getGsap();
	return gsap.to(element, {
		yPercent: speed * 50,
		ease: 'none',
		scrollTrigger: {
			trigger: element,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		}
	});
}
