const path = require('path')
const dotenv = require('dotenv')
const dotenvFile = './.env';
dotenv.config({ path: path.resolve(__dirname, '../..', dotenvFile) });
const alertBot = require('./jobs/alertBot')

alertBot.perWeek()

