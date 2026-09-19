<script lang="ts">
	import type { PageData } from './$types';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';

	let { data } = $props<{ data: PageData }>();
	let project = $derived(data.project);
	let related = $derived(data.relatedProjects);
</script>

<svelte:head>
	<title>{project.projectNumber}: {project.title} | Vance Engineering</title>
	<meta name="description" content="{project.subtitle} — {project.description.slice(0, 150)}..." />
	<meta property="og:title" content="{project.title} — Technical Case Study" />
	<meta property="og:description" content={project.description} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<!-- Top Breadcrumb & Archive Code -->
	<div
		class="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs text-white/50"
	>
		<a href="/projects" class="text-[#e5a93c] hover:underline">← ARCHIVE INDEX</a>
		<span>/</span>
		<span>DOSSIER // {project.projectNumber}</span>
		<span>/</span>
		<span class="text-white/30">{project.category}</span>
	</div>

	<!-- Case Study Header Block -->
	<div class="blueprint-bracket mb-12 border border-white/10 bg-[#181818]/80 p-8 sm:p-12">
		<div
			class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs"
		>
			<span class="text-sm font-bold text-[#e5a93c] sm:text-base">{project.projectNumber}</span>
			<span class="text-white/60">DATUM: {project.coordinates}</span>
			<span class="text-white/80">{project.year}</span>
		</div>

		<h1
			class="mt-8 font-display text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
		>
			{project.title}
		</h1>

		<p class="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
			{project.subtitle}
		</p>

		<!-- Disciplines Bar -->
		<div class="mt-8 flex flex-wrap gap-2 font-mono text-xs">
			{#each project.disciplines as disc}
				<span class="border border-[#e5a93c]/30 bg-[#e5a93c]/10 px-3 py-1 text-[#e5a93c]">
					{disc}
				</span>
			{/each}
		</div>
	</div>

	<!-- Hero Imagery with Technical Callouts -->
	{#if project.media && project.media.length > 0}
		<div class="mb-16 overflow-hidden border border-white/10 bg-[#141414]">
			<img
				src={project.media[0].url}
				alt={project.media[0].alt}
				class="h-[450px] w-full object-cover contrast-[1.05] filter sm:h-[550px]"
			/>
			<div
				class="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 p-4 font-mono text-xs text-white/60"
			>
				<span>FIGURE 1.0 // {project.media[0].caption}</span>
				<span class="text-[#e5a93c]">GEODETIC VERIFIED</span>
			</div>
		</div>
	{/if}

	<!-- Structural Specification Sheet Table -->
	<div class="mb-16 border border-white/10 bg-[#181818] p-8">
		<div class="tech-label mb-6 border-b border-white/10 pb-2 text-[#e5a93c]">
			TECHNICAL DATA SHEET &amp; MATERIAL METRICS
		</div>

		<div class="grid grid-cols-1 gap-6 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">STRUCTURAL SYSTEM</div>
				<div class="mt-1 font-semibold text-white">{project.structuralSystem}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">FOUNDATION TYPE</div>
				<div class="mt-1 font-semibold text-white">{project.foundationType}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">SEISMIC CRITERIA</div>
				<div class="mt-1 font-semibold text-white">{project.seismicZone}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">BIM LOD PROTOCOL</div>
				<div class="mt-1 font-semibold text-white">{project.bimLod}</div>
			</div>

			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">CONCRETE SPECIFICATION</div>
				<div class="mt-1 font-semibold text-white">{project.concreteGrade}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">STEEL SPECIFICATION</div>
				<div class="mt-1 font-semibold text-white">{project.steelGrade}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">GROSS FLOOR AREA</div>
				<div class="mt-1 font-semibold text-white">{project.area}</div>
			</div>
			<div class="border-l border-white/20 pl-3">
				<div class="text-white/40">EXECUTION DURATION</div>
				<div class="mt-1 font-semibold text-white">{project.duration}</div>
			</div>
		</div>
	</div>

	<!-- Editorial Narrative: Challenge, Approach, Outcome -->
	<div class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
		<div class="border border-white/10 bg-[#161616] p-8">
			<div class="tech-label mb-3 text-red-400">01 // THE STRUCTURAL CHALLENGE</div>
			<h3 class="mb-4 font-display text-xl font-bold text-white">Engineering Constraints</h3>
			<p class="font-sans text-sm leading-relaxed text-white/70">
				{project.challenge}
			</p>
		</div>

		<div class="border border-white/10 bg-[#161616] p-8">
			<div class="tech-label mb-3 text-[#e5a93c]">02 // COMPUTATIONAL APPROACH</div>
			<h3 class="mb-4 font-display text-xl font-bold text-white">Methodology &amp; Analysis</h3>
			<p class="font-sans text-sm leading-relaxed text-white/70">
				{project.approach}
			</p>
		</div>

		<div class="border border-white/10 bg-[#161616] p-8">
			<div class="tech-label mb-3 text-green-400">03 // MEASURED OUTCOME</div>
			<h3 class="mb-4 font-display text-xl font-bold text-white">Validated Performance</h3>
			<p class="font-sans text-sm leading-relaxed text-white/70">
				{project.outcome}
			</p>
		</div>
	</div>

	<!-- Architectural & Structural Drawings Sheet Block -->
	{#if project.drawings && project.drawings.length > 0}
		<div class="mb-16 border border-white/10 bg-[#181818] p-8">
			<div class="tech-label mb-6 border-b border-white/10 pb-2 text-[#e5a93c]">
				ISSUED DRAWING REPOSITORY &amp; SHEET SCHEDULE
			</div>

			<div class="space-y-4">
				{#each project.drawings as drawing}
					<div
						class="flex flex-col justify-between gap-4 border border-white/10 bg-[#121212] p-4 font-mono text-xs sm:flex-row sm:items-center"
					>
						<div class="flex items-center gap-4">
							<span class="text-sm font-bold text-[#e5a93c]">{drawing.sheetNumber}</span>
							<div>
								<div class="font-sans text-sm font-bold text-white">{drawing.title}</div>
								<div class="mt-0.5 text-[11px] text-white/50">{drawing.description}</div>
							</div>
						</div>

						<div class="flex items-center gap-6 text-white/60">
							<span>DISCIPLINE: {drawing.discipline}</span>
							<span>SCALE: {drawing.scale}</span>
							<span class="text-[#e5a93c]">[IFC4 CERTIFIED]</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Construction Milestones Staged Timeline -->
	{#if project.phases && project.phases.length > 0}
		<div class="mb-16 border border-white/10 bg-[#181818] p-8">
			<div class="tech-label mb-6 border-b border-white/10 pb-2 text-[#e5a93c]">
				CONSTRUCTION EXECUTION TIMELINE &amp; TOLERANCES
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each project.phases as phase}
					<div class="border border-white/10 bg-[#121212] p-5 font-mono text-xs">
						<div class="font-bold text-[#e5a93c]">PHASE {phase.phaseNumber}</div>
						<h4 class="mt-2 font-sans text-sm font-bold text-white">{phase.name}</h4>
						<div class="mt-3 text-[11px] leading-relaxed text-white/60">{phase.notes}</div>
						<div class="mt-4 space-y-1 border-t border-white/10 pt-2 text-[10px] text-white/40">
							<div>WINDOW: {phase.duration} ({phase.milestoneDate})</div>
							<div>TOLERANCE: {phase.tolerance}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Related Projects -->
	<div class="border-t border-white/10 pt-16">
		<h3 class="mb-8 font-display text-2xl font-bold text-white">Related Commission Dossiers</h3>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each related as rel}
				<ProjectCard project={rel} />
			{/each}
		</div>
	</div>
</div>
