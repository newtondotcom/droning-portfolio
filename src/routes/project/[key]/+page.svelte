<svelte:head>
  <script src="https://player.vimeo.com/api/player.js"></script>
</svelte:head>

<script lang="js">
  import { onMount } from 'svelte';
  import Layout from './../../layout.svelte';
  import { goto } from '$app/navigation';

  let videoLink;

  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let isFullScreen = false;

  export let data;

  const options = {
    id: 849909483,
    width: 640,
    loop: true,
    autoplay: true,
    controls: false,
  };

  let player; // Declare player variable

  onMount(async () => {
    videoLink = data.videoLink;
    showTitleAndThenPlayVideo();

    // Initialize the player inside the onMount hook
    player = new Vimeo.Player('video', options);
    duration = await getDuration();

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
    // FADE IN
    await new Promise((resolve) => setTimeout(resolve, 500));
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
</script>

<Layout>
    <button class="back-button" on:click={() => goBack()}>Back</button>
    <div class="video-container">
      <div id="video"></div>
      <div class="underlay">
        <button id="btton" on:click={() => toggleFullScreen()}></button>
        <button id="btton" on:click={() => togglePlayPause()}>{isPlaying ? 'pause' : 'play'}</button>
        <div id="time">{formatDuration(currentTime)} {formatDuration(duration)}</div>
        <div class="progress-bar">
          <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
        </div>
      </div>
      {#if isFullScreen}
      <div class="underlay fullscreen">
        <button id="btton" on:click={() => toggleFullScreen()}></button>
        <button id="btton" on:click={() => togglePlayPause()}>{isPlaying ? 'pause' : 'play'}</button>
        <div id="time">{formatDuration(currentTime)} {formatDuration(duration)}</div>
        <div class="progress-bar">
          <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
        </div>
      </div>
      {/if}

    </div>
</Layout>

<style>
  .video-container {
    margin-top: 100px;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .video-container:hover {
    cursor: grab;
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
    transform: translateX(+20%);
  }

  .progress-bar {
    width: 80%;
    height: 2px;
    background-color: white;
    margin-top: 20px;
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
</style>
