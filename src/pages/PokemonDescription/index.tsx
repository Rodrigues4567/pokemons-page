import styles from './PokemonDescription.module.css'
import { ChangeEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import { useParams } from "react-router-dom"
import axios from "axios"
import { PokemonData } from '../../types'

type PokemonDescriptionProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PokemonDescription({ handleChange }: PokemonDescriptionProp) {

    const [pokemon, setPokemon] = useState<PokemonData | null>(null)
    const { name } = useParams()

    useEffect(() => {
        async function getPokemon() {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                setPokemon(() => res.data)
                console.log(res.data)
            }
            catch(err) {
                console.error(err)
            }
        }

        getPokemon()
    }, [name])

    if (!pokemon) return <p>Loading...</p>

    return (
        <div>
            <Header handleChange={handleChange} />
            <div className={styles.container}>

                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                <p><strong>Type:</strong> {pokemon.types.map((t: { type: { name: string } }) => t.type.name).join(", ")}</p>

                <div className={styles.desc}>
                    <div className={styles.type_abilities_container}>
                        
                        <div className={styles.abilities_container}>
                            <p><strong>Abilities:</strong> {pokemon.abilities.map((item, index) => (
                                <li key={index}>{item.ability.name}</li>
                            ))}</p>
                        </div>
                    </div>
                    
                    <ul>
                        {pokemon.stats.map((item, index) => (
                            <li key={index}>
                                {item.stat.name.toUpperCase()}: {item.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default PokemonDescription
