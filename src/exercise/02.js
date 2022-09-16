// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

// import * as React from 'react'

import {useState, useEffect, useRef} from 'react'

const useLocalStorageState = (
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {}
    ) => {
    const [state, setState] = useState(() => {
        const valueInLocalStorage = window.localStorage.getItem(key);
        
        return valueInLocalStorage ? deserialize(valueInLocalStorage) : 
        typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    })

    const prevKeyRef = useRef(key)

    useEffect(() => {
       const prevKey = prevKeyRef.current;

       if (prevKey !== key) window.localStorage.removeItem(prevKey);

       prevKeyRef.current = key;

        window.localStorage.setItem(key, serialize(state))
      }, [key, serialize, state])

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
