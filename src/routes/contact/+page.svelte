<script lang="ts">
    import {onMount} from "svelte";
    import Constants from "$lib/constants";
    import {sendToDiscordWebhook} from "./discord";
    import Footer from "$lib/Footer.svelte";

    let isSubmitted:boolean = false;
    let showForm:boolean = false;
    let title:string = "formulaire de contact";
    let name:string = "";
    let email:string = "";
    let message:string = "";
    let messageSubmitted:string = "Merci, je vous recontacterai dans les plus brefs délais.";


    async function handleSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault();
      await sendToDiscordWebhook(message,email,name);
      clearForm();
      isSubmitted = true;
      setTimeout(() => {
        isSubmitted = false;
      }, 5000);
    }
  
    function clearForm() {
      name = "";
      email = "";
      message = "";
    }

    onMount(async () => {
      setTimeout(() => {
      showForm = true;
    }, Constants.delay);
    });

</script>

  <div id="container" style="opacity: {showForm ? 1 : 0}; transition: opacity 0.{Constants.delayAnimation}s ease;">
    <h1>{title}</h1>
    <form on:submit={handleSubmit} autocomplete="off">
      <label>
        <div class="name">votre nom & prénom</div>
        <input id="simple" type="text" bind:value={name} required autocomplete="off"/>
      </label>
      <label>
        <div class="name">votre email</div>
        <input id="simple" type="email" bind:value={email} required autocomplete="off"/>
      </label>
      <label>
        <div  class="name">message</div>
        <textarea id="large" bind:value={message} required autocomplete="off"></textarea>
      </label>
      <div class="submitted" style="display:{isSubmitted ? 'block' : 'none'};" >
        {messageSubmitted}
      </div>
      <div class="button">
        <button id="button" type="submit">soumettre</button>
      </div>
    </form>
  <div id="or">ou</div>
  <div id="mail">
    Envoyez moi un <a id="mailb" href="mailto:robin.augereau@protonmail.com">email</a>
  </div>
  <Footer>
    <style>
      .footer {
        display : block;
        position : relative;
      }
      @media (max-width: 768px) {
        .footer {
          display : block;
          position : relative;
          margin-top : 50px;
        }
      }
    </style>
  </Footer> />
</div>


<style>
  #container {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }

  h1 {
    font-size: 3rem;
    font-family: Consolada, monospace;
    color: white;
    z-index: 89;
  }

  .name {
    font-size: 2rem;
    font-family: Consolada, monospace;
    color: white;
    z-index: 89;
  }

  #simple {
    width: 300px;
    height: 30px;
    border: 2px solid white;
    background-color: black;
    color: white;
    font-family: Consolada, monospace;
    font-size: 1.5rem;
    margin-bottom: 20px;
    box-shadow: rgba(208, 203, 203, 0.268) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  #large {    
    width: 400px;
    height: 120px;
    font-size: 2rem;
    font-family: Consolada, monospace;
    border: 2px solid white;
    background-color: black;
    color: white;
    font-family: Consolada, monospace;
    font-size: 1.5rem;
    margin-bottom: 20px;
    box-shadow: rgba(208, 203, 203, 0.268) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  #or {
    font-size: 3rem;
    font-family: 'VT323', monospace;
    color: white;
    z-index: 89;
    margin-top: 20px;
  }

  #mail {
    font-size: 2rem;
    font-family: Consolada, monospace;
    color: white;
    z-index: 89;
    margin-top: 50px;
  }

  .button {
    position: absolute;
    top: 32%;
    left: 70%;
    transform: rotate(90deg);
  }

  #button{
    background-color: black;
    color : white;
    font-size: 3rem;
    box-shadow: 0px 50px 100px -20px whitesmoke, inset 0px -2px 6px 0px whitesmoke;
  }

  #mailb {
    color: white;
    text-decoration: none;
    border-bottom: 2px solid white;
  }

  .submitted {
    font-size: 1rem;
    font-family: Consolada, monospace;
    color: rebeccapurple;
    margin-left: 10px;
    font-weight: 900;
    word-spacing: 5px;
  }

  @media (max-width: 768px) {

      h1 {
        font-size: 2.5rem;
        margin-top: 100px;
        width: 60vw;
      }

      #container {
        margin-top: 300px;
        height: 100vh;
        margin-bottom: 100px;
        overflow: hidden;
        margin-left: 0px;
        padding-left: 20px;
      }

      .name {
        font-size: 1rem;
      }

      #simple {
        width: 50vw;
        height: 30px;
        font-size: 1rem;
        margin-bottom: 20px;
      }

      #large {
        width: 80vw;
        height: 30vw;
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      #or {
        font-size: 3rem;
        margin-top: 20px;
      }

      #mail {
        font-size: 2rem;
        margin-top: 30px;
        margin-bottom: 10px;
      }

      .button {
        position: absolute;
        top: 50%;
        left: 75%;
        transform: rotate(45deg);
        overflow: hidden;
      }

      #button{
        font-size: 2rem;
      }

      #mailb {
        color: white;
        text-decoration: none;
        border-bottom: 2px solid white;
      }

      .submitted {
        font-size: 1rem;
        font-family: Consolada, monospace;
        color: rebeccapurple;
        z-index: 89;
        margin-top: 50px;
        margin-left: 20px;
      }

  }
</style>
  