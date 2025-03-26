import axios from 'axios'
import './App.css'
import { ChangeEvent, useEffect, useState } from 'react'
import AppRoutes from './routes';
import { PokemonsType } from './types';

function App() {

  const [pokemons, setPokemons] = useState<PokemonsType[]>([])
  const [input, setInput] = useState<string>('')
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonsType[]>([]);

  // INPUT VALUE
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toLowerCase()
    setInput(() => inputValue)
    console.log(inputValue)
  }

  // FILTER POKEMONS BY INPUT
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
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=555")
      setPokemons(() => res.data.results);
      setFilteredPokemons(() => res.data.results)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AppRoutes handleChange={handleChange} filteredPokemons={filteredPokemons} />
    </>
  )
}

export default App
