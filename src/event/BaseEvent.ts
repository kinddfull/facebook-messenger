import { EventModel } from '../model/EventModel'
import { defaultEventModel } from './Types'

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
