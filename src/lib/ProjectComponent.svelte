<script lang="ts">
  import { onMount } from 'svelte';
  import Constants from './constants';
  import 'vidstack/styles/defaults.css';
  import 'vidstack/styles/community-skin/video.css';
  import 'vidstack/icons';
  import { defineCustomElements } from 'vidstack/elements';
  import FRENCH from '$lib/translations';

  defineCustomElements();

  export let videoReady = true;
  export let index: number;
  
  let isFullScreen = false;
  let player: any; // Use the appropriate type for your player object
  let width = 640;
  let height = 500;
  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let description: string;
  let name: string;
  let videoId: string;
  let datas: any[] = [];

  async function togglePlayPause(event?: Event) {
    if (isPlaying) {
      await player.pause();
    } else {
      await player.play();
    }
    isPlaying = !isPlaying;
  }

  function onPause(event: CustomEvent) {
    isPlaying = false;
  }

  function onPlay(event: CustomEvent) {
    isPlaying = true;
  }

  async function onReady(event: CustomEvent) {
    videoReady = true;
  }

  async function toggleFullScreen() {
    if (isFullScreen) {
      await player.exitFullscreen();
    } else {
      await player.enterFullscreen();
    }
    isFullScreen = !isFullScreen;
  }

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  onMount(async () => {
    datas = JSON.parse(await fetch('/db.json').then((r) => r.text()));
    videoId = datas[index].videoLink;
    duration = parseInt(datas[index].duration, 10);
    description = datas[index].description;
    name = datas[index].name;

    const skin = document.querySelector('media-community-skin');
    if (skin) {
      skin.translations = FRENCH;
    }
    
    player = document.querySelector('media-player');

    if (!player) return;
    player.onAttach(async () => {
      player.addEventListener('data-can-play', onReady);
      player.addEventListener('pause', onPause);
      player.addEventListener('play', onPlay);
      player.addEventListener('time-update', (event: CustomEvent) => {
        currentTime = event.detail.currentTime;
      });
      player.addEventListener('duration-change', (event: CustomEvent) => {
        duration = event.detail;
      });
      player.addEventListener('ready', onReady);
      player.addEventListener('ended', () => {
        player.playVideo();
      });
    });
  });
</script>


<div class="video-container">
  <media-player
  title="{name}"
  src="http://144.91.123.186/latranche/output.m3u8"
  poster="https://media-files.vidstack.io/poster.png"
  aspect-ratio="16/9"
  crossorigin
  >    
  <media-outlet>
      <media-poster
        alt="{description}"
      >
      </media-poster>
    </media-outlet>
    <media-community-skin></media-community-skin>
  </media-player>
    <div id="loading" style="display: {videoReady ? 'none' : 'block'}; width:{width}px; height:{height}px;"></div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="controls-container" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
          <button id="btton" on:click={() => togglePlayPause()}>
            {isPlaying ? 'pause' : 'lancer'}
          </button>
          <div id="time" class="time-container">
            {formatDuration(currentTime)} {formatDuration(duration)}
          </div>
          <div class="progress-bar">
            <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
          </div>
          <button id="btton" on:click={()=>toggleFullScreen()}>
            {isFullScreen ? 'le quitter' : 'plein écran'}
          </button>
        </div>
        <div id="desc" style="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
          <p>{description}</p>
        </div>
  </div>


  <style>
    .video-container {
      position: absolute;
      width: 640px;
      height: 500px;
      top : calc(50% - 400px);
      left : calc(50% - 320px);
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 150px;
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
        width: 640px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
  
      .time-container {
          margin: 0 20px;
      }
  
      #desc {
        margin-top: 50px;
        color : white;
        width: 80vw;
        font-family: Inconsolata, monospace;
      }

      media-player {
        width: 60vw;
        height: calc(60vw/16*9);
        --vm-player-theme: #cc234d;
        z-index: 1000;
      }

    /* Avoid double controls on iOS when in fullscreen. */
    media-player[data-ios-controls] .media-controls,
    /* Hide controls while media is loading, or user is idle. */
    media-player:not([data-can-play]) .media-controls,
    media-player[data-user-idle] .media-controls {
      opacity: 0;
      pointer-events: none;
    }

    /* Show controls if autoplay fails. */
    media-player[data-autoplay-error] .media-controls {
      opacity: 1;
    }
        /* width <600px */
    media-player[data-bp-x='sm'] {
    }

    /* 600px ≤ width < 980 */
    media-player[data-bp-x='md'] {
    }

    /* width ≥ 980 */
    media-player[data-bp-x='lg'] {
    }

    /* height <380px */
    media-player[data-bp-y='sm'] {
    }

    /* 380px ≤ height < 600 */
    media-player[data-bp-y='md'] {
    }

    /* height ≥ 600 */
    media-player[data-bp-y='lg'] {
    }

  
      @media (max-width: 768px) {
          .video-container {
              margin-top: 10vh;
              margin-bottom: 50px;
              height: 50vh; 
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
  
          .progress-bar {
              display : none;
          }
  
          .controls-container {
              margin-top: 10px;
  
          }
  
          .time-container {
            font-size: 20px;
          }
  
          #btton{
            margin-right: 10px;
            font-size: 20px;
          }
  
          #desc {
            margin-top: 20px;
            width: 80vw;
            font-size: 20px;
          }
          
          media-player {
            width: 60vw;
            height: calc(60vw/16*9);
            --vm-player-theme: #cc234d;
            z-index: 1000;
          }

      }
  
      @media (max-height: 500px) {
        .progress-bar {
              display : none;
          }
      }
  </style>
  