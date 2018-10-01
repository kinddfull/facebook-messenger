import * as Http from 'http'
import * as request from 'request-promise'

import { WebhookUrl, Endpoint, EndpointVersion } from './constants/config'
import {
  parseUrl,
  isSame,
  configKeyValidation,
  configValueValidation,
  parseEvent,
  validationSignature,
} from './utils'
import { AppConfigModel, ClientConfigModel, RequestQueryModel } from './model'
import Event from './event/BaseEvent'

export default class client {
  server: Http.Server
  endpoint: string
  version: string
  private verifyToken: string
  private webhookUrl: string
  private appSecret: string
  private accessToken: string
  private pageId?: string
  private pageToken?: string
  constructor(config: AppConfigModel, server?: Http.Server) {
    configKeyValidation(config)
    configValueValidation(config)
    Object.entries(Object.assign({}, config, this.setClientConfig())).forEach(
      ([key, value]) => {
        this[key] = value
      }
    )
    this.server = server ? server : Http.createServer()
    this.server.on('request', this.requestCallback)
  }

  public subscribe = (
    eventType: string,
    listener: (userId, message) => Promise<void>
  ) => {
    return this.server.on(eventType, listener)
  }

  private setClientConfig = (): ClientConfigModel => {
    return {
      webhook: WebhookUrl,
      endpoint: Endpoint,
      version: EndpointVersion,
    }
  }

  public setWebhook = (webhookUrl: string) => {
    this.webhookUrl = webhookUrl
    return function(req, res, next) {
      const { path } = parseUrl(req.url)
      if (path == this.webhookUrl) return
      next()
    }.bind(this)
  }

  private handleGET = (res: Http.ServerResponse, query: RequestQueryModel) => {
    query['']
    const verify_token = query['hub.verify_token']
    const mode = query['hub.mode']
    const challenge = query['hub.challenge']
    if (mode === 'subscribe' && verify_token === this.verifyToken) {
      res.writeHead(200)
      res.end(challenge)
      return
    }
    res.writeHead(403)
    if (verify_token) {
      console.warn(`${verify_token} is not verify token`)
      res.end(`${verify_token} is not verify token`)
    }
    res.end('verify token not found')
  }
  private handlePOST = (req: Http.ServerRequest, res: Http.ServerResponse) => {
    req.setEncoding('utf-8')
    let data
    req.on('data', async chunk => {
      try {
        data = await JSON.parse(chunk)
        const { headers } = req
        const signature = headers['x-hub-signature']
        this.handleEvent(data, signature)
        res.statusCode = 200
        res.end('event received')
      } catch (e) {
        console.log('error', e.message)
        res.end(e.message)
      }
    })
  }

  private handleEvent = (data, signature) => {
    validationSignature(this.appSecret, signature)
    const event = parseEvent(data)
    this.emitEvent(event.getEventType(), event.getSenderId(), event)
  }

  private emitEvent = (eventType, id, message: Event) => {
    this.server.emit(eventType, id, message)
  }

  private requestCallback = (
    req: Http.ServerRequest,
    res: Http.ServerResponse
  ) => {
    const { method } = req
    const { path, query } = parseUrl(req.url)
    isSame(path, this.webhookUrl)
      ? method === 'GET'
        ? this.handleGET(res, query)
        : method === 'POST'
          ? this.handlePOST(req, res)
          : ((res.statusCode = 403),
            console.warn(`${method} is not allowed method`),
            res.end(`${method} is not allowed method`))
      : ((res.statusCode = 403),
        console.warn(`${path} is not webhook url`),
        res.end(`${path} is not webhook url`))
  }

  public listen = (port: number & string) => {
    if (!port) throw new Error('port number is not defined')
    this.server.listen(port, () => {
      console.log('listen', port)
    })
  }

  private requestGet = (url: string) => {
    return this.sendRequest('GET', url)
  }

  private requestPost = (url: string, body: any) => {
    const header = {
      'Content-Type': 'application/json; charset=utf-8',
    }
    return this.sendRequest('POST', url, header, body)
  }

  protected sendMessage = (recipientId, message) => {
    const url = this.endpoint + '/' + this.version + '/me/messages'

    const messageData = {
      recipient: { id: recipientId },
      message,
    }
    return this.requestPost(url, messageData)
  }
  private sendRequest = (
    method: string,
    url: string,
    header?: object,
    body: any = {}
  ) => {
    const options = {
      method,
      url,
      qs: {
        access_token: this.accessToken,
      },
      headers: header,
      json: true,
      body,
    }
    try {
      return request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
          return {
            result: body,
            statusCode: res.statusCode,
          }
        } else {
          return {
            result: body.error,
            statusCode: res.statusCode,
          }
        }
      })
    } catch (e) {
      return {
        result: e.message,
        statusCode: 500,
      }
    }
  }
}
