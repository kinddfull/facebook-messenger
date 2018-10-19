const express = require('express')()

import { fbMessenger, EventTypes } from './lib'
const { APP_SECRET, ACCESS_TOKEN, VERIFY_TOKEN } = process.env

const config = {
  appSecret: APP_SECRET,
  accessToken: ACCESS_TOKEN,
  verifyToken: VERIFY_TOKEN,
}

const port = process.env.PORT || 8080

const server = require('http').Server(express)

const app = new fbMessenger(config, server)

express.use(app.setWebhook('/webhook'))

app.subscribe(EventTypes.MESSAGE, async (userId: string, message) => {
  try {
    await app.sendTypingOn(userId)
    if (message.isText()) {
      return await app.sendTextMessage(userId, message.getText())
    }
  } catch {
  } finally {
    await app.sendTypingOff(userId)
  }
})

server.listen(port, () => {
  console.log('listen')
})
