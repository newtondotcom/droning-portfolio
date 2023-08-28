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

  <button id="back" on:click={goBack} class="comic-button">go back</button>
  <button id="next" on:click={goNext} class="comic-button">next</button>
  
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->

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
    

    #next {
        position: fixed;
        top: 90%;
        left: 45%;
    }

    #back {
        position: fixed;
        top: 90%;
        left: 55%;
    }

    .nav-mobileC {
      display: none;
    }

    .comic-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      color: #fff;
      background-color: #ff5252;
      border: 2px solid #000;
      border-radius: 10px;
      box-shadow: 5px 5px 0px #000;
      transition: all 0.3s ease;
    }

    .comic-button:hover {
      background-color: #fff;
      color: #ff5252;
      border: 2px solid #ff5252;
      box-shadow: 5px 5px 0px #ff5252;
    }

    .comic-button:active {
      background-color: #fcf414;
      box-shadow: none;
      transform: translateY(4px);
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
