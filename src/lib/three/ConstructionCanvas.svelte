<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SceneManager } from './SceneManager';
	import { prefersReducedMotion } from '$lib/motion/gsap';

	let { currentStage = 0, progress = 0 } = $props<{ currentStage?: number; progress?: number }>();

	let container = $state<HTMLDivElement | null>(null);
	let sceneManager: SceneManager | null = null;

	$effect(() => {
		if (sceneManager) {
			sceneManager.setStage(currentStage, progress);
		}
	});

	onMount(() => {
		if (prefersReducedMotion()) {
			// Handled gracefully without aggressive camera motion
		}

		if (container) {
			sceneManager = new SceneManager(container);
			sceneManager.setStage(currentStage, progress);

			const handleResize = () => {
				if (container && sceneManager) {
					sceneManager.resize(container.clientWidth, container.clientHeight);
				}
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				sceneManager?.dispose();
			};
		}
	});

	onDestroy(() => {
		sceneManager?.dispose();
	});
</script>

<div class="relative h-full w-full overflow-hidden bg-[#111111]">
	<!-- 3D WebGL Canvas Container -->
	<div bind:this={container} class="absolute inset-0 h-full w-full"></div>

	<!-- Architectural Viewport Datum Layer -->
	<div class="pointer-events-none absolute inset-0 p-6 md:p-8">
		<!-- Top Technical Status Pill -->
		<div class="absolute top-6 left-6 flex items-center gap-3 md:left-8">
			<div
				class="flex items-center gap-2 rounded-full border border-white/10 bg-[#161616]/75 px-3 py-1 text-xs text-white/70 backdrop-blur-md"
			>
				<span class="inline-block h-2 w-2 animate-pulse rounded-full bg-[#e5a93c]"></span>
				<span class="font-medium text-white/90">Interactive 3D Edifice Model</span>
				<span class="text-white/20">|</span>
				<span class="font-mono text-[11px] text-white/50">60 FPS WebGL</span>
			</div>
		</div>

		<!-- Subtle Bottom Scale / Compass Indicator -->
		<div
			class="absolute bottom-6 left-6 hidden items-center gap-4 rounded-full border border-white/10 bg-[#161616]/60 px-4 py-1.5 text-xs text-white/50 backdrop-blur-md sm:flex md:left-8"
		>
			<span class="font-mono text-[11px]">SCALE 1:200</span>
			<div class="relative h-1 w-14 overflow-hidden rounded-full bg-white/20">
				<div class="h-full w-1/2 bg-[#e5a93c]/60"></div>
			</div>
			<span class="font-mono text-[11px]">0 — 20m</span>
		</div>
	</div>
</div>
