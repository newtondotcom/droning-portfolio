<script lang="ts">
    import { onMount } from 'svelte';
    import type { Project } from '../lib/types';
    import Layout from './layout.svelte';
    import { goto } from '$app/navigation';
    import {delay, delayAnimation} from '../lib/constants';

    let displayGrid: boolean = false;

    let displayFooter = false;
    let datas : any[] = [];

    export let data: {} = {};

    function handleClick(project: Project) {
      displayGrid = false;
      displayFooter = false;
      setTimeout(() => {
        goto(`/project/${project.key}/`);
      }, delay);
    }

    onMount(async () => {
      datas = data.data;
      displayFooter = true;
    });

</script>

<Layout>
  <div class="container" >
      <div class="grid">
        {#each datas as project}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="project-case" style="opacity: {displayFooter ? 1 : 0}; transition: opacity 0.{delayAnimation}s ease;"
            on:click={() => handleClick(project)}
          >
            <img loading="lazy" src={project.thumbnail} alt={project.name} />
            <div class="overwrite">{project.name}</div>
          </div>
        {/each}
      </div>
  </div>
</Layout>

<style>

.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.grid {
  display: grid;
  grid-template-columns: auto auto;
  gap: 5vw;
  align-items: center;
  justify-content: center;
}


.project-case {
  cursor: pointer;
  transition: transform 0.5s ease;
  position: relative;
}

.project-case:hover {
  transform: scale(1.1); 
}

.project-case:hover > .overwrite {
  opacity: 1;
}

.project-case img {
  width: 30vw;
  height: auto;
  object-fit: cover;
}

.overwrite {
  color : white;
  font-family: Inconsolata, monospace;
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
}


@media (max-width: 768px) {
  .grid { 
    display: grid;
    grid-template-columns: auto;
    grid-gap: 1rem;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    margin-bottom: 50px;
  }

  .project-case img {
  width: 80vw;
  height: auto;
  object-fit: cover;
  }
} 

</style>