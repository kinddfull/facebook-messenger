import Attachments from './message/Attachments'
import Reply from './message/Reply'
import Read from './Read'
import Delivery from './Delivery'
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

export type MessageType = Attachments & Reply & Text & Read & Delivery

export type defaultEventModel =
  | MessageModel<TextModel>
  | MessageModel<ReplyModel>
  | MessageModel<AttachmentsModel>
  | DeliveryModel
  | ReadModel
  | EchoModel
