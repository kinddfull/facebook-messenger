import Message from './Message'
import { ReplyModel } from '../../model/EventModel'

export default class Reply extends Message<ReplyModel> {
  getPayload() {
    return this.messaging.message.quick_reply.payload
  }

  getText() {
    return this.messaging.message.text
  }
}
