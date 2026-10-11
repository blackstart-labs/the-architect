<script lang="ts">
	import { siteConfig } from '$content/site/site.config';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<svelte:head>
	<title>About Marcus Vance, PE, SE, CEng | Structural & BIM Principal</title>
	<meta
		name="description"
		content="Engineering background, structural design philosophy, professional licensure, and project leadership of Marcus Vance."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="ENGINEERING PROFILE & PHILOSOPHY"
		title="Marcus Vance, PE, SE, CEng"
		subtitle="Principal Structural & BIM Engineer with over 15 years directing complex civic infrastructure and commercial high-rises."
	/>

	<!-- Main Bio & Grid -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
		<!-- Left Col: Bio & Philosophy -->
		<div class="space-y-6 font-sans text-base leading-relaxed text-white/80 lg:col-span-2">
			<p>
				Marcus Vance is a licensed Professional Engineer (PE) and Fellow of The Institution of
				Engineers, Bangladesh (FIEB) specializing in performance-based structural design, reinforced
				concrete commercial developments, and high-fidelity openBIM digital twin integration.
			</p>
			<p>
				Educated at Bangladesh University of Engineering and Technology (BUET) (B.Sc. in Civil &amp;
				Structural Engineering) and specialized in advanced computational mechanics, his career
				spans major commercial shopping malls and infrastructure schemes across Bangladesh before
				establishing an independent consultancy in Dhaka.
			</p>

			<div class="border-l-2 border-[#e5a93c] bg-[#181818] p-6 font-mono text-sm text-white/90">
				<div class="mb-2 text-[11px] text-[#e5a93c]">STRUCTURAL DESIGN CREDO:</div>
				"Structures should be optimized for dynamic energy dissipation rather than brute-force mass. By
				understanding material mechanics at the nodal level and integrating millimeter-accurate BIM models,
				we achieve carbon-lean, seismically resilient edifices that endure for centuries."
			</div>

			<h3 class="border-t border-white/10 pt-6 font-display text-xl font-bold text-white">
				Committee Appointments &amp; Technical Contributions
			</h3>
			<ul class="space-y-3 font-mono text-xs text-white/70">
				<li class="flex items-start gap-2">
					<span class="text-[#e5a93c]">▸</span>
					<span>Technical Reviewer, BNBC Standing Committee on Structural Dynamics</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-[#e5a93c]">▸</span>
					<span>Fellow Member (FIEB), The Institution of Engineers, Bangladesh</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-[#e5a93c]">▸</span>
					<span
						>Enlisted Structural Engineer (Category-A), Capital Development Authority (RAJUK)</span
					>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-[#e5a93c]">▸</span>
					<span
						>Lead Author on peer-reviewed monographs on sub-soil alluvium foundation mechanics</span
					>
				</li>
			</ul>
		</div>

		<!-- Right Col: Technical Specification Sheet -->
		<div class="space-y-6">
			<div
				class="blueprint-bracket space-y-4 border border-white/10 bg-[#181818] p-6 font-mono text-xs"
			>
				<div class="tech-label border-b border-white/10 pb-2 text-[#e5a93c]">
					LEAD ENGINEER DOSSIER
				</div>
				<div class="flex justify-between border-b border-white/5 pb-2">
					<span class="text-white/40">NAME:</span>
					<span class="font-bold text-white">{siteConfig.name}</span>
				</div>
				<div class="flex justify-between border-b border-white/5 pb-2">
					<span class="text-white/40">LICENSURE:</span>
					<span class="font-bold text-white">{siteConfig.credentials}</span>
				</div>
				<div class="flex justify-between border-b border-white/5 pb-2">
					<span class="text-white/40">LOCATION:</span>
					<span class="text-white"
						>{siteConfig.headquarters.city}, {siteConfig.headquarters.stateCountry}</span
					>
				</div>
				<div class="flex justify-between border-b border-white/5 pb-2">
					<span class="text-white/40">BASE DATUM:</span>
					<span class="text-white">{siteConfig.headquarters.coordinates}</span>
				</div>
				<div class="flex justify-between">
					<span class="text-white/40">SPECIALTY:</span>
					<span class="text-[#e5a93c]">High-Rise, Bridges, Timber, BIM</span>
				</div>
			</div>

			<!-- Software Tooling Matrix -->
			<div class="border border-white/10 bg-[#181818] p-6 font-mono text-xs">
				<div class="tech-label mb-3 text-white/50">LICENSED ANALYSIS PACKAGES</div>
				<ul class="space-y-1.5 text-white/70">
					{#each siteConfig.softwareLicensing as tool}
						<li class="border-b border-white/5 pb-1">
							• {tool}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
