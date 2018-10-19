import Event from './BaseEvent'
import { EventTypes } from '../constants/types'
import { ReadModel } from '../model/EventModel'

export default class Read extends Event<ReadModel> {
  constructor(id: string, time: string, messaging: ReadModel) {
    super(id, time, messaging)
    this.setEventType(EventTypes.READ)
  }

  getSeq() {
    return this.messaging.read.seq
  }

  getMid() {
    return this.messaging.read.mid
  }
}
