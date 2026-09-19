export interface ContactSubmission {
	name: string;
	email: string;
	phone?: string;
	inquiryType: string;
	projectBudget?: string;
	estimatedGfa?: string;
	location?: string;
	message: string;
}

export interface SubmissionResult {
	success: boolean;
	confirmationId?: string;
	error?: string;
}

export interface ContactAdapter {
	submit(data: ContactSubmission): Promise<SubmissionResult>;
}

/**
 * Default Simulated Production Engineering RFQ Adapter.
 * Replace with your enterprise webhook, Resend, SendGrid, or Supabase backend.
 */
export class DefaultContactAdapter implements ContactAdapter {
	async submit(data: ContactSubmission): Promise<SubmissionResult> {
		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 1200));

		// Basic simulated server validation
		if (!data.name || !data.email || !data.message) {
			return {
				success: false,
				error: 'Missing required dispatch fields.'
			};
		}

		// Generate simulated RFQ docket reference
		const confirmationId = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

		return {
			success: true,
			confirmationId
		};
	}
}

export const activeContactAdapter: ContactAdapter = new DefaultContactAdapter();
