import path from 'path';
import dotenv from 'dotenv';
import appInit from './app';
import { Database } from './database';

const dotenvFile = './.env';
dotenv.config({ path: path.resolve(__dirname, '../../..', dotenvFile) });

Database.connect();

const port = process.env.PORT || 8080;
const app = appInit();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// $ export PORT=8000  //Mac
// $ set PORT=8000  //Windows
