import { serve } from '@hono/node-server'
import { makeApp } from './app.js'

const app = makeApp()
const port = 9000
// Default to 127.0.0.1 (safe) unless HOST env var is set
// Need this for WSL2 but probably not needed otherwise.
const hostname = process.env.HOST || '127.0.0.1';
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname
})
