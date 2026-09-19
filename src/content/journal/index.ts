import type { JournalArticle } from '$lib/types/article';
import { article001 } from './article-001';
import { article002, article003 } from './article-002';

export const allArticles: JournalArticle[] = [article001, article002, article003];

export function getAllArticles(): JournalArticle[] {
	return allArticles;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
	return allArticles.find((a) => a.slug === slug);
}
