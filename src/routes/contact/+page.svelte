<script lang="ts">
    import Layout from "../layout.svelte";
    import {delay, discordWebhook} from "../../lib/constants";
  
    setTimeout(() => {
      showFooter = true;
    }, delay);

    let isSubmitted:boolean = false;
    let showFooter:boolean = false;
    let title:string = "Contact form";
    let name:string = "";
    let email:string = "";
    let message:string = "";
    let messageSubmitted:string = "Thanks, I will be in touch with you shortly.";

    async function handleSubmit(event) {
      event.preventDefault();
      await sendToDiscordWebhook();
      clearForm();
      isSubmitted = true;
      setTimeout(() => {
        isSubmitted = false;
      }, 5000);
    }
  
    async function sendToDiscordWebhook() {
      // Implement sending the form data to the Discord webhook
    }
  
    function clearForm() {
      name = "";
      email = "";
      message = "";
    }
</script>
  
<Layout displayFooter={showFooter}>
  <div id="container">
    <h1>{title}</h1>
    <form on:submit={handleSubmit} autocomplete="off">
      <label>
        <div class="name">Your Name:</div>
        <input id="simple" type="text" bind:value={name} required autocomplete="off"/>
      </label>
      <label>
        <div class="name">Your Email:</div>
        <input id="simple" type="email" bind:value={email} required autocomplete="off"/>
      </label>
      <label>
        <div  class="name">Message:</div>
        <textarea id="large" bind:value={message} required autocomplete="off"></textarea>
      </label>
      <div class="submitted" style="display:{isSubmitted ? 'block' : 'none'};" >
        {messageSubmitted}
      </div>
      <div class="button">
        <button id="button" type="submit">Submit</button>
      </div>
    </form>
  <div id="or">or</div>
  <div id="mail">
    Send me an <a id="mailb" href="mailto:robin.augereau@protonmail.com">email</a>
  </div>
</div>
</Layout>

<style>
  #container {
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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
    #container {
      margin-top: 20px;
      height: 100vh;
    }

  h1 {
    font-size: 3rem;
  }

  .name {
    font-size: 2rem;
  }

  #simple {
    width: 200px;
    height: 30px;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  #large {
    width: 90vw;
    height: 30vw;
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  #or {
    font-size: 3rem;
    margin-top: 20px;
  }

  #mail {
    font-size: 2rem;
    margin-top: 50px;
  }

  .button {
    position: absolute;
    top: 35%;
    left: 60%;
    transform: rotate(90deg);
  }

  #button{
    font-size: 3rem;
  }

  #mailb {
    color: white;
    text-decoration: none;
    border-bottom: 2px solid white;
  }

  .submitted {
    font-size: 1rem;
    font-family: Consolada, monospace;
    color: white;
    z-index: 89;
    margin-top: 50px;
    margin-left: 20px;
  }

  }
</style>
  