const axios = require('axios')

const channelID = '827534182183075873'
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const sendMessage = (content) => {
  return axios.post(`https://discord.com/api/v9/channels/${channelID}/messages`, {
      "content": content ?? "Hello, World!",
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

module.exports = {
  sendMessage,
}