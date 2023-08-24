<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { goto } from '$app/navigation';
  import Constants from '$lib/constants';
  import ProjectComponent from '$lib/ProjectComponent.svelte';
  
  let videoReady = true;
  let length : number;
  let datas : any[] = [];
  let index : number;
  let nextIndex : number;

  export let data;

  index = parseInt(data.index,10);

  onMount(async () => {
    datas = JSON.parse(await fetch('/db.json').then((r) => r.text()));
    length = datas.length;
    nextIndex = (index + 1)%length;
    console.log(length);
    console.log(index);
    console.log(nextIndex);
  });

  function goBack() {
    goto('/');
  }

  function goNext() {
    index = (index + 1)%length;
    videoReady = false;
    setTimeout(() => {
      goto(`/project/${nextIndex}`);
    }, Constants.delay);
  }

</script>


  <ProjectComponent index={index} bind:videoReady/>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;" id="previous" class="nav" on:click={goBack}>go back</a>

  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <!--<a style="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;" id="next" class="nav" on:click={goNext}>next</a>-->

  <div class="nav-mobileC" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-missing-attribute -->
    <a id="previousm" class="nav-mobile" on:click={goBack}>go back</a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <!--<a id="nextm" class="nav-mobile"on:click={goNext}>next</a>-->
  </div>


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
          bottom: 100px;
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
