const express = require('express');
const router = express.Router();
const alertBot = require('../../jobs/alertBot');

const createJobCallback = (method) => async (req, res) => {
  try {
    await method()
    await res.status(200).end('200')
  } catch (error) {
    await res.status(400).json({ message: error })
  }
}

router.get('/perHour', createJobCallback(alertBot.perHour))
router.get('/per4Hour', createJobCallback(alertBot.per4Hour))
router.get('/perDay', createJobCallback(alertBot.perDay))
router.get('/perWeek', createJobCallback(alertBot.perWeek))
router.get('/test', createJobCallback(alertBot.test))

module.exports = router