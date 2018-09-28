export interface MessagingModel<T> {
  sender: {
    id: string
  }
  recipient: {
    id: string
  }
  timestamp: string
  message: MessageModel & T
}

export interface MessageModel {
  mid: string
  seq: string
}

export interface ReplyModel {
  text: string
  quick_reply: {
    payload: string
  }
}

export interface AttachmentsModel {
  attachment: {
    type: string
    payload: object
  }
}

export interface TextModel {
  text: string
}

export interface EchoModel {
  is_echo: string
}
