<script lang="ts">
	import type { Service } from '$lib/types/service';

	let { service } = $props<{ service: Service }>();
</script>

<article
	class="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1a1a]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c]/40 hover:bg-[#202020] hover:shadow-2xl sm:p-8"
>
	<div>
		<div class="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
			<span class="rounded-full bg-[#e5a93c]/15 px-2.5 py-0.5 font-mono font-bold text-[#e5a93c]">
				{service.serviceCode}
			</span>
			<span class="text-white/40">{service.typicalTimeline}</span>
		</div>

		<h3
			class="mt-5 font-display text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#e5a93c] sm:text-2xl"
		>
			<a href="/services/{service.slug}" class="focus:outline-none">
				<span class="absolute inset-0" aria-hidden="true"></span>
				{service.title}
			</a>
		</h3>

		<p class="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
			{service.tagline}
		</p>

		<!-- Software Stack Tags -->
		<div class="mt-6">
			<div class="mb-2 text-[10px] font-medium tracking-wider text-white/40 uppercase">
				Computational Tooling:
			</div>
			<div class="flex flex-wrap gap-1.5 text-xs">
				{#each service.softwareStack.slice(0, 3) as tool}
					<span class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/70">
						{tool}
					</span>
				{/each}
			</div>
		</div>

		<!-- Deliverables List Sample -->
		<div class="mt-6 border-t border-white/5 pt-4">
			<div class="mb-2 text-[10px] font-medium tracking-wider text-[#e5a93c] uppercase">
				Key Deliverables:
			</div>
			<ul class="space-y-1.5 text-xs text-white/70">
				{#each service.deliverables.slice(0, 2) as deliv}
					<li class="flex items-center gap-2">
						<span class="font-mono text-[10px] text-white/40">{deliv.code}</span>
						<span class="truncate">{deliv.title}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div
		class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-[#e5a93c]"
	>
		<span class="group-hover:underline">View Scope &amp; Methodology</span>
		<span class="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
	</div>
</article>
