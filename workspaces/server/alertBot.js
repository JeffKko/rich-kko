const axios = require('axios')
const { createMessage } = require('./discordBot')

const date = new Date('2022-01-05T02:30:00');

// [
//   [
//     1499040000000,      // 开盘时间
//     "0.01634790",       // 开盘价
//     "0.80000000",       // 最高价
//     "0.01575800",       // 最低价
//     "0.01577100",       // 收盘价(当前K线未结束的即为最新价)
//     "148976.11427815",  // 成交量
//     1499644799999,      // 收盘时间
//     "2434.19055334",    // 成交额
//     308,                // 成交笔数
//     "1756.87402397",    // 主动买入成交量
//     "28.46694368",      // 主动买入成交额
//     "17928899.62484339" // 请忽略该参数
//   ]
// ]

// console.log(new Date(date.getTime() - 1000 * 60 * 60 * 24));
// console.log(new Date(date.getTime()));

const getKline = async ({
  interval,
  startTime,
  endTime,
}) => {
  const { data } = await axios.get('https://api.binance.com/api/v3/klines', {
    params: {
      symbol: 'BTCUSDT',
      interval,
      startTime,
      endTime,
    }
  })

  const firstKline = data[0]
  const lastKline = data[data.length - 1]

  const prePrice = firstKline[1]
  const lastPrice = lastKline[4]

  console.log(prePrice)
  console.log(lastPrice)

  const changePercent = (lastPrice - prePrice) / prePrice * 100

  return changePercent
}

(async() => {
  // 4小時 20 %
  // const { data } = await axios.get('https://api.binance.com/api/v3/klines', {
  //   params: {
  //     symbol: 'BTCUSDT',
  //     interval: '4h',
  //     startTime: date.getTime() - 1000 * 60 * 60 * 14,
  //     endTime: date.getTime(),
  //   }
  // })

  // console.log(data)

  // const lastKline = data[data.length - 1]

  // const prePrice = lastKline[1]
  // const lastPrice = lastKline[4]
  // const changePercent = (lastPrice - prePrice) / prePrice * 100

  // // if (changePercent > 20) {
  // //   createMessage(`🔥🔥🔥 衝衝衝 ${changePercent}`)
  // // }
  // // if (changePercent < -20) {
  // //   createMessage(`🚨🚨🚨 崩崩崩 ${changePercent}`)
  // // }

  // console.log(changePercent)


  // 1小時 3%
  // console.log(new Date(date.getTime() - 1000 * 60 * 60).toLocaleString());
  // console.log(new Date(date.getTime()).toLocaleString());

  // const result = await getKline({
  //   interval: '15m',
  //   startTime: date.getTime() - 1000 * 60 * 60,
  //   endTime: date.getTime(),
  // })


  console.log(result)
})();
