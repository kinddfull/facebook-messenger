import client from './client'

class fbMessenger extends client {
  sendTextMessage = (senderId, textMessage) => {
    return this.sendMessage(senderId, { text: textMessage })
  }
}

export = fbMessenger
