import { Request, Response } from 'express'
import ControllerBase from '../bases/controller.base'
import { HttpStatus } from '@/types'

export class TestController extends ControllerBase {

  public async getTestMessage(
    req: Request,
    res: Response,
  ): Promise<void> {
    const dto = this.formatResponse('im a test', HttpStatus.OK)
    res.status(dto.status).json(dto)
  }
}
