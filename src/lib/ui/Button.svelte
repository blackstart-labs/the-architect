<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	let {
		children,
		href,
		variant = 'primary',
		type = 'button',
		disabled = false,
		class: className = ''
	} = $props<{
		children: Snippet;
		href?: string;
		variant?: 'primary' | 'secondary';
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
	}>();
</script>

{#if href}<a {href} class="button button-{variant} {className}"
		>{@render children()}<ArrowUpRight size={17} aria-hidden="true" /></a
	>{:else}<button {type} {disabled} class="button button-{variant} {className}"
		>{@render children()}<ArrowUpRight size={17} aria-hidden="true" /></button
	>{/if}
