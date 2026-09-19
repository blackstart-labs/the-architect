<script lang="ts">
	let {
		sectionNumber = '01',
		category = 'TECHNICAL MODULE',
		title,
		subtitle = ''
	} = $props<{
		sectionNumber?: string;
		category?: string;
		title: string;
		subtitle?: string;
	}>();
</script>

<div class="mb-14 border-b border-white/10 pb-8">
	<div class="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
		<span class="h-1.5 w-1.5 rounded-full bg-[#e5a93c]"></span>
		<span class="font-mono font-semibold text-[#e5a93c]">{sectionNumber}</span>
		<span class="text-white/20">•</span>
		<span class="tracking-wider uppercase text-white/70 text-[11px]">{category}</span>
	</div>

	<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
		<h2 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
			{title}
		</h2>
		{#if subtitle}
			<p class="max-w-md font-sans text-sm sm:text-base leading-relaxed text-white/60">
				{subtitle}
			</p>
		{/if}
	</div>
</div>
