import path from 'path'
import dotenv from 'dotenv'
import alertBot from './jobs/alertBot'

const dotenvFile = './.env';
dotenv.config({ path: path.resolve(__dirname, '../..', dotenvFile) });
