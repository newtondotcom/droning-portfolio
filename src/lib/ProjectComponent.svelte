<script lang="ts">
  export let selectedProject: any;
  export let videoReady = true;

  import { onMount, onDestroy} from 'svelte';
  import { goto } from '$app/navigation';
  import {delay, delayAnimation} from './constants';
  import { YouTube } from 'svelte-yt';

  // Can be used to control full YouTube player
  // See https://developers.google.com/youtube/iframe_api_reference#Functions
  // See https://developers.google.com/youtube/player_parameters#Parameters

  let player:any;
  let options:any;
  let width:number;
  let height:number;


  let currentTime: number = 0;
  let duration:number = 0;
  let isPlaying = false;
  let displayFooter = false;
  let description:string;
  let videoId:any;

  onMount(async () => {
    videoId = selectedProject.videoLink;
    duration = parseInt(selectedProject.duration, 10);
    description = selectedProject.description;

    if (window.screen.width > 768) {
      width = window.screen.width;
      console.log(width);
    } else {
      width = 360;
    }
    width = 640;
    height = width * 0.5625;


    options = {
      playerVars: {
        enablejsapi: 1,
       
        controls : 0,
        showinfo : 0,
        modestbranding: 0,

        loop : 1,
        autohide : 1,
        rel : 0,
        playsinline : 1, // for ios
        fs : 1,
        iv_load_policy : 3,
        autoplay: 1,
        //color : 'red',
      },
      width: width,
      height: height,
    };

    setTimeout(() => {
        displayFooter = true;
      }, delay);

      const updateInterval = setInterval(async () => {
        if (player) {
          if (isPlaying) {
            currentTime = await player.getCurrentTime();
          } else if (currentTime < 1) {
            currentTime = 0;
          }
        } else {
          currentTime = 0;
        }
      }, 1000);
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

  function formatDuration(seconds:number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  async function togglePlayPause() {
    if (isPlaying) {
      await player.pauseVideo();
    } else {
      await player.playVideo();
    }
  }

  onDestroy(() => {
    if (player) {
      player.destroy();
    }
  });
</script>

<div class="video-container">
    <YouTube 
    bind:player 
    on:play={onPlay}
    on:ready={onReady}
    on:pause={onPause}
    {videoId} 
    {options} 
    />
    <div id="loading" style="display: {videoReady ? 'none' : 'block'}; width:{width}px; height:{height}px;"></div>

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
          <button id="btton" on:click={()=>toggleFullScreen()}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          -->
        </div>
        <div id="desc" style="opacity: {displayFooter ? 1 : 0};">
          <p>{description}</p>
        </div>
  </div>


  <style>
    .video-container {
      margin-top: 150px;
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
  
      #desc {
        margin-top: 50px;
        color : white;
        width: 80vw;
        font-family: Inconsolata, monospace;
      }
  
      @media (max-width: 768px) {
          .video-container {
              margin-top: 450px;
              margin-bottom: 50px;
              height: 40vh; 
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
          
      }
  
      @media (max-height: 500px) {
        .progress-bar {
              display : none;
          }
      }
  </style>
  