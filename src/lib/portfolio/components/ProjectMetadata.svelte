<script lang="ts">
	let { tags } = $props<{ tags: string[] }>();
</script>

<div class="project-tags">
	{#each tags as tag}<span>{tag}</span>{/each}
</div>
