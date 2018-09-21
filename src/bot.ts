import * as Http from 'http'

import client from './client'
import { AppConfigModel } from './model/ConfigModel'

export default class extends client {
  constructor(config: AppConfigModel, server?: Http.Server) {
    super(config, server)
  }
}
