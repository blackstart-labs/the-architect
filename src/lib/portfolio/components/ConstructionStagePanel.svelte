<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { ExperienceStage } from '../stages';
	import TechnicalLabel from '$lib/ui/TechnicalLabel.svelte';
	let { stage, active, onjump } = $props<{
		stage: ExperienceStage;
		active: number;
		onjump: (index: number) => void;
	}>();
</script>

<div class="scene-info" aria-label="Current engineering stage">
	<p class="stage-counter">
		<TechnicalLabel text={active < 15 ? 'CONSTRUCTION' : 'INTERIOR WALKTHROUGH'} /><span
			>{String(active < 15 ? active : active - 14).padStart(2, '0')} / {active < 15
				? '14'
				: '08'}</span
		>
	</p>
	<h2>{active === 14 ? stage.title : stage.label}</h2>
	<p class="stage-description">{stage.description}</p>
	<div class="stage-focus">
		<TechnicalLabel text="ENGINEERING FOCUS" />{#each stage.focus as focus}<span
				><i aria-hidden="true"></i>{focus}</span
			>{/each}
	</div>
	<p class="quality-note">{stage.quality}</p>
	{#if active === 14}<button class="text-link scene-interior-link" onclick={() => onjump(15)}
			>Explore the Interior <ArrowUpRight size={17} /></button
		>{/if}{#if active === 22}<a class="text-link" href="#contact"
			>Discuss a Project <ArrowUpRight size={17} /></a
		>{/if}
</div>
