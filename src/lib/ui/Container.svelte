<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		children,
		wide = false,
		class: className = ''
	} = $props<{ children: Snippet; wide?: boolean; class?: string }>();
</script>

<div class="container {className}" class:container-wide={wide}>{@render children()}</div>
