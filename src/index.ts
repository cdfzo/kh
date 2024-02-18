import { I18n, Locale } from './utils/i18n'
import { Router, RequestMethod } from './utils/router'
import { Server } from './utils/server'

export class App {
  i18n: I18n
  router: Router
  server: Server

  constructor() {
    this.i18n = new I18n(this)
    this.router = new Router(this)
    this.server = new Server(this)
  }

  useLocales!: (...locales: string[]) => this
  get!: RequestMethod
  post!: RequestMethod
  put!: RequestMethod
  delete!: RequestMethod
  listen!: (port: number) => void
}

export type { Locale }
