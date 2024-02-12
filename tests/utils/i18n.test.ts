import { describe, expect, it } from 'bun:test'
import { I18n } from '../../src/utils/i18n'

const request = (accept: string) => {
  const req = new Request('http://localhost:3000')
  req.headers.append('accept-language', accept)

  return req
}

Bun.env.cwd = '../../tests/dummy'

const preferredLocale = (locales: string[], accept: string) => {
  const i18n = new I18n({ locales })
  const req = request(accept)

  return i18n.preferredLocale(req)
}

describe('preferred locale', () => {
  it('uses first matching locale', () => {
    const locales = ['en-US', 'de-DE', 'de-AT']
    const accept = 'de-DE'

    expect(preferredLocale(locales, accept)).toEqual('de-DE')
  })

  it('defaults to first matching language if no region is given', () => {
    const locales = ['en-US', 'de-DE', 'de-AT']
    const accept = 'de'

    expect(preferredLocale(locales, accept)).toEqual('de-DE')
  })

  it('defaults to first locale if preferred locale is not available', () => {
    const locales = ['en-US', 'de-DE', 'de-AT']
    const accept = 'ja-JP'

    expect(preferredLocale(locales, accept)).toEqual('en-US')
  })

  it('defaults to first locale if preferred locale is invalid', () => {
    const locales = ['en-US', 'de-DE', 'de-AT']
    const accept = 'invalid locale'

    expect(preferredLocale(locales, accept)).toEqual('en-US')
  })

  it('defaults to first locale if preferred locale is not set', () => {
    const locales = ['en-US', 'de-DE', 'de-AT']
    const accept = ''

    expect(preferredLocale(locales, accept)).toEqual('en-US')
  })

  it('defaults to en-US if locales are not set', () => {
    const locales: string[] = []
    const accept = 'de-DE'

    expect(preferredLocale(locales, accept)).toEqual('en-US')
  })
})

describe('translation', () => {
  it('uses first matching locale', () => {
    const i18n = new I18n({ locales: ['en-US'] })
    const req = request('en-US')

    expect(i18n.translation(req)).toEqual({ hello: 'Hello World' })
  })
})
