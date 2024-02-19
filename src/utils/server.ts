import { App } from '../index'

export class Server {
  constructor(app: App) {
    app.listen = (port) => this.listen(app, port)
  }

  /**
   * Starts the server.
   */
  private listen = (app: App, port: number) => {
    Bun.serve({
      hostname: '0.0.0.0',
      port,
      fetch: (req) => {
        app.req = req
        app.url = new URL(req.url)

        const route = app.router.resolve(app)

        return new Response(route.controller[route.action](app))
      },
    })
  }
}
