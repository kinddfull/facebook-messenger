import { AppConfigModel } from '../model/ConfigModel'
import { AppConfigKey, PageConfigKey } from '../constants/config'

export const configKeyValidation = (config: AppConfigModel) => {
  if (!config) throw new Error('config is not defined')
  const configKeys = Object.keys(config)
  if (!configKeys.length) throw new Error('config is empty')
  const isPageInfo = Boolean(config.pageId || config.pageToken)
  const DefaultConfigKey = AppConfigKey.concat(isPageInfo ? PageConfigKey : [])
  return DefaultConfigKey.every(key => {
    if (!configKeys.includes(key)) throw new Error(`${key} is not defined`)
    return configKeys.includes(key)
  })
}

export const configValueValidation = (config: AppConfigModel) => {
  return Object.entries(config).every(([key, value]) => {
    return isValueCheck(key, value) ? typeCheck(key, value, 'string') : false
  })
}

const isValueCheck = (key: string, value: any) => {
  if (!value) {
    throw new Error(`The value of ${key} is null`)
  }
  return true
}

const typeCheck = (key: string, value: any, type: string) => {
  if (typeof value !== type) {
    throw new Error(`The value of ${key} must be ${type}, `)
  }
  return true
}

export const validationSignature = (appSecret, signature) => {
  if (!signature) throw new Error('signature is empty')
  return true
}
