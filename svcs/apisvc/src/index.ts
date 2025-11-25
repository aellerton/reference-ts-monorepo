import { serve } from '@hono/node-server'
import { makeApp } from './app.js'

const app = makeApp()
const port = 9000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
