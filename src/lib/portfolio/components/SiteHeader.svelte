<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from 'lucide-svelte';
	import Container from '$lib/ui/Container.svelte';
	import SecondaryButton from '$lib/ui/SecondaryButton.svelte';
	import MobileNavigation from './MobileNavigation.svelte';
	import { navigation, owner } from '../data';
	let scrolled = $state(false),
		open = $state(false),
		active = $state('#home');
	let toggle: HTMLButtonElement;
	function close() {
		open = false;
		queueMicrotask(() => toggle?.focus());
	}
	onMount(() => {
		const update = () => (scrolled = scrollY > 24);
		update();
		window.addEventListener('scroll', update, { passive: true });
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = '#' + e.target.id;
			},
			{ rootMargin: '-15% 0px -65% 0px' }
		);
		navigation.forEach((item) => {
			const el = document.querySelector(item.href);
			if (el) observer.observe(el);
		});
		const media = matchMedia('(min-width:960px)');
		const resize = () => {
			if (media.matches) open = false;
		};
		media.addEventListener('change', resize);
		return () => {
			observer.disconnect();
			media.removeEventListener('change', resize);
			window.removeEventListener('scroll', update);
		};
	});
</script>

<header class="site-header" class:scrolled>
	<Container class="header-inner" wide
		><a class="brand" href="#home" aria-label={owner.name + ' home'}
			><svg class="monogram" viewBox="0 0 45 45" fill="none" aria-hidden="true"
				><path d="M3 37 22 6l19 31H3Z" stroke="currentColor" stroke-width="2.2" /><path
					d="m12 37 10-18 10 18M15 31h14M22 6v13M8 29h10M27 29h10"
					stroke="currentColor"
					stroke-width="1.8"
				/></svg
			><span
				><strong>{owner.name.toUpperCase()}</strong><small>CIVIL ENGINEER · BANGLADESH</small></span
			></a
		>
		<nav class="desktop-nav" aria-label="Main navigation">
			{#each navigation as item}<a
					href={item.href}
					aria-current={active === item.href ? 'location' : undefined}>{item.label}</a
				>{/each}
		</nav>
		<SecondaryButton href="#contact" class="header-cta">Discuss a project</SecondaryButton><button
			bind:this={toggle}
			class="menu-toggle"
			aria-label={open ? 'Close navigation' : 'Open navigation'}
			aria-expanded={open}
			aria-controls={open ? 'mobile-navigation' : undefined}
			onclick={() => (open ? close() : (open = true))}
			>{#if open}<X size={22} />{:else}<Menu size={22} />{/if}</button
		></Container
	>{#if open}<MobileNavigation onclose={close} />{/if}
</header>
