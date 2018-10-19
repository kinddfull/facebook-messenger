import client from './client'
import { ActionTypes } from './constants/types'

export class fbMessenger extends client {
  sendTextMessage = (senderId, textMessage) => {
    return this.sendMessage(senderId, { text: textMessage })
  }

  sendTypingOn = senderId => this.sendAction(senderId, ActionTypes.TYPING_ON)
  sendTypingOff = senderId => this.sendAction(senderId, ActionTypes.TYPING_OFF)
}
