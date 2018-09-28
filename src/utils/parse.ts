import * as Url from 'url'
import { MessageTypes, EventTypes } from '../constants/types'
import { MessageModel } from '../model/EventModel'
import { findObject } from './util'
import { Reply, Text, Attachments } from '../event/messageEvent'
import { Event } from '../event'

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
  let event: Event
  const { id, time } = entry[0]
  const messaging = entry[0].messaging[0]
  const eventType = getEventType(messaging)
  if (eventType === 'message') {
    event = parseMessageEvent(id, time, messaging)
  }
  return event
}

const getEventType = messaging => {
  if ('message' in messaging && messaging.message.is_echo) return 'echo'
  const eventType = findObject(Object.values(EventTypes), messaging)
  if (!eventType) throw new Error('not found event types')
  return eventType
}

const getMessageType = (message: MessageModel) => {
  const messageType = findObject(MessageTypes, message)
  if (!messageType) throw new Error('not found message types')
  return messageType
}

const parseMessageEvent = (id: string, time: string, messaging): Event => {
  const { message } = messaging
  const messageType = getMessageType(message)
  if (messageType === 'text') return new Text(id, time, messaging)
  if (messageType === 'attachment') return new Attachments(id, time, messaging)
  if (messageType === 'quick_reply') return new Reply(id, time, messaging)
}
