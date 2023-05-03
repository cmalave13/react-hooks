// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import {useState, useEffect} from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(!pokemonName) return;

    setPokemon(null)
    setError(null)

    fetchPokemon(pokemonName)
    .then(result => setPokemon(result))
    .catch(err => setError(err))
  }, [pokemonName])

  if(error){
    return (
    <div role="alert">
      Oh no!! 😞 {' ' } 
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
  } else if(!pokemonName){
    return 'Submit a pokemon!'
  } else if(!pokemon){
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
