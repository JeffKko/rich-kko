import axios from 'axios'

const channelID = '827534182183075873'
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

export const sendMessage = (content: string) => {
  return axios.post(`https://discord.com/api/v9/channels/${channelID}/messages`, {
      content,
      "tts": false,
      // "embeds": [{
      //   "title": "Hello, Embed!",
      //   "description": "This is an embedded message."
      // }]
  }, {
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
    }
  })
}