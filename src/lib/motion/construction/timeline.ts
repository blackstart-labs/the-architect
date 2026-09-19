/**
 * Construction Timeline Controller — Dhaka Central Mall Master Sequence
 *
 * Orchestrates the 13-stage commercial shopping mall construction lifecycle with GSAP ScrollTrigger.
 * Features:
 * - Continuous 3D camera flight spline tracking scroll progress at 60 FPS
 * - Organic physical damping (smoothstep cubic Hermite interpolation)
 * - Signature exploded BIM view at Stage 04
 * - MEP X-Ray transparency transition at Stage 10
 * - Interior atrium walkthrough with crisscrossing escalators at Stage 11
 * - Golden hour to dusk lighting transition at Stage 13
 * - Real-time progress tracking & interactive phase rail synchronization
 */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ConstructionScene } from '$lib/three/scenes/construction-scene';
import { constructionStages } from '$content/home/home.content';

export interface ConstructionTimelineOptions {
	container: HTMLElement;
	overlays: {
		phaseStageCounter?: HTMLElement;
		phaseIndex: HTMLElement;
		phaseTitle: HTMLElement;
		phaseSubtitle: HTMLElement;
		phaseDescription: HTMLElement;
		phaseMetric?: HTMLElement;
		phaseNote?: HTMLElement;
		phaseRail: HTMLElement;
		phaseProgress: HTMLElement;
	};
	scene: ConstructionScene;
}

