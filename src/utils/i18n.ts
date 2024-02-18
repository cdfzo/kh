import { App } from '../index'

export type Locale = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export class I18n {
  private available: Record<string, string> = {}
  private translations: Record<string, Locale> = {}
  default!: string

  constructor(app: App) {
    app.useLocales = (...locales) => this.useLocales(app, ...locales)
  }

  /**
   * Loads and sets up locales and translations.
   */
  private useLocales = (app: App, ...locales: string[]) => {
    this.default = locales[0] ?? 'en-US'

    for (const locale of locales.reverse() ?? []) {
      this.available[locale.slice(0, 2)] = locale
      this.available[locale] = locale
      this.translations[locale] = require(`${
        Bun.env.cwd ?? process.cwd()
      }/src/locales/${locale}`).locale
    }

    return app
  }

  /**
   * Gets the preferred locale from the request headers.
   */
  preferred = (req: Request) =>
    this.available[
      req.headers
        .get('accept-language')
        ?.match(/[a-z]{2}(-[A-Z]{2})?/g)
        ?.find((locale) => locale in this.available) as string
    ] ?? this.default

  /**
   * Gets the translation for a locale.
   */
  translate = (locale: string) => this.translations[locale]
}
