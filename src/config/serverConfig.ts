import * as Http from 'http'

import { parseUrl } from '../utils/parse'
import { isSame } from '../utils/util'
import { WebhookUrl, Endpoint, EndpointVersion } from '../constants/config'
import { ServerConfigModel } from '../model/ConfigModel'

export default class serverConfig {
  private server: Http.Server
  private readonly verifyToken: string
  private webhook: string
  private readonly endpoint: string
  private readonly version: string
  constructor(verifyToken: string, server?: Http.Server) {
    Object.entries(this.setServerConfig(verifyToken)).forEach(
      ([key, value]) => {
        this[key] = value
      }
    )
    if (server) this.connectServer(server)
    if (!server) this.createServer()
  }

  setServerConfig(verifyToken): ServerConfigModel {
    return {
      verifyToken,
      webhook: WebhookUrl,
      endpoint: Endpoint,
      version: EndpointVersion,
    }
  }

  setWebhook(webhookUrl: string) {
    this.webhook = webhookUrl
    return function(req, res, next) {
      const { path } = parseUrl(req.url)
      if (path == this.webhook) return
      next()
    }.bind(this)
  }

  private createServer() {
    console.log('create')
    this.server = Http.createServer(this.requestCallback)
  }

  private connectServer(server: Http.Server) {
    this.server = server
    this.server.on('request', this.requestCallback)
  }

  private requestGET(res: Http.ServerResponse, query) {
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
      res.end(`${verify_token} is not verify token`)
    }
    res.end('verify token not found')
  }
  private async requestPOST(req: Http.ServerRequest, res: Http.ServerResponse) {
    req.setEncoding('utf-8')
    let body
    await req.on('data', chunk => {
      body = JSON.parse(chunk)
    })
    const { object, entry } = body
    if (object === 'page') {
      entry.forEach(entry => {
        const webhook_event = entry.messaging[0]
        //handle webhook event
      })

      res.statusCode = 200
      res.end('event received')
    } else {
      res.statusCode = 404
      res.end()
    }
  }

  private requestCallback = (
    req: Http.ServerRequest,
    res: Http.ServerResponse
  ) => {
    const { method } = req
    const { path, query } = parseUrl(req.url)
    console.log(this.webhook)
    console.log(path)
    isSame(path, this.webhook)
      ? method === 'GET'
        ? this.requestGET(res, query)
        : method === 'POST'
          ? this.requestPOST(req, res)
          : ((res.statusCode = 403), res.end(`${method} is not allowed method`))
      : ((res.statusCode = 403), res.end(`${path} is not webhook url`))
  }

  listen(port: number & string) {
    if (!port) throw new Error('port number is not defined')
    this.server.listen(port, () => {
      console.log('listen', port)
    })
  }
}
