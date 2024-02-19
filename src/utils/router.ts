import { App } from '../index'

type RequestMethod = (path: string, action: string) => App
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Routes = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

type Route = {
  controller: any // eslint-disable-line @typescript-eslint/no-explicit-any
  action: string
  params?: string[]
}

export class Router {
  private methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE']
  private routes: Routes = {}

  constructor(app: App) {
    this.addMethods(app)
  }

  /**
   * Adds HTTP methods to app.
   */
  private addMethods = (app: App) => {
    for (const method of this.methods) {
      app[method.toLowerCase() as Lowercase<HttpMethod>] = (path, action) => {
        this.set(method, path, action)

        return app
      }
    }
  }

  /**
   * Defines a new route.
   */
  private set = (method: string, path: string, handler: string) => {
    const [name, action] = handler.split('#')
    const Controller = require(`${
      Bun.env.cwd ?? process.cwd()
    }/src/controllers/${name}`).default
    const route: Route = { controller: new Controller(), action }

    let routes = this.routes

    for (let part of `${path.slice(1)}/`.split('/')) {
      if (part.startsWith(':')) {
        route.params ||= []
        route.params.push(part.slice(1))
        part = '*'
      }

      routes = routes[part] ||= {}
    }

    routes[method] = route
  }

  /**
   * Saves a parameter from the URL and returns the route.
   */
  private param = (params: string[], route: Routes, part: string) => {
    params.push(part)

    return route['*']
  }

  /**
   * Resolves a URL.
   * @returns controller#action
   */
  resolve = (app: App) => {
    const paths = `${app.url.pathname.slice(1)}//${app.req.method}`.split('/')
    const params: string[] = []
    let route = this.routes

    for (const part of paths) {
      if (!(route = route[part] ?? this.param(params, route, part))) {
        return this.routes.error[''].GET
      }
    }

    app.params = {}
    params.forEach((param, i) => (app.params[route.params![i]] = param))

    return route
  }
}

export type { RequestMethod }
