<script context="module">
	export const load = async (args) => {
		return {
			props: {
				open: false,
			}
		};
	};
</script>

<script lang="ts">
  import { onMount} from 'svelte';
  import Constants from './constants';
  import 'vidstack/styles/defaults.css';
  import 'vidstack/icons';
  import { defineCustomElements } from 'vidstack/elements';
  import FRENCH from '$lib/translations';
  import db from './db';

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
  let videoLink: string;
  let datas: any[] = [];
  let dataloaded = false;

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
    datas = db;
    description = datas[index].description;
    thumbnail = datas[index].thumbnail;
    name = datas[index].name;
    videoLink = datas[index].videoLink;
    dataloaded = true;
    

    const skin = document.querySelector('media-community-skin');
    if (skin) {
      skin.translations = FRENCH;
    }
    
    player = document.querySelector('media-player');

    if (!player) return;
    player.pause();
    player.src = videoLink;
    player.name = name;
    player.poster = thumbnail;
    player.loading = 'lazy';
    console.log("properties set");
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
</script>


<div class="video-container">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={togglePlayPause} class="video" style="display:{dataloaded ? 'block': 'none'}">
    <media-player
    aspect-ratio="16/9"
    crossorigin
    >    
      <media-outlet>
      </media-outlet>
    </media-player>
  </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="controls-container" style ="opacity: {videoReady ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
          <button  id="pause" class="btton" on:click={() => togglePlayPause()}>
            {isPlaying ? 'pause' : 'lancer'}
          </button>
          <button class="btton" id="mute" on:click={() => toggleMute()}>
            {player && typeof player.muted !== 'undefined' && player.muted ? 'sourdine' : 'son'}
          </button>
          <div id="time" class="time-container">
            {formatDuration(currentTime)} {formatDuration(duration)}
          </div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
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

      @media (max-width: 768px) {

          .video-container {
              margin-top: 15vh;
              margin-bottom: 50px;
              transform: translate(45%, 0);
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
  
          .btton{
            margin-right: 10px;
            font-size: 20px;
          }
          
          media-player {
            width: 65vw;
            height: calc(65vw/16*9);
            --vm-player-theme: #cc234d;
            z-index: 1000;
          }

          #mute {
            display: none;
          }

          #fullscreen {
            display: none;
          }

          .video {
            margin-bottom: 10px;
          }

          #desc {
            margin-top: 20px;
          }

          #pause {
            width: 15vw;
            padding: 0;
            margin:0;
          }

      }
  
      @media (max-height: 500px) {
        .progress-bar {
              display : none;
          }
      }
  </style>
  