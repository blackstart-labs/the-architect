<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let article = $derived(data.article);
	let other = $derived(data.otherArticles);
</script>

<svelte:head>
	<title>{article.paperNumber}: {article.title} | Vance Engineering</title>
	<meta name="description" content="{article.abstract.slice(0, 150)}..." />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.abstract} />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<div
		class="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs text-white/50"
	>
		<a href="/journal" class="text-[#e5a93c] hover:underline">← JOURNAL DIRECTORY</a>
		<span>/</span>
		<span>MONOGRAPH // {article.paperNumber}</span>
	</div>

	<!-- Paper Header Block -->
	<div class="blueprint-bracket mb-12 border border-white/10 bg-[#181818] p-8 sm:p-12">
		<div
			class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs"
		>
			<span class="font-bold text-[#e5a93c]">{article.paperNumber}</span>
			<span class="text-white/60">{article.publishedDate}</span>
			{#if article.doi}
				<span class="text-white/40">DOI: {article.doi}</span>
			{/if}
		</div>

		<h1
			class="mt-8 font-display text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
		>
			{article.title}
		</h1>

		<div
			class="mt-6 flex items-center gap-4 border-t border-white/5 pt-4 font-mono text-xs text-white/60"
		>
			<span
				>AUTHOR: <strong class="text-white">{article.leadAuthor.name}</strong>, {article.leadAuthor
					.credentials}</span
			>
			<span class="text-white/20">|</span>
			<span>{article.readTimeMinutes} MIN TECHNICAL READ</span>
		</div>
	</div>

	<!-- Abstract Block -->
	<div
		class="mb-12 border-l-2 border-[#e5a93c] bg-[#1a1a1a] p-6 font-sans text-sm leading-relaxed text-white/80"
	>
		<div class="tech-label mb-2 text-[#e5a93c]">ABSTRACT</div>
		<p>{article.abstract}</p>
	</div>

	<!-- Main Paper Sections -->
	<div class="mb-16 space-y-12">
		{#each article.sections as section}
			<section class="border border-white/10 bg-[#161616] p-8 sm:p-10">
				<h2 class="mb-2 font-display text-xl font-bold text-white sm:text-2xl">
					{section.heading}
				</h2>
				{#if section.subheading}
					<div class="tech-label mb-6 text-[#e5a93c]">{section.subheading}</div>
				{/if}

				<div class="space-y-4 font-sans text-sm leading-relaxed text-white/80 sm:text-base">
					{#each section.content as p}
						<p>{p}</p>
					{/each}
				</div>

				{#if section.formula}
					<div
						class="mt-6 border border-white/15 bg-[#0f0f0f] p-4 text-center font-mono text-sm text-[#e5a93c] sm:text-base"
					>
						<code>{section.formula}</code>
					</div>
				{/if}

				{#if section.technicalNotes && section.technicalNotes.length > 0}
					<div
						class="mt-6 space-y-1.5 border-t border-white/10 pt-4 font-mono text-xs text-white/60"
					>
						<div class="text-[10px] text-white/40 uppercase">ANALYSIS ASSUMPTIONS:</div>
						{#each section.technicalNotes as note}
							<div class="flex items-start gap-2">
								<span class="text-[#e5a93c]">▸</span>
								<span>{note}</span>
							</div>
						{/each}
					</div>
				{/if}
			</section>
		{/each}
	</div>

	<!-- References Cited -->
	{#if article.references && article.references.length > 0}
		<div class="mb-16 border border-white/10 bg-[#181818] p-8">
			<div class="tech-label mb-4 border-b border-white/10 pb-2 text-[#e5a93c]">
				REFERENCES &amp; CITATIONS
			</div>
			<ol class="list-inside list-decimal space-y-2 font-mono text-xs text-white/60">
				{#each article.references as ref}
					<li>{ref}</li>
				{/each}
			</ol>
		</div>
	{/if}

	<!-- Other Publications -->
	<div class="border-t border-white/10 pt-12">
		<h3 class="mb-6 font-display text-xl font-bold text-white">Other Technical Monographs</h3>
		<div class="space-y-4">
			{#each other as o}
				<a
					href="/journal/{o.slug}"
					class="flex items-center justify-between border border-white/10 bg-[#181818] p-4 font-mono text-xs text-white/80 transition-all hover:border-[#e5a93c] hover:text-[#e5a93c]"
				>
					<div>
						<span class="mr-3 font-bold text-[#e5a93c]">{o.paperNumber}</span>
						<span class="font-sans font-semibold text-white">{o.title}</span>
					</div>
					<span>[READ →]</span>
				</a>
			{/each}
		</div>
	</div>
</div>
