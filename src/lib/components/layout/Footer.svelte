<script lang="ts">
	import { siteConfig } from '$content/site/site.config';
</script>

<footer class="border-t border-white/10 bg-[#0c0c0c] text-white">
	<!-- Technical Title Block Grid -->
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
			<!-- Col 1: Firm Title Block -->
			<div class="space-y-4 border-l-2 border-[#e5a93c] pl-4">
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 bg-[#e5a93c]"></div>
					<span class="font-mono text-sm font-bold tracking-widest text-white uppercase">
						{siteConfig.firmName}
					</span>
				</div>
				<p class="text-xs leading-relaxed text-white/60">
					{siteConfig.description}
				</p>
				<div class="space-y-1 font-mono text-[11px] text-white/40">
					<div>COORD: {siteConfig.headquarters.coordinates}</div>
					<div>DATUM: {siteConfig.headquarters.elevation}</div>
					<div>OFFICE: {siteConfig.headquarters.address}</div>
				</div>
			</div>

			<!-- Col 2: Navigation Directory -->
			<div>
				<div class="tech-label mb-4 text-[#e5a93c]">ENGINEERING DIRECTORY</div>
				<ul class="space-y-2.5 font-mono text-xs">
					{#each siteConfig.navLinks as link}
						<li>
							<a
								href={link.href}
								class="flex items-center gap-2 text-white/70 transition-colors hover:text-[#e5a93c]"
							>
								<span class="text-[10px] text-white/30">{link.code}</span>
								<span>{link.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Col 3: Building Codes & Standards -->
			<div>
				<div class="tech-label mb-4 text-[#e5a93c]">REGULATORY CODE COMPLIANCE</div>
				<ul class="space-y-1.5 font-mono text-[11px] text-white/60">
					{#each siteConfig.engineeringCodes as code}
						<li class="border-b border-white/5 pb-1">
							• {code}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Col 4: Licensure & Direct Inquiries -->
			<div class="space-y-4">
				<div class="tech-label mb-4 text-[#e5a93c]">LICENSURE & DISPATCH</div>
				<div class="space-y-2 border border-white/10 bg-[#181818] p-4 font-mono text-xs">
					<div class="font-semibold text-[#e5a93c]">{siteConfig.name}</div>
					<div class="text-[11px] text-white/60">{siteConfig.credentials}</div>
					<div class="border-t border-white/10 pt-2 text-[10px] text-white/40">
						NY PE #098421 // WA SE #54129 // CEng #649022
					</div>
				</div>

				<div class="pt-2">
					<a
						href="/contact"
						class="block w-full border border-[#e5a93c] bg-[#e5a93c]/10 py-2.5 text-center font-mono text-xs font-bold text-[#e5a93c] transition-all hover:bg-[#e5a93c] hover:text-black"
					>
						[TRANSMIT FORMAL RFQ]
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom Copyright & Sheet Title Box -->
		<div
			class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-mono text-xs text-white/40 md:flex-row"
		>
			<div class="flex items-center gap-4">
				<span>© {new Date().getFullYear()} {siteConfig.firmName}. ALL RIGHTS RESERVED.</span>
				<span class="hidden md:inline">|</span>
				<span class="hidden md:inline">ISO 19650 STAGE 5 AS-BUILT</span>
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
