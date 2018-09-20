import { AppConfigModel, ConfigModel } from '../model/ConfigModel'
import { configKeyValidation, configValueValidation } from '../utils/validation'
import { WebhookUrl, Endpoint, EndpointVersion } from '../constants/config'

export default (config: ConfigModel): AppConfigModel => {
  return Object.assign(validation(config), setDefaultValue())
}

const setDefaultValue = () => {
  return {
    webhook: WebhookUrl,
    endpoint: Endpoint,
    version: EndpointVersion,
  }
}

const validation = (config: ConfigModel) => {
  configKeyValidation(config)
  configValueValidation(config)
  return config
}
