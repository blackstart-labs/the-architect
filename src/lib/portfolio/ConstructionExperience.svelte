<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown, ChevronDown, Check, MoveDown } from 'lucide-svelte';
	import { experienceStages, localProgress, stageAt, floorOperations } from './stages';
	import ResponsiveSceneContainer from './components/ResponsiveSceneContainer.svelte';
	import ConstructionStagePanel from './components/ConstructionStagePanel.svelte';
	import ConstructionProgress from './components/ConstructionProgress.svelte';
	import Container from '$lib/ui/Container.svelte';
	import TechnicalLabel from '$lib/ui/TechnicalLabel.svelte';
	let host = $state<HTMLElement>();
	let viewport = $state<HTMLDivElement>();
	let canvas: HTMLCanvasElement;
	let progress = $state(0),
		active = $state(0),
		failed = $state(false),
		ready = $state(false),
		reduced = $state(false);
	let stage = $derived(experienceStages[active]);
	let level = $derived(Math.min(10, 2 + Math.floor(localProgress(progress, 'floors') * 9)));
	let operation = $derived(
		floorOperations[Math.min(9, Math.floor(((localProgress(progress, 'floors') * 9) % 1) * 10))]
	);
	let sectionTransition = $derived(
		active === 22 && !reduced
			? Math.max(0, 1 - Math.abs(localProgress(progress, 'outro') - 0.5) / 0.06)
			: 0
	);
	let controller: { jump(index: number): void } | undefined;
	function jump(index: number) {
		controller?.jump(index);
	}
	onMount(() => {
		if (!host) return;
		const container = host;
		let disposed = false,
			initStarted = false,
			fallback = false;
		let scene: ReturnType<typeof import('./scene').createPortfolioScene> | undefined;
		let trigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined;
		let observer: ResizeObserver | undefined;
		const media = matchMedia('(prefers-reduced-motion: reduce)');
		reduced = media.matches;
		function set(p: number) {
			progress = p;
			active = stageAt(p);
			const current = experienceStages[active];
			scene?.setProgress(media.matches ? (current.start + current.end) / 2 : p);
		}
		controller = {
			jump(index) {
				const interval = experienceStages[index];
				// Land inside the phase, clear of rounded pixel / viewport boundaries.
				const point = interval.start + Math.min(0.002, (interval.end - interval.start) / 10);
				const start = trigger?.start ?? container.getBoundingClientRect().top + scrollY;
				const end = trigger?.end ?? start + container.offsetHeight - innerHeight;
				const top = start + (end - start) * point;
				window.scrollTo({ top, behavior: media.matches ? 'instant' : 'smooth' });
			}
		};
		const fallbackUpdate = () => {
			const start = container.getBoundingClientRect().top + scrollY;
			set(Math.max(0, Math.min(1, (scrollY - start) / (container.offsetHeight - innerHeight))));
		};
		const preferenceChange = () => {
			reduced = media.matches;
			requestAnimationFrame(() => {
				if (disposed) return;
				trigger?.refresh();
				fallbackUpdate();
			});
		};
		media.addEventListener('change', preferenceChange);
		const contextLost = (e: Event) => {
			e.preventDefault();
			failed = true;
		};
		canvas.addEventListener('webglcontextlost', contextLost);
		async function init() {
			if (initStarted) return;
			initStarted = true;
			try {
				const [{ createPortfolioScene }, { gsap }, { ScrollTrigger }] = await Promise.all([
					import('./scene'),
					import('gsap'),
					import('gsap/ScrollTrigger')
				]);
				if (disposed) return;
				gsap.registerPlugin(ScrollTrigger);
				try {
					scene = createPortfolioScene(canvas);
				} catch {
					failed = true;
				}
				observer = new ResizeObserver(() => scene?.resize(canvas.clientWidth, canvas.clientHeight));
				observer.observe(canvas);
				trigger = ScrollTrigger.create({
					trigger: container,
					start: 'top top',
					end: 'bottom bottom',
					onUpdate: (self) => set(self.progress),
					onRefresh: (self) => set(self.progress)
				});
				set(trigger.progress);
				ready = true;
			} catch {
				if (disposed) return;
				failed = true;
				ready = true;
				fallback = true;
				window.addEventListener('scroll', fallbackUpdate, { passive: true });
				window.addEventListener('resize', fallbackUpdate);
				fallbackUpdate();
			}
		}
		const intersection = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					intersection.disconnect();
					void init();
				}
			},
			{ rootMargin: '400px' }
		);
		intersection.observe(container);
		return () => {
			disposed = true;
			intersection.disconnect();
			observer?.disconnect();
			trigger?.kill();
			if (fallback) {
				window.removeEventListener('scroll', fallbackUpdate);
				window.removeEventListener('resize', fallbackUpdate);
			}
			media.removeEventListener('change', preferenceChange);
			canvas.removeEventListener('webglcontextlost', contextLost);
			scene?.dispose();
			controller = undefined;
		};
	});
