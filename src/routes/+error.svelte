<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/ui/Container.svelte';
	import Eyebrow from '$lib/ui/Eyebrow.svelte';
	import PrimaryButton from '$lib/ui/PrimaryButton.svelte';
	import TextLink from '$lib/ui/TextLink.svelte';
</script>

<svelte:head
	><title>{page.status} | Civil Engineering Portfolio</title><meta
		name="robots"
		content="noindex"
	/></svelte:head
>
<Container class="error-page"
	><Eyebrow text={'ERROR ' + page.status} />
	<h1>{page.status === 404 ? 'This page is not on the plan.' : 'The page could not be loaded.'}</h1>
	<p>
		{page.status === 404
			? 'The address may have changed. Return to the portfolio to explore the construction studies and technical experience.'
			: 'Please try again, or return to the portfolio.'}
	</p>
	<div><PrimaryButton href="/">Return to the portfolio</PrimaryButton></div>
	<TextLink href="/#projects">Explore engineering studies</TextLink></Container
>
