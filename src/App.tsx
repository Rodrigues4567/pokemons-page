import axios from 'axios'
import './App.css'
import PokemonCard from './components/PokemonCard'
import { useEffect, useState } from 'react'

function App() {

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokeApi()
  }, [])

  function getPokeApi() {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=80")
      .then((res) => setPokemons(() => res.data.results))
      .catch((err) => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Página de pokemons!</h1>
      <PokemonCard pokemons={pokemons} />
    </>
  )
}

export default App
