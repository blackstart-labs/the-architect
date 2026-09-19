<script lang="ts">
	import { certifications, experienceTimeline } from '$content/experience/experience';
	import { siteConfig } from '$content/site/site.config';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<svelte:head>
	<title>Professional Experience & Licensure | Marcus Vance, PE, SE</title>
	<meta
		name="description"
		content="Career timeline, certified engineering licensure, structural committee appointments, and code compliance history."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="QUALIFICATION RECORD"
		title="Experience, Licensure & Credentials"
		subtitle="Comprehensive chronological career timeline, verified structural engineering licenses, and regulatory committee roles."
	/>

	<!-- Licensure Cards -->
	<div class="mb-16">
		<h3 class="mb-6 font-display text-xl font-bold text-white">Active Professional Licensure</h3>
		<div class="grid grid-cols-1 gap-6 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
			{#each certifications as cert}
				<div class="blueprint-bracket border border-white/10 bg-[#181818] p-6">
					<div class="text-[10px] text-[#e5a93c]">{cert.jurisdiction}</div>
					<div class="mt-2 font-sans text-sm font-bold text-white">{cert.title}</div>
					<div class="mt-4 space-y-1 border-t border-white/5 pt-3 text-[11px] text-white/60">
						<div>
							REGISTRATION: <span class="font-semibold text-white">{cert.licenseNumber}</span>
						</div>
						<div>BOARD: {cert.issuingBody}</div>
						<div class="mt-1 text-green-400">● {cert.activeStatus}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Chronological Experience Timeline -->
	<div class="mb-16">
		<h3 class="mb-6 font-display text-xl font-bold text-white">Career Timeline</h3>
		<div class="space-y-8">
			{#each experienceTimeline as exp}
				<div class="border border-white/10 bg-[#181818] p-8">
					<div
						class="flex flex-col justify-between gap-2 border-b border-white/10 pb-4 font-mono text-xs sm:flex-row sm:items-center"
					>
						<div>
							<span class="font-display text-base font-bold text-white">{exp.role}</span>
							<span class="ml-2 text-white/40">// {exp.company} ({exp.location})</span>
						</div>
						<span class="font-bold text-[#e5a93c]">{exp.period}</span>
					</div>

					<p class="mt-6 font-sans text-sm leading-relaxed text-white/80">
						{exp.summary}
					</p>

					<div
						class="mt-6 grid grid-cols-1 gap-6 border-t border-white/5 pt-6 font-mono text-xs sm:grid-cols-2"
					>
						<div>
							<div class="tech-label mb-2 text-white/40">KEY COMMISSIONS:</div>
							<ul class="space-y-1.5 text-white/70">
								{#each exp.keyProjects as proj}
									<li>• {proj}</li>
								{/each}
							</ul>
						</div>

						<div>
							<div class="tech-label mb-2 text-[#e5a93c]">CORE RESPONSIBILITIES:</div>
							<ul class="space-y-1.5 text-white/70">
								{#each exp.responsibilities as resp}
									<li>▸ {resp}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Codes & Standards List -->
	<div class="border border-white/10 bg-[#181818] p-8">
		<div class="tech-label mb-4 text-[#e5a93c]">REGULATORY STRUCTURAL CODES MASTERED</div>
		<div
			class="grid grid-cols-1 gap-3 font-mono text-xs text-white/70 sm:grid-cols-2 md:grid-cols-3"
		>
			{#each siteConfig.engineeringCodes as code}
				<div class="border border-white/5 bg-[#121212] p-3">
					✓ {code}
				</div>
			{/each}
		</div>
	</div>
</div>
