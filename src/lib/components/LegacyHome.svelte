<!-- Previous homepage retained to preserve the existing in-progress design. -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { siteConfig } from '$content/site/site.config';
	import { allArticles } from '$content/journal';
	import ConstructionScroll from '$lib/components/construction/ConstructionScroll.svelte';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import { animateTextReveal, animateSubtitleReveal } from '$lib/motion/textReveal';
	import { animateImageMaskReveal } from '$lib/motion/imageReveal';

	const featuredArticles = allArticles.slice(0, 2);

	let heroTitleEl = $state<HTMLElement | null>(null);
	let heroSubtitleEl = $state<HTMLElement | null>(null);
	let heroImageFrameEl = $state<HTMLElement | null>(null);

	// Interactive discipline preview state
	let activeDiscipline = $state(0);

	// About section 3D rotating amphitheater cylinder cards (Bildora Signature)
	const aboutGalleryCards = [
		{
			img: '/images/about/building-stairs.jpg',
			pos: 'object-left',
			alt: 'Red architectural facade with arches and staircase'
		},
		{
			img: '/images/about/building-pink.jpg',
			pos: 'object-center',
			alt: 'Vibrant pink building facade with window grids'
		},
		{
			img: '/images/about/building-stairs.jpg',
			pos: 'object-right',
			alt: 'Terracotta tower and sunlit balconies'
		},
		{
			img: '/images/about/building-house.jpg',
			pos: 'object-center',
			alt: 'Modern red residence at dusk with warm interior glow'
		},
		{
			img: '/images/about/building-slats.jpg',
			pos: 'object-center',
			alt: 'Red architectural slatted building corner'
		},
		{
			img: '/images/about/building-deck.jpg',
			pos: 'object-center',
			alt: 'Dark red geometric architectural building with rooftop deck'
		},
		{
			img: '/images/about/building-47.jpg',
			pos: 'object-center',
			alt: 'Modern architectural facade'
		},
		{
			img: '/images/about/building-55.jpg',
			pos: 'object-center',
			alt: 'Red structured geometric architecture'
		},
		{
			img: '/images/about/building-stairs.jpg',
			pos: 'object-left',
			alt: 'Terracotta arches with outdoor black metal staircase'
		},
		{
			img: '/images/about/building-pink.jpg',
			pos: 'object-center',
			alt: 'Magenta pink building facade'
		},
		{
			img: '/images/about/building-56.jpg',
			pos: 'object-center',
			alt: 'Contemporary architectural design'
		},
		{
			img: '/images/about/building-stairs.jpg',
			pos: 'object-right',
			alt: 'Terracotta tower and sunlit balconies'
		}
	];

	const disciplinePreviews = [
		{
			number: '01',
			title: 'Structural Dynamics & Seismic Engineering',
			description:
				'Nonlinear time-history response spectrum calculations, moment-resisting concrete frames, and tuned mass damping for high-rise commercial structures.',
			metric: 'BNBC 2020 Zone 2 // SDC D2',
			image:
				'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
			href: '/services/structural-engineering'
		},
		{
			number: '02',
			title: 'Computational BIM & Revit Coordination',
			description:
				'LOD 400 fabrication-ready multidisciplinary models, algorithmic clash detection, and ISO 19650 openBIM digital twin integration.',
			metric: 'LOD 400 Fabrication Detailing',
			image:
				'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
			href: '/services/bim-digital-twin'
		},
		{
			number: '03',
			title: 'Subterranean Geotechnics & Shoring',
			description:
				'Contiguous bored pile retention walls, multi-level basement excavation cuts, and dewatering sumps with continuous inclinometer tracking.',
			metric: 'Excavation Depth: -5.50m FFL',
			image:
				'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
			href: '/services/civil-infrastructure'
		},
		{
			number: '04',
			title: 'Commercial Interior Architecture & Atriums',
			description:
				'Multi-level shopping mall central atriums, crisscrossing public escalators, frameless retail shopfronts, and high-traffic terrazzo flooring.',
			metric: '6,000 Persons / hr Flow',
			image:
				'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
			href: '/services/structural-engineering'
		}
	];

	// Vertical process stages
	const processStages = [
		{
			step: '01',
			title: 'Geodetic Survey & Benchmark Datum',
			description:
				'Establishing millimeter-accurate site control networks using robotic scanning total stations tied to permanent national geodetic datums.',
			detail: 'Boundary closure tolerance: 1:50,000 · Leica Nova MS60',
			image:
				'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
		},
		{
			step: '02',
			title: 'Nonlinear Dynamic Analysis & Modeling',
			description:
				'Finite element calculations simulating extreme seismic ground motions, cyclonic wind shear forces, and long-term concrete creep behavior.',
			detail: 'ETABS 21 & SAP2000 nonlinear time-history response verifications',
			image:
				'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
		},
		{
			step: '03',
			title: 'LOD 400 Multidisciplinary Coordination',
			description:
				'Full 3D clash resolution across structural framing, architectural facades, and MEP ductwork systems before drawing release.',
			detail: 'Zero on-site geometric collisions · ISO 19650 Level 2 openBIM',
			image:
				'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
		},
		{
			step: '04',
			title: 'Deep Substructure & Raft Construction',
			description:
				'Execution of Ø1,000mm bored cast-in-place piles, high-strength rebar cages, and monolithic raft slabs designed to resist hydrostatic uplift.',
			detail: 'Working pile capacity: 3,800 kN · C35 monolithic concrete pour',
			image:
				'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
		},
		{
			step: '05',
			title: 'Superstructure Framing & Envelope Cladding',
			description:
				'Rapid floor cycle erection of reinforced concrete tied moment frames, post-tensioned flat slabs, and Low-E solar brise-soleil curtain walls.',
			detail: 'Column plumb tolerance: ±4mm · Wind suction rating: 2.2 kPa',
			image:
				'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80'
		},
		{
			step: '06',
			title: 'MEP Commissioning & Public Handover',
			description:
				'Integrated testing of central chilled water plants, smoke extraction, public escalators, and architectural evening illumination.',
			detail: '100% BNBC 2020 & RAJUK compliant · Final occupancy certification',
			image:
				'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
		}
	];

	// Authentic client testimonials
	const editorialTestimonials = [
		{
			quote:
				'Every single calculation had a clear engineering rationale behind it. On a project as complex as Dhaka Central Mall, having structural and BIM coordination unified under Marcus Vance eliminated costly field revisions.',
			author: 'Engr. Shamsul Alam',
			title: 'Chief Project Director',
			firm: 'Dhaka Central Mall Ltd.',
			project: 'Dhaka Central Mall'
		},
		{
			quote:
				'Vance possesses the rare ability to preserve architectural purity while delivering unapologetically robust structural solutions. Their work on the mass timber hybrid core set a new benchmark in our studio.',
			author: 'Sarah Lin, AIA',
			title: 'Lead Design Principal',
			firm: 'Cascadia Urban Design',
			project: 'Apex Tower Mass Timber'
		},
		{
			quote:
				'In 28 years of heavy civil contracting, I have rarely seen LOD 400 fabrication models as coordinated as Vance’s. We poured 14,000 cubic meters of concrete with zero on-site spatial clashes.',
			author: 'Tariq Rahman, FIEB',
			title: 'Executive Vice President',
			firm: 'Eastern Infrastructure Ltd.',
			project: 'Meghna River Viaduct'
		}
	];

	onMount(() => {
		if (heroTitleEl) animateTextReveal(heroTitleEl, { delay: 0.1, stagger: 0.1 });
		if (heroSubtitleEl) animateSubtitleReveal(heroSubtitleEl, 0.4);
		if (heroImageFrameEl) animateImageMaskReveal(heroImageFrameEl, 0.2);
	});
