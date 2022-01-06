const express = require('express');
const router = express.Router();
const talk = require('./talk')

router.get('/talk', talk)

module.exports = router