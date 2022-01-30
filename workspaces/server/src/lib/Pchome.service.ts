import axios from 'axios';
import { PchomeProduct, ProductModel } from '../models/product/Product.model';

interface PchomeApiProduct {
  Seq: number;
  Id: string;
  Name: string;
  Nick: string;
  Price: {
    M: number;
    P: number;
    Prime: '';
  };
  Discount: number;
  Pic: {
    B: string;
    S: string;
  };
  Qty: number;
  Bonus: number;
  isPreOrder24h: 0 | 1;
  isArrival24h: 0 | 1;
  // ButtonType: 'ForSale' | 'OrderRefill';
  // SaleStatus: 0 | 1;
}

export const getPchomeProduct = async (
  ID: string,
): Promise<PchomeProduct | null> => {
  const { data: pchomeApidata } = await axios.get<
    Record<string, PchomeApiProduct> | []
  >(
    `https://ecapi.pchome.com.tw/ecshop/prodapi/v2/prod?id=${ID}&fields=Seq,Id,Name,Nick,Price,Discount,Pic,Qty,Bonus,isPreOrder24h,isArrival24h`,
  );

  if (pchomeApidata.length === 0) {
    return null;
  }

  const productWithVersion = Object.values(pchomeApidata);
  const latestProduct = productWithVersion[productWithVersion.length - 1];
  const latestProductID = latestProduct.Id.split('-');

  const payload = {
    ID: `${latestProductID[0]}-${latestProductID[1]}`,
    cateID: latestProductID[0],
    name: latestProduct.Name,
    originPrice: latestProduct.Price.M,
    price: latestProduct.Price.P,
    picB: `https://f.ecimg.tw${latestProduct.Pic.B}`,
    picS: `https://f.ecimg.tw${latestProduct.Pic.S}`,
    qty: latestProduct.Qty,
    isArrival24h: latestProduct.isArrival24h,
    lastUpdate: Date.now(),
  };

  const product = new ProductModel(payload);
  const data = await product.save();

  return data;
};
