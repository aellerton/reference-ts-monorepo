/* @refresh reload */
import { render } from 'solid-js/web'
import { Component, createSignal, ParentComponent, Show } from 'solid-js'
import { addFunc, helloWorld } from 'misc-lib'
import { Card } from './Card'
import { DemoLocalLibComponent } from './DemoLocal'
import './index.css'
import { DemoRemoteApiComponent } from './DemoRemote'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div class="row">
      <DemoLocalLibComponent />
      <DemoRemoteApiComponent />
      <Card heading='Plain boring signal'>
        <button onClick={() => setCount((c) => c + 1)}>Count is {count()}</button>
      </Card>
    </div>
  )
}

render(() => <App />, document.getElementById('root')!)