</script>

<svelte:head>
	<title>{siteConfig.name} — {siteConfig.title} | {siteConfig.firmName}</title>
	<meta name="description" content={siteConfig.description} />
	<meta property="og:title" content="{siteConfig.name} — {siteConfig.title}" />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- ========================================================================= -->
<!-- 01. BILDORA HERO SECTION (FULL-VIEWPORT ARCHITECTURAL COURTYARD)        -->
<!-- ========================================================================= -->
<section
	class="relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-black text-white"
>
	<!-- Background Architectural Courtyard Image -->
	<div class="absolute inset-0 z-0 select-none">
		<img
			src="/images/hero-courtyard.jpg"
			alt="Modern Architectural Octagonal Courtyard"
			class="h-full w-full scale-105 transform object-cover object-center transition-transform duration-1000"
		/>
		<!-- Very subtle darkening overlay to guarantee crisp text contrast while preserving vibrant sky -->
		<div class="pointer-events-none absolute inset-0 bg-black/15"></div>
	</div>

	<!-- Center Content: Framed directly in the octagonal sky aperture -->
	<div
		class="relative z-10 my-auto flex max-w-4xl flex-col items-center justify-center px-4 pt-32 pb-16 text-center sm:px-6"
	>
		<!-- Pill Badge -->
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.2em] text-white/95 uppercase shadow-sm backdrop-blur-md sm:mb-8 sm:text-xs"
		>
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
			<span>YOUR VISION, OUR CRAFT.</span>
		</div>

		<!-- Main Headline -->
		<h1
			bind:this={heroTitleEl}
			class="text-center font-display text-4xl leading-[1.08] font-bold tracking-tight text-white drop-shadow-md sm:text-6xl md:text-7xl lg:text-[76px]"
		>
			<span class="sr-only">Engineered for Precision — </span>
			We Build What<br class="hidden sm:inline" /> Moves You Forward.
		</h1>

		<!-- Subtitle -->
		<p
			bind:this={heroSubtitleEl}
			class="mx-auto mt-5 max-w-xl text-center font-sans text-sm leading-relaxed font-normal text-white/90 drop-shadow-sm sm:mt-6 sm:max-w-2xl sm:text-base md:text-lg"
		>
			Bildora brings together expert craftsmanship, thoughtful planning, and reliable execution to
			create spaces made to perform, endure, and inspire.
		</p>

		<!-- Call to Action Button -->
		<div class="mt-8 sm:mt-10">
			<a
				href="#contact-section"
				class="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-xs font-semibold text-[#181716] shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-neutral-100 active:scale-95 sm:text-sm"
			>
				<span>Build With Us</span>
				<span class="font-mono transition-transform duration-300 group-hover:translate-x-1">→</span>
			</a>
		</div>
	</div>

	<!-- Bottom Right Bildora / Studio Badge -->
	<div
		class="absolute right-6 bottom-6 z-10 hidden items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-3.5 py-1.5 font-mono text-[11px] text-white/80 shadow-sm backdrop-blur-md sm:flex"
	>
		<span class="text-xs">✦</span>
		<span>Bildora Architecture Studio</span>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 02. BILDORA ABOUT SECTION (3D AMPHITHEATER CURVED GALLERY & METRICS)    -->
