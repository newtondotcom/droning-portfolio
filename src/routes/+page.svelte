<script lang="ts">
    import { onMount } from 'svelte';
    import type { Project } from '$lib/types';
    import Layout from './+layout.svelte';
    import { goto } from '$app/navigation';
    import Constants from '$lib/constants';

    let displayFooter = false;
    let datas : any[] = [];

    function handleClick(project: Project) {
      displayFooter = false;
      setTimeout(() => {
        goto(`/project/${project.key}/`);
      }, Constants.delay);
    }

    onMount(async () => {
      datas = JSON.parse(await fetch('/db.json').then((r) => r.text()));
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
            class="project-case" style="opacity: {displayFooter ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;"
            on:click={() => handleClick(project)}
          >
            <img loading="lazy" src={project.thumbnail} alt={project.name} />
            <div class="overwrite">{project.name}</div>
          </div>
        {/each}
      </div>
      <div class="row">
        <div class="title">A propos</div>
        <div class="description">Je suis Robin Augereau, un pilote de drone et vidéaste français. Spécialisé dans la prise de vue intérieure, je peux aussi faire de la cinématique extérieure. N'hésitez pas à me contacter pour plus d'infos.</div>
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

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55vw;
  height: 100%;
	border: 5vw solid;
	padding: 1rem;
  letter-spacing: 2px;
	border-width: 20px;
  margin-top: 5vw;
	border-image: repeating-radial-gradient(
			circle at 10px,
			white,
			grey 2px,
			black 4px,
			blue 2px
		) 1;
  color : white;
}

.title {
  font-family: Inconsolata, monospace;
  font-size: 30px;
  margin-top: 20px;
  font-weight: 6;
}

.description {
  font-family: Inconsolata, monospace;
  font-size: 20px;
  margin : 20px;
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

@media (max-width: 1024px) {

  .overwrite {
    font-size: 20px;
  }
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

  .container {
    margin-bottom: 300px;
  }
} 

</style>