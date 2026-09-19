export interface InquiryType {
	id: string;
	label: string;
	description: string;
}

export const inquiryTypes: InquiryType[] = [
	{
		id: 'prime-structural',
		label: 'Prime Structural Engineering Commission',
		description: 'New building superstructure design, high-rise, or bridge project.'
	},
	{
		id: 'peer-review',
		label: 'Independent Structural Peer Review / Value Engineering',
		description: 'Third-party code review, seismic audit, or material reduction analysis.'
	},
	{
		id: 'bim-vdc',
		label: 'LOD 400 BIM / VDC Digital Twin Management',
		description: 'Clash resolution, shop drawing generation, and openBIM management.'
	},
	{
		id: 'seismic-investigation',
		label: 'Seismic Evaluation & Forensic Investigation',
		description:
			'ASCE 41-17 vulnerability study, post-event survey, or structural litigation expert witness.'
	}
];

export const contactConfig = {
	inquiryTypes,
	responseCommitment: 'Formal RFQ acknowledgments provided within 24 business hours.',
	directEmail: 'contact@vance-engineering.com.bd',
	rfqSubmissionEmail: 'proposals@vance-engineering.com.bd',
	telephone: '+880 1711-000000',
	dispatchOffice: {
		addressLine1: 'Gulshan Avenue, Circle-2',
		addressLine2: 'Dhaka 1212',
		country: 'Bangladesh',
		coordinates: '23.7937° N, 90.4066° E',
		timeZone: 'Bangladesh Standard Time (UTC+6)'
	}
};
