import * as Url from 'url'

export const parseUrl = (url: string) => {
  const { query, pathname: path } = Url.parse(url, true)
  return {
    query,
    path,
  }
}
