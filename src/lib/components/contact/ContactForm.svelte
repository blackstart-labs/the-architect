<script lang="ts">
	import { contactConfig } from '$content/contact/contact.config';
	import { activeContactAdapter, type ContactSubmission } from '$lib/utils/contactAdapter';

	let formStatus: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');
	let confirmationCode = $state('');

	let formData: ContactSubmission = $state({
		name: '',
		email: '',
		phone: '',
		inquiryType: contactConfig.inquiryTypes[0].id,
		projectBudget: '',
		estimatedGfa: '',
		location: '',
		message: ''
	});

	let errors: Record<string, string> = $state({});

	function validate(): boolean {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Principal or organization name required.';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Corporate or institutional email required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Invalid email address.';
		}
		if (!formData.message.trim() || formData.message.trim().length < 15) {
			newErrors.message = 'Please provide detailed project scope (minimum 15 characters).';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';

		if (!validate()) {
			return;
		}

		formStatus = 'submitting';

		try {
			const result = await activeContactAdapter.submit(formData);
			if (result.success) {
				confirmationCode = result.confirmationId || 'CONFIRMED';
				formStatus = 'success';
			} else {
				errorMessage = result.error || 'Submission could not be processed by server.';
				formStatus = 'error';
			}
		} catch (err: unknown) {
			errorMessage =
				err instanceof Error ? err.message : 'Network error during transmission.';
			formStatus = 'error';
		}
	}

	function resetForm() {
		formStatus = 'idle';
		formData = {
			name: '',
			email: '',
			phone: '',
			inquiryType: contactConfig.inquiryTypes[0].id,
			projectBudget: '',
			estimatedGfa: '',
			location: '',
			message: ''
		};
		errors = {};
	}
</script>

<div class="rounded-3xl border border-white/10 bg-[#161616]/90 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
	{#if formStatus === 'success'}
		<div class="space-y-6 rounded-2xl border border-white/10 bg-[#1f1f1f]/90 p-8 sm:p-10 text-white">
			<div class="inline-flex items-center gap-2 rounded-full bg-[#e5a93c]/15 px-3.5 py-1 text-xs font-semibold text-[#e5a93c]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#e5a93c]"></span>
				<span>Inquiry Confirmed &amp; Queued</span>
			</div>
			<h3 class="font-display text-2xl sm:text-3xl font-bold">Engineering RFQ Received</h3>
			<p class="text-sm sm:text-base leading-relaxed text-white/70">
				Your project inquiry has been logged for principal review. A formal engineering acknowledgment
				and preliminary scheduling dossier will be sent to <span class="font-medium text-[#e5a93c]">{formData.email}</span> within 24 business hours.
			</p>

			<div class="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/60 space-y-1">
				<div>Reference Docket: <span class="font-bold text-white">{confirmationCode}</span></div>
				<div>Timestamp: {new Date().toISOString()}</div>
				<div>Status: Queued for Lead Structural Evaluation</div>
			</div>

			<button
				type="button"
				onclick={resetForm}
				class="inline-flex items-center gap-2 rounded-full border border-[#e5a93c] px-6 py-3 text-xs font-semibold text-[#e5a93c] transition-all hover:bg-[#e5a93c] hover:text-black active:scale-95"
			>
				<span>Submit Another Inquiry</span>
				<span>→</span>
			</button>
		</div>
	{:else}
		<form onsubmit={handleSubmit} novalidate class="space-y-6">
			<!-- Header Block -->
			<div class="border-b border-white/10 pb-6">
				<div class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-[#e5a93c]">
					<span class="h-1.5 w-1.5 rounded-full bg-[#e5a93c]"></span>
					<span>Project Commission Portal</span>
				</div>
				<h3 class="font-display text-xl sm:text-2xl font-bold text-white">
					Request for Qualifications (RFQ) &amp; Technical Scope
				</h3>
			</div>

			{#if formStatus === 'error'}
				<div class="rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-xs text-red-300">
					{errorMessage}
				</div>
			{/if}

			<!-- Contact Info Grid -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<label for="name" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
						Primary Contact / Firm <span class="text-[#e5a93c]">*</span>
					</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						placeholder="e.g. Elena Rostova / Cascadia Urban"
						class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
					/>
					{#if errors.name}
						<span class="mt-1.5 block text-xs text-red-400">{errors.name}</span>
					{/if}
				</div>

				<div>
					<label for="email" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
						Corporate Email <span class="text-[#e5a93c]">*</span>
					</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						placeholder="e.g. e.rostova@cascadia-urban.com"
						class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
					/>
					{#if errors.email}
						<span class="mt-1.5 block text-xs text-red-400">{errors.email}</span>
					{/if}
				</div>
			</div>

			<!-- Inquiry Typology -->
			<div>
				<label for="inquiryType" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
					Commission Classification
				</label>
				<select
					id="inquiryType"
					bind:value={formData.inquiryType}
					class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
				>
					{#each contactConfig.inquiryTypes as type}
						<option value={type.id} class="bg-[#181818] text-white">
							{type.label} — {type.description}
						</option>
					{/each}
				</select>
			</div>

			<!-- Secondary Parameters -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
				<div>
					<label for="location" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
						Project Jurisdiction / Site
					</label>
					<input
						type="text"
						id="location"
						bind:value={formData.location}
						placeholder="e.g. Seattle, WA"
						class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
					/>
				</div>

				<div>
					<label for="estimatedGfa" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
						Estimated GFA (m² / sq ft)
					</label>
					<input
						type="text"
						id="estimatedGfa"
						bind:value={formData.estimatedGfa}
						placeholder="e.g. 45,000 m²"
						class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
					/>
				</div>

				<div>
					<label for="phone" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
						Phone (Optional)
					</label>
					<input
						type="tel"
						id="phone"
						bind:value={formData.phone}
						placeholder="+1 (555) 000-0000"
						class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 px-4 py-3 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
					/>
				</div>
			</div>

			<!-- Scope Narrative -->
			<div>
				<label for="message" class="mb-2 block text-xs font-medium uppercase tracking-wider text-white/70">
					Project Scope Narrative &amp; Critical Objectives <span class="text-[#e5a93c]">*</span>
				</label>
				<textarea
					id="message"
					rows="5"
					bind:value={formData.message}
					placeholder="Outline structural system constraints, target seismic/wind performance criteria, LOD requirements, or preliminary site soil conditions..."
					class="w-full rounded-xl border border-white/10 bg-[#1e1e1e]/60 p-4 font-sans text-sm text-white placeholder-white/30 transition-colors focus:border-[#e5a93c] focus:bg-[#222222] focus:outline-none"
				></textarea>
				{#if errors.message}
					<span class="mt-1.5 block text-xs text-red-400">{errors.message}</span>
				{/if}
			</div>

			<!-- Submission Trigger -->
			<div
				class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row"
			>
				<span class="text-xs text-white/40">
					All transmissions protected under bilateral mutual non-disclosure.
				</span>

				<button
					type="submit"
					disabled={formStatus === 'submitting'}
					class="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#e5a93c] px-9 py-4 font-sans text-sm font-semibold text-black transition-all duration-300 hover:bg-[#f7d070] hover:shadow-[0_0_30px_rgba(229,169,60,0.35)] disabled:opacity-50 sm:w-auto active:scale-95"
				>
					{#if formStatus === 'submitting'}
						<span>Transmitting Dossier...</span>
					{:else}
						<span>Submit Formal RFQ</span>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					{/if}
				</button>
			</div>
		</form>
	{/if}
</div>
