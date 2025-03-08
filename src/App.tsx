import axios from 'axios'
import './App.css'
import PokemonCard from './components/PokemonCard'

function App() {

  function getPokeApi() {
    try {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=21")
      .then((res) => console.log(res.data.results))
      .catch((err) => console.log(err))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {getPokeApi()}
      <h1>Página de pokemons!</h1>
      <PokemonCard />
    </>
  )
}

export default App
