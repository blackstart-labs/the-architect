<script lang="ts">
	import { allServices } from '$content/services';
	import ServiceCard from '$lib/components/services/ServiceCard.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<svelte:head>
	<title>Engineering Services & Disciplines | Vance Engineering</title>
	<meta
		name="description"
		content="Commercial structural engineering, BIM LOD 400 coordination, seismic base isolation, heavy civil infrastructure, and geotechnical substructures."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="CAPABILITY REPOSITORY"
		title="Engineering Disciplines & Scope of Services"
		subtitle="Comprehensive structural analysis, digital twin BIM coordination, and geotechnical substructure design complying with international codes."
	/>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each allServices as service}
			<ServiceCard {service} />
		{/each}
	</div>
</div>
