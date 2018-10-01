import * as Url from 'url'
import * as queryString from 'querystring'
import { parseUrl } from './parse'

export const isSame = (a, b) => {
  return a === b
}

export const findObject = (a: any[], b: object) => {
  return a.find(_a => _a in b)
}

export const urlDefaultQuery = (url, defaultQuery) => {
  const requestUrl = new URL(url)
  const { query } = parseUrl(url)
  requestUrl.search =
    '?' + queryString.stringify(Object.assign(query, defaultQuery))

  return Url.format(requestUrl)
}
