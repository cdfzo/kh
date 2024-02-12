class App {
  listen = () => {
    Bun.serve({
      fetch: (req) => {
        const url = new URL(req.url)
        return new Response(`NOT_FOUND: ${url.pathname}`)
      },
    })
  }
}

export { App }
