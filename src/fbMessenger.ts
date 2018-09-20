import { ConfigModel } from './model/ConfigModel'
import client from './client'

class bot extends client {
  constructor(config: ConfigModel) {
    super(config)
  }
}

export = bot
