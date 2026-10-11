<script lang="ts">
	import './layout.css';
	import fontUrl from '@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url';
	let { children } = $props();
</script>

<svelte:head
	><link rel="preload" href={fontUrl} as="font" type="font/woff2" crossorigin="anonymous" /><meta
		name="theme-color"
		content="#f7f8f6"
	/><meta name="color-scheme" content="light" /></svelte:head
>
<a class="skip-link" href="#main-content">Skip to content</a>
<main id="main-content">{@render children()}</main>
