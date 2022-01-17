import { Request, Response } from 'express';
import { sendMessage, ChannelIDs } from '../../../../discordBot';

export const talk = async (req: Request, res: Response) => {
  console.log('talkkkkkk');
  try {
    await sendMessage('Hello talk', ChannelIDs.RICHKKO);
  } catch (error) {
    console.log(error);
  }
  await res.status(200).end();
};
