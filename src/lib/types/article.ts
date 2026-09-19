export interface JournalArticle {
	id: string;
	slug: string;
	paperNumber: string;
	title: string;
	abstract: string;
	publishedDate: string;
	category: string;
	readTimeMinutes: number;
	disciplines: string[];
	doi?: string;
	leadAuthor: {
		name: string;
		title: string;
		credentials: string;
	};
	sections: Array<{
		heading: string;
		subheading?: string;
		content: string[];
		technicalNotes?: string[];
		formula?: string;
	}>;
	references: string[];
}
