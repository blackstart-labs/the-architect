<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	let { href, children } = $props<{ href: string; children: Snippet }>();
</script>

<a class="text-link" {href}>{@render children()}<ArrowUpRight size={16} aria-hidden="true" /></a>