export interface ConstructionTimeline {
	start(): void;
	dispose(): void;
	scrollToPhase(index: number): void;
}

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export function createConstructionTimeline(
	opts: ConstructionTimelineOptions
): ConstructionTimeline {
	const { container, overlays, scene } = opts;
	const reduced =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	let rafId = 0;
	let scrollTrigger: ScrollTrigger | null = null;
	let lastPhase = -1;
	let disposed = false;
	const bimState = { amount: 0 };

	// Precise 3D camera waypoints for Dhaka Central Mall's 13-stage lifecycle
	// Monotonic trajectory avoiding disorienting camera lateral flips
	const phaseConfigs = [
		// 01 Site Survey & Dhaka Urban Context
		{
			groups: ['site', 'survey-markers'],
			cam: { x: 24, y: 12, z: 32, tx: 0, ty: 2, tz: 5 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 02 Topographic Survey & Datum
		{
			groups: ['site', 'survey-markers'],
			cam: { x: 18, y: 6, z: 24, tx: 2, ty: 1, tz: 8 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 03 Architectural Concept & CAD Footprint
		{
			groups: ['site', 'cad-grid'],
			cam: { x: 10, y: 22, z: 22, tx: 0, ty: 1, tz: 0 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 04 Revit BIM Coordination & Exploded Model
		{
			groups: ['site', 'columns', 'beams', 'slabs', 'facade', 'mep', 'mep-ghost'],
			cam: { x: 18, y: 20, z: 26, tx: 0, ty: 8, tz: 0 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0.85
		},
		// 05 Subterranean Excavation & Shoring
		{
			groups: ['site', 'soil-cut'],
			cam: { x: 16, y: 7, z: 20, tx: 0, ty: -2, tz: 2 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 06 Bored Piling & Reinforced Raft
		{
			groups: ['site', 'soil-cut', 'piles', 'foundation'],
			cam: { x: 10, y: 6.5, z: 18, tx: 0, ty: -1, tz: 2 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 07 RCC Structural Frame
		{
			groups: ['site', 'foundation', 'columns', 'beams'],
			cam: { x: 14, y: 14, z: 22, tx: 0, ty: 6, tz: 0 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 08 Post-Tensioned Slabs & Diaphragms
		{
			groups: ['site', 'foundation', 'columns', 'beams', 'slabs'],
			cam: { x: 16, y: 18, z: 24, tx: 0, ty: 9, tz: 0 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 09 Curtain Wall Facade & Solar Fins
		{
			groups: ['site', 'columns', 'beams', 'slabs', 'facade'],
			cam: { x: 12, y: 14, z: 21, tx: 0, ty: 8, tz: 4 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 10 MEP Infrastructure & Rooftop Chiller
		{
			groups: ['site', 'columns', 'beams', 'slabs', 'facade', 'mep'],
			cam: { x: 8, y: 15, z: 18, tx: 0, ty: 9, tz: 2 },
			isInterior: true, // MEP X-Ray mode
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 11 Multi-Level Central Atrium & Escalators
		{
			groups: ['site', 'columns', 'beams', 'slabs', 'facade', 'mep', 'interior'],
			cam: { x: 0, y: 4.8, z: 6.0, tx: 0, ty: 7.2, tz: -1.5 },
			isInterior: true,
			lighting: 'interior' as const,
			explodedBim: 0
		},
		// 12 Civic Entrance Plaza, Canopy & Drop-Off
		{
			groups: ['site', 'columns', 'beams', 'slabs', 'facade', 'mep', 'interior', 'landscape'],
			cam: { x: 14, y: 8, z: 24, tx: 0, ty: 3.5, tz: 8 },
			isInterior: false,
			lighting: 'day' as const,
			explodedBim: 0
		},
		// 13 Completed Dhaka Central Mall
		{
			groups: [
				'site',
				'columns',
				'beams',
				'slabs',
				'facade',
				'mep',
				'interior',
				'landscape',
				'completed'
			],
			cam: { x: 22, y: 16, z: 30, tx: 0, ty: 8, tz: 4 },
			isInterior: false,
			lighting: 'dusk' as const,
			explodedBim: 0
		}
	];

	// Continuous Catmull-Rom 3D flight splines for camera eye and look-at target
	const cameraSpline = new THREE.CatmullRomCurve3(
		phaseConfigs.map((c) => new THREE.Vector3(c.cam.x, c.cam.y, c.cam.z)),
		false,
		'centripetal'
	);

	const targetSpline = new THREE.CatmullRomCurve3(
		phaseConfigs.map((c) => new THREE.Vector3(c.cam.tx, c.cam.ty, c.cam.tz)),
		false,
		'centripetal'
	);

	const targetCameraPos = new THREE.Vector3();
	const targetLookAt = new THREE.Vector3();
	const currentLookTarget = new THREE.Vector3();

	// Initialize to Stage 01 coordinates
	cameraSpline.getPoint(0, targetCameraPos);
	targetSpline.getPoint(0, targetLookAt);
	currentLookTarget.copy(targetLookAt);

	/**
	 * Computes continuous camera position and target along the centripetal Catmull-Rom spline.
	 */
	function updateContinuousCamera(progress: number) {
		const clampedProgress = Math.max(0, Math.min(1, progress));
		cameraSpline.getPoint(clampedProgress, targetCameraPos);
		targetSpline.getPoint(clampedProgress, targetLookAt);
	}

	function setActivePhase(phaseIndex: number) {
		const stage = constructionStages[phaseIndex];
		const config = phaseConfigs[phaseIndex];
		if (!stage || !config || phaseIndex === lastPhase) return;
		lastPhase = phaseIndex;

		// 1. Scene operational modes
		scene.setInteriorMode(config.isInterior);
		scene.setLightingMode(config.lighting);

		// Smooth continuous BIM exploded view interpolation
		gsap.to(bimState, {
			amount: config.explodedBim,
			duration: 0.7,
			ease: 'power2.out',
			overwrite: 'auto',
			onUpdate: () => {
				scene.setExplodedBim(bimState.amount);
			}
		});

		// 2. Conflict-free GSAP group visibility scaling
		const visibleSet = new Set(config.groups);
		scene.groups.forEach((group, key) => {
			const shouldShow = visibleSet.has(key);
			gsap.killTweensOf(group.scale);

			if (shouldShow) {
				group.visible = true;
				gsap.to(group.scale, {
					x: 1,
					y: 1,
					z: 1,
					duration: 0.5,
					ease: 'power2.out',
					overwrite: 'auto'
				});
			} else {
				if (key === 'site') return; // Site plot remains permanent anchor
				gsap.to(group.scale, {
					x: 0.95,
					y: 0.95,
					z: 0.95,
					duration: 0.3,
					ease: 'power2.in',
					overwrite: 'auto',
					onComplete: () => {
						if (!visibleSet.has(key)) {
							group.visible = false;
						}
					}
				});
			}
		});

		// 3. Dynamic stage counter pill (Stage 01 / 13)
		if (overlays.phaseStageCounter) {
			overlays.phaseStageCounter.textContent = `Stage ${stage.stageNumber} / 13`;
		}

		// 4. HUD editorial text crossfade
		const overlayEls = [
			overlays.phaseIndex,
			overlays.phaseTitle,
			overlays.phaseSubtitle,
			overlays.phaseDescription
		].filter(Boolean);

		gsap.killTweensOf(overlayEls);
		gsap.to(overlayEls, {
			opacity: 0,
			y: -6,
			duration: 0.16,
			ease: 'power2.in',
			overwrite: 'auto',
			onComplete: () => {
				overlays.phaseIndex.textContent = stage.stageNumber;
				overlays.phaseTitle.textContent = stage.title;
				overlays.phaseSubtitle.textContent = stage.subtitle;
				overlays.phaseDescription.textContent = stage.specs[0]
					? `${stage.specs[0].label}: ${stage.specs[0].value} · ${stage.specs[1]?.label || ''}: ${stage.specs[1]?.value || ''}`
					: stage.subtitle;

				if (overlays.phaseMetric && stage.keyMetric) {
					overlays.phaseMetric.textContent = `${stage.keyMetric.label}: ${stage.keyMetric.value} (Tol: ${stage.keyMetric.tolerance})`;
				}
				if (overlays.phaseNote && stage.engineeringNote) {
					overlays.phaseNote.textContent = stage.engineeringNote;
				}

				gsap.fromTo(
					overlayEls,
					{ opacity: 0, y: 6 },
					{ opacity: 1, y: 0, duration: 0.38, ease: 'power3.out', stagger: 0.03, overwrite: 'auto' }
				);
			}
		});

		// 5. Rail markers update and isolated container auto-scroll
		if (overlays.phaseRail) {
			const railItems = overlays.phaseRail.querySelectorAll('[data-phase]');
			railItems.forEach((el, i) => {
				const isActive = i === phaseIndex;
				const isPast = i < phaseIndex;
				el.classList.toggle('is-active', isActive);
				el.classList.toggle('is-past', isPast);
			});

			const activeEl = overlays.phaseRail.querySelector('.is-active') as HTMLElement | null;
			if (activeEl) {
				const rail = overlays.phaseRail;
				const targetTop =
					activeEl.offsetTop - rail.offsetTop - rail.clientHeight / 2 + activeEl.clientHeight / 2;
				rail.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
			}
		}
	}

	function render() {
		if (disposed) return;

		// Smooth camera position damping (frictionless gliding)
		const cam = scene.camera;
		const lerpFactor = reduced ? 1 : 0.12;

		cam.position.lerp(targetCameraPos, lerpFactor);
		currentLookTarget.lerp(targetLookAt, lerpFactor);
		cam.lookAt(currentLookTarget.x, currentLookTarget.y, currentLookTarget.z);

		scene.renderer.render(scene.scene, scene.camera);
		rafId = requestAnimationFrame(render);
	}

	function start() {
		setActivePhase(0);
		scene.camera.position.copy(targetCameraPos);
		currentLookTarget.copy(targetLookAt);
		scene.camera.lookAt(currentLookTarget);

		rafId = requestAnimationFrame(render);

		if (reduced) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top top',
				end: '+=550%',
				scrub: 0.6,
				pin: true,
				pinSpacing: true,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					// 1. Continuous camera position along 3D spline
					updateContinuousCamera(self.progress);

					// 2. Direct top hairline progress bar fill
					if (overlays.phaseProgress) {
						overlays.phaseProgress.style.transform = `scaleX(${Math.max(0.05, self.progress)})`;
					}

					// 3. Synchronized discrete phase detection
					const total = constructionStages.length;
					const p = Math.max(0, Math.min(1, self.progress)) * (total - 1);
					const idx = Math.min(total - 1, Math.max(0, Math.round(p)));
					if (idx !== lastPhase) {
						setActivePhase(idx);
					}
				}
			}
		});

		scrollTrigger = tl.scrollTrigger ?? null;
	}

	function scrollToPhase(index: number) {
		setActivePhase(index);
		if (!scrollTrigger || typeof window === 'undefined') {
			return;
		}
		const total = constructionStages.length;
		const fraction = Math.max(0, Math.min(1, index / (total - 1)));
		const targetY = scrollTrigger.start + fraction * (scrollTrigger.end - scrollTrigger.start);
		window.scrollTo({
			top: targetY,
			behavior: 'smooth'
		});
	}

	function dispose() {
		disposed = true;
		cancelAnimationFrame(rafId);
		scrollTrigger?.kill();
		if (scrollTrigger) ScrollTrigger.refresh();
	}

	return { start, dispose, scrollToPhase };
}
