import React, { useState, useEffect } from 'react';
import axios from 'axios'

const APP_API_URL = process.env.REACT_APP_API_URL

const CoinCard = ({ symbol }) => {
  const [tickerPrice, setTickerPrice] = useState(null);

  const handlerFetchPrice = async () => {
    const tickerPriceRes = await axios.get(`${APP_API_URL}/api/v3/ticker/24hr`, {
      params: {
        symbol,
      }
    })
    setTickerPrice(tickerPriceRes.data)
  }

  useEffect(() => {
    // const timer = setInterval(handlerFetchPrice, 10000)

    handlerFetchPrice()

    // return () => {
    //   clearInterval(timer)
    // }
  }, [])

  return (
    <div>
      {
        tickerPrice &&
          <div>
            <div>{symbol.slice(0, 3)} </div>
            <div>價格 : {tickerPrice.lastPrice} </div>
            <div>浮動百分比 : {tickerPrice.priceChangePercent}% </div>
            <div>浮動 : {tickerPrice.priceChange} </div>
            <div>成交量 : {tickerPrice.quoteVolume} </div>
            <div>24H最高 : {tickerPrice.quoteVolume} </div>
            <div>24H最低 : {tickerPrice.lowPrice} </div>
          </div>
      }
    </div>
  )
}

export default CoinCard