import { Config } from '../index'

export type Locale = Record<string, string>

export class I18n {
  private available: Record<string, string> = {}
  default: string

  constructor(config: Config) {
    this.default = config.locales[0] ?? 'en-US'

    for (const locale of config.locales.reverse()) {
      this.available[locale] = locale
      this.available[locale.slice(0, 2)] = locale
    }
  }

  preferredLocale = (req: Request) =>
    this.available[
      req.headers
        .get('accept-language')
        ?.match(/[a-z]{2}(-[A-Z]{2})?/g)
        ?.find((locale) => locale in this.available) ?? this.default
    ]
}
