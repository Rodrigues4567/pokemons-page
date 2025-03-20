import axios from 'axios'
import './App.css'
import PokemonCard from './components/PokemonCard'
import { ChangeEvent, useEffect, useState } from 'react'
import Header from './components/Header'

function App() {

  type PokemonsType = {
    name: string;
    url : string;
  }

  const [pokemons, setPokemons] = useState<PokemonsType[]>([])
  const [input, setInput] = useState<string>('')
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonsType[]>([]);

  // INPUT VALUE
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toLowerCase()
    setInput(() => inputValue)
    console.log(inputValue)
  }

  useEffect(() => {
    const filtered = pokemons.filter((poke) =>
      poke.name.toLowerCase().includes(input)
    );
    setFilteredPokemons(() => filtered);
  }, [input, pokemons]);

  useEffect(() => {
    getPokeApi()
  }, [])

  async function getPokeApi() {
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=550")
      setPokemons(() => res.data.results);
      setFilteredPokemons(() => res.data.results)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header handleChange={handleChange} />
      <PokemonCard filteredPokemons={filteredPokemons} />
    </>
  )
}

export default App
