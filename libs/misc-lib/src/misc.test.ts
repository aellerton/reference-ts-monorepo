import { describe, it, expect } from 'vitest'
import { addFunc, helloWorld } from './misc.js'

describe('misc add func', () => {
  it('should add numbers', () => {
    expect(addFunc(2, 2)).toBe(4)
    expect(addFunc(0, 0)).toBe(0)
    expect(addFunc(0, -1)).toBe(-1)
    expect(addFunc(3.5, 6.5)).toBe(10)
  })
})

describe('misc hello func', () => {
  it('works without arg', () => {
    expect(helloWorld()).toBe('Hello World from misc-lib')
  })
  it('works with arg', () => {
    expect(helloWorld('there')).toBe('Hello there from misc-lib')
  })
})
