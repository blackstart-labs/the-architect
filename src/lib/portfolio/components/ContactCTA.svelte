<script lang="ts">
	import { Check, MapPin } from 'lucide-svelte';
	import Section from '$lib/ui/Section.svelte';
	import Eyebrow from '$lib/ui/Eyebrow.svelte';
	import PrimaryButton from '$lib/ui/PrimaryButton.svelte';
	let sender = $state(''),
		email = $state(''),
		message = $state(''),
		botcheck = $state(''),
		sending = $state(false),
		feedback = $state(''),
		success = $state(false);
	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (sending) return;
		sending = true;
		feedback = '';
		success = false;
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: sender, email, message, botcheck }),
				signal: AbortSignal.timeout(20000)
			});
			const data = await response.json();
			success = response.ok && data.success === true;
			feedback =
				typeof data.message === 'string'
					? data.message
					: 'Your inquiry could not be sent. Please try again.';
			if (success) sender = email = message = botcheck = '';
		} catch {
			feedback = 'Something went wrong. Please try again.';
		} finally {
			sending = false;
		}
	}
</script>

<Section id="contact" class="contact"
	><div class="contact-layout">
		<div class="contact-copy">
			<Eyebrow text="PROJECT INQUIRIES" />
			<h2>Discuss the scope.<br /><span>Plan the next step.</span></h2>
			<p>
				For residential construction, site coordination or quantity planning, describe the project
				location, current stage and the support required.
			</p>
			<div class="contact-location">
				<MapPin size={18} aria-hidden="true" /><span>Based in Bangladesh</span>
			</div>
			<p class="contact-note">
				Your name, email and project description are shared with Web3Forms to deliver your inquiry.
			</p>
		</div>
		<form class="contact-form" onsubmit={submit} aria-busy={sending}>
			<input
				type="text"
				name="botcheck"
				bind:value={botcheck}
				tabindex="-1"
				autocomplete="off"
				hidden
				aria-label="Leave this field empty"
			/>
			<div class="form-row">
				<label
					>Your name<input
						bind:value={sender}
						name="name"
						disabled={sending}
						autocomplete="name"
						placeholder="Full name"
						required
						maxlength="100"
					/></label
				><label
					>Email address<input
						bind:value={email}
						name="email"
						disabled={sending}
						type="email"
						autocomplete="email"
						placeholder="you@example.com"
						required
						maxlength="200"
					/></label
				>
			</div>
			<label
				>Tell me about your project<textarea
					bind:value={message}
					name="message"
					disabled={sending}
					placeholder="Location, project stage, and support required"
					rows="4"
					required
					maxlength="3000"></textarea></label
			><PrimaryButton type="submit" disabled={sending}
				>{sending ? 'Sending…' : 'Send Project Inquiry'}</PrimaryButton
			>{#if feedback}<div class="form-result" role={success ? 'status' : 'alert'}>
					{#if success}<Check size={20} aria-hidden="true" />{/if}
					<div>
						<p>{feedback}</p>
					</div>
				</div>{/if}
		</form>
	</div></Section
>
