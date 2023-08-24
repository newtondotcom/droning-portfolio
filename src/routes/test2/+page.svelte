<script lang="js">
import 'vidstack/styles/defaults.css'
import 'vidstack/styles/community-skin/video.css'
import 'vidstack/icons';
import { onMount } from 'svelte';

import { defineCustomElements } from 'vidstack/elements';

defineCustomElements();

const SPANISH = {
  Audio: 'Audio',
  Auto: 'Automático',
  Captions: 'Subtítulos',
  Chapters: 'Capítulos',
  Default: 'Predeterminado',
  Mute: 'Silenciar',
  Normal: 'Normal',
  Off: 'Apagado',
  Pause: 'Pausa',
  Play: 'Reproducir',
  Speed: 'Velocidad',
  Quality: 'Calidad',
  Settings: 'Configuración',
  Unmute: 'Activar sonido',
  'Seek Forward': 'Avance',
  'Seek Backward': 'Retroceso',
  'Closed-Captions On': 'Subtítulos activados',
  'Closed-Captions Off': 'Subtítulos desactivados',
  'Enter Fullscreen': 'Entrar en pantalla completa',
  'Exit Fullscreen': 'Salir de pantalla completa',
  'Enter PiP': 'Entrar en PiP',
  'Exit PiP': 'Salir de PiP',
};

onMount(() => {
    const skin = document.querySelector('media-community-skin');
    if (skin){
        skin.translations = SPANISH;
    }
});

</script>

<!--<media-icon type="chromecast" />-->
<media-player
  title="Sprite Fight"
  src="https://media-files.vidstack.io/hls/index.m3u8"
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
        width: 80vw;
        height: calc(80vw/16*9);
        position: absolute;
        top: 200px;
        --vm-player-theme: #cc234d;
    }

</style>