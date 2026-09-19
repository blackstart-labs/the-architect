<script lang="ts">
	import './layout.css';
	import SkipLink from '$lib/components/layout/SkipLink.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#121212" />
	<meta name="color-scheme" content="dark" />
</svelte:head>

<div
	class="relative min-h-screen bg-[#121212] text-[#f3f4f6] selection:bg-[#e5a93c] selection:text-black"
>
	<!-- Subtle Architectural Grain Overlay -->
	<div class="architectural-noise"></div>

	<!-- Accessible Skip Link -->
	<SkipLink />

	<!-- Floating Architectural Navigation -->
	<Navigation />

	<!-- Main Page Content -->
	<main id="main-content" class="relative z-10 pt-20">
		{@render children()}
	</main>

	<!-- Technical Footer -->
	<Footer />
</div>
