<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { createConstructionScene, type ConstructionScene } from '$lib/three/scenes/construction-scene';
	import {
		createConstructionTimeline,
		type ConstructionTimeline
	} from '$lib/motion/construction/timeline';
	import { constructionStages } from '$content/home/home.content';

	let container = $state<HTMLElement | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);

	let overlayPhaseStageCounter = $state<HTMLElement | null>(null);
	let overlayPhaseIndex = $state<HTMLElement | null>(null);
	let overlayPhaseTitle = $state<HTMLElement | null>(null);
	let overlayPhaseSubtitle = $state<HTMLElement | null>(null);
	let overlayPhaseDescription = $state<HTMLElement | null>(null);
	let overlayPhaseMetric = $state<HTMLElement | null>(null);
	let overlayPhaseNote = $state<HTMLElement | null>(null);
	let overlayRail = $state<HTMLElement | null>(null);
	let overlayProgress = $state<HTMLElement | null>(null);

	let scene: ConstructionScene | null = null;
	let timeline: ConstructionTimeline | null = null;
	let ro: ResizeObserver | null = null;
	let ready = $state(false);
	let failed = $state(false);

	function handleRailClick(idx: number) {
		timeline?.scrollToPhase(idx);
	}

	onMount(async () => {
		if (!browser || !container || !canvas) return;

		try {
			await new Promise((r) => requestAnimationFrame(r));
			await new Promise((r) => setTimeout(r, 60));

			scene = createConstructionScene(canvas);
			const rect = container.getBoundingClientRect();
			scene.setSize(rect.width, rect.height);

			ro = new ResizeObserver((entries) => {
				for (const e of entries) {
					scene?.setSize(e.contentRect.width, e.contentRect.height);
				}
			});
			ro.observe(container);

			if (
				overlayPhaseIndex &&
				overlayPhaseTitle &&
				overlayPhaseSubtitle &&
				overlayPhaseDescription &&
				overlayRail &&
				overlayProgress
			) {
				timeline = createConstructionTimeline({
					container,
					scene,
					overlays: {
						phaseStageCounter: overlayPhaseStageCounter ?? undefined,
						phaseIndex: overlayPhaseIndex,
						phaseTitle: overlayPhaseTitle,
						phaseSubtitle: overlayPhaseSubtitle,
						phaseDescription: overlayPhaseDescription,
						phaseMetric: overlayPhaseMetric ?? undefined,
						phaseNote: overlayPhaseNote ?? undefined,
						phaseRail: overlayRail,
						phaseProgress: overlayProgress
					}
				});

				ready = true;
				timeline.start();
			}
		} catch (err) {
			console.error('[ConstructionScroll] init error:', err);
			failed = true;
		}
	});

	onDestroy(() => {
		ro?.disconnect();
		timeline?.dispose();
		scene?.dispose();
	});
</script>

<section
	id="construction-experience"
	bind:this={container}
	class="construction relative h-screen w-full overflow-hidden border-y border-white/10 bg-[#0a0a0a]"
	aria-label="13-Phase Construction Lifecycle"
