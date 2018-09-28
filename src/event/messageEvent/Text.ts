import { Message } from './'
import { TextModel } from '../../model/EventModel'

export class Text extends Message<TextModel> {
  getText() {
    return this.messaging.message.text
  }
}
