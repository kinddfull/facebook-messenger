import * as Http from 'http'

import { ConfigModel, AppConfigModel } from './model/ConfigModel'
import appConfig from './config/appConfig'
import bot from './bot'

class fbMessenger extends bot {
  config: AppConfigModel
  constructor(config: ConfigModel, server?: Http.Server) {
    super(server)
    this.config = appConfig(config)
  }
}

export = fbMessenger
