import path from 'path'
import dotenv from 'dotenv';
import init from './express'

const dotenvFile = './.env';
dotenv.config({ path: path.resolve(__dirname, '../..', dotenvFile) });

const port = process.env.PORT || 8080;
const app = init()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// $ export PORT=8000  //Mac
// $ set PORT=8000  //Windows