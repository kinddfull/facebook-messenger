import { Message } from './'
import { ReplyModel } from '../../model/EventModel'

export class Reply extends Message<ReplyModel> {
  getPayload() {
    return this.messaging.message.quick_reply.payload
  }

  getText() {
    return this.messaging.message.text
  }
}
