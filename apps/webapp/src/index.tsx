/* @refresh reload */
import { render } from 'solid-js/web'
import { createSignal } from 'solid-js'
import { addFunc, helloWorld } from 'misc-lib'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div style={{ 'font-family': 'sans-serif', padding: '2rem' }}>
      <h2>{helloWorld('SolidJS')}</h2>
      <p>misc-lib directly: 5 + 5 = {addFunc(5, 5)}</p>

      <button onClick={() => setCount((c) => c + 1)}>Count is {count()}</button>
    </div>
  )
}

render(() => <App />, document.getElementById('root')!)
