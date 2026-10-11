<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import TechnicalLabel from '$lib/ui/TechnicalLabel.svelte';
	import ProjectMetadata from './ProjectMetadata.svelte';
	import type { ProjectStudy } from '../data';
	let { project, index, onselect } = $props<{
		project: ProjectStudy;
		index: number;
		onselect: (index: number) => void;
	}>();
</script>

<article class="project-card">
	{#snippet image()}<img
			src={project.image}
			srcset={project.srcset}
			sizes="(max-width:599px) calc(100vw - 40px), (max-width:959px) 44vw, (max-width:1408px) 30vw, 400px"
			alt={project.alt}
			width="800"
			height="600"
			loading="lazy"
		/><span class="project-number">0{index + 1}</span><span class="project-open"
			><ArrowUpRight size={20} aria-hidden="true" /></span
		>{/snippet}{#if index === 0}<a
			class="project-image"
			href="#construction-experience"
			aria-label="Explore the residential construction experience">{@render image()}</a
		>{:else}<button
			class="project-image"
			aria-label={'View ' + project.category.toLowerCase()}
			onclick={() => onselect(index)}>{@render image()}</button
		>{/if}
	<div class="project-meta">
		<TechnicalLabel text={project.category} />
		<h3>
			{#if index === 0}<a href="#construction-experience">{project.title}</a>{:else}<button
					onclick={() => onselect(index)}>{project.title}</button
				>{/if}
		</h3>
		<p>{project.description}</p>
		<ProjectMetadata tags={project.tags} />
	</div>
</article>
