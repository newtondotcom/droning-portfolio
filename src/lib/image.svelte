<script lang="ts">
	import { onMount } from 'svelte'
	export let src:string;
    export let alt:string;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
			const img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
	})
</script>

{#if loaded}
	<img {src} alt="{alt}" />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
{:else if loading}
	<div id="beforeloading" />
{/if}

<style>
    #beforeloading {
        height: calc(30vw*0.5625);
    }

    img {
        width: 30vw;
        height: auto;
        object-fit: cover;
    }

    
@media (max-width: 768px) {

  img {
  width: 80vw;
  height: auto;
  object-fit: cover;
  }
} 

</style>
