import { Message } from './Message'
import { AttachmentsModel } from '../../model/EventModel'

export class Attachments extends Message<AttachmentsModel> {
  constructor(id, time, messaging) {
    super(id, time, messaging)
    super.setEventType('Attachments')
  }
  getAttachments() {
    return this.messaging.message.attachment
  }

  getAttachmentsPayload() {
    return this.messaging.message.attachment.payload
  }

  getAttachmentsType() {
    return this.messaging.message.attachment.type
  }
}
