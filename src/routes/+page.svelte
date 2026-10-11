<script lang="ts">
	import Portfolio from '$lib/portfolio/Portfolio.svelte';
	import Seo from '$lib/portfolio/components/Seo.svelte';
	import type { PageData } from './$types';
	let { data } = $props<{ data: PageData }>();
</script>

<Portfolio />
<Seo canonical={data.canonical} socialImage={data.socialImage} />
