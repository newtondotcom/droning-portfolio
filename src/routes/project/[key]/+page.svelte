<svelte:head>
  <script src="https://player.vimeo.com/api/player.js"></script>
</svelte:head>

<script lang="js">
  import { onMount } from 'svelte';
  import Layout from './../../layout.svelte';
  import { goto } from '$app/navigation';
  import {delay} from '../../../lib/constants';

  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let isFullScreen = false;
  let displayFooter = false;
  let videoReady = false;

  export let data;
  let player; 

  onMount(async () => {

    setTimeout(() => {
        displayFooter = true;
      }, delay);

    const options = {
      //id: data.videoLink,
      id : 849909483,
      width: 640,
      loop: true,
      autoplay: true,
      controls: false
    };
    showTitleAndThenPlayVideo();

    // Initialize the player inside the onMount hook
    player = new Vimeo.Player('video', options);
    duration = await getDuration();

    player.ready().then(function() {
      videoReady = true;
    });

    player.on('play', function () {
      console.log('played the video!');
      isPlaying = true;
    });

    player.on('pause', function () {
      console.log('paused the video!');
      isPlaying = false;
    });

    player.on('timeupdate', function (data) {
      currentTime = data.seconds;
    });

    player.ready().then(function() {
      console.log('the player is ready');
      videoReady = true;
    });
    
    

    document.addEventListener('fullscreenchange', handleFullscreenChange);

  });

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async function getCurrentTime() {
    currentTime = await player.getCurrentTime();
  }

  async function getDuration() {
    return await player.getDuration();
  }

  async function showTitleAndThenPlayVideo() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    displayFooter = true;
  }

  function togglePlayPause() {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
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

  function goBack() {
    goto('/');
  }

  function handleFullscreenChange() {
    isFullScreen = document.fullscreenElement !== null;
    console.log(isFullScreen);
  }
</script>

<Layout displayFooter={displayFooter}>
  <button class="back-button" on:click={() => goBack()}>Back</button>
  <div class="video-container">
    <div on:click={() => togglePlayPause()} id="video"></div>
      <div class="underlay fullscreen">
        <div class="controls-container">
          <button id="play-pause-btn" on:click={() => togglePlayPause()}>
            {isPlaying ? 'pause' : 'play'}
          </button>
          <div id="time" class="time-container">
            {formatDuration(currentTime)} {formatDuration(duration)}
          </div>
          <div class="progress-bar">
            <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
          </div>
          <button id="fullscreen-btn" on:click={() => toggleFullScreen()}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
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

  #btton {
    background-color: black;
    color : white;
    font-family: 'VT323', monospace;
  }

  #video {
    width: 100vw;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    background-color: black;
    align-items: center;
    margin-left: 55vw;
  }

  .progress-bar {
    width: 400px;
    height: 2px;
    background-color: white;
    margin-top: 20px;
    transform: translateY(-10px);
  }

  .progress {
    height: 5px;
    background-color: white;
    transform: translateY(-50%);
  }

  .underlay {
    width: 100%;
    height: 100%;
    margin-bottom: 100px;
    color: white;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .fullscreen {
    position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
  }

  .controls-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .controls-container.fullscreen {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }

    .time-container {
        margin: 0 20px;
    }
</style>
