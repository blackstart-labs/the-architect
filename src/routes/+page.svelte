<script lang="ts">
	import { siteConfig } from '$content/site/site.config';
	import { getFeaturedProjects } from '$content/projects';
	import { allServices } from '$content/services';
	import { testimonials } from '$content/testimonials/testimonials';
	import { allArticles } from '$content/journal';
	import { certifications } from '$content/experience/experience';
	import ConstructionScroll from '$lib/components/construction/ConstructionScroll.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import ServiceCard from '$lib/components/services/ServiceCard.svelte';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';

	const featuredProjects = getFeaturedProjects();
	const featuredArticles = allArticles.slice(0, 2);
</script>

<svelte:head>
	<title>{siteConfig.name} — {siteConfig.title} | {siteConfig.firmName}</title>
	<meta name="description" content={siteConfig.description} />
	<meta property="og:title" content="{siteConfig.name} — {siteConfig.title}" />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- ========================================================================= -->
<!-- 01. OPENING / ENGINEER INTRODUCTION HERO                                -->
<!-- ========================================================================= -->
<section
	class="hero-architectural-grid relative flex min-h-[92vh] flex-col justify-between border-b border-white/10 px-4 py-12 sm:px-8 md:px-16"
>
	<!-- Editorial Hero Typography Block -->
	<div class="relative z-10 my-auto max-w-5xl py-12 sm:py-16">
		<div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#e5a93c] uppercase backdrop-blur-md">
			Structural Dynamics · Computational BIM · Heavy Infrastructure
		</div>

		<h1
			class="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]"
		>
			Engineered for <br class="hidden sm:inline" />
			<span class="text-gradient-hero">Structural Immortality</span> &amp; Precision.
		</h1>

		<!-- Hairline Technical Accent Rule (as in reference engineering-portfolio) -->
		<div class="hero-rule my-8" aria-hidden="true"></div>

		<p class="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
			Independent civil &amp; structural engineering practice directed by <strong class="font-semibold text-white"
				>{siteConfig.name}</strong
			>
			({siteConfig.credentials}). Specializing in performance-based high-rise resilience,
			commercial developments, deep subterranean geotechnics, and ISO 19650 openBIM coordination.
		</p>

		<!-- Modern Action Controls -->
		<div class="mt-10 flex flex-wrap items-center gap-4">
			<a
				href="#construction-experience"
				class="inline-flex items-center gap-2.5 rounded-full bg-[#e5a93c] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#f7d070] hover:shadow-[0_0_30px_rgba(229,169,60,0.35)] active:scale-95"
			>
				<span>Explore Construction Lifecycle</span>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</a>

			<a
				href="/projects"
				class="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
			>
				<span>View Selected Case Studies</span>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>

	<!-- Bottom Engineering Metrics Grid -->
	<div class="relative z-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-4">
		<div class="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
			<div class="text-[11px] font-medium tracking-wider text-white/40 uppercase">Structural Lifespan</div>
			<div class="mt-1 text-xl font-extrabold text-white">100+ Years</div>
			<div class="text-xs text-white/50">BNBC 2020 &amp; ACI 318 Compliant</div>
		</div>

		<div class="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
			<div class="text-[11px] font-medium tracking-wider text-white/40 uppercase">Embodied Carbon</div>
			<div class="mt-1 text-xl font-extrabold text-white">-42% Reduction</div>
			<div class="text-xs text-white/50">Green Building Certified</div>
		</div>

		<div class="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
			<div class="text-[11px] font-medium tracking-wider text-white/40 uppercase">BIM Coordination</div>
			<div class="mt-1 text-xl font-extrabold text-white">LOD 400 / 500</div>
			<div class="text-xs text-white/50">OpenBIM IFC4 Fabrication-Ready</div>
		</div>

		<div class="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
			<div class="text-[11px] font-medium tracking-wider text-white/40 uppercase">Chartered Licensure</div>
			<div class="mt-1 text-xl font-extrabold text-white">PE, FIEB, CEng</div>
			<div class="text-xs text-white/50">RAJUK &amp; IEB Enlisted Engineer</div>
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 02. SIGNATURE 13-STAGE CONSTRUCTION SCROLL EXPERIENCE                   -->
<!-- ========================================================================= -->
<ConstructionScroll />

<!-- ========================================================================= -->
<!-- 03. SELECTED PROJECTS CASE STUDIES                                      -->
<!-- ========================================================================= -->
<section class="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="02"
		category="COMMISSION DOSSIERS"
		title="Selected Engineering Projects"
		subtitle="Nonlinear dynamic seismic calculations, finite element time-history verifications, and fabrication-level detailing."
	/>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each featuredProjects as project}
			<ProjectCard {project} />
		{/each}
	</div>

	<div class="mt-14 text-center">
		<a
			href="/projects"
			class="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c] hover:text-[#e5a93c] hover:shadow-xl active:scale-95"
		>
			<span>Explore All Project Case Studies</span>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 04. DISCIPLINES & SERVICES MATRIX                                       -->
