<script lang="ts">
	import { allArticles } from '$content/journal';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<svelte:head>
	<title>Technical Journal & Engineering Papers | Vance Engineering</title>
	<meta
		name="description"
		content="Peer-reviewed structural research, mass timber creep formulations, openBIM tolerances, and bridge jacking methodologies."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="RESEARCH & FIELDWORK"
		title="Technical Journal & Publications"
		subtitle="Rigorous engineering monographs, mathematical formulations, and field observations published across structural journals."
	/>

	<div class="space-y-8">
		{#each allArticles as article}
			<article
				class="blueprint-bracket border border-white/10 bg-[#181818]/70 p-8 transition-all hover:border-[#e5a93c]/50 sm:p-10"
			>
				<div
					class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs"
				>
					<span class="font-bold text-[#e5a93c]">{article.paperNumber}</span>
					<span class="text-white/40">{article.readTimeMinutes} MIN READ // {article.category}</span
					>
					<span class="text-white/60">{article.publishedDate}</span>
				</div>

				<h2
					class="mt-6 font-display text-2xl font-bold tracking-tight text-white transition-colors hover:text-[#e5a93c] sm:text-3xl"
				>
					<a href="/journal/{article.slug}">{article.title}</a>
				</h2>

				<p class="mt-4 max-w-4xl font-sans text-sm leading-relaxed text-white/70 sm:text-base">
					{article.abstract}
				</p>

				<div class="mt-6 flex flex-wrap gap-2 font-mono text-xs">
					{#each article.disciplines as disc}
						<span class="border border-white/10 bg-[#121212] px-3 py-1 text-white/60">
							{disc}
						</span>
					{/each}
				</div>

				<div
					class="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs"
				>
					<span class="text-white/40"
						>AUTHOR: {article.leadAuthor.name}, {article.leadAuthor.credentials}</span
					>
					<a href="/journal/{article.slug}" class="font-bold text-[#e5a93c] hover:underline">
						[READ PAPER & FORMULAS →]
					</a>
				</div>
			</article>
		{/each}
	</div>
</div>
