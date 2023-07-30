<template>
    <div>
      <h1>{title}</h1>
      <form on:submit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" bind:value={name} />
        </label>
        <label>
          Your Email:
          <input type="email" bind:value={email} />
        </label>
        <label>
          Message:
          <textarea bind:value={message}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      <a href="mailto:YOUR_EMAIL">Send me an email</a> <!-- Replace YOUR_EMAIL with your email address -->
    </div>
  </template>
  
  <script lang="ts">
    let title = "Contact";
    let name = "";
    let email = "";
    let message = "";
  
    async function handleSubmit(event) {
      event.preventDefault();
      // Send the form data to the Discord webhook
      await sendToDiscordWebhook();
      clearForm();
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
  
  <style>
    /* Add your CSS styling here for the form */
  </style>
  