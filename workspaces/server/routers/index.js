const express = require('express');
const router = express.Router();
const apiRouter = require('./api')
const jobRouter = require('./job')
const test = require('./test')

router.use('/api', apiRouter)
router.use('/job', jobRouter)

router.get('/test', test)

module.exports = router