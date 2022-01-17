import axios from 'axios';

export enum ChannelIDs {
  NORMAL = '827534182183075873',
  RICHKKO = '932535354232307752',
  CRYPTO = '932536055083696199',
}

export const sendMessage = (content: string, channelID = ChannelIDs.NORMAL) => {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  return axios.post(
    `https://discord.com/api/v9/channels/${channelID}/messages`,
    {
      content,
      tts: false,
      // "embeds": [{
      //   "title": "Hello, Embed!",
      //   "description": "This is an embedded message."
      // }]
    },
    {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
    },
  );
};
