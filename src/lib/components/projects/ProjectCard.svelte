<script lang="ts">
	import type { Project } from '$lib/types/project';

	let { project } = $props<{ project: Project }>();
</script>

<article
	class="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1a1a]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c]/40 hover:bg-[#202020] hover:shadow-2xl sm:p-8"
>
	<div>
		<!-- Card Header: Number & Category -->
		<div class="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
			<div class="flex items-center gap-2">
				<span
					class="rounded-full bg-[#e5a93c]/15 px-2.5 py-0.5 font-mono text-xs font-bold text-[#e5a93c]"
				>
					{project.projectNumber}
				</span>
				<span class="text-xs font-medium text-white/50">{project.category}</span>
			</div>
			<span class="font-mono text-xs text-white/40">{project.year}</span>
		</div>

		<!-- Title & Subtitle -->
		<div class="mt-5">
			<h3
				class="font-display text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#e5a93c] sm:text-2xl"
			>
				<a href="/projects/{project.slug}" class="focus:outline-none">
					<span class="absolute inset-0" aria-hidden="true"></span>
					{project.title}
				</a>
			</h3>
			<p class="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
				{project.subtitle}
			</p>
		</div>

		<!-- Structural Specifications Grid -->
		<div class="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs">
			<div class="flex justify-between">
				<span class="text-white/40">Location:</span>
				<span class="font-medium text-white/90">{project.location}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-white/40">Structural System:</span>
				<span class="max-w-[220px] truncate text-right font-medium text-white/90"
					>{project.structuralSystem}</span
				>
			</div>
			<div class="flex justify-between">
				<span class="text-white/40">Gross Floor Area:</span>
				<span class="font-mono text-white/80">{project.area}</span>
			</div>
		</div>

		<!-- Key Metrics Bar -->
		<div class="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/5 bg-black/30 p-3.5">
			{#each project.metrics.slice(0, 2) as metric}
				<div>
					<div class="text-[10px] font-medium tracking-wider text-[#e5a93c] uppercase">
						{metric.label}
					</div>
					<div class="mt-1 text-base font-bold text-white">
						{metric.value}
						<span class="text-xs font-normal text-white/40">{metric.unit || ''}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer Link -->
	<div
		class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-[#e5a93c]"
	>
		<span class="group-hover:underline">Explore Case Dossier</span>
		<span class="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
	</div>
</article>
