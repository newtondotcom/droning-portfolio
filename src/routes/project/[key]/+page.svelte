<script lang="ts">
  import { onMount } from 'svelte';
  import Layout from './../../layout.svelte';
  import { goto } from '$app/navigation';
  import {delay, delayAnimation} from '../../../lib/constants';

  import { YouTube } from 'svelte-yt';

  // Can be used to control full YouTube player
  // See https://developers.google.com/youtube/iframe_api_reference#Functions
  let player:any;

  let width;

  if (window.innerWidth > 768) {
    width = window.innerWidth;
  } else {
    width = 360;
  }


  // See https://developers.google.com/youtube/player_parameters#Parameters
  const options = {
    playerVars: {
      modestbranding: 1,
      loop : 1,
      enablejsapi: 1,
      fs : 1,
      rel : 0,
      iv_load_policy : 3,
      showinfo : 0,
      playsinline : 1,
      autohide : 1,
      autoplay: 1,
    },
    width: width,
  };

  let currentTime: any;
  let duration:number = 0;
  let isPlaying = false;
  let isFullScreen = false;
  let displayFooter = false;
  let videoReady = true;

  export let data;

  let videoId = data.videoLink;

  let index;
  let next;
  let previous;

  onMount(async () => {
    index = parseInt(data.key, 10);
    next = index + 1;
    previous = index - 1;

    duration = data.duration;

    setTimeout(() => {
        displayFooter = true;
      }, delay);

      const updateInterval = setInterval(async () => {
        if (player) {
          if (isPlaying) {
            currentTime = await player.getCurrentTime();
          } else {
            currentTime = 0;
          }
        }
      }, 1000);

    player.on('pause', function () {
      isPlaying = false;
    });
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);

  });

  function onPause(event:any) {
    isPlaying = false;
  }

  function onPlay(event:any) {
    isPlaying = true;
  }


  async function onReady(event:any) {
    videoReady = true;
    player.setVolume(0);
  }

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async function getDuration() {
    return await player.getDuration();
  }

  async function toggleFullScreen() {
    const isFS = await player.getFullscreen();
    if (isFS) {
      player.exitFullscreen();
      isFullScreen = false;
    } else {
      player.requestFullscreen();
      isFullScreen = true;
    }
  }

  async function togglePlayPause() {
    if (isPlaying) {
      await player.pauseVideo();
    } else {
      await player.playVideo();
    }
  }

  function goBack() {
    goto('/');
  }

  function handleFullscreenChange() {
    isFullScreen = document.fullscreenElement !== null;
  }
</script>

<Layout displayFooter={videoReady}>
  <div class="video-container">
    <YouTube 
    bind:player 
    on:play={onPlay}
    on:ready={onReady}
    on:pause={onPause}
    {videoId} 
    {options} 
    />

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="controls-container" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{delayAnimation}s ease;">
          <button id="btton" on:click={() => togglePlayPause()}>
            {isPlaying ? 'pause' : 'play'}
          </button>
          <div id="time" class="time-container">
            {formatDuration(currentTime)} {formatDuration(duration)}
          </div>
          <div class="progress-bar">
            <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
          </div>
          <!--
          <button id="btton" on:click={() => toggleFullScreen()}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          -->
        </div>
  </div>
  <a id="previous" class="nav" href="/project/{previous}">previous</a>
  <a id="next" class="nav" href="/project/{next}">next</a>

  <div class="nav-mobile">
  <a id="previousm" class="nav-mobile" href="/project/{previous}">previous</a>
  <a id="nextm" class="nav-mobile" href="/project/{next}">next</a>
  </div>
</Layout>

<style>
  .video-container {
    margin-top: 100px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  a {
    color: white;
    text-decoration: none;
  }


  #btton {
    background-color: black;
    color : white;
    font-family: 'VT323', monospace;
  }

  .progress-bar {
    width: 400px;
    height: 2px;
    background-color: white;
    margin-top: 20px;
    transform: translateY(-10px);
    margin-right: 10px;
  }

  .progress {
    height: 5px;
    background-color: white;
    transform: translateY(-50%);
  }

  #time {
    color : white;
  }

  .controls-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .time-container {
        margin: 0 20px;
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
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }

    #next {
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    .nav-mobile {
      display: none;
    }

    @media (max-width: 768px) {
        .video-container {
            margin-top: 200px;
            margin-bottom: 20px;
            height: 40vh;
        }

        .progress-bar {
            display : none;
        }

        .controls-container {
            margin-top: 0;

        }

        .time-container {
          font-size: 20px;
        }

        .nav {
          display : none;
        }

        .nav-mobile {
          display: block;
          font-size: 2rem;
          color: white;
          z-index: 2;
          background-color: black;
          padding: 10px;
          border-radius: 20px;
          margin: 10px;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
        }

        #previousm {
          border : 2px double grey;
          color : white;
          float: left;
        }

        #nextm {
          border : 2px double grey;
          color : white;
          float: right;
        }

        #btton{
          margin-right: 10px;
          font-size: 20px;
        }
    }

    @media (max-height: 500px) {
      .progress-bar {
            display : none;
        }
    }

</style>
