import { Hono } from 'hono'
import { addFunc, helloWorld } from 'misc-lib'

export function makeApp() {
  const app = new Hono()

  app.get('/api/', (c) => {
    const sum = addFunc(10, 20)
    const msg = helloWorld('Hono Service')
    return c.json({
      service: 'apisvc',
      message: msg,
      calculation: `10 + 20 = ${sum}`,
    })
  })

  app.get('/api/add', (c) => {
    const aParam = c.req.query('a')
    const bParam = c.req.query('b')

    const a = aParam === undefined ? 0 : Number(aParam)
    const b = bParam === undefined ? 0 : Number(bParam)

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return c.json(
        { error: 'query parameters "a" and "b" must be numbers' },
        400,
      )
    }

    const result = addFunc(a, b)
    return c.json({
      a,
      b,
      result,
    })
  })

  app.get('/api/hello', (c) => {
    const name = c.req.query('name')
    return c.text(helloWorld(name))
  })

  return app
}
