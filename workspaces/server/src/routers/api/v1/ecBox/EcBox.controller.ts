import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../../bases/Controller.base';
import { HttpStatus } from '@/types';
import { ProductModel } from '../../../../models/product/Product.model';

export default class ExBoxController extends ControllerBase {
  public async getProduct(req: Request, res: Response, next: NextFunction) {
    const ID = req.params.id;
    const documents = await ProductModel.find({ ID });

    return this.formatResponse(documents, HttpStatus.OK);
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    // const { username, email } = req.body;

    const payload = {
      ID: 123000000,
      cateID: '1234',
      describe: 'tes desc',
      name: 'PS5',
      originPrice: 1000,
    };

    const product = new ProductModel(payload);
    const data = await product.save();

    return this.formatResponse(data, HttpStatus.OK);
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    const ID = req.params.id;

    await ProductModel.updateOne(
      { ID },
      { describe: 'updatedddd' },
      { runValidators: true },
    );

    return this.formatResponse('ok', HttpStatus.OK);
  }

  public async removeProduct(req: Request, res: Response, next: NextFunction) {
    const ID = req.params.id;

    await ProductModel.findOneAndDelete({ ID });

    return this.formatResponse('ok', HttpStatus.OK);
  }
}
