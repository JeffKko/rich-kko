import ControllerBase from '../bases/Controller.base';
import { HttpStatus } from '@/types';

export default class RootController extends ControllerBase {
  public async getTestMessage() {
    return this.formatResponse('im a test', HttpStatus.OK);
  }
}
