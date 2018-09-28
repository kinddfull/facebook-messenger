import { Event } from '../Event'

export class Message<T> extends Event<T> {
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
