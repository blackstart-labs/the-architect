<script lang="ts">
	import { allProjects } from '$content/projects';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	let selectedCategory = $state<string>('ALL');

	const categories = [
		'ALL',
		'Commercial High-Rise',
		'Infrastructure & Bridges',
		'Mass Timber',
		'Substructure & Geotechnical',
		'Transit & Aviation'
	];

	let filteredProjects = $derived(
		selectedCategory === 'ALL'
			? allProjects
			: allProjects.filter((p) => p.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Project Case Studies & Structural Dossiers | Vance Engineering</title>
	<meta
		name="description"
		content="Technical structural calculations, finite element verifications, and LOD 400 drawings across commercial towers, bridges, and caverns."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="COMMISSION REPOSITORY"
		title="Structural & BIM Project Dossiers"
		subtitle="Each project includes structural design calculations, seismic criteria, finite element drift analysis, and construction milestones."
	/>

	<!-- Discipline Filter Bar -->
	<div class="mb-12 flex flex-wrap gap-2 border-b border-white/10 pb-6 font-mono text-xs">
		<span class="py-2 pr-4 text-white/40 uppercase">FILTER BY TYPOLOGY:</span>
		{#each categories as cat}
			<button
				type="button"
				onclick={() => (selectedCategory = cat)}
				class="border px-3.5 py-1.5 transition-all {selectedCategory === cat
					? 'border-[#e5a93c] bg-[#e5a93c] font-bold text-black'
					: 'border-white/10 bg-[#181818] text-white/70 hover:border-white/30 hover:text-white'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Projects Grid -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each filteredProjects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</div>