<!-- ========================================================================= -->
<section class="border-y border-white/10 bg-[#141414] py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			sectionNumber="03"
			category="CORE DISCIPLINES"
			title="Engineering Capabilities & Deliverables"
			subtitle="From performance-based seismic design to LOD 400 fabrication coordination and structural health monitoring."
		/>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each allServices.slice(0, 3) as service}
				<ServiceCard {service} />
			{/each}
		</div>

		<div class="mt-14 text-center">
			<a
				href="/services"
				class="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c] hover:text-[#e5a93c] hover:shadow-xl active:scale-95"
			>
				<span>View Full Capabilities Matrix</span>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 05. CREDENTIALS & LICENSURE DISCLOSURE                                  -->
<!-- ========================================================================= -->
<section class="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="04"
		category="QUALIFICATION AUDIT"
		title="Professional Licensure & Credentials"
		subtitle="Verified regulatory engineering licenses and institutional chartered credentials across domestic and international jurisdictions."
	/>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each certifications as cert}
			<div class="rounded-2xl border border-white/10 bg-[#1a1a1a]/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c]/30 hover:bg-[#202020]">
				<div class="text-[11px] font-mono font-medium text-[#e5a93c] uppercase">{cert.jurisdiction}</div>
				<h4 class="mt-2 font-display text-base font-bold text-white">{cert.title}</h4>
				<div class="mt-4 space-y-1.5 border-t border-white/5 pt-3 text-xs text-white/50">
					<div>License: <span class="font-mono text-white/80">{cert.licenseNumber}</span></div>
					<div class="flex items-center gap-1.5">
						<span class="h-1.5 w-1.5 rounded-full bg-green-400"></span>
						<span class="text-green-400">{cert.activeStatus}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- ========================================================================= -->
<!-- 06. PEER & CLIENT TESTIMONIALS                                          -->
<!-- ========================================================================= -->
<section class="border-y border-white/10 bg-[#141414] py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			sectionNumber="05"
			category="PEER ENDORSEMENTS"
			title="Project Leadership Testimonials"
			subtitle="Verifiable endorsements from lead design architects, transportation authorities, and general contracting executives."
		/>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each testimonials as item}
				<div class="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1a1a]/70 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/20">
					<div>
						<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#e5a93c]">
							<span>{item.roleType}</span>
							<span class="text-white/20">•</span>
							<span class="text-white/50">{item.year}</span>
						</div>
						<p class="font-sans text-sm leading-relaxed text-white/80">
							"{item.quote}"
						</p>
					</div>

					<div class="mt-8 border-t border-white/10 pt-4 text-xs">
						<div class="font-bold text-white text-sm">{item.author}</div>
						<div class="text-white/50">{item.title}, {item.firm}</div>
						<div class="mt-1 text-[#e5a93c] font-medium">Project: {item.projectName}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 07. TECHNICAL JOURNAL & WHITEPAPERS                                     -->
<!-- ========================================================================= -->
<section class="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="06"
		category="RESEARCH & FIELD NOTES"
		title="Recent Technical Publications"
		subtitle="Peer-reviewed engineering whitepapers on mass timber viscoelasticity, openBIM tolerances, and bridge rehabilitation."
	/>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each featuredArticles as article}
			<article
				class="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1a1a]/70 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#e5a93c]/40 hover:bg-[#202020]"
			>
				<div>
					<div class="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
						<span class="rounded-full bg-[#e5a93c]/15 px-2.5 py-0.5 font-mono font-bold text-[#e5a93c]">{article.paperNumber}</span>
						<span class="text-white/40">{article.readTimeMinutes} min read</span>
						<span class="text-white/50">{article.publishedDate}</span>
					</div>

					<h3
						class="mt-5 font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#e5a93c]"
					>
						<a href="/journal/{article.slug}">{article.title}</a>
					</h3>

					<p class="mt-3 line-clamp-3 font-sans text-xs leading-relaxed text-white/60 sm:text-sm">
						{article.abstract}
					</p>

					<div class="mt-6 flex flex-wrap gap-2 text-xs">
						{#each article.disciplines as tag}
							<span class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-white/60">{tag}</span>
						{/each}
					</div>
				</div>

				<div class="mt-8 border-t border-white/10 pt-4">
					<a
						href="/journal/{article.slug}"
						class="inline-flex items-center gap-2 text-xs font-semibold text-[#e5a93c] group-hover:underline"
					>
						<span>Read Full Technical Whitepaper</span>
						<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>

<!-- ========================================================================= -->
<!-- 08. CONTACT & FORMAL RFQ PORTAL                                         -->
<!-- ========================================================================= -->
<section id="contact-section" class="border-t border-white/10 bg-[#0e0e0e] py-28">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			sectionNumber="07"
			category="DISPATCH & COMMISSIONING"
			title="Initiate Engineering Inquiry"
			subtitle="Submit Request for Qualifications (RFQ), prime structural commissions, or independent peer review requests."
		/>

		<ContactForm />
	</div>
</section>
