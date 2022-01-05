const path = require('path')
const dotenv = require('dotenv')
const dotenvFile = './.env';
dotenv.config({ path: path.resolve(__dirname, '../..', dotenvFile) });

const app = require('./express.js')
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// $ export PORT=8000  //Mac
// $ set PORT=8000  //Windows