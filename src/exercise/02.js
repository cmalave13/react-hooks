// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

// import * as React from 'react'

import {useState, useEffect} from 'react'

const useLocalStorageState = (key, defaultValue = '') => {
    const [state, setState] = useState(() => window.localStorage.getItem(key) ?? defaultValue)
    useEffect(() => {
        console.log('calling useEffect')
        window.localStorage.setItem(key, state)
      }, [key,state])

      return [state, setState]
}

function Greeting({initialName = ''}) {

    const [name, setName] = useLocalStorageState('name', initialName)


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
    const [count, setCount] = useState(0)
  return (
  <>
    <button onClick={() => setCount(prevCount => ++prevCount)}>{count}</button>
    <Greeting initialName="Spike" />
  </>
  )
}

export default App
