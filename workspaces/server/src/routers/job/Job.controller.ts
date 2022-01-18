// import { parse } from 'node-html-parser';
import axios from 'axios';
import ControllerBase from '../../bases/Controller.base';
import { HttpStatus } from '@/types';
import { PchomeTopModel } from '../../models/pchomeTop/PchomeTop.model';
import { sendMessage } from '../../discordBot';

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

    await sendMessage(`Job Success: getPchomeTop. \n ${payload[0]}`);

    return this.formatResponse(res, HttpStatus.OK);
  }
}
