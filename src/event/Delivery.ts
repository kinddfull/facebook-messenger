import Event from './BaseEvent'
import { EventTypes } from '../constants/types'
import { DeliveryModel } from '../model/EventModel'

export default class Delivery extends Event<DeliveryModel> {
  constructor(id: string, time: string, messaging: DeliveryModel) {
    super(id, time, messaging)
    this.setEventType(EventTypes.DELIVERY)
  }

  getSeq() {
    return this.messaging.delivery.seq
  }

  getMid() {
    return this.messaging.delivery.mid
  }
}
