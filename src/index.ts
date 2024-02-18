import { I18n, Locale } from './utils/i18n'
import { Server } from './utils/server'

export class App {
  i18n: I18n
  server: Server

  constructor() {
    this.i18n = new I18n(this)
    this.server = new Server(this)
  }

  useLocales!: (...locales: string[]) => this
  listen!: (port: number) => void
}

export type { Locale }
