# 10 — Contact System & Custom Adapters

The portfolio includes an enterprise Request for Qualifications (RFQ) contact form with an adapter pattern located in `src/lib/utils/contactAdapter.ts`.

---

## Form State Machine

The component `src/lib/components/contact/ContactForm.svelte` provides explicit states:

1. `idle`: Standard user input state
2. `submitting`: Disables buttons and shows transmission indicator
3. `success`: Displays formal docket confirmation code and timestamp
4. `error`: Displays error diagnosis message

---

## Connecting a Real Email Service (Resend / SendGrid / Supabase)

To connect an external API, implement the `ContactAdapter` interface in `src/lib/utils/contactAdapter.ts`:

```typescript
export class ProductionEmailAdapter implements ContactAdapter {
	async submit(data: ContactSubmission): Promise<SubmissionResult> {
		const response = await fetch('/api/submit-rfq', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		const result = await response.json();
		return {
			success: response.ok,
			confirmationId: result.docketNumber,
			error: result.message
		};
	}
}

export const activeContactAdapter = new ProductionEmailAdapter();
```
