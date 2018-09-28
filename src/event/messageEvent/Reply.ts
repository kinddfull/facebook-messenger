import { Message } from './'
import { ReplyModel } from '../../model/EventModel'

export class Reply extends Message<ReplyModel> {
  constructor(id, time, messaging) {
    super(id, time, messaging)
    super.setEventType('Reply')
  }
  getPayload() {
    this.messaging.message.quick_reply.payload
  }

  getText() {
    this.messaging.message.text
  }
}
