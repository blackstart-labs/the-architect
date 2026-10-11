<script lang="ts">
	import { owner } from '../data';
	let { canonical, socialImage } = $props<{ canonical: string; socialImage: string }>();
	const title = `${owner.name} | Civil Engineer & Construction Portfolio`;
	const description =
		'Civil engineering studies in Bangladesh: residential construction sequencing, structural coordination, quantity planning and an interactive ten-storey building walkthrough.';
	const structured = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Person',
					'@id': canonical + '#person',
					name: owner.name,
					jobTitle: owner.role,
					url: canonical
				},
				{
					'@type': 'WebSite',
					'@id': canonical + '#website',
					url: canonical,
					name: title,
					description,
					inLanguage: 'en-BD',
					author: { '@id': canonical + '#person' }
				},
				{
					'@type': 'VisualArtwork',
					'@id': canonical + '#residential-study',
					name: 'Ten-storey residential construction concept',
					description:
						'A representative Dhaka-inspired architectural study, not a completed commission or certified engineering design.',
					artform: 'Interactive 3D architectural visualization',
					image: socialImage,
					url: canonical + '#construction-experience',
					creator: { '@id': canonical + '#person' }
				}
			]
		}).replace(/</g, '\\u003c')
	);
	const structuredHtml = $derived(
		'<script type="application/ld+json">' + structured + '</scr' + 'ipt>'
	);
</script>

<svelte:head
	><title>{title}</title><meta name="description" content={description} /><link
		rel="canonical"
		href={canonical}
	/><meta property="og:type" content="website" /><meta property="og:title" content={title} /><meta
		property="og:description"
		content={description}
	/><meta property="og:url" content={canonical} /><meta
		property="og:image"
		content={socialImage}
	/><meta property="og:image:width" content="1200" /><meta
		property="og:image:height"
		content="630"
	/><meta
		property="og:image:alt"
		content="Representative ten-storey residential construction study in a Dhaka-inspired setting"
	/><meta property="og:locale" content="en_BD" /><meta
		name="twitter:card"
		content="summary_large_image"
	/><meta name="twitter:title" content={title} /><meta
		name="twitter:description"
		content={description}
	/><meta name="twitter:image" content={socialImage} />
	<!-- JSON is serialized and '<' escaped above; no caller-supplied HTML is rendered. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html structuredHtml}</svelte:head
>
