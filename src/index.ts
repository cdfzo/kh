import { I18n, Locale } from './utils/i18n'

type Config = {
  locales?: string[]
}

export class App {
  i18n
  t!: Locale

  constructor(config: Config) {
    this.i18n = new I18n(config)
  }

  listen = (port: number) => {
    Bun.serve({
      hostname: '0.0.0.0',
      port,
      fetch: (req) => {
        const url = new URL(req.url)
        this.t = this.i18n.translation(req)

        return new Response(`NOT_FOUND: ${url.pathname}`)
      },
    })
  }
}

export type { Config, Locale }
