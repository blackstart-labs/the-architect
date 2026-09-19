<script lang="ts">
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import { contactConfig } from '$content/contact/contact.config';
	import { siteConfig } from '$content/site/site.config';
</script>

<svelte:head>
	<title>Contact & Proposal Submission | Vance Engineering</title>
	<meta
		name="description"
		content="Submit structural engineering requests for proposal (RFQ), peer review inquiries, and BIM digital twin commissions."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="COMMISSIONING & DISPATCH"
		title="Engineering Inquiries & RFQ Dispatch"
		subtitle="Transmit project specifications, structural peer review requests, or BIM digital twin scopes for formal evaluation."
	/>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
		<!-- Left Col: Office Coordinates & Protocols -->
		<div class="space-y-6 font-mono text-xs">
			<div class="blueprint-bracket space-y-4 border border-white/10 bg-[#181818] p-6">
				<div class="tech-label text-[#e5a93c]">PRIMARY DISPATCH OFFICE</div>
				<div class="space-y-1 text-white/70">
					<div class="font-sans text-sm font-bold text-white">{siteConfig.firmName}</div>
					<div>{contactConfig.dispatchOffice.addressLine1}</div>
					<div>{contactConfig.dispatchOffice.addressLine2}</div>
					<div>{contactConfig.dispatchOffice.country}</div>
				</div>

				<div class="space-y-1 border-t border-white/10 pt-3 text-[11px] text-white/50">
					<div>DATUM: {contactConfig.dispatchOffice.coordinates}</div>
					<div>TIMEZONE: {contactConfig.dispatchOffice.timeZone}</div>
				</div>
			</div>

			<div class="space-y-3 border border-white/10 bg-[#181818] p-6">
				<div class="tech-label text-white/40">DIRECT COMMUNICATION CHANNELS</div>
				<div class="space-y-2">
					<div>
						<div class="text-[10px] text-white/40">FORMAL PROPOSALS:</div>
						<a
							href="mailto:{contactConfig.rfqSubmissionEmail}"
							class="font-bold text-[#e5a93c] hover:underline"
						>
							{contactConfig.rfqSubmissionEmail}
						</a>
					</div>
					<div>
						<div class="text-[10px] text-white/40">PRINCIPAL DIRECT:</div>
						<a href="mailto:{contactConfig.directEmail}" class="text-white/80 hover:underline">
							{contactConfig.directEmail}
						</a>
					</div>
					<div>
						<div class="text-[10px] text-white/40">TELEPHONE:</div>
						<span class="text-white/80">{contactConfig.telephone}</span>
					</div>
				</div>
			</div>

			<div
				class="border-l-2 border-[#e5a93c] bg-[#1a1a1a] p-4 font-sans text-xs leading-relaxed text-white/70"
			>
				<strong class="mb-1 block font-mono text-white">PROPOSAL TURNAROUND PROTOCOL:</strong>
				{contactConfig.responseCommitment}
			</div>
		</div>

		<!-- Right Col: Interactive RFQ Submission Form -->
		<div class="lg:col-span-2">
			<ContactForm />
		</div>
	</div>
</div>
