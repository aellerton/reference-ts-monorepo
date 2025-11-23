import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { addFunc, helloWorld } from 'misc-lib'

const app = new Hono()

app.get('/', (c) => {
  const sum = addFunc(10, 20)
  const msg = helloWorld('Hono Service')
  return c.json({
    service: 'apisvc',
    message: msg,
    calculation: `10 + 20 = ${sum}`,
  })
})

app.get('/add', (c) => {
  const aParam = c.req.query('a')
  const bParam = c.req.query('b')

  const a = aParam === undefined ? 0 : Number(aParam)
  const b = bParam === undefined ? 0 : Number(bParam)

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return c.json({ error: 'query parameters "a" and "b" must be numbers' }, 400)
  }

  const result = addFunc(a, b)
  return c.json({
    a,
    b,
    result,
  })
})

const port = 9000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
