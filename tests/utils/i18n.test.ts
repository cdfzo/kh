import { describe, expect, it } from 'bun:test'
import { App } from '@cdfzo/kh'

const acceptLanguage = (accept: string) => {
  const req = new Request('http://localhost:3000')
  req.headers.append('accept-language', accept)

  return req
}

Bun.env.cwd = '../../tests/dummy'

describe('#preferred', () => {
  it('sets first locale as default', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.default).toBe('en-US')
  })

  it('uses first matching locale', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.preferred(acceptLanguage('de-DE'))).toBe('de-DE')
  })

  it('defaults to first matching language if no region is given', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.preferred(acceptLanguage('de'))).toBe('de-DE')
  })

  it('uses default locale if preferred locale is not available', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.preferred(acceptLanguage('ja-JP'))).toBe('en-US')
  })

  it('uses default locale if preferred locale is invalid', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.preferred(acceptLanguage('invalid locale'))).toBe('en-US')
  })

  it('uses default locale if preferred locale is not set', () => {
    const app = new App().useLocales('en-US', 'de-DE', 'de-AT')

    expect(app.i18n.preferred(acceptLanguage(''))).toBe('en-US')
  })

  it('defaults to en-US if locales are not set', () => {
    const app = new App().useLocales()

    expect(app.i18n.preferred(acceptLanguage('de-DE'))).toBe('en-US')
  })
})

describe('#translate', () => {
  it('translates the preferred locale', () => {
    const app = new App().useLocales('en-US')

    expect(app.i18n.translate('en-US')).toEqual({ hello: 'Hello World' })
  })
})
