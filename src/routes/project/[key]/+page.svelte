  <script lang="ts">
    import { onMount } from 'svelte';
    import Layout from './../../layout.svelte';
    import { goto } from '$app/navigation';

    let videoLink:string ; 

    onMount(() => {
      showTitleAndThenPlayVideo();
    });
  
    async function showTitleAndThenPlayVideo() {
      // Show the title with a black background for 0.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Play the video or use Vimeo player API to control video playback
    }
  
    function goBack() {
      goto('/');
    }
  </script>

<Layout>
  <div>
    <button class="back-button" on:click={() => goBack()}>Back</button>
    <div class="video-container">
      <!-- svelte-ignore a11y-missing-attribute -->
      <iframe
        src={videoLink}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</Layout>

  
  <style>
    /* Add your CSS styling here for the video container and custom buttons */
  </style>
  