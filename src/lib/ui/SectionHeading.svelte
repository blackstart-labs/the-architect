<script lang="ts">
	import Eyebrow from './Eyebrow.svelte';
	let { eyebrow, title, accent, description } = $props<{
		eyebrow: string;
		title: string;
		accent?: string;
		description?: string;
	}>();
</script>

<div class="section-heading">
	<div>
		<Eyebrow text={eyebrow} />
		<h2>
			{title}{#if accent}<br /><span>{accent}</span>{/if}
		</h2>
	</div>
	{#if description}<p class="section-intro">{description}</p>{/if}
</div>
