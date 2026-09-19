<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$content/site/site.config';
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		document.body.style.overflow = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
		};
	});
</script>

<header class="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
	<!-- Desktop Floating Glass Island -->
	<nav
		class="hidden md:flex items-center justify-between gap-8 glass-island px-6 py-2.5 rounded-full shadow-2xl transition-all duration-500"
		aria-label="Main Navigation"
	>
		<!-- Studio Identity -->
		<a href="/" class="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80">
			<div class="h-2.5 w-2.5 rounded-full bg-[#e5a93c]"></div>
			<div class="flex items-baseline gap-2">
				<span class="text-sm font-semibold tracking-tight text-white">{siteConfig.name}</span>
				<span class="text-xs text-white/40 font-mono">PE, SE</span>
			</div>
		</a>

		<!-- Navigation Links -->
		<ul class="flex items-center gap-1 text-sm font-medium">
			{#each siteConfig.navLinks as link}
				{@const isActive =
					page.url.pathname === link.href ||
					(link.href !== '/' && page.url.pathname.startsWith(link.href))}
				<li>
					<a
						href={link.href}
						class="relative px-3.5 py-1.5 rounded-full transition-all duration-300 {isActive
							? 'bg-white/10 text-[#e5a93c] font-semibold'
							: 'text-white/70 hover:text-white hover:bg-white/5'}"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Action CTA -->
		<a
			href="/contact"
			class="rounded-full bg-[#e5a93c] px-4 py-1.5 text-xs font-semibold text-black transition-all hover:bg-[#f7d070] hover:scale-105 active:scale-95"
		>
			Inquire
		</a>
	</nav>

	<!-- Mobile Header Bar -->
	<div
		class="flex w-full items-center justify-between glass-island px-5 py-3 rounded-full md:hidden shadow-lg"
	>
		<a href="/" class="flex items-center gap-2 text-white">
			<div class="h-2 w-2 rounded-full bg-[#e5a93c]"></div>
			<span class="text-sm font-bold tracking-tight text-white">{siteConfig.name}</span>
		</a>

		<!-- Animated Hamburger to X Button -->
		<button
			type="button"
			onclick={toggleMenu}
			class="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#e5a93c]"
			aria-expanded={isMenuOpen}
			aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
		>
			<span class="sr-only">Toggle navigation menu</span>
			<div class="flex h-3.5 w-4 flex-col justify-between">
				<span
					class="block h-[2px] w-full bg-white transition-all duration-300 {isMenuOpen
						? 'translate-y-[5px] rotate-45 bg-[#e5a93c]'
						: ''}"
				></span>
				<span
					class="block h-[2px] w-full bg-white transition-opacity duration-300 {isMenuOpen
						? 'opacity-0'
						: 'opacity-100'}"
				></span>
				<span
					class="block h-[2px] w-full bg-white transition-all duration-300 {isMenuOpen
						? '-translate-y-[7px] -rotate-45 bg-[#e5a93c]'
						: ''}"
				></span>
			</div>
		</button>
	</div>

	<!-- Full-screen Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 top-0 left-0 z-50 flex h-screen w-screen flex-col justify-between bg-[#181818]/95 p-8 backdrop-blur-3xl md:hidden overflow-y-auto"
			role="dialog"
			aria-modal="true"
		>
			<div class="flex items-center justify-between border-b border-white/10 pb-6">
				<div class="flex items-center gap-3">
					<div class="h-3 w-3 rounded-full bg-[#e5a93c]"></div>
					<div>
						<div class="text-base font-bold text-white">{siteConfig.name}</div>
						<div class="text-xs text-white/50">{siteConfig.title}</div>
					</div>
				</div>

				<button
					type="button"
					onclick={closeMenu}
					class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
					aria-label="Close menu"
				>
					✕
				</button>
			</div>

			<!-- Mobile Nav Links -->
			<nav class="my-auto py-8">
				<ul class="flex flex-col gap-6">
					{#each siteConfig.navLinks as link}
						{@const isActive =
							page.url.pathname === link.href ||
							(link.href !== '/' && page.url.pathname.startsWith(link.href))}
						<li>
							<a
								href={link.href}
								onclick={closeMenu}
								class="text-3xl font-bold tracking-tight transition-colors font-display {isActive
									? 'text-[#e5a93c]'
									: 'text-white/80 hover:text-white'}"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- Mobile Footer -->
			<div class="border-t border-white/10 pt-6 flex justify-between items-center text-xs text-white/60">
				<span>{siteConfig.headquarters.city} // {siteConfig.headquarters.elevation}</span>
				<a
					href="/contact"
					onclick={closeMenu}
					class="rounded-full bg-[#e5a93c] px-4 py-2 font-semibold text-black"
				>
					Start a project
				</a>
			</div>
		</div>
	{/if}
</header>
