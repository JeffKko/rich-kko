import { HttpStatus, IFormatResponse } from '../types';

export default abstract class ControllerBase {

  public formatResponse(data: any, status = HttpStatus.INTERNAL_ERROR): IFormatResponse {
    const options: Partial<IFormatResponse> = {
      status,
    };

    status >= 400
      ? options.message = data
      : options.data = data;

    return (options as IFormatResponse);
  }
}