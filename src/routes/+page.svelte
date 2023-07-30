<script lang="ts">
    import { onMount } from 'svelte';
    import { getProjectsFromDatabase } from '../lib/api';
    import type { Project } from '../lib/types';
    import { createEventDispatcher } from 'svelte';
  
    onMount(async () => {
      projects = await getProjectsFromDatabase();
    });

    let title = "newton creations";

    export let projects: Project[] = [];

    const dispatch = createEventDispatcher();

    function handleMouseEnter(project: Project) {
      project.hovered = true;
    }

    function handleMouseLeave() {
      projects = projects.map((project) => ({ ...project, hovered: false }));
    }

    function handleClick(project: Project) {
      dispatch('projectClick', project);
    }

</script>

<main>
    <div class="title">{title}</div>
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
</main>

<style>

main {
  background-color: black;
  font-family: 'VT323', monospace;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 20vw);
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;
}

.project-case {
  cursor: pointer;
}

.title {
  font-size: 3rem;
  color: white;
  text-align: center;
  margin: 2rem 0;
}
</style>