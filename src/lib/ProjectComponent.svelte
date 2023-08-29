<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Constants from './constants';
  import 'vidstack/styles/defaults.css';
  import 'vidstack/styles/community-skin/video.css';
  import 'vidstack/icons';
  import { defineCustomElements } from 'vidstack/elements';
  import FRENCH from '$lib/translations';

  export let videoReady = false;
  export let index: number;
  
  let isFullScreen = false;
  let player: any; 
  let width = 640;
  let height = 500;
  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let description: string;
  let thumbnail: string;
  let name: string;
  let videoId: string;
  let datas: any[] = [];

  async function togglePlayPause(event?: Event) {
    if (isPlaying) {
      await player.pause();
    } else {
      await player.play();
    }
  }

  function toggleMute() {
  player.muted = !player.muted;
  } 


  function onPause(event: CustomEvent) {
    isPlaying = false;
  }

  function onPlay(event: CustomEvent) {
    isPlaying = true;
  }

  async function onReady(event: CustomEvent) {
    console.log('ready');
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

  function seekTo(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - progressBarRect.left;
    const clickPercentage = clickX / progressBarRect.width;
    const newTime = duration * clickPercentage;
    player.currentTime = newTime;
  }
  
  onMount(async () => {
    await defineCustomElements();
    datas = JSON.parse(await fetch('/db.json').then((r) => r.text()));
    videoId = datas[index].videoLink;
    description = datas[index].description;
    thumbnail = datas[index].thumbnail;
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
      player.muted = true;
      player.keyShortcuts = {
        togglePaused: 'k Space',
        toggleMuted: 'm',
        toggleFullscreen: 'f',
        togglePictureInPicture: 'i',
        toggleCaptions: 'c',
        seekBackward: 'ArrowLeft',
        seekForward: 'ArrowRight',
        volumeUp: 'ArrowUp',
        volumeDown: 'ArrowDown',
      };
    });
  });

  onDestroy(async () => {
    if (!player) return;
    player.removeEventListener('data-can-play', onReady);
    player.removeEventListener('pause', onPause);
    player.removeEventListener('play', onPlay);
    player.removeEventListener('time-update', (event: CustomEvent) => {
      currentTime = event.detail.currentTime;
    });
    player.removeEventListener('duration-change', (event: CustomEvent) => {
      duration = event.detail;
    });
    player.removeEventListener('ready', onReady);
  });
</script>


<div class="video-container">
  <div on:click={togglePlayPause}>
    <media-player
    title="{name}"
    src="http://144.91.123.186/latranche/output.m3u8"
    poster="https://media-files.vidstack.io/poster.png"
    aspect-ratio="16/9"
    crossorigin
    >    
      <media-outlet>
          <media-poster alt="{description}">
          </media-poster>
      </media-outlet>
    </media-player>
  </div>
        <div class="controls-container" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
          <button  id="pause" class="btton" on:click={() => togglePlayPause()}>
            {isPlaying ? 'pause' : 'lancer'}
          </button>
          <button class="btton" id="mute" on:click={() => toggleMute()}>
            {player && player.muted ? 'son' : 'sourdine'}
          </button>
          <div id="time" class="time-container">
            {formatDuration(currentTime)} {formatDuration(duration)}
          </div>
          <div class="progress-bar" on:click={seekTo}>
            <div class="progress" style={`width: ${(currentTime / duration) * 100}%`}></div>
          </div>
          <button class="btton" id="fullscreen" on:click={()=>toggleFullScreen()}>
            plein écran
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
  
  
    .btton {
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
      font-size: 13px;
    }
  
    .controls-container {
        width: 55vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        cursor: pointer;
    }
  
      .time-container {
          margin: 0 20px;
      }
  
      #desc {
        margin-top: 20px;
        color : white;
        width: 80vw;
        font-family: Inconsolata, monospace;
      }

      media-player {
        width: 55vw;
        height: calc(60vw/16*9);
        --vm-player-theme: #cc234d;
        z-index: 1000;
      }

      media-icon {
        width: 32px;
        height: 32px;
        color: white;
      }

      #mute {
        width: 70px;
        margin-left: 5px;
      }

      #pause {
        width: 70px;
      }

      #fullscreen {
        width: 100px;
        margin-left: 5px;
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

    /* Show controls if user is hovering over the player. */
        /* width <600px 
    media-player[data-bp-x='sm'] {
    }*/

    /* 600px ≤ width < 980 
    media-player[data-bp-x='md'] {
    }*/

    /* width ≥ 980 
    media-player[data-bp-x='lg'] {
    }
*/
    /* height <380px 
    media-player[data-bp-y='sm'] {
    }
*/
    /* 380px ≤ height < 600 
    media-player[data-bp-y='md'] {
    }
*/
    /* height ≥ 600 
    media-player[data-bp-y='lg'] {
    }
*/
  
      @media (max-width: 768px) {

          .video-container {
              margin-top: 10vh;
              margin-bottom: 50px;
              margin-left: 50vw;
              height: 90vh; 
              width: 90vw;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
  
          .progress-bar {
              display : none;
          }
  
          .time-container {
            font-size: 20px;
          }
  
          #btton{
            margin-right: 10px;
            font-size: 20px;
          }
          
          media-player {
            width: 60vw;
            height: calc(60vw/16*9);
            --vm-player-theme: #cc234d;
            z-index: 1000;
          }

          .fullscreen {
            display: none;
          }

      }
  
      @media (max-height: 500px) {
        .progress-bar {
              display : none;
          }
      }
  </style>
  