import * as Http from 'http'
// import * as request from 'request'

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
import { Event } from './event'

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

  public subscribe = (eventType: string, listener: () => void) => {
    this.server.on(eventType, listener)
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
  private handlePOST = async (
    req: Http.ServerRequest,
    res: Http.ServerResponse
  ) => {
    req.setEncoding('utf-8')
    let data
    try {
      req.on('data', async chunk => {
        data = await JSON.parse(chunk)
        const { headers } = req
        const signature = headers['x-hub-signature']
        this.handleEvent(data, signature)
        res.statusCode = 200
        res.end('event received')
      })
    } catch (e) {
      console.log('error', e.message)
      res.end(e.message)
    }
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

  public requestGet = (url: string) => {
    return this.sendRequest('GET', url)
  }

  public requestPost = (url: string, body: any) => {
    return this.sendRequest('POST', url, body)
  }

  private sendRequest = async (method: string, url: string, body?: any) => {
    // const options = Object.assign(
    //   {
    //     method,
    //     url,
    //     json: true,
    //   },
    //   { body }
    // )
    // try {
    //   const result = await request(options)
    //   return result
    // } catch (e) {
    //   console.log(e.message)
    // }
  }
}
