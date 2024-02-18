import { App } from '../index'

export class Server {
  constructor(app: App) {
    app.listen = (port) => this.listen(app, port)
  }

  /**
   * Starts the server.
   */
  private listen = (_app: App, port: number) => {
    Bun.serve({
      hostname: '0.0.0.0',
      port,
      fetch: (req) => {
        // TODO: Implement routing
        const url = new URL(req.url)

        return new Response(`NOT_FOUND: ${url.pathname}`)
      },
    })
  }
}