</script>

<ResponsiveSceneContainer bind:host bind:viewport {reduced}>
	<p class="sr-only" aria-live="polite" aria-atomic="true">Current stage: {stage.label}</p>
	<canvas bind:this={canvas} class="experience-canvas" aria-hidden="true"></canvas>
	<div class="section-transition" style:opacity={sectionTransition} aria-hidden="true"></div>
	{#if !ready || failed}<div class="scene-fallback">
			<img
				src="/images/residence-poster.svg"
				alt="Simplified conceptual ten-storey residential façade"
				width="800"
				height="620"
			/>
			<p>
				{failed
					? 'Lightweight view · all stage controls remain available'
					: 'Preparing the construction scene…'}
			</p>
		</div>{/if}
	<div class="scene-top">
		<span><i aria-hidden="true"></i>THE RESIDENCE / DHAKA</span><span
			>REPRESENTATIVE VISUALIZATION</span
		>
	</div>
	<ConstructionStagePanel {stage} {active} onjump={jump} />
	<div class="scene-annotation">
		<TechnicalLabel text={stage.label} />{#if active === 5}<strong
				>LEVEL {String(level).padStart(2, '0')} / 10</strong
			><small>{operation}</small>{:else}<strong
				>{active < 4
					? 'SITE & SUBSTRUCTURE'
					: active < 7
						? 'REINFORCED-CONCRETE FRAME'
						: active < 15
							? 'GROUND + FLOORS 01–09'
							: 'HUMAN-SCALE SPATIAL STUDY'}</strong
			>{/if}
	</div>
	{#if active === 13}<div class="handover-checklist">
			{#each ['Finishes & snagging', 'Plumbing & drainage', 'Electrical & fire provisions', 'Lift & water systems', 'Cleaning & documentation'] as item, i}<span
					class:checked={localProgress(progress, 'handover') > (i + 1) / 6}
					><Check size={15} />{item}</span
				>{/each}<small>Illustrative workflow, not actual approval</small>
		</div>{/if}
	<div class="scene-bottom">
		<div class="scene-stage-select">
			<label for="stage-select"><TechnicalLabel text="JUMP TO A STAGE" /></label>
			<div>
				<select
					id="stage-select"
					value={active}
					onchange={(e) => jump(Number(e.currentTarget.value))}
					>{#each experienceStages as s, i}<option
							value={i}
							data-progress-start={s.start}
							data-progress-end={s.end}
							>{String(i < 15 ? i : i - 14).padStart(2, '0')} · {s.label}</option
						>{/each}</select
				><ChevronDown size={17} aria-hidden="true" />
			</div>
		</div>
		<div class="scene-guidance">
			<MoveDown size={20} aria-hidden="true" /><span
				>Scroll to advance<br /><small>Scroll up to retrace the sequence</small></span
			>
		</div>
		<ConstructionProgress {progress} />
	</div>
	<a class="skip-experience text-link" href="#contact"
		>Skip experience <ArrowDown size={15} aria-hidden="true" /></a
	>
	<ConstructionProgress {progress} bar />
</ResponsiveSceneContainer>
<div class="experience-summary">
	<Container
		><details>
			<summary
				>Read the construction and interior sequence <ChevronDown
					size={18}
					aria-hidden="true"
				/></summary
			>
			<div class="summary-grid">
				{#each experienceStages as item, i}<article>
						<TechnicalLabel
							text={i < 15
								? 'STAGE ' + String(i).padStart(2, '0')
								: 'INTERIOR ' + String(i - 14).padStart(2, '0')}
						/>
						<h3>{item.label}</h3>
						<p>{item.description}</p>
						<small>{item.quality}</small>
					</article>{/each}
			</div>
		</details></Container
	>
</div>
