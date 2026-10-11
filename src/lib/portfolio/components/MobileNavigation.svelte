<script lang="ts">
	import { navigation } from '../data';
	import PrimaryButton from '$lib/ui/PrimaryButton.svelte';
	let { onclose } = $props<{ onclose: () => void }>();
	let nav: HTMLElement;
	function focusMenu(node: HTMLElement) {
		queueMicrotask(() => node.querySelector('a')?.focus());
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			onclose();
		}
		if (e.key === 'Tab') {
			const links = nav.querySelectorAll('a');
			if (e.shiftKey && document.activeElement === links[0]) {
				e.preventDefault();
				links[links.length - 1].focus();
			} else if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
				e.preventDefault();
				links[0].focus();
			}
		}
	}}
/>
<nav
	bind:this={nav}
	id="mobile-navigation"
	class="mobile-nav"
	aria-label="Mobile navigation"
	use:focusMenu
>
	{#each navigation as item}<a href={item.href} onclick={onclose}>{item.label}</a>{/each}
	<div onclick={onclose} role="presentation">
		<PrimaryButton href="#contact">Discuss a project</PrimaryButton>
	</div>
</nav>
