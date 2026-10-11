<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		host = $bindable(),
		viewport = $bindable(),
		reduced = false,
		children
	} = $props<{
		host?: HTMLElement;
		viewport?: HTMLDivElement;
		reduced?: boolean;
		children: Snippet;
	}>();
</script>

<section
	id="construction-experience"
	bind:this={host}
	class="experience"
	class:reduced
	aria-label="Interactive construction and interior experience"
>
	<div bind:this={viewport} class="experience-viewport">{@render children()}</div>
</section>
