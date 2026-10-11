<script lang="ts">
	import TechnicalLabel from '$lib/ui/TechnicalLabel.svelte';
	let { progress, bar = false } = $props<{ progress: number; bar?: boolean }>();
</script>

{#if bar}<div
		class="scene-progress"
		role="progressbar"
		aria-label="Experience progress"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(progress * 100)}
	>
		<span style:transform="scaleX({progress})"></span>
	</div>{:else}<div class="scene-percentage">
		<span>{Math.round(progress * 100)}<small>%</small></span><TechnicalLabel
			text="JOURNEY PROGRESS"
		/>
	</div>{/if}
