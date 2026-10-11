<script lang="ts">
	import Button from './Button.svelte';
	import type { Snippet } from 'svelte';
	let {
		children,
		href,
		class: className = ''
	} = $props<{ children: Snippet; href: string; class?: string }>();
</script>

<Button {href} variant="secondary" class={className}>{@render children()}</Button>
