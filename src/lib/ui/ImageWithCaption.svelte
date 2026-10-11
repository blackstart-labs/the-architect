<script lang="ts">
	let {
		src,
		srcset,
		sizes,
		alt,
		caption,
		width,
		height,
		eager = false,
		class: className = ''
	} = $props<{
		src: string;
		srcset?: string;
		sizes?: string;
		alt: string;
		caption: string;
		width: number;
		height: number;
		eager?: boolean;
		class?: string;
	}>();
</script>

<figure class={className}>
	<img
		{src}
		{srcset}
		{sizes}
		{alt}
		{width}
		{height}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : 'auto'}
	/>
	<figcaption class="image-caption">{caption}</figcaption>
</figure>
