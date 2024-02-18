import { describe, expect, it } from 'bun:test'
import { App } from '@cdfzo/kh'

describe('#listen', () => {
  it('starts the server', async () => {
    const app = new App().listen(3000)

    expect((await fetch('http://127.0.0.1:3000')).ok).toBe(true)
  })
})
