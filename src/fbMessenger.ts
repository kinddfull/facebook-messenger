import client from './client'
import { ActionTypes } from './constants/types'
import { ReplyInfoModel } from './model/EventModel'

export class fbMessenger extends client {
  sendTextMessage = (senderId, textMessage) => {
    return this.sendMessage(senderId, textMessage)
  }

  sendTypingOn = senderId => this.sendAction(senderId, ActionTypes.TYPING_ON)
  sendTypingOff = senderId => this.sendAction(senderId, ActionTypes.TYPING_OFF)

  sendImageUrl = (senderId, payload_url: string, reusable: Boolean = false) => {
    const attachment = {
      type: 'image',
      payload_url,
      reusable,
    }
    return this.sendAttachment(senderId, attachment)
  }

  sendReply = (senderId, string, replies: ReplyInfoModel[]) => {
    return this.sendQuickReply(senderId, string, replies)
  }
}
