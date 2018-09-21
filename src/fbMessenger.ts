import * as Http from 'http'

import { AppConfigModel } from './model/ConfigModel'
import bot from './bot'

class fbMessenger extends bot {
  constructor(config: AppConfigModel, server?: Http.Server) {
    super(config, server)
  }

  webhook(webhookUrl: string) {
    return this.server.setWebhook(webhookUrl)
  }

  listen(port: string & number) {
    this.server.listen(port)
  }
}

export = fbMessenger
