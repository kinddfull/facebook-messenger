import { Event } from '../Event'
import { MessagingModel } from '../../model/EventModel'
import { EventTypes } from '../../constants/types'

export class Message<T> extends Event<T> {
  constructor(id: string, time: string, messaging: MessagingModel<T>) {
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

  getSeq() {
    return this.messaging.message.seq
  }

  getMid() {
    return this.messaging.message.mid
  }
}
