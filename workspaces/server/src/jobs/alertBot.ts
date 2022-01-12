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
import axios from 'axios'
import { sendMessage } from '../discordBot'

interface IGetChangePercentProps {
  interval: string,
  startTime: number,
  endTime: number,
}

const getChangePercent = async ({
  interval,
  startTime,
  endTime,
}: IGetChangePercentProps) => {
  const { data } = await axios.get('https://api.binance.com/api/v3/klines', {
    params: {
      symbol: 'BTCUSDT',
      interval,
      startTime,
      endTime,
    }
  })

  console.log(data)

  const firstKline = data[0]
  const lastKline = data[data.length - 1]

  const prePrice = firstKline[1]
  const lastPrice = lastKline[4]

  console.log(prePrice)
  console.log(lastPrice)

  const changePercent = (lastPrice - prePrice) / prePrice * 100

  return {
    changePercent: Math.floor(changePercent * 100) / 100,
    lastPrice,
  }
};

const generateMessage = (title: string, way: string, percent: number, now: number) => {
  const msg = `${title} ${way} ${Math.abs(percent)}%\n目前生命值: ${now}`
  console.log(msg)
  return msg
}

// 1小時 3%
export const perHour = async () => {
  const date = new Date();
  let msg = ''

  const {
    changePercent: hChangePercent,
    lastPrice: hLastPrice
  } = await getChangePercent({
    interval: '15m',
    startTime: date.getTime() - 1000 * 60 * 60,
    endTime: date.getTime(),
  })

  if (hChangePercent > 3) {
    msg = generateMessage('🔥噴', '1小時上漲', hChangePercent, hLastPrice)
  }
  if (hChangePercent < -3) {
    msg = generateMessage('🚨崩', '1小時下跌', hChangePercent, hLastPrice)
  }

  if (msg) await sendMessage(msg)
}

// 4小時 10%
export const per4Hour = async () => {
  const date = new Date();
  let msg = ''

  const {
    changePercent: changePercent4h,
    lastPrice: lastPrice4h
  } = await getChangePercent({
    interval: '1h',
    startTime: date.getTime() - 1000 * 60 * 60 * 4,
    endTime: date.getTime(),
  })

  if (changePercent4h > 10) {
    msg = generateMessage('🔥🔥噴', '4小時上漲', changePercent4h, lastPrice4h)
  }
  if (changePercent4h < -10) {
    msg = generateMessage('🚨🚨崩', '4小時下跌', changePercent4h, lastPrice4h)
  }

  if (msg) await sendMessage(msg)
}

// 1天 15%
export const perDay = async () => {
  const date = new Date();
  let msg = ''

  const {
    changePercent: changePercentDay,
    lastPrice: lastPriceDay
  } = await getChangePercent({
    interval: '4h',
    startTime: date.getTime() - 1000 * 60 * 60 * 24,
    endTime: date.getTime(),
  })

  if (changePercentDay > 15) {
    msg = generateMessage('🔥🔥🔥我噴爆', '1天上漲', changePercentDay, lastPriceDay)
  }
  if (changePercentDay < -15) {
    msg = generateMessage('🚨🚨🚨我跌爆', '1天下跌', changePercentDay, lastPriceDay)
  }

  if (msg) await sendMessage(msg)
}

export const perWeek = async () => {
  const date = new Date();
  let msg = ''

  // 1週 30%
  const {
    changePercent: changePercentWeek,
    lastPrice: lastPriceWeek
  } = await getChangePercent({
    interval: '1d',
    startTime: date.getTime() - 1000 * 60 * 60 * 24 * 7,
    endTime: date.getTime(),
  })

  if (changePercentWeek > 30) {
    msg = generateMessage('🔥🔥🔥飛高高囉', '1週上漲', changePercentWeek, lastPriceWeek)
  }
  if (changePercentWeek < -30) {
    msg = generateMessage('🚨🚨🚨災難警報', '1週下跌', changePercentWeek, lastPriceWeek)
  }

  if (msg) await sendMessage(msg)
}

export default {
  perHour,
  per4Hour,
  perDay,
  perWeek,
}