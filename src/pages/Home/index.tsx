import { ChangeEvent } from "react"
import Header from "../../components/Header"
import PokemonCard from "../../components/PokemonCard"
import { PokemonsType } from "../../types";

type HomeProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    filteredPokemons: PokemonsType[];
}

function Home({ handleChange, filteredPokemons }: HomeProp) {
    return (
        <div>
            <Header handleChange={handleChange} />
            <PokemonCard filteredPokemons={filteredPokemons} />
        </div>
    )
}

export default Home
