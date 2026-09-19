import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isScrollTriggerRegistered = false;

export function getGsap() {
	if (browser && !isScrollTriggerRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		isScrollTriggerRegistered = true;

		// Default smooth architectural easing
		gsap.defaults({
			ease: 'power2.out',
			duration: 0.8
		});
	}
	return { gsap, ScrollTrigger };
}

export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
