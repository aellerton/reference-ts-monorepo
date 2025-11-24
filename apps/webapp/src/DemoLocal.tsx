import { Component, createSignal } from 'solid-js'
import { addFunc, helloWorld } from 'misc-lib'
import { Card } from './Card'

export const DemoLocalLibComponent: Component = () => {
  const [name, setName] = createSignal('World')
  const [nameOutput, setNameOutput] = createSignal(helloWorld(name()))

  const [a, setA] = createSignal(2)
  const [b, setB] = createSignal(3)
  const [calcOutput, setCalcOutput] = createSignal(addFunc(a(), b()))

  return (
    <Card heading="Local function calls">
      <div>
        <h3>Hello API:</h3>
        <div class="row">
          <input type="text" style="width: 5rem" placeholder="Name" value={name()} onChange={(e) => setName(e.currentTarget.value)} />
          <button onClick={() => setNameOutput(helloWorld(name()))}>Update</button>
        </div>
        <div class="row" style="justify-content: space-between; align-items: center;">
          <p>Result:</p>
          <p style="font-family: monospace">{nameOutput()}</p>
        </div>
      </div>
      <div>
        <h3>Add:</h3>
        <div class="row">
          <input type="text" style="width: 5rem" placeholder="A" value={'' + a()} onChange={(e) => setA(Number(e.currentTarget.value))} />
          <input type="text" style="width: 5rem" placeholder="B" value={'' + b()} onChange={(e) => setB(Number(e.currentTarget.value))} />
          <button onClick={() => setCalcOutput(addFunc(a(), b()))}>Add</button>
        </div>
        <div class="row" style="justify-content: space-between; align-items: center;">
          <p>Result:</p>
          <p style="font-family: monospace">{a()} + {b()} = {calcOutput()}</p>
        </div>
      </div>
    </Card>
  )
}