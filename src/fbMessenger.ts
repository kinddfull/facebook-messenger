import client from './client'
import { ActionTypes } from './constants/types'
import { ReplyMessageModel, UserProfileModel } from './model'

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

  sendReply = (senderId, replies: ReplyMessageModel) => {
    return this.sendQuickReply(senderId, replies)
  }

  getUserProfile = (userId): UserProfileModel => {
    return this.getUser(userId)
  }
}
