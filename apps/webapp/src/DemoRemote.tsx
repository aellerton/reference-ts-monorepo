import { Component, createSignal } from 'solid-js'
import { Card } from './Card'

const addFuncRemote = (a: number, b: number): Promise<string> => {
  const url = `/api/add?${new URLSearchParams({ a: '' + a, b: '' + b })}`
  return fetch(url)
    .then((r) => (r.ok ? r.json() : { error: 'Status ' + r.status }))
    .then((r) => {
      if (r.error) return r.error
      return `${r.a} + ${r.b} = ${r.result}`
      // console.log('result of add', r)
    })
    .catch((error) => {
      return `failed: ${error}`
    }) // .then(() => -a * b)
}

const helloWorldRemote = (name?: string): Promise<string> => {
  const url = '/api/hello' + (name == null ? '' : `?name=${name}`)
  return fetch(url)
    .then((r) => (r.ok ? r.text() : 'Status ' + r.status))
    .catch((error) => {
      // console.error('failed to hello', error)
      return '' + error
    })
}

const randBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const DemoRemoteApiComponent: Component = () => {
  const [name, setName] = createSignal('World')
  const [nameOutput, setNameOutput] = createSignal('(Empty)')
  const [a, setA] = createSignal(2)
  const [b, setB] = createSignal(3)
  const [calcOutput, setCalcOutput] = createSignal('(Empty)')

  const helloWorld = () => helloWorldRemote(name()).then(setNameOutput)
  const addFunc = () => addFuncRemote(a(), b()).then(setCalcOutput)
  const makeRand = () => {
    setA(randBetween(-100, 500))
    setB(randBetween(-100, 500))
    queueMicrotask(addFunc)
  }
  return (
    <Card heading="Via HTTP">
      <div>
        <h3>Hello API:</h3>
        <div class="row">
          <input
            type="text"
            style="width: 5rem"
            placeholder="Name"
            value={name()}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button onClick={helloWorld}>Update</button>
        </div>
        <div
          class="row"
          style="justify-content: space-between; align-items: center;"
        >
          <p>Result:</p>
          <p style="font-family: monospace">{nameOutput()}</p>
        </div>
      </div>
      <div>
        <h3>Add:</h3>
        <div class="row">
          <input
            type="text"
            style="width: 5rem"
            placeholder="A"
            value={'' + a()}
            onChange={(e) => setA(Number(e.currentTarget.value))}
          />
          <input
            type="text"
            style="width: 5rem"
            placeholder="B"
            value={'' + b()}
            onChange={(e) => setB(Number(e.currentTarget.value))}
          />
          <button onClick={makeRand}>Rng</button>
          <button onClick={addFunc}>Add</button>
        </div>
        <div
          class="row"
          style="justify-content: space-between; align-items: center;"
        >
          <p>Result:</p>
          <p style="font-family: monospace">{calcOutput()}</p>
        </div>
      </div>
    </Card>
  )
}
