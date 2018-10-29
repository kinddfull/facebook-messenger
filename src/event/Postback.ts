import Event from './BaseEvent'
import { EventTypes } from '../constants/types'
import { PostbackModel } from '../model/EventModel'

export default class Postback extends Event<PostbackModel> {
  constructor(id: string, time: string, messaging: PostbackModel) {
    super(id, time, messaging)
    this.setEventType(EventTypes.POSTBACK)
  }

  getPostbackPayload = () => this.messaging.postback.payload

  getPostbackTitle = () => this.messaging.postback.title
}
