import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../../bases/Controller.base';
import { HttpStatus } from '@/types';
import { ProductModel } from '../../../../models/product/Product.model';
import { PchomeTopModel } from '../../../../models/pchomeTop/PchomeTop.model';
import { sendMessage } from '../../../../discordBot';
import { getPchomeProduct } from '../../../../lib/Pchome.service';

export default class ExBoxController extends ControllerBase {
  public async getProduct(req: Request, res: Response, next: NextFunction) {
    const ID = req.params.id;
    const document = await ProductModel.findOne({ ID }, null, {
      sort: { $natural: -1 },
    });

    if (document) {
      return this.formatResponse(document, HttpStatus.OK);
    } else {
      console.log(`can't find ${ID} in db, fetching pchome api`);

      const data = await getPchomeProduct(ID);

      if (!data) {
        const message = `Can't find Api Product: ${ID}`;
        await sendMessage(message);
        return this.formatResponse(message, HttpStatus.BAD_REQUEST);
      }

      await sendMessage(`save product Success. \n Product: ${data}`);

      return this.formatResponse(data, HttpStatus.OK);
    }
  }

  public async getProductList(req: Request, res: Response, next: NextFunction) {
    const { productIDs } = req.body;

    const documents = await ProductModel.find({ ID: productIDs });

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

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const ID = req.params.id;

    await ProductModel.findOneAndDelete({ ID });

    return this.formatResponse('ok', HttpStatus.OK);
  }

  public async getPchomeTop(req: Request, res: Response, next: NextFunction) {
    const documents = await PchomeTopModel.find({}, null, {
      sort: { created_at: -1 },
    }).limit(30);

    return this.formatResponse(documents, HttpStatus.OK);
  }
}
