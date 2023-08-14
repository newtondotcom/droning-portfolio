import Constants from '$lib/constants'

export async function sendToDiscordWebhook(message : string ,email: string,names: string){
    fetch(Constants.discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatar_url: '',
          content : message,
          embeds: [
            {
              color: Constants.color,
              title: "Nouveau message de "+names,
              description: "Contact : "+email,
            },
          ],
        }),
      });
      return
}