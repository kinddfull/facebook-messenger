const express = require('express')()

import { fbMessenger, EventTypes, MessageType, PostbackType } from './lib'
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

app.subscribe(
  EventTypes.MESSAGE,
  async (userId: string, message: MessageType) => {
    console.log(userId, message)
  }
)

app.subscribe(
  EventTypes.POSTBACK,
  async (userId: string, postback: PostbackType) => {
    console.log(userId, postback)
  }
)

server.listen(port, () => {
  console.log('listen')
})
