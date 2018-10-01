import {
  TextModel,
  AttachmentsModel,
  ReplyModel,
  EventModel,
  MessageModel,
  ReadModel,
  DeliveryModel,
  EchoModel,
} from '../model/EventModel'

type defaultEventModel =
  | MessageModel<TextModel>
  | MessageModel<ReplyModel>
  | MessageModel<AttachmentsModel>
  | DeliveryModel
  | ReadModel
  | EchoModel
export default class Event<T = defaultEventModel> {
  id: string
  time: string
  messaging: EventModel & T
  eventType: string
  constructor(id: string, time: string, messaging: EventModel & T) {
    this.id = id
    this.time = time
    this.messaging = messaging
  }

  getId() {
    return this.id
  }
  getTime() {
    return this.time
  }

  getSenderId() {
    return this.messaging.sender.id
  }

  getRecipientId() {
    return this.messaging.recipient.id
  }

  setEventType(eventType) {
    this.eventType = eventType
  }

  getEventType() {
    return this.eventType
  }
}
