import Event from '../BaseEvent'
import { MessageModel } from '../../model/EventModel'
import { EventTypes } from '../../constants/types'

export default class Message<T> extends Event<MessageModel<T>> {
  constructor(id: string, time: string, messaging: MessageModel<T>) {
    super(id, time, messaging)
    this.setEventType(EventTypes.MESSAGE)
  }
  isText() {
    return 'text' in this.messaging.message && !this.isReply()
  }

  isReply() {
    return 'quick_reply' in this.messaging.message
  }

  isAttachments() {
    return 'attachments' in this.messaging.message
  }

  getMessaging() {
    return this.messaging
  }

  getSeq() {
    return this.messaging.message.seq
  }

  getMid() {
    return this.messaging.message.mid
  }
}
