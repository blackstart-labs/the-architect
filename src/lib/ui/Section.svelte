<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
	let {
		children,
		id,
		class: className = '',
		muted = false
	} = $props<{ children: Snippet; id?: string; class?: string; muted?: boolean }>();
</script>

<section {id} class="section {className}" class:section-muted={muted}>
	<Container>{@render children()}</Container>
</section>
