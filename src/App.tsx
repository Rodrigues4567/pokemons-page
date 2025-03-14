import axios from 'axios'
import './App.css'
import PokemonCard from './components/PokemonCard'
import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'

function App() {

  type PokemonsType = {
    name: string;
    url : string;
  }

  const [pokemons, setPokemons] = useState<PokemonsType[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getPokeApi()
  }, [])

  function getPokeApi() {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=120")
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
      <Header />
      <PokemonCard pokemons={pokemons} />
    </>
  )
}

export default App
