import { Request, Response } from 'express'
import { sendMessage } from '../../discordBot'

export default async (req: Request, res: Response) => {
  await sendMessage('Hello talk')
  await res.status(200).end()
}