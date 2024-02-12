import { Config } from '../index'

export type Locale = Record<string, string>

export class I18n {
  private available: Record<string, string> = {}
  private translations: Record<string, Locale> = {}
  default: string

  constructor(config: Config = {}) {
    this.default = config.locales?.[0] ?? 'en-US'

    for (const locale of config.locales?.reverse() ?? []) {
      this.available[locale.slice(0, 2)] = locale
      this.available[locale] = locale
      this.translations[locale] = require(`${
        Bun.env.cwd ?? process.cwd()
      }/src/locales/${locale}`).locale
    }
  }

  /**
   * Gets the preferred locale from the request headers.
   */
  preferredLocale = (req: Request) =>
    this.available[
      req.headers
        .get('accept-language')
        ?.match(/[a-z]{2}(-[A-Z]{2})?/g)
        ?.find((locale) => locale in this.available) as string
    ] ?? this.default

  /**
   * Gets the translation for the preferred locale.
   */
  translation = (req: Request) => this.translations[this.preferredLocale(req)]
}
