import {
  MessagingModel,
  TextModel,
  AttachmentsModel,
  ReplyModel,
} from '../model/EventModel'

export class Event<T = TextModel | AttachmentsModel | ReplyModel> {
  id: string
  time: string
  messaging: MessagingModel<T>
  eventType: string
  constructor(id: string, time: string, messaging: MessagingModel<T>) {
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
  getMessaging() {
    return this.messaging
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
