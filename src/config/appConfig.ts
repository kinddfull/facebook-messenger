import { AppConfigModel } from '../model/ConfigModel'
import { configKeyValidation, configValueValidation } from '../utils/validation'

export default class appConfig {
  private readonly appSecret: string
  private readonly accessToken: string
  private readonly pageId?: string
  private readonly pageToken?: string
  constructor(_config: AppConfigModel) {
    this.validation(_config)
    const { verifyToken, ...appConfig } = _config
    Object.entries(appConfig).forEach(([key, value]) => {
      this[key] = value
    })
  }

  private validation(config: AppConfigModel) {
    configKeyValidation(config)
    configValueValidation(config)
  }
}
