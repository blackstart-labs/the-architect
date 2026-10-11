<script lang="ts">
	import { MoveDown, HardHat, Layers3, Ruler, ShieldCheck, X } from 'lucide-svelte';
	import { projects } from './data';
	import SiteHeader from './components/SiteHeader.svelte';
	import ProjectCard from './components/ProjectCard.svelte';
	import ContactCTA from './components/ContactCTA.svelte';
	import Footer from './components/Footer.svelte';
	import Container from '$lib/ui/Container.svelte';
	import Divider from '$lib/ui/Divider.svelte';
	import Section from '$lib/ui/Section.svelte';
	import SectionHeading from '$lib/ui/SectionHeading.svelte';
	import Eyebrow from '$lib/ui/Eyebrow.svelte';
	import TechnicalLabel from '$lib/ui/TechnicalLabel.svelte';
	import PrimaryButton from '$lib/ui/PrimaryButton.svelte';
	import SecondaryButton from '$lib/ui/SecondaryButton.svelte';
	import ImageWithCaption from '$lib/ui/ImageWithCaption.svelte';
	import ConstructionExperience from './ConstructionExperience.svelte';
	let selectedProject = $state<number | null>(null);
	const skills = [
		{
			title: 'Site supervision',
			copy: 'Review construction sequence, access and site progress against project requirements.'
		},
		{
			title: 'Structural coordination',
			copy: 'Resolve the interfaces between architectural layouts, structural drawings and service openings.'
		},
		{
			title: 'Quantities & material planning',
			copy: 'Prepare organized quantity takeoffs, BOQ information and material requirements from drawings.'
		},
		{
			title: 'Quality & safety checks',
			copy: 'Consider reinforcement, concrete, curing, waterproofing and safe access before work is concealed.'
		}
	];
	function openDialog(node: HTMLDialogElement) {
		const previous = document.activeElement as HTMLElement | null;
		node.showModal();
		return {
			destroy() {
				node.close();
				previous?.focus();
			}
		};
	}
</script>

<div class="portfolio">
	<SiteHeader />
	<section id="home" class="hero">
		<Container wide
			><div class="hero-main">
				<div class="hero-copy">
					<Eyebrow text="CIVIL ENGINEERING · BANGLADESH" />
					<h1>Building Better.<br /><span>Building to Last.</span></h1>
					<p class="hero-description">
						Construction planning, structural coordination and quality checks—from foundation to
						finishing. Explore the decisions behind a ten-storey residential building.
					</p>
					<div class="hero-actions">
						<PrimaryButton href="#projects">Explore the studies</PrimaryButton><SecondaryButton
							href="#construction-experience">Experience the build</SecondaryButton
						>
					</div>
					<div class="hero-capabilities">
						<span><HardHat size={17} />Construction supervision</span><span
							><Layers3 size={17} />Structural coordination</span
						><span><Ruler size={17} />Quantity estimation</span><span
							><ShieldCheck size={17} />Quality & safety</span
						>
					</div>
				</div>
				<ImageWithCaption
					class="hero-visual"
					src="/images/residence-render.webp"
					srcset="/images/residence-render-600.webp 600w, /images/residence-render.webp 1200w"
					sizes="(max-width:599px) calc(100vw - 40px), (max-width:1439px) 44vw, 680px"
					alt="Representative ten-storey Bangladeshi residential building with shaded balconies, concrete framing and a compact landscaped entrance"
					caption="THE RESIDENCE · CONCEPTUAL STUDY / GROUND + 01–09"
					width={1200}
					height={1200}
					eager
				/>
			</div>
			<div class="hero-bottom">
				<a href="#projects"
					><MoveDown size={18} aria-hidden="true" /><TechnicalLabel
						text="Explore the construction sequence"
					/></a
				>
				<dl class="hero-proof">
					<div>
						<dt class="technical-label">Storeys</dt>
						<dd>10</dd>
					</div>
					<div>
						<dt class="technical-label">Construction stages</dt>
						<dd>15</dd>
					</div>
					<div>
						<dt class="technical-label">Interior scenes</dt>
						<dd>08</dd>
					</div>
				</dl>
			</div>
			<Divider /></Container
		>
	</section>
	<Section id="projects"
		><SectionHeading
			eyebrow="REPRESENTATIVE ENGINEERING STUDIES"
			title="Three areas of practice."
			accent="One construction process."
			description="Explore the coordination tasks, inspection workflows and planning information that support residential construction."
		/>
		<div class="project-grid">
			{#each projects as project, i}<ProjectCard
					{project}
					index={i}
					onselect={(index) => (selectedProject = index)}
				/>{/each}
		</div>
		<p class="project-disclaimer">
			These are illustrative studies, not completed client commissions. No project budgets,
			approvals or professional credentials are implied.
		</p></Section
	>
	<Section id="expertise" muted
		><div class="expertise-layout">
			<div class="expertise-heading">
				<Eyebrow text="ENGINEERING RESPONSIBILITIES" />
				<h2>Coordination before work.<br /><span>Checks before completion.</span></h2>
				<p>
					Drawings, quantities and site decisions must remain connected throughout construction.
				</p>
			</div>
			<div class="expertise-grid">
				{#each skills as skill, i}<article class="skill">
						<div class="skill-top">
							<TechnicalLabel text="AREA OF PRACTICE" /><span>0{i + 1}</span>
						</div>
						<h3>{skill.title}</h3>
						<p>{skill.copy}</p>
					</article>{/each}
			</div>
		</div></Section
	>
	<Section class="experience-heading"
		><SectionHeading
			eyebrow="INTERACTIVE CONSTRUCTION STUDY"
			title="From site survey"
			accent="to an occupied home."
			description="Scroll through fifteen construction stages, then follow an interior route. Scroll back to retrace the sequence, or select a stage directly."
		/></Section
	>
	<ConstructionExperience />
	<ContactCTA />
	<Footer />
</div>

{#if selectedProject !== null}<dialog
		class="project-dialog"
		aria-labelledby="project-dialog-title"
		use:openDialog
		oncancel={() => (selectedProject = null)}
		onclick={(event) => {
			if (event.target === event.currentTarget) {
				const rect = event.currentTarget.getBoundingClientRect();
				if (
					event.clientX < rect.left ||
					event.clientX > rect.right ||
					event.clientY < rect.top ||
					event.clientY > rect.bottom
				)
					selectedProject = null;
			}
		}}
	>
		<button
			class="dialog-close"
			aria-label="Close project details"
			onclick={() => (selectedProject = null)}><X size={22} /></button
		><Eyebrow text="ILLUSTRATIVE ENGINEERING STUDY" />
		<h2 id="project-dialog-title">{projects[selectedProject].title}</h2>
		<img
			src={projects[selectedProject].image}
			alt={projects[selectedProject].alt}
			width="800"
			height="600"
		/>
		<p>{projects[selectedProject].detail}</p>
	</dialog>{/if}
