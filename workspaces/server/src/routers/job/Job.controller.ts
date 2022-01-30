// import { parse } from 'node-html-parser';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import ControllerBase from '../../bases/Controller.base';
import { HttpStatus } from '@/types';
import { PchomeTopModel } from '../../models/pchomeTop/PchomeTop.model';
import { sendMessage } from '../../discordBot';
import { getPchomeProduct } from '../../lib/Pchome.service';

interface Product {
  category_code: string;
  goods_img_url: string;
  goods_page_url: string;
  group_category_code: string;
  id: string;
  msg: string;
  msg_score: number;
  msg_type: string;
  name: string;
  ref_item_list: unknown;
  sale_price: number;
  sales: null;
  score: number;
  why: string;
}

interface PchomeTop {
  recomd_id: string;
  recomd_list: Product[];
  timed_out: false;
  took: 6;
  error?: string;
}

// [
//   {
//     Seq: 26237543,
//     Id: 'DGBJG9-A900B51SM-000',
//     Price: { M: 0, P: 15980, Prime: '' },
//     Qty: 0,
//     ButtonType: 'OrderRefill',
//     SaleStatus: 0,
//   },
// ];

// "Seq": 27560877,
// "Id": "DYAJDO-A900BSSDN-000",
// "Name": "Apple iPhone 13  Pro (128G)-\u5929\u5cf0\u85cd\u8272(MLVD3TA/A)",
// "Nick": "<font color=#FF00CC><b>\u25b2\u864e\u6c23\u6eff\u6eff\u65b0\u5e74\u4f86\u25b2</font></b><BR><font color=FD0303><B>\u5929\u5cf0\u85cd\u2605\u72c2\u964d$1312</B></font><BR>Apple iPhone 13 Pro (128G)-\u5929\u5cf0\u85cd\u8272(MLVD3TA/A)",
// "Price": { "M": 32900, "P": 31588, "Prime": "" },
// "Discount": 0,
// "Pic": {
//   "B": "/items/DYAJDOA900BSSDN/000001_1643193702.jpg",
//   "S": "/items/DYAJDOA900BSSDN/000002_1638872102.jpg"
// },
// "Qty": 5,
// "Bonus": 0,
// "isPreOrder24h": 0,
// "isArrival24h": 1
// }

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

export default class JobController extends ControllerBase {
  public async getPchomeTop() {
    const timestamp = new Date().getTime();
    const { data } = await axios.post<PchomeTop>(
      'https://apih.pcloud.tw/hermes/api/goods/rank',
      {
        device: 'pc',
        rec_pos: 'p',
        rec_type: 'ClickStream',
        token: 'JeFbL9ypvv',
        topk: 30,
        uid: null,
        ven_guid: '',
        ven_session: '',
      },
    );

    if (data.error) {
      await sendMessage(data.error);
      return this.formatResponse(data.error, HttpStatus.BAD_REQUEST);
    }

    const recomdList = data.recomd_list;
    const payload = recomdList.map(v => ({
      ID: v.id,
      name: v.name,
      originPrice: v.sale_price,
      picS: v.goods_img_url,
      lastUpdate: timestamp,
    }));

    const res = await PchomeTopModel.insertMany([...payload].reverse());

    await sendMessage(`Job Success: getPchomeTop. \n ${res[0]}`);

    return this.formatResponse(res, HttpStatus.OK);
  }

  public async getPchomeProduct(req: Request) {
    const { ID } = req.params;
    // const ID = 'DGBJDE-1900B4DPZ';
    console.log(ID);

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
