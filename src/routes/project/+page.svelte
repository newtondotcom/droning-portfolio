<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Constants from '$lib/constants';
  import ProjectComponent from '$lib/ProjectComponent.svelte';
  import db from '$lib/db';

  let videoReady = true;
  let length: number;
  let datas: any[] = [];
  let index: number;
  let nextIndex: number;

  function goBack() {
    videoReady = false;
    setTimeout(() => {
      goto('/');
    }, Constants.delay);
  }

  function goPrevious() {
    nextIndex = (index - 1) % length;
    videoReady = false;
    setTimeout(() => {
      goto(`/project?key=${nextIndex}`);
    }, Constants.delay);
    index = nextIndex;
  }

  function goNext() {
    nextIndex = (index + 1) % length;
    videoReady = false;
    setTimeout(() => {
      goto(`/project?key=${nextIndex}`);
    }, Constants.delay);
    index = nextIndex;
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyParam = urlParams.get('key');
    if (keyParam !== null) {
      index = parseInt(keyParam);
    }    
    datas = db;
    length = datas.length;
  });
</script>

<ProjectComponent index={index} bind:videoReady />

<button id="back" on:click={goBack} class="comic-button desktop">go back</button>
  <!--
<button id="next" on:click={goNext} class="comic-button desktop">next</button>
  -->

<div class="bottom-bar" style="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
  <!--
  <button id="backm" class="mobile" on:click={goPrevious}>previous</button>
  <button id="nextm" class="mobile" on:click={goNext}>next</button>
  -->
  <button id="backm" class="mobile" on:click={goBack}>close (x)</button>
</div>


<style>

  :root {
    --button-width: 150px;
    font-family: Inconsolata, monospace;
  }
    

    #next {
        position: fixed;
        top: 90%;
        left: calc(50%);
    }

    #back {
        position: fixed;
        top: 90%;
        left: calc(50% - var(--button-width)/2);
    }

    .comic-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      color: #fff;
      width: var(--button-width);
      background-color: black;
      border: 2px solid white;
      border-radius: 10px;
      box-shadow: 5px 5px 0px white;
      transition: all 0.3s ease;
    }

    .comic-button:hover {
      background-color: #fff;
      color: black;
      border: 2px solid white;
      box-shadow: 5px 5px 0px white;
    }

    .comic-button:active {
      background-color: blue;
      box-shadow: none;
      transform: translateY(4px);
    }

    .mobile {
      display: none;
    }

    .desktop {
      display: block;
    }

    @media (max-width: 768px) {

        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        #backm {
          background-color: white;
          border: none;
          z-index: 1001;
        }

        #nextm {
          background-color: white;
          border: none;
          z-index: 1001;
        }

        #backm {
          background-color: white;
          border: none;
          z-index: 1001;
        }

        .mobile {
          display: block;
        }

        .desktop {
          display: none;
        }

        .comic-button {
          width: 100px;
          font-size: 16px;
        }
        
    }

</style>
