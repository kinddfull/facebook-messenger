export interface AppConfigModel {
  appSecret: string
  accessToken: string
  verifyToken: string
  pageId?: string
  pageToken?: string
}

export interface ServerConfigModel {
  verifyToken: string
  endpoint: string
  version: string
  webhook: string
}
