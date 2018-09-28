import { Message } from './'
import { TextModel } from '../../model/EventModel'

export class Text extends Message<TextModel> {
  constructor(id, time, messaging) {
    super(id, time, messaging)
    super.setEventType('Text')
  }
  getText() {
    this.messaging.message.text
  }
}
