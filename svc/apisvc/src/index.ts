import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { addFunc, helloWorld } from 'misc-lib'

const app = new Hono()

app.get('/', (c) => {
  const sum = addFunc(10, 20)
  const msg = helloWorld("Hono Service")
  return c.json({
    service: 'apisvc',
    message: msg,
    calculation: `10 + 20 = ${sum}`
  })
})

const port = 9000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
