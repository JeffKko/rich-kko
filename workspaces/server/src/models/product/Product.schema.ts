import mongoose from 'mongoose';

const EmailValidator = (email: string) =>
  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email);

// BU: "ec"
// Id: "DGBJG9-A900B51SM"
// author: ""
// brand: ""
// cateId: "DGBJG9"
// couponActid: ["C024813", "C025307", "C025308", "C025306"]
// describe: "已售完︱謝謝各位PlayStation 5 遊戲主機\\r\\n▉ 加入購物車不代表取得購買資格，以完成結帳為準\r\n▉ 限量商品，每人限購一組，如發現重複購買，pchome保留接單與否權利\r\n\r\n■ 速度疾如閃電 \r\n■ 備有客製化 cpu、gpu、ssd以及綜合i o系統，以強大的性能改寫playstation主機的極限\r\n■ 精彩絕倫的遊戲\r\n■ 驚嘆於難以置信的視覺效果，同時體驗 ps5 的新功能。\r\n■ 令人驚嘆的身歷其境\r\n■ 支援觸覺回饋、自適應觸發器和 3d 音訊技術，讓玩家發掘更深刻的遊戲體驗。\r\n\r\n★註:鑑賞期非試用期，商品經拆封使用後，除功能瑕疵外，恕不接受退貨。辦理退換貨商品必須是全新狀態且包裝完整。"
// isNC17: 0
// isPChome: 1
// name: "PlayStation 5 主機 (PS5)"
// originPrice: 15980
// picB: "/items/DGBJG9A900B51SM/000001_1612493204.jpg"
// picS: "/items/DGBJG9A900B51SM/000002_1612493204.jpg"
// price: 15980
// publishDate: ""
// sellerId: ""

//   BU: "ec"
// Id: "DGBJG9-A900B51SS"
// author: ""
// brand: ""
// cateId: "DGBJG9"
// couponActid: ["C024813", "C025307", "C025308", "C025306"]
// describe: "數位版主機︱目前無到貨消息PlayStation 5 Digital Edition遊戲主機\\r\\n▉ 加入購物車不代表取得購買資格，以完成結帳為準\r\n▉ 限量商品，每人限購一組，如發現重複購買，pchome保留接單與否權利\r\n\r\n■ 不含光碟機版本\r\n■ 速度疾如閃電 \r\n■ 備有客製化 cpu、gpu、ssd以及綜合i o系統，以強大的性能改寫playstation主機的極限\r\n■ 精彩絕倫的遊戲\r\n■ 驚嘆於難以置信的視覺效果，同時體驗 ps5 的新功能。\r\n■ 令人驚嘆的身歷其境\r\n■ 支援觸覺回饋、自適應觸發器和 3d 音訊技術，讓玩家發掘更深刻的遊戲體驗。\r\n\r\n★註:鑑賞期非試用期，商品經拆封使用後，除功能瑕疵外，恕不接受退貨。辦理退換貨商品必須是全新狀態且包裝完整。"
// isNC17: 0
// isPChome: 1
// name: "PlayStation 5 數位版主機 (PS5 Digital Edition)"
// originPrice: 12980
// picB: "/items/DGBJG9A900B51SS/000001_1612493334.jpg"
// picS: "/items/DGBJG9A900B51SS/000002_1612493334.jpg"
// price: 12980
// publishDate: ""
// sellerId: ""

export const ProductSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 26,
  },
  cateID: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 16,
  },
  name: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: false,
  },
  originPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  picB: {
    type: String,
    required: false,
  },
  picS: {
    type: String,
    required: false,
  },
  qty: {
    type: Number,
    required: false,
  },
  isArrival24h: {
    type: Number,
    required: false, // 0 or 1
  },
  lastUpdate: {
    type: Number,
    required: false,
  },
});
