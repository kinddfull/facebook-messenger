import client from './client'

export class fbMessenger extends client {
  sendTextMessage = (senderId, textMessage) => {
    return this.sendMessage(senderId, { text: textMessage })
  }
}
