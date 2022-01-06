const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const axios = require('axios')
const crypto = require('crypto');
const qs = require('qs');
const { Sequelize, Model, DataTypes } = require('sequelize');
const routers = require('./routers')

const BIAN_API_KEY = process.env.BIAN_API_KEY
const BIAN_SECRET_KEY = process.env.BIAN_SECRET_KEY

// 方法 1: 传递一个连接 URI
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite'
});

(async() => {
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }

  // class User extends Model {}

  // User.init({
  //   username: DataTypes.STRING,
  //   birthday: DataTypes.DATE
  // }, { sequelize, modelName: 'user' });

  // (async () => {
  //   await sequelize.sync();
  //   const jane = await User.create({
  //     username: 'janedoe',
  //     birthday: new Date(1980, 6, 20)
  //   });
  //   console.log(jane.toJSON());
  // })();
})()


// TODO: FE Router history mode:
// https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90

app.use(cors({
  origin: [
    'http://192.168.68.110:3000',
    'http://localhost:3000',
    'http://localhost:5000',
  ],
  credentials: true,
}))
app.use(cookieParser())
// app.use('/', express.static('build'))
app.use(express.json()) // parse json

app.use('/', routers);

app.get('/api/v3/ticker/24hr', async (req, res) => {

  const { symbol = 'BTCUSDT' } = req.query
  console.log(req)

  const tickerPriceRes = await axios.get('https://api.binance.com/api/v3/ticker/24hr', {
    params: {
      symbol,
    }
  })

  // console.log(tickerPriceRes.data)

  res.status(200).json(
    tickerPriceRes.data
  )
})

app.post('/api/v3/order/test', async (req, res) => {

  const { symbol = 'BTCUSDT' } = req.body
  console.log(req)

  const data = {
    symbol,
    side: 'BUY',
    type: 'LIMIT',
    timeInForce: 'GTC',
    quantity: '0.01',
    price: '3750',
    recvWindow: '5000',
    timestamp: new Date().getTime(),
  }

  const queryString = qs.stringify(data)

  const signature = crypto
    .createHmac('sha256', BIAN_SECRET_KEY)
    .update(queryString)
    .digest('hex');

  try {
    const tickerPriceRes = await axios.post('https://api.binance.com/api/v3/order/test',
      qs.stringify({
        ...data,
        signature
      }),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-MBX-APIKEY': BIAN_API_KEY,
        }
      })
    console.log(tickerPriceRes.data)

    res.status(200).json(
      tickerPriceRes.data
    )
  } catch (error) {
    console.log(error)
  }

})

// app.post('/message', (req, res) => {
//   const message = req.body.message

//   const event = new ChatEvent(message)

//   eventList.push(event)

//   clientList.forEach(s => {
//     console.log(event.id)
//     s.res.write(`id: ${event.id}\ndata: ${JSON.stringify(event)}\n\n`)
//   })

//   res.status(200).end()
// })

module.exports = app