<script lang="ts">
import 'vidstack/styles/defaults.css'
import 'vidstack/styles/community-skin/video.css'
import 'vidstack/icons';
import { defineCustomElements } from 'vidstack/elements';
import { onMount } from 'svelte';
import FRENCH from '$lib/translations';

defineCustomElements();

onMount(() => {
    const skin = document.querySelector('media-community-skin');
    if (skin){
        skin.translations = FRENCH;
    }
});

</script>

<!--<media-icon type="chromecast" />-->
<media-player
  title="Sprite Fight"
  src="http://144.91.123.186/latranche/output.m3u8"
  poster="https://media-files.vidstack.io/poster.png"
  aspect-ratio="16/9"
  crossorigin
>
  <media-outlet>
    <media-poster
      alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
    ></media-poster>

    <!--        
  thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
   <track
      src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
      label="English"
      srclang="en-US"
      kind="subtitles"
      default
    />
    <track
      src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
      srclang="en-US"
      kind="chapters"
      default
    />
    -->
    
  </media-outlet>
  <media-community-skin></media-community-skin>
</media-player>


<style>
    media-player {
        width: 60vw;
        height: calc(60vw/16*9);
        position: absolute;
        top: 150px;
        left : calc(50vw - 30vw);
        --vm-player-theme: #cc234d;
    }

</style>