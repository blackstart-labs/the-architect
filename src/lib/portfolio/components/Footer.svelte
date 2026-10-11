<script lang="ts">
	import Container from '$lib/ui/Container.svelte';
	import TextLink from '$lib/ui/TextLink.svelte';
	import { owner } from '../data';
</script>

<footer>
	<Container class="site-footer"
		><a class="footer-brand" href="#home"
			><strong>{owner.name.toUpperCase()}</strong><small
				>Civil engineering & construction studies</small
			></a
		>
		<p>© {new Date().getFullYear()} · Representative portfolio studies.</p>
		<TextLink href="#home">Back to top</TextLink></Container
	>
</footer>
