<script lang="ts">
	import Button from './Button.svelte';
	import type { Snippet } from 'svelte';
	let {
		children,
		href,
		type = 'button',
		disabled = false,
		class: className = ''
	} = $props<{
		children: Snippet;
		href?: string;
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
	}>();
</script>

<Button {href} {type} {disabled} class={className}>{@render children()}</Button>
