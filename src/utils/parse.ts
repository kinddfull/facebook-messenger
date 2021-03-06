import * as Url from 'url'
import { MessageTypes, EventTypes } from '../constants/types'
import {
  MessageModel,
  EventModel,
  TextModel,
  AttachmentsModel,
} from '../model/EventModel'
import { findObject } from './util'
import Event from '../event/BaseEvent'
import Reply from '../event/message/Reply'
import Text from '../event/message/Text'
import Attachments from '../event/message/Attachments'
import Delivery from '../event/Delivery'
import Read from '../event/Read'
import Postback from '../event/Postback'

export const parseUrl = (url: string) => {
  const { query, pathname: path } = Url.parse(url, true)
  return {
    query,
    path,
  }
}

export const parseEvent = (data): Event => {
  const { object, entry } = data
  if (object !== 'page' || !entry) throw new Error('error event request')
  let event

  const { id, time } = entry[0]
  const messaging = entry[0].messaging[0]
  const eventType = getEventType(messaging)
  if (eventType === EventTypes.MESSAGE)
    event = parseMessageEvent(id, time, messaging)
  if (eventType === EventTypes.DELIVERY)
    event = new Delivery(id, time, messaging)
  if (eventType === EventTypes.READ) event = new Read(id, time, messaging)
  if (eventType === EventTypes.POSTBACK)
    event = new Postback(id, time, messaging)
  return event
}

const getEventType = messaging => {
  if ('message' in messaging && messaging.message.is_echo) return 'echo'
  const eventType = findObject(Object.values(EventTypes), messaging)
  if (!eventType) throw new Error('not found event types')
  return eventType
}

const getMessageType = message => {
  const messageType = findObject(MessageTypes, message)
  if (!messageType) throw new Error('not found message types')
  return messageType
}

const parseMessageEvent = (id: string, time: string, messaging): Event => {
  const { message } = messaging
  const messageType = getMessageType(message)
  if (messageType === 'text') return new Text(id, time, messaging)
  if (messageType === 'attachments') return new Attachments(id, time, messaging)
  if (messageType === 'quick_reply') return new Reply(id, time, messaging)
}
