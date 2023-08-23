<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import Layout from '../../+layout.svelte;
  import { goto } from '$app/navigation';
  import Constants from '$lib/constants';
  import ProjectComponent from '$lib/ProjectComponent.svelte';
  
  let videoReady = true;
  let length : number;
  let datas : any[] = [];
  let index : number;

  export let data;

  index = parseInt(data.index,10);

  onMount(async () => {
    length = datas.length;
  });

  function goBack() {
    goto('/');
  }

  function goNext() {
    index = (index + 1)%length;
    videoReady = false;
    setTimeout(() => {
      document.location.href = `/project/${index}`;
    }, Constants.delay);
  }

</script>

<Layout>
  <ProjectComponent index={parseInt(data.index,10)} bind:videoReady/>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;" id="previous" class="nav" on:click={goBack}>go back</a>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a style="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;" id="next" class="nav" on:click={goNext}>next</a>

  <div class="nav-mobileC" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
  <a id="previousm" class="nav-mobile" on:click={goBack}>go back</a>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a id="nextm" class="nav-mobile"on:click={goNext}>next</a>
</Layout>

<style>

  a {
    color: white;
    text-decoration: none;
  }

    .nav {
        font-size: 2rem;
        color: white;
        z-index: 2;
        background-color: black;
        padding: 10px;
        border-radius: 20px;
        margin: 10px;
        border : 2px double grey;
    }
    

    #previous {
        position: fixed;
        top: 95%;
        left: 0;
        transform: translateY(-50%);
    }

    #next {
        position: fixed;
        top: 95%;
        right: 0;
        transform: translateY(-50%);
    }

    .nav-mobileC {
      display: none;
    }

    @media (max-width: 768px) {

        .nav {
          display : none;
        }

        .nav-mobileC {
          display: block;
          font-size: 2rem;
          color: white;
          z-index: 2;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 0;
        }

        .nav-mobile {
          background-color: black;
          padding: 10px;
          border-radius: 20px;
          margin: 10px;
          position: relative;
          text-decoration: none;
          border : 2px double grey;
          color : white;
        }

        #previousm {
          float: left;
        }

        #nextm {
          float: right;
        }
        
    }

</style>
