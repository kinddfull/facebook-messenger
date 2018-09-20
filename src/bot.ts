import * as Http from 'http'

import client from './client'

export default class extends client {
  constructor(server?: Http.Server) {
    super(server)
  }
}
