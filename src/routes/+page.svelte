<script lang="ts">
    import { onMount } from 'svelte';
    import { getProjectsFromDatabase } from '../lib/api';
    import type { Project } from '../lib/types';
    import { createEventDispatcher } from 'svelte';
    import Layout from './layout.svelte';

    let displayGrid: boolean = false;

    const delay = 500;

    export let projects: Project[] = [];

    const dispatch = createEventDispatcher();

    function handleMouseEnter(project: Project) {
      project.hovered = true;
    }

    function handleMouseLeave() {
      projects = projects.map((project) => ({ ...project, hovered: false }));
    }

    function handleClick(project: Project) {
      displayGrid = false;
      setTimeout(() => {
        dispatch('navigate', { to: `/project/${project.key}` });
      }, delay);
    }

    onMount(async () => {
      projects = await getProjectsFromDatabase();
      displayGrid = true;
    });

</script>

<Layout>
  {#if displayGrid}
  <div class="container">
      <div class="grid">
        {#each projects as project}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div
            class="project-case"
            on:mouseenter={() => handleMouseEnter(project)}
            on:mouseleave={() => handleMouseLeave()}
            on:click={() => handleClick(project)}
          >
            <img src={project.thumbnail} alt={project.name} />
            {#if !project.hovered}
              <p>{project.name}</p>
            {/if}
          </div>
        {/each}
      </div>
  </div>
  {/if}
</Layout>

<style>

.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
}

.grid {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
}


.project-case {
  cursor: pointer;
  transition: transform 0.5s ease; /* Smooth transition for the transform property */
}

.project-case:hover {
  transform: scale(1.1); /* Scale the element to 1.1 times its original size on hover */
}

.project-case img {
  width: 30vw;
  height: auto;
  object-fit: cover;
}


@media (max-width: 768px) {
  .grid { 
    display: grid;
    grid-template-columns: auto;
    grid-gap: 1rem;
    align-items: center;
    justify-content: center;
  }
} 

</style>