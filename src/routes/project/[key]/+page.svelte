<script lang="js">
  import { onMount } from 'svelte';
  import Layout from './../../layout.svelte';
  import { goto } from '$app/navigation';
  import {delay, delayAnimation} from '../../../lib/constants';

  let currentTime = 0;
  let duration = 0;
  let isPlaying = false;
  let isFullScreen = false;
  let displayFooter = false;
  let videoReady = false;

  export let data;

  let player; 
  let index;
  let next;
  let previous;

  onMount(async () => {
    console.log(data.key);
    index = parseInt(data.key, 10);
    next = index + 1;
    previous = index - 1;

    setTimeout(() => {
        displayFooter = true;
      }, delay);

    const options = {
      
      id: data.videoLink,
      //id : 849909483,
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
      isPlaying = true;
    });

    player.on('pause', function () {
      isPlaying = false;
    });

    player.on('timeupdate', function (data) {
      currentTime = data.seconds;
    });

    player.ready().then(function() {
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
  }
</script>

<Layout displayFooter={videoReady}>
  <div class="video-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={() => togglePlayPause()} id="video"></div>
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
          <button id="btton" on:click={() => toggleFullScreen()}>
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
  </div>
  <a id="previous" class="nav" href="/project/{next}">previous</a>
  <a id="next" class="nav" href="/project/{previous}">next</a>

  <div class="nav-mobile">
  <a id="previousm" class="nav-mobile" href="/project/{next}">previous</a>
  <a id="nextm" class="nav-mobile" href="/project/{previous}">next</a>
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
            margin-bottom: 200px;
        }

        .progress-bar {
            display : none;
        }

        .controls-container {
            margin-top: 0;

        }

        .time-container {
            margin: 10px 0;
        }

        .nav {
          display : none;
        }

        .nav-mobile {
          display: inline-flex;
          font-size: 2rem;
          color: white;
          z-index: 2;
          background-color: black;
          padding: 10px;
          border-radius: 20px;
          margin: 10px;
        }

        #previousm {
          border : 2px double grey;
          color : white;
        }

        #nextm {
          border : 2px double grey;
          color : white;
        }
    }

    @media (max-height: 500px) {
      .progress-bar {
            display : none;
        }
    }

</style>