<!-- ========================================================================= -->
<section id="about" class="relative w-full overflow-hidden bg-white py-20 text-[#181716] sm:py-28">
	<!-- Section Header -->
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
		<!-- Pill Badge -->
		<div class="mb-6 inline-flex items-center justify-center">
			<span
				class="inline-flex items-center rounded-full border border-[#eb4e2c]/25 bg-white px-4 py-1 text-xs font-semibold tracking-wide text-[#eb4e2c] shadow-[0_2px_12px_rgba(235,78,44,0.12)]"
			>
				About Us
			</span>
		</div>

		<!-- Centered Editorial Headline -->
		<h2
			class="mx-auto max-w-3xl font-display text-2xl leading-[1.26] font-semibold tracking-tight text-[#181716] sm:text-3xl md:text-4xl lg:text-[42px]"
		>
			With decades of experience, we specialize in turning ideas into well-designed structures that
			stand the test of time.
		</h2>
	</div>

	<!-- 3D Amphitheater Cylinder Gallery (Continuous Right-to-Left Motion) -->
	<div
		class="relative flex w-full items-center justify-center overflow-hidden py-10 select-none sm:py-16"
		style="perspective: 1200px; -webkit-perspective: 1200px;"
	>
		<div
			class="cylinder-scaler flex scale-[0.50] items-center justify-center transition-transform duration-300 sm:scale-[0.70] md:scale-[0.85] lg:scale-100"
			style="transform-style: preserve-3d; -webkit-transform-style: preserve-3d;"
		>
			<div
				class="cylinder-turntable relative h-[370px] w-[1px] cursor-grab active:cursor-grabbing"
				style="transform-style: preserve-3d; -webkit-transform-style: preserve-3d;"
			>
				{#each aboutGalleryCards as card, i}
					<div
						class="cylinder-card absolute top-0 left-[-130px] h-[370px] w-[260px] overflow-hidden rounded-[20px] bg-neutral-100 shadow-2xl transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
						style="transform: rotateY({i *
							(360 / aboutGalleryCards.length)}deg) translateZ(-690px) rotateY(180deg);"
					>
						<img
							src={card.img}
							alt={card.alt}
							loading="lazy"
							class="h-full w-full object-cover {card.pos} pointer-events-none transition-transform duration-700 hover:scale-105"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- 4 Meaningful Metrics -->
	<div class="mx-auto mt-4 max-w-5xl px-4 sm:mt-8 sm:px-6">
		<div class="grid grid-cols-2 gap-8 text-center sm:gap-10 md:grid-cols-4">
			<div class="flex flex-col items-center">
				<span
					class="font-display text-3xl font-bold tracking-tight text-[#181716] sm:text-4xl lg:text-[42px]"
				>
					12+
				</span>
				<span class="mt-1.5 text-xs font-normal text-[#73716d] sm:text-sm">
					Years of Experience
				</span>
			</div>

			<div class="flex flex-col items-center">
				<span
					class="font-display text-3xl font-bold tracking-tight text-[#181716] sm:text-4xl lg:text-[42px]"
				>
					250+
				</span>
				<span class="mt-1.5 text-xs font-normal text-[#73716d] sm:text-sm">
					Projects Completed
				</span>
			</div>

			<div class="flex flex-col items-center">
				<span
					class="font-display text-3xl font-bold tracking-tight text-[#181716] sm:text-4xl lg:text-[42px]"
				>
					4.8/5
				</span>
				<span class="mt-1.5 text-xs font-normal text-[#73716d] sm:text-sm">
					Client Satisfaction
				</span>
			</div>

			<div class="flex flex-col items-center">
				<span
					class="font-display text-3xl font-bold tracking-tight text-[#181716] sm:text-4xl lg:text-[42px]"
				>
					98%
				</span>
				<span class="mt-1.5 text-xs font-normal text-[#73716d] sm:text-sm"> On-Time Delivery </span>
			</div>
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 03. ASYMMETRIC SELECTED WORK SHOWCASE                                   -->
<!-- ========================================================================= -->
<section class="section-light border-b border-[#181716]/10 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div
			class="flex flex-col items-start justify-between gap-6 border-b border-[#181716]/10 pb-16 sm:flex-row sm:items-end"
		>
			<div>
				<span class="font-mono text-xs font-bold tracking-widest text-[#d9531e] uppercase">
					PORTFOLIO DOSSIERS
				</span>
				<h2
					class="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#181716] sm:text-5xl"
				>
					Built Around Your Vision.
				</h2>
			</div>

			<a
				href="/projects"
				class="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d9531e] uppercase hover:underline"
			>
				<span>View All Commission Case Studies</span>
				<span class="font-mono">→</span>
			</a>
		</div>

		<!-- Asymmetric Project Presentation -->
		<div class="mt-16 space-y-24 sm:space-y-32">
			<!-- Project 01: Hero 70vw composition with side metadata -->
			<article class="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-[1.4fr_1fr]">
				<div
					class="project-media-frame group aspect-[16/10] overflow-hidden rounded-3xl border border-[#181716]/10 shadow-xl"
				>
					<img
						src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80"
						alt="Dhaka Central Mall structural framing"
						class="h-full w-full object-cover"
					/>
					<div
						class="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md"
					>
						PRJ-014 // GULSHAN-2, DHAKA
					</div>
				</div>

				<div class="space-y-6">
					<div class="font-mono text-xs font-semibold text-[#d9531e]">
						01 / COMMERCIAL ARCHITECTURE &amp; RCC
					</div>
					<h3 class="font-display text-3xl leading-tight font-extrabold text-[#181716] sm:text-4xl">
						<a href="/projects/dhaka-central-mall" class="transition-colors hover:text-[#d9531e]">
							Dhaka Central Mall &amp; Atrium Void
						</a>
					</h3>
					<p class="text-sm leading-relaxed text-[#181716]/70 sm:text-base">
						7-story commercial shopping mall with a central 16m × 10m public open atrium,
						crisscrossing commercial escalators, Low-E curtain wall with solar louvers, and -5.50m
						basement retention shoring.
					</p>

					<!-- Compact Engineering Metadata Table -->
					<div class="grid grid-cols-2 gap-4 border-y border-[#181716]/10 py-4 font-mono text-xs">
						<div>
							<span class="block text-[10px] text-[#73716d]">STRUCTURAL SYSTEM</span>
							<span class="font-semibold text-[#181716]">C40 RCC Tied Moment Frame</span>
						</div>
						<div>
							<span class="block text-[10px] text-[#73716d]">GROSS BUILT AREA</span>
							<span class="font-semibold text-[#181716]">184,000 SQ FT (7 Levels)</span>
						</div>
						<div>
							<span class="block text-[10px] text-[#73716d]">FOUNDATION</span>
							<span class="font-semibold text-[#181716]">16 Ø1,000mm Bored Piles</span>
						</div>
						<div>
							<span class="block text-[10px] text-[#73716d]">REGULATORY CODE</span>
							<span class="font-semibold text-[#181716]">BNBC 2020 &amp; RAJUK</span>
						</div>
					</div>

					<a
						href="/projects/dhaka-central-mall"
						class="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#d9531e] uppercase transition-transform hover:translate-x-1"
					>
						<span>Read Full Engineering Dossier</span>
						<span>→</span>
					</a>
				</div>
			</article>

			<!-- Project 02: Inverted alignment with mass timber details -->
			<article class="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_1.4fr]">
				<div class="order-2 space-y-6 lg:order-1">
					<div class="font-mono text-xs font-semibold text-[#d9531e]">
						02 / HYBRID HIGH-RISE TIMBER
					</div>
					<h3 class="font-display text-3xl leading-tight font-extrabold text-[#181716] sm:text-4xl">
						<a
							href="/projects/apex-tower-mass-timber"
							class="transition-colors hover:text-[#d9531e]"
						>
							Apex Tower Hybrid Diagrid Core
						</a>
					</h3>
					<p class="text-sm leading-relaxed text-[#181716]/70 sm:text-base">
						34-story hybrid mass timber high-rise coupling glue-laminated Douglas Fir perimeter
						framing with a central slip-formed post-tensioned shear core, reducing embodied carbon
						by 42%.
					</p>

					<div class="grid grid-cols-2 gap-4 border-y border-[#181716]/10 py-4 font-mono text-xs">
						<div>
							<span class="block text-[10px] text-[#73716d]">SEISMIC ZONE</span>
							<span class="font-semibold text-[#181716]">SDC D2 High Seismic Risk</span>
						</div>
						<div>
							<span class="block text-[10px] text-[#73716d]">FLOOR SPAN</span>
							<span class="font-semibold text-[#181716]">12.0m Column-Free CLT</span>
						</div>
					</div>

					<a
						href="/projects/apex-tower-mass-timber"
						class="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#d9531e] uppercase transition-transform hover:translate-x-1"
					>
						<span>Read Full Engineering Dossier</span>
						<span>→</span>
					</a>
				</div>

				<div
					class="project-media-frame group order-1 aspect-[16/10] overflow-hidden rounded-3xl border border-[#181716]/10 shadow-xl lg:order-2"
				>
					<img
						src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
						alt="Apex Tower engineering blueprint and structural modeling"
						class="h-full w-full object-cover"
					/>
					<div
						class="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md"
					>
						PRJ-001 // SEATTLE, WA
					</div>
				</div>
			</article>
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 04. SIGNATURE THREE.JS CONSTRUCTION SEQUENCE (DARK SECTION)              -->
<!-- ========================================================================= -->
<section class="section-dark relative border-y border-white/10 bg-[#0a0a0a] text-white">
	<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
		<div
			class="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end"
		>
			<div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-[#d9531e] uppercase"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-[#d9531e]"></span>
					<span>3D WebGL Scroll Journey</span>
				</div>
				<h2 class="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
					Built with Purpose, Finished to Last.
				</h2>
			</div>

			<div class="font-mono text-xs text-white/50">
				SCROLL INTERACTION · 13 MILESTONES (BNBC 2020)
			</div>
		</div>
	</div>

	<!-- 3D Construction Canvas & HUD Pinned Container -->
	<ConstructionScroll />
</section>

<!-- ========================================================================= -->
<!-- 05. EDITORIAL ENGINEERING DISCIPLINES (INTERACTIVE PREVIEW)             -->
<!-- ========================================================================= -->
<section class="section-light border-b border-[#181716]/10 bg-[#f4f1ea] py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="border-b border-[#181716]/10 pb-12">
			<span class="font-mono text-xs font-bold tracking-widest text-[#d9531e] uppercase">
				CAPABILITIES MATRIX
			</span>
			<h2
				class="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#181716] sm:text-5xl"
			>
				Engineering Disciplines.
			</h2>
		</div>

		<!-- Interactive Editorial List & Preview Visual -->
		<div class="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
			<!-- Left: Numbered Rows -->
			<div class="divide-y divide-[#181716]/10 border-y border-[#181716]/10">
				{#each disciplinePreviews as item, i}
					<button
						type="button"
						onmouseenter={() => (activeDiscipline = i)}
						onclick={() => (activeDiscipline = i)}
						class="group flex w-full items-start gap-6 py-6 text-left transition-colors sm:py-8 {activeDiscipline ===
						i
							? 'text-[#d9531e]'
							: 'text-[#181716]'}"
					>
						<span
							class="font-mono text-xs font-bold sm:text-sm {activeDiscipline === i
								? 'text-[#d9531e]'
								: 'text-[#73716d]'}"
						>
							{item.number}
						</span>
						<div class="flex-1 space-y-2">
							<h3
								class="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-[#d9531e] sm:text-2xl"
							>
								{item.title}
							</h3>
							<p class="max-w-xl text-xs leading-relaxed text-[#181716]/70 sm:text-sm">
								{item.description}
							</p>
							<div class="font-mono text-[11px] text-[#73716d]">
								{item.metric}
							</div>
						</div>
						<span
							class="font-mono text-base transition-transform group-hover:translate-x-1 {activeDiscipline ===
							i
								? 'text-[#d9531e]'
								: 'text-[#73716d]'}"
						>
							→
						</span>
					</button>
				{/each}
			</div>

			<!-- Right: Dynamic Hover Image Preview -->
			<div
				class="project-media-frame hidden aspect-[4/3] overflow-hidden rounded-3xl border border-[#181716]/10 shadow-2xl lg:block"
			>
				<img
					src={disciplinePreviews[activeDiscipline].image}
					alt={disciplinePreviews[activeDiscipline].title}
					class="h-full w-full object-cover transition-all duration-500"
				/>
				<div
					class="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-black/75 p-4 font-mono text-xs text-white backdrop-blur-md"
				>
					<span>{disciplinePreviews[activeDiscipline].metric}</span>
					<a
						href={disciplinePreviews[activeDiscipline].href}
						class="font-bold text-[#d9531e] hover:underline"
					>
						Learn More →
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 06. VERTICAL EDITORIAL PROCESS (BILDORA SIGNATURE TIMELINE)              -->
<!-- ========================================================================= -->
<section class="section-light border-b border-[#181716]/10 bg-[#fbf9f5] py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl pb-16">
			<span class="font-mono text-xs font-bold tracking-widest text-[#d9531e] uppercase">
				EXECUTION METHODOLOGY
			</span>
			<h2
				class="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#181716] sm:text-5xl"
			>
				Built on Values, Driven by Quality.
			</h2>
			<p class="mt-4 text-sm leading-relaxed text-[#181716]/70 sm:text-base">
				Every project follows a documented six-phase continuum, ensuring complete fidelity between
				computational calculations and physical site reality.
			</p>
		</div>

		<!-- Vertical Alternating Process List -->
		<div
			class="relative mt-8 hidden space-y-16 before:absolute before:inset-0 before:left-1/2 before:w-[1px] before:-translate-x-1/2 before:bg-[#181716]/10 sm:space-y-24 md:block"
		>
			{#each processStages as stage, i}
				{@const isEven = i % 2 === 0}
				<div class="relative grid grid-cols-2 items-center gap-16">
					<!-- Milestone Dot -->
					<div
						class="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#d9531e] bg-[#fbf9f5] font-mono text-xs font-bold text-[#d9531e]"
					>
						{stage.step}
					</div>

					{#if isEven}
						<!-- Left Text -->
						<div class="space-y-3 pr-8 text-right">
							<div class="font-mono text-xs font-bold text-[#d9531e]">PHASE {stage.step}</div>
							<h3 class="font-display text-2xl font-bold text-[#181716]">{stage.title}</h3>
							<p class="text-sm leading-relaxed text-[#181716]/70">{stage.description}</p>
							<div class="font-mono text-[11px] text-[#73716d]">{stage.detail}</div>
						</div>
						<!-- Right Image -->
						<div class="pl-8">
							<div
								class="project-media-frame aspect-[16/10] overflow-hidden rounded-2xl border border-[#181716]/10 shadow-md"
							>
								<img src={stage.image} alt={stage.title} class="h-full w-full object-cover" />
							</div>
						</div>
					{:else}
						<!-- Left Image -->
						<div class="pr-8">
							<div
								class="project-media-frame aspect-[16/10] overflow-hidden rounded-2xl border border-[#181716]/10 shadow-md"
							>
								<img src={stage.image} alt={stage.title} class="h-full w-full object-cover" />
							</div>
						</div>
						<!-- Right Text -->
						<div class="space-y-3 pl-8 text-left">
							<div class="font-mono text-xs font-bold text-[#d9531e]">PHASE {stage.step}</div>
							<h3 class="font-display text-2xl font-bold text-[#181716]">{stage.title}</h3>
							<p class="text-sm leading-relaxed text-[#181716]/70">{stage.description}</p>
							<div class="font-mono text-[11px] text-[#73716d]">{stage.detail}</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Mobile Fallback Process List -->
		<div class="space-y-12 md:hidden">
			{#each processStages as stage}
				<div class="space-y-4 border-l-2 border-[#d9531e] pl-4">
					<div class="font-mono text-xs font-bold text-[#d9531e]">PHASE {stage.step}</div>
					<h3 class="font-display text-xl font-bold text-[#181716]">{stage.title}</h3>
					<div
						class="project-media-frame aspect-[16/10] overflow-hidden rounded-xl border border-[#181716]/10 shadow-sm"
					>
						<img src={stage.image} alt={stage.title} class="h-full w-full object-cover" />
					</div>
					<p class="text-xs leading-relaxed text-[#181716]/70">{stage.description}</p>
					<div class="font-mono text-[10px] text-[#73716d]">{stage.detail}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 07. CLIENT EXPERIENCE & TESTIMONIALS (DARK / TERRACOTTA CARDS)          -->
<!-- ========================================================================= -->
<section class="section-dark border-b border-white/10 bg-[#0d0d0d] py-24 text-white sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl pb-16 text-center">
			<span
				class="inline-block rounded-full bg-[#d9531e]/20 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#d9531e] uppercase"
			>
				ENDORSEMENTS
			</span>
			<h2 class="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
				Trusted by Clients, Built on Results.
			</h2>
			<p class="mt-3 text-sm text-white/60">
				Verifiable feedback from lead architects, developers, and general contractors.
			</p>
		</div>

		<!-- Staggered Terracotta Quote Cards Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each editorialTestimonials as item, i}
				<div
					class="quote-card-terracotta flex flex-col justify-between rounded-3xl p-8 sm:p-10 {i ===
					1
						? 'md:-translate-y-4'
						: ''}"
				>
					<div>
						<div
							class="mb-4 font-display text-4xl leading-none font-black text-white/40 select-none sm:text-6xl"
						>
							“
						</div>
						<p class="text-sm leading-relaxed font-medium text-white sm:text-base">
							{item.quote}
						</p>
					</div>

					<div class="mt-8 border-t border-white/20 pt-6">
						<div class="font-display text-base font-bold text-white">{item.author}</div>
						<div class="text-xs text-white/80">{item.title}</div>
						<div class="mt-1 font-mono text-[11px] font-semibold text-white/90">{item.firm}</div>
						<div class="mt-2 font-mono text-[10px] text-white/60">Project: {item.project}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 08. TECHNICAL JOURNAL & WHITEPAPERS (LIGHT / ASYMMETRIC)               -->
<!-- ========================================================================= -->
<section class="section-light border-b border-[#181716]/10 bg-[#fbf9f5] py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div
			class="flex flex-col items-start justify-between gap-6 border-b border-[#181716]/10 pb-16 sm:flex-row sm:items-end"
		>
			<div>
				<span class="font-mono text-xs font-bold tracking-widest text-[#d9531e] uppercase">
					RESEARCH &amp; PRACTICE
				</span>
				<h2
					class="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#181716] sm:text-5xl"
				>
					Ideas, Insights &amp; Field Notes.
				</h2>
			</div>

			<a
				href="/journal"
				class="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d9531e] uppercase hover:underline"
			>
				<span>View All Whitepapers</span>
				<span class="font-mono">→</span>
			</a>
		</div>

		<!-- Dual Editorial Article Cards -->
		<div class="mt-14 grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
			{#each featuredArticles as article, i}
				<article class="group space-y-6">
					<div
						class="project-media-frame aspect-[16/10] overflow-hidden rounded-3xl border border-[#181716]/10 shadow-md"
					>
						<img
							src={i === 0
								? 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
								: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80'}
							alt={article.title}
							class="h-full w-full object-cover"
						/>
						<div
							class="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md"
						>
							{article.paperNumber} · {article.readTimeMinutes} MIN READ
						</div>
					</div>

					<div class="space-y-2">
						<div class="flex items-center gap-2 font-mono text-[11px] text-[#73716d]">
							<span>{article.publishedDate}</span>
							<span>•</span>
							<span class="font-semibold text-[#d9531e]">{article.disciplines[0]}</span>
						</div>

						<h3
							class="font-display text-xl font-bold tracking-tight text-[#181716] transition-colors group-hover:text-[#d9531e] sm:text-2xl"
						>
							<a href="/journal/{article.slug}">{article.title}</a>
						</h3>

						<p class="line-clamp-2 text-xs leading-relaxed text-[#181716]/70 sm:text-sm">
							{article.abstract}
						</p>

						<div class="pt-2">
							<a
								href="/journal/{article.slug}"
								class="inline-flex items-center gap-1.5 text-xs font-bold text-[#d9531e] transition-transform group-hover:translate-x-1"
							>
								<span>Read Whitepaper</span>
								<span>→</span>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ========================================================================= -->
<!-- 09. FORMAL RFQ PORTAL & COMMISSIONING INQUIRY (DARK SECTION)            -->
<!-- ========================================================================= -->
<section id="contact-section" class="section-dark bg-[#0d0d0d] py-24 text-white sm:py-32">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl pb-14 text-center">
			<span
				class="inline-block rounded-full bg-[#d9531e]/20 px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#d9531e] uppercase"
			>
				COMMISSIONING DISPATCH
			</span>
			<h2 class="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
				Initiate Engineering Inquiry.
			</h2>
			<p class="mt-3 text-sm text-white/60">
				Submit Request for Qualifications (RFQ), prime structural commissions, or independent peer
				review requests.
			</p>
		</div>

		<div
			class="rounded-3xl border border-white/10 bg-[#161616]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10"
		>
			<ContactForm />
		</div>
	</div>
</section>

<style>
	@keyframes rotateCylinderRTL {
		0% {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateY(360deg);
		}
	}

	.cylinder-turntable {
		animation: rotateCylinderRTL 38s linear infinite;
		transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
	}

	.cylinder-turntable:hover {
		animation-play-state: paused;
	}

	.cylinder-card {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.cylinder-turntable {
			animation: none;
		}
	}
</style>
