<script lang="ts">
	import { siteConfig } from '$content/site/site.config';
</script>

<footer
	class="section-dark relative overflow-hidden border-t border-white/10 bg-[#0d0d0d] text-[#fbf9f5]"
>
	<!-- Subtle Architectural Background Grid & Texture -->
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] mix-blend-screen"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
		<!-- Top Closing Editorial Statement & Action -->
		<div class="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.5fr_1fr]">
			<div>
				<div
					class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-[#d9531e] uppercase"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-[#d9531e]"></span>
					<span>Prime Commissions &amp; Peer Review</span>
				</div>

				<h2
					class="mt-6 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl"
				>
					Ready to build <br />
					<span class="text-white/40">something that lasts?</span>
				</h2>

				<p class="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
					From geodetic survey data to nonlinear dynamic seismic calculations and fabrication-level
					LOD 400 models—we translate engineering intent into structures that endure.
				</p>
			</div>

			<div class="flex flex-col justify-end lg:items-end">
				<a
					href="/contact"
					class="inline-flex items-center justify-center gap-3 rounded-full bg-[#d9531e] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b83e10] hover:shadow-[0_0_40px_rgba(217,83,30,0.35)] active:scale-95"
				>
					<span>Start a Project</span>
					<span class="font-mono text-xs">→</span>
				</a>
				<div class="mt-4 font-mono text-xs text-white/40">
					Direct Dispatch: <a
						href="mailto:{siteConfig.contact.email}"
						class="text-white/70 hover:text-[#d9531e]">{siteConfig.contact.email}</a
					>
				</div>
			</div>
		</div>

		<!-- Mid Metadata Grid -->
		<div
			class="grid grid-cols-1 gap-10 border-b border-white/10 py-16 text-xs sm:grid-cols-2 lg:grid-cols-4"
		>
			<!-- Col 1: Studio Identity -->
			<div class="space-y-3">
				<div class="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
					STUDIO DISPATCH
				</div>
				<p class="leading-relaxed text-white/60">
					{siteConfig.firmName}
				</p>
				<div class="space-y-1 font-mono text-[11px] text-white/40">
					<div>{siteConfig.headquarters.address}</div>
					<div>{siteConfig.headquarters.coordinates}</div>
					<div>{siteConfig.headquarters.elevation}</div>
				</div>
			</div>

			<!-- Col 2: Navigation -->
			<div class="space-y-3">
				<div class="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
					DIRECTORY
				</div>
				<ul class="space-y-2 font-mono text-[11px]">
					{#each siteConfig.navLinks as link}
						<li>
							<a
								href={link.href}
								class="flex items-center gap-2 text-white/60 transition-colors hover:text-[#d9531e]"
							>
								<span class="text-white/30">{link.code}</span>
								<span>{link.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Col 3: Licensure -->
			<div class="space-y-3">
				<div class="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
					CHARTERED LICENSURE
				</div>
				<div class="space-y-2 leading-relaxed text-white/60">
					<div><strong>{siteConfig.name}</strong></div>
					<div class="font-mono text-[11px] text-white/50">{siteConfig.credentials}</div>
					<div class="pt-1 font-mono text-[10px] text-white/40">
						IEB #F-11204 · BPERB #1480<br />
						RAJUK Enlisted Category-A
					</div>
				</div>
			</div>

			<!-- Col 4: Engineering Standards -->
			<div class="space-y-3">
				<div class="font-mono text-[11px] font-bold tracking-wider text-white uppercase">
					GOVERNING CODES
				</div>
				<ul class="space-y-1.5 font-mono text-[11px] text-white/50">
					<li>• BNBC 2020 (Bangladesh Code)</li>
					<li>• RAJUK Metropolitan Rules</li>
					<li>• ACI 318-19 Structural Concrete</li>
					<li>• AISC 360-22 Structural Steel</li>
					<li>• ISO 19650 Level 2 openBIM</li>
				</ul>
			</div>
		</div>

		<!-- Monumental Closing Brand Typographic Moment -->
		<div class="overflow-hidden pt-12 pb-4 select-none" aria-hidden="true">
			<div
				class="text-center font-display text-[13vw] leading-[0.82] font-black tracking-tighter text-white/[0.07] uppercase transition-colors duration-500 hover:text-white/[0.12] sm:text-left"
			>
				THE ARCHITECT
			</div>
		</div>

		<!-- Bottom Line: Legal & Copyright -->
		<div
			class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 font-mono text-[11px] text-white/40 sm:flex-row"
		>
			<div>
				© {new Date().getFullYear()}
				{siteConfig.firmName}. ALL RIGHTS RESERVED.
			</div>

			<div class="flex items-center gap-6">
				{#each siteConfig.socialLinks as soc}
					<a
						href={soc.url}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors hover:text-white"
					>
						{soc.platform}
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
