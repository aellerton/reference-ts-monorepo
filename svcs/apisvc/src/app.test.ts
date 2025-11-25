import { describe, it, expect, beforeEach } from 'vitest'
import { makeApp } from './app.js'

describe('API Service', () => {
  let app: ReturnType<typeof makeApp>

  beforeEach(() => {
    app = makeApp()
  })

  it('GET /api/ returns 200 and correct JSON structure', async () => {
    const res = await app.request('/api/')
    expect(res.status).toBe(200)
    const body = await res.json()

    expect(body).toEqual({
      service: 'apisvc',
      message: 'Hello Hono Service from misc-lib',
      calculation: '10 + 20 = 30',
    })
  })

  it('GET /api/add returns 200 and correct JSON structure', async () => {
    let a = 10,
      b = 32

    const res = await app.request(
      `/api/add?${new URLSearchParams({ a: '' + a, b: '' + b })}`,
    )
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toEqual({ a, b, result: a + b })
  })

  it('GET unknown URL returns 404', async () => {
    const res = await app.request('/unknown-route')
    expect(res.status).toBe(404)
  })
})
