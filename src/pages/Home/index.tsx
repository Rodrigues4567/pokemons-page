import styles from './Home.module.css'
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
        <div className={styles.container}>
            <Header handleChange={handleChange} />
            <PokemonCard filteredPokemons={filteredPokemons} />
        </div>
    )
}

export default Home
