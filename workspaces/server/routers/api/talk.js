const { sendMessage } = require('../../discordBot')

module.exports = async (req, res) => {
  await sendMessage('Hello talk')
  await res.status(200).end()
}
