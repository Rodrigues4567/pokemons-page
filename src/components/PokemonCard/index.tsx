import { Link } from "react-router-dom"
import { PokemonsType } from "../../types"
import styles from "./PokemonCard.module.css"

// Function to extract the pokemon ID from URL
const getPokemonId = (url: string) => {
    return url.split("/")[url.split("/").length - 2]
}

type PokemonCardProp = {
    filteredPokemons: PokemonsType[];
}

function PokemonCard({ filteredPokemons }: PokemonCardProp) {
    return (
        <div>
            <div className={styles.container}>
                {filteredPokemons.map((poke) => (
                    <Link key={poke.name} to={`/PokemonDescription/${poke.name}`} className={styles.card}>
                        <p>{poke.name}</p>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(poke.url)}.png`} alt={poke.name} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PokemonCard
