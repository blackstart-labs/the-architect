<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} // Unmapped Coordinate | Vance Engineering</title>
</svelte:head>

<div class="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
	<div class="blueprint-bracket border border-white/10 bg-[#181818] p-8 text-center sm:p-12">
		<div class="tech-label mb-2 text-red-400">
			FATAL GEODETIC RESOLUTION FAILURE // CODE {page.status}
		</div>

		<h1 class="mt-4 font-display text-4xl font-black text-white sm:text-6xl">
			Coordinate Unmapped
		</h1>

		<p class="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/70 sm:text-base">
			{page.error?.message ||
				'The requested sheet number or project archive is not indexed in the primary engineering database.'}
		</p>

		<div
			class="mx-auto mt-8 max-w-md border-y border-white/10 py-4 font-mono text-xs text-white/40"
		>
			<div>DATUM: 0.0000°N 0.0000°W (OUT OF BOUNDS)</div>
			<div>ERROR CLASSIFICATION: 404_VOID_DATUM</div>
		</div>

		<div class="mt-8 flex flex-wrap justify-center gap-4 font-mono text-xs">
			<a
				href="/"
				class="border border-[#e5a93c] bg-[#e5a93c] px-6 py-3 font-bold text-black transition-all hover:bg-[#f7d070]"
			>
				[RETURN TO PRIMARY OVERVIEW 00]
			</a>

			<a
				href="/projects"
				class="border border-white/20 bg-[#121212] px-6 py-3 text-white transition-all hover:border-white"
			>
				[INSPECT COMMISSION ARCHIVES]
			</a>
		</div>
	</div>
</div>
