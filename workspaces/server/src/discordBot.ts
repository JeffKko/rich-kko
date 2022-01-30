import axios from 'axios';

export enum ChannelIDs {
  NORMAL = '827534182183075873',
  RICHKKO = '932535354232307752',
  CRYPTO = '932536055083696199',
  DEV = '934840159034286140',
}

export const sendMessage = (
  content: string,
  channelID = ChannelIDs.RICHKKO,
) => {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (process.env.NODE_ENV === 'dev') {
    channelID = ChannelIDs.DEV;
  }

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
