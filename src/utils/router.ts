import { App } from '../index'

type RequestMethod = (path: string, action: string) => App
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class Router {
  private methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE']
  private routes: Record<string, any> = {} // eslint-disable-line @typescript-eslint/no-explicit-any

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
  private set = (method: string, path: string, action: string) => {
    let route = this.routes

    for (const part of `${path}/`.split('/')) {
      route = route[part] ||= {}
    }

    route[method] = action
  }

  /**
   * Resolves a URL.
   * @returns controller#action
   */
  resolve = (method: string, path: string) => {
    let route = this.routes

    for (const part of `${path.slice(1)}//${method}`.split('/')) {
      if (!(route = route[part] ?? route['*'])) {
        return this.routes.error[''].GET
      }
    }

    return route
  }
}

export type { RequestMethod }
