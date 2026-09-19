<script lang="ts">
	import type { PageData } from './$types';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';

	let { data } = $props<{ data: PageData }>();
	let service = $derived(data.service);
	let projects = $derived(data.relevantProjects);
</script>

<svelte:head>
	<title>{service.serviceCode}: {service.title} | Vance Engineering</title>
	<meta name="description" content={service.summary} />
	<meta property="og:title" content="{service.title} — Engineering Capability" />
	<meta property="og:description" content={service.summary} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Top Breadcrumb -->
	<div
		class="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs text-white/50"
	>
		<a href="/services" class="text-[#e5a93c] hover:underline">← SERVICES DIRECTORY</a>
		<span>/</span>
		<span>DISCIPLINE // {service.serviceCode}</span>
	</div>

	<!-- Header Box -->
	<div class="blueprint-bracket mb-12 border border-white/10 bg-[#181818]/80 p-8 sm:p-12">
		<div class="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
			<span class="font-bold text-[#e5a93c]">{service.serviceCode}</span>
			<span class="text-white/50">TYPICAL TIMELINE: {service.typicalTimeline}</span>
		</div>

		<h1 class="mt-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
			{service.title}
		</h1>

		<p class="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/80 sm:text-lg">
			{service.tagline}
		</p>
	</div>

	<!-- Scope & Practice Overview -->
	<div class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
		<div class="space-y-6 font-sans text-base leading-relaxed text-white/80 lg:col-span-2">
			<div>
				<h3 class="mb-3 font-display text-xl font-bold text-white">Discipline Scope</h3>
				<p>{service.summary}</p>
			</div>

			<div class="border-t border-white/10 pt-6">
				<h3 class="mb-3 font-display text-xl font-bold text-white">What We Actually Do</h3>
				<p>{service.scopeOverview}</p>
			</div>

			<div class="border-t border-white/10 pt-6">
				<h3 class="mb-4 font-display text-xl font-bold text-white">
					Engineering Methodology &amp; Execution
				</h3>
				<ul class="space-y-3 font-mono text-xs text-white/70">
					{#each service.methodology as step}
						<li class="flex items-start gap-2.5 border-b border-white/5 pb-2">
							<span class="text-[#e5a93c]">▸</span>
							<span>{step}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Software Stack & Codes Sidebar -->
		<div class="space-y-6">
			<div class="border border-white/10 bg-[#181818] p-6 font-mono text-xs">
				<div class="tech-label mb-3 text-[#e5a93c]">COMPUTATIONAL TOOLS EMPLOYED</div>
				<div class="flex flex-wrap gap-2">
					{#each service.softwareStack as tool}
						<span class="border border-white/10 bg-[#121212] px-2.5 py-1 text-white/80">
							{tool}
						</span>
					{/each}
				</div>
			</div>

			<div class="border border-white/10 bg-[#181818] p-6 font-mono text-xs">
				<div class="tech-label mb-3 text-white/50">GOVERNING DESIGN STANDARDS</div>
				<ul class="space-y-2 text-white/70">
					{#each service.standards as std}
						<li class="border-b border-white/5 pb-2">
							<div class="font-bold text-white">{std.code} ({std.organization})</div>
							<div class="mt-0.5 text-[11px] text-white/50">{std.title}</div>
						</li>
					{/each}
				</ul>
			</div>

			<div class="border border-[#e5a93c]/30 bg-[#e5a93c]/10 p-6 text-center">
				<div class="mb-2 font-mono text-xs font-bold text-[#e5a93c]">[ENGAGE THIS DISCIPLINE]</div>
				<a
					href="/contact"
					class="inline-block border border-[#e5a93c] bg-[#e5a93c] px-6 py-2.5 font-mono text-xs font-bold text-black transition-all hover:bg-[#f7d070]"
				>
					SUBMIT SCOPE INQUIRY
				</a>
			</div>
		</div>
	</div>

	<!-- Deliverables Matrix Table -->
	<div class="mb-16 border border-white/10 bg-[#181818] p-8">
		<div class="tech-label mb-6 border-b border-white/10 pb-2 text-[#e5a93c]">
			FORMAL ENGINEERING DELIVERABLES SPECIFICATION
		</div>

		<div class="space-y-4 font-mono text-xs">
			{#each service.deliverables as deliv}
				<div
					class="flex flex-col justify-between gap-4 border border-white/10 bg-[#121212] p-5 sm:flex-row sm:items-center"
				>
					<div>
						<div class="flex items-center gap-3">
							<span class="text-sm font-bold text-[#e5a93c]">{deliv.code}</span>
							<span class="font-sans text-sm font-bold text-white">{deliv.title}</span>
						</div>
						<p class="mt-1.5 font-sans text-[11px] leading-relaxed text-white/60">
							{deliv.description}
						</p>
					</div>
					<div class="shrink-0 border-l text-[11px] text-white/40 sm:border-white/10 sm:pl-4">
						FORMAT: <span class="text-white/80">{deliv.format}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Relevant Case Studies -->
	{#if projects.length > 0}
		<div class="border-t border-white/10 pt-16">
			<h3 class="mb-8 font-display text-2xl font-bold text-white">
				Related Commission Case Studies
			</h3>
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each projects as proj}
					<ProjectCard project={proj} />
				{/each}
			</div>
		</div>
	{/if}
</div>
