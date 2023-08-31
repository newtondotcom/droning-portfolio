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

  function goNext() {
    index = (index + 1) % length;
    nextIndex = (index + 1) % length; // Update nextIndex here
    videoReady = false;
    setTimeout(() => {
      goto(`/project/${nextIndex}`);
    }, Constants.delay);
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyParam = urlParams.get('key');
    if (keyParam !== null) {
      index = parseInt(keyParam);
    }    
    datas = db;
    length = datas.length;
    nextIndex = (index + 1) % length;
  });
</script>

<ProjectComponent index={index} bind:videoReady />

<button id="back" on:click={goBack} class="comic-button desktop">go back</button>
<button id="next" on:click={goNext} class="comic-button desktop">next</button>

<div style="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
  <button id="back" class="comic-button mobile" on:click={goBack}>go back</button>
  <button id="next" class="comic-button mobile" on:click={goNext}>next</button>
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
        left: calc(50% - var(--button-width));
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

        #back {
          position: absolute;
          top: 90%;
          left: calc(50% - var(--button-width));
        }

        #next {
          position: absolute;
          top: 90%;
          left: calc(50%);
        }

        .mobile {
          display: block;
        }

        .desktop {
          display: none;
        }
        
    }

</style>
