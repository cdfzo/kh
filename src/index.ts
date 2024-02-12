type Config = {
  locale: string
}

class App {
  locale

  constructor(config: Config) {
    this.locale = config.locale
  }

  listen = (port: number) => {
    Bun.serve({
      hostname: '0.0.0.0',
      port,
      fetch: (req) => {
        const url = new URL(req.url)
        return new Response(`NOT_FOUND: ${url.pathname}`)
      },
    })
  }
}

export { App }
