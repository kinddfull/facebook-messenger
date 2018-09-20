import { ConfigModel, AppConfigModel } from './model/ConfigModel'
import appConfig from './config/appConfig'

export default class client {
  config: AppConfigModel
  constructor(_config: ConfigModel) {
    this.config = appConfig(_config)
  }
}
