<script lang="ts">
	import type { ConstructionStage } from '$lib/types/construction';

	let {
		stages,
		activeStageIndex = 0,
		progress = 0,
		onSelectStage
	} = $props<{
		stages: ConstructionStage[];
		activeStageIndex: number;
		progress?: number;
		onSelectStage?: (index: number) => void;
	}>();

	let current = $derived(stages[activeStageIndex] || stages[0]);
	let progressPercent = $derived(Math.round(Math.min(100, Math.max(0, progress * 100))));
</script>

<div
	class="pointer-events-none relative flex h-full w-full flex-col justify-between p-4 sm:p-6 md:p-8"
>
	<!-- Top Bar: Floating Metadata Pill -->
	<div class="pointer-events-auto flex flex-wrap items-center justify-between gap-3">
		<div
			class="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#161616]/80 px-4 py-1.5 shadow-lg backdrop-blur-xl"
		>
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-[#e5a93c] px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-black uppercase"
			>
				Stage {current.stageNumber} / 13
			</span>
			<span class="text-xs font-medium text-white/80">{current.discipline}</span>
		</div>

		<div
			class="flex items-center gap-3 rounded-full border border-white/10 bg-[#161616]/80 px-4 py-1.5 shadow-lg backdrop-blur-xl"
		>
			<span class="font-mono text-[11px] tracking-wider text-white/40 uppercase">Datum:</span>
			<span class="text-xs font-semibold text-white">{current.elevation}</span>
		</div>
	</div>

	<!-- Bottom Section: Floating Telemetry Card & Sleek Scrubber -->
	<div class="flex flex-col gap-4">
		<!-- Left-Aligned Floating BIM Telemetry Card -->
		<div
			class="pointer-events-auto max-w-md rounded-2xl border border-white/10 bg-[#161616]/90 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300 sm:max-w-lg"
		>
			<div>
				<div class="font-mono text-[11px] tracking-wider text-[#e5a93c] uppercase">
					{current.datumCoord}
				</div>
				<h2 class="mt-1 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
					{current.title}
				</h2>
				<p class="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
					{current.subtitle}
				</p>
			</div>

			<!-- Specs Grid -->
			<div class="mt-4 grid grid-cols-2 gap-2.5 rounded-xl border border-white/5 bg-black/40 p-3">
				<div>
					<span class="text-[10px] font-medium tracking-wider text-[#e5a93c] uppercase">
						{current.keyMetric.label}
					</span>
					<div class="text-sm font-bold text-white">{current.keyMetric.value}</div>
					<div class="text-[10px] text-white/40">Tol: {current.keyMetric.tolerance}</div>
				</div>

				<div>
					<span class="text-[10px] font-medium tracking-wider text-white/40 uppercase">
						{current.specs[0]?.label || 'Primary Spec'}
					</span>
					<div class="text-sm font-semibold text-white">
						{current.specs[0]?.value || 'Specified'}
					</div>
					<div class="truncate text-[10px] text-white/40">
						{current.specs[1]?.label}: {current.specs[1]?.value}
					</div>
				</div>
			</div>

			<!-- Field Log Quote -->
			<div
				class="mt-3.5 flex items-start gap-2.5 rounded-lg border-l-2 border-[#e5a93c] bg-white/[0.03] px-3 py-2 text-[11px] text-white/70"
			>
				<span class="font-mono text-[#e5a93c]">LOG:</span>
				<span class="leading-normal">{current.engineeringNote}</span>
			</div>
		</div>

		<!-- Interactive Timeline Scrubber & Progress Indicator -->
		<div
			class="pointer-events-auto rounded-2xl border border-white/10 bg-[#161616]/85 p-3.5 shadow-2xl backdrop-blur-xl"
		>
			<!-- Scrub Progress Line -->
			<div class="mb-3 flex items-center justify-between text-xs">
				<div class="flex items-center gap-2">
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e5a93c]"></span>
					<span class="text-[11px] font-medium tracking-wider text-white/60 uppercase"
						>Construction Sequence</span
					>
				</div>
				<div class="flex items-center gap-3">
					<span class="hidden text-[11px] text-white/40 sm:inline">Scroll to advance</span>
					<span class="font-mono text-xs font-bold text-[#e5a93c]">{progressPercent}%</span>
				</div>
			</div>

			<!-- Smooth Progress Bar Track -->
			<div class="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
				<div
					class="h-full bg-gradient-to-r from-[#e5a93c] to-[#f7d070] transition-[width] duration-150 ease-out"
					style="width: {progressPercent}%;"
				></div>
			</div>

			<!-- Stepper Buttons -->
			<div class="mt-3 flex items-center justify-between gap-1 overflow-x-auto py-1">
				{#each stages as stage, idx}
					<button
						type="button"
						onclick={() => onSelectStage?.(idx)}
						class="flex h-7 min-w-[28px] items-center justify-center rounded-lg font-mono text-xs font-medium transition-all duration-200 sm:min-w-[32px] {idx ===
						activeStageIndex
							? 'scale-105 bg-[#e5a93c] font-bold text-black shadow-[0_0_12px_rgba(229,169,60,0.5)]'
							: 'bg-white/5 text-white/60 hover:bg-white/15 hover:text-white'}"
						title="{stage.stageNumber}: {stage.title}"
					>
						{stage.stageNumber}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
