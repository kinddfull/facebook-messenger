import * as Http from 'http'

import serverConfig from './config/serverConfig'
import appConfig from './config/appConfig'
import { AppConfigModel } from './model/ConfigModel'

export default class client {
  protected server: serverConfig
  protected app: appConfig
  constructor(config: AppConfigModel, server?: Http.Server) {
    this.app = new appConfig(config)
    const { verifyToken } = config
    this.server = new serverConfig(verifyToken, server)
  }
}