>
	<!-- Three.js Canvas Layer -->
	<div class="construction-canvas-wrap absolute inset-0 h-full w-full">
		<canvas bind:this={canvas} class="construction-canvas block h-full w-full" aria-hidden="true"></canvas>

		{#if failed}
			<!-- Graceful Non-WebGL Fallback -->
			<div class="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-center">
				<p class="font-mono text-xs uppercase tracking-widest text-[#e5a93c]">Fallback · WebGL Accelerated Architecture</p>
				<h3 class="mt-2 text-2xl font-bold text-white">Full 13-Phase Lifecycle Documentation</h3>
				<div class="mt-8 grid max-w-4xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
					{#each constructionStages as stage}
						<div class="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
							<span class="font-mono text-xs text-[#e5a93c]">Stage {stage.stageNumber} / 13</span>
							<h4 class="mt-1 font-bold text-white text-sm">{stage.title}</h4>
							<p class="mt-1 text-xs text-white/60">{stage.subtitle}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Architectural Crosshairs & Datum Corners Overlay -->
		<div class="pointer-events-none absolute inset-0 p-6 md:p-8">
			<!-- Top Technical Status Pill -->
			<div class="absolute top-6 left-6 md:left-8 flex items-center gap-3">
				<div class="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#161616]/85 px-4 py-1.5 text-xs text-white/70 backdrop-blur-md">
					<span class="inline-block h-2 w-2 animate-pulse rounded-full bg-[#e5a93c]"></span>
					<span class="font-medium text-white/90">Dhaka Central Mall · Commercial Lifecycle</span>
					<span class="text-white/20">|</span>
					<span class="font-mono text-[11px] text-white/50">23.79° N, 90.41° E · 60 FPS WebGL</span>
				</div>
			</div>

			<!-- Subtle Bottom Scale / Compass Indicator -->
			<div class="absolute bottom-6 left-6 md:left-8 hidden sm:flex items-center gap-4 rounded-full border border-white/10 bg-[#161616]/75 px-4 py-1.5 text-xs text-white/50 backdrop-blur-md">
				<span class="font-mono text-[11px]">SCALE 1:200</span>
				<div class="relative h-1 w-14 bg-white/20 rounded-full overflow-hidden">
					<div class="h-full w-1/2 bg-[#e5a93c]"></div>
				</div>
				<span class="font-mono text-[11px]">0 — 36m (BNBC 2020)</span>
			</div>
		</div>
	</div>

	<!-- Top Hairline Progress Bar -->
	<div class="construction-progress absolute top-0 right-0 left-0 z-30 h-[2px] bg-white/10" aria-hidden="true">
		<div
			bind:this={overlayProgress}
			class="construction-progress-fill h-full w-full bg-gradient-to-r from-[#e5a93c] to-[#f7d070]"
			style="transform: scaleX(0.077); transform-origin: left center;"
		></div>
	</div>

	<!-- Coordinated Architectural HUD Overlay -->
	<div class="construction-hud pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 md:p-12">
		<!-- Top Row Spacer -->
		<div class="h-8"></div>

		<!-- Main HUD Content Area: Left Editorial Info & Right Phase Rail -->
		<div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,38rem)_1fr]">
			<!-- Left Editorial Telemetry Card -->
			<div class="hud-left pointer-events-auto max-w-2xl rounded-3xl border border-white/10 bg-[#141414]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
				<div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e5a93c]">
					<span>SECTION 02</span>
					<span class="text-white/20">•</span>
					<span>DHAKA CENTRAL MALL</span>
					<span class="text-white/20">•</span>
					<span bind:this={overlayPhaseStageCounter} class="font-semibold text-white/90">Stage 01 / 13</span>
				</div>

				<div class="mt-3 flex items-baseline gap-4">
					<span
						bind:this={overlayPhaseIndex}
						class="font-display text-5xl sm:text-7xl font-bold tracking-tight text-[#e5a93c] leading-none"
					>
						01
					</span>
					<div>
						<h2
							bind:this={overlayPhaseTitle}
							class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
						>
							Site Survey &amp; Dhaka Urban Context
						</h2>
						<p
							bind:this={overlayPhaseSubtitle}
							class="mt-1 font-mono text-xs sm:text-sm text-white/60 uppercase tracking-wider"
						>
							Urban plot establishment along Gulshan Avenue commercial corridor, Dhaka
						</p>
					</div>
				</div>

				<p
					bind:this={overlayPhaseDescription}
					class="mt-4 font-sans text-xs sm:text-sm leading-relaxed text-white/70"
				>
					Establishing primary site control network with Leica Nova MS60 scanning total station. Boundary tied to Survey of Bangladesh (SOB) geodetic pillars.
				</p>

				<!-- Key Engineering Metric Pill -->
				<div class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs text-white/80">
					<span class="h-1.5 w-1.5 rounded-full bg-[#e5a93c]"></span>
					<span bind:this={overlayPhaseMetric} class="font-mono text-xs text-[#e5a93c]">
						Site Boundary Area: 3,850 m² Commercial Plot (Tol: ±5mm geodetic)
					</span>
				</div>

				<!-- Field Supervision Note -->
				<div class="mt-3.5 flex items-start gap-2.5 rounded-xl border-l-2 border-[#e5a93c] bg-white/[0.03] px-3.5 py-2 text-xs text-white/60">
					<span class="font-mono text-[#e5a93c]">LOG:</span>
					<span bind:this={overlayPhaseNote} class="leading-normal">
						Establishing primary site control network with Leica Nova MS60 scanning total station.
					</span>
				</div>
			</div>

			<!-- Right Architectural Phase Stepper Rail -->
			<div class="hud-right pointer-events-auto hidden lg:flex justify-end">
				<ol
					bind:this={overlayRail}
					class="hud-rail flex max-h-[65vh] flex-col gap-0.5 overflow-y-auto rounded-2xl border border-white/10 bg-[#141414]/85 p-3 backdrop-blur-xl shadow-2xl"
				>
					{#each constructionStages as stage, i}
						<li data-phase={i} class="hud-rail-item block rounded-lg transition-colors {i === 0 ? 'is-active' : ''}">
							<button
								type="button"
								onclick={() => handleRailClick(i)}
								class="flex w-full items-center gap-3 px-3 py-1.5 text-left text-xs transition-colors duration-200"
								title="Phase {stage.stageNumber}: {stage.title}"
								aria-label="Phase {stage.stageNumber}: {stage.title}"
							>
								<span class="font-mono text-[11px] font-semibold text-[#e5a93c] rail-code">
									{stage.stageNumber}
								</span>
								<span class="truncate font-sans font-medium text-white/70 rail-title">
									{stage.title}
								</span>
							</button>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</section>

<style>
	.construction {
		position: relative;
		height: 100vh;
		width: 100%;
		background: #0a0a0a;
	}

	.hud-rail {
		scrollbar-width: thin;
		scrollbar-color: #333333 transparent;
	}

	:global(.hud-rail-item.is-active) {
		background: rgba(229, 169, 60, 0.15);
		border-left: 2px solid #e5a93c;
	}

	:global(.hud-rail-item.is-active .rail-title) {
		color: #ffffff !important;
		font-weight: 600;
	}

	:global(.hud-rail-item.is-past .rail-title) {
		color: rgba(255, 255, 255, 0.4);
	}

	:global(.hud-rail-item button:hover .rail-title) {
		color: #ffffff;
	}
</style>
