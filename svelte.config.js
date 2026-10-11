import nodeAdapter from '@sveltejs/adapter-node';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: process.env.VERCEL === '1' ? vercelAdapter({ runtime: 'nodejs24.x' }) : nodeAdapter(),
		alias: {
			$content: 'src/content',
			'$content/*': 'src/content/*'
		}
	}
};

export default config;
