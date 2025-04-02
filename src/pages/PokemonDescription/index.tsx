import { ChangeEvent, useEffect, useState } from "react"
import Header from "../../components/Header"
import { useParams } from "react-router-dom"
import axios from "axios"

type PokemonDescriptionProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PokemonDescription({ handleChange }: PokemonDescriptionProp) {

    const [pokemon, setPokemon] = useState<any>(null)
    const { name } = useParams()

    useEffect(() => {
        async function getPokemon() {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                //setPokemon(() => res.data)
                console.log(res.data)
            }
            catch(err) {
                console.error(err)
            }
        }

        getPokemon()
    }, [name])

    return (
        <div>
            <Header handleChange={handleChange} />
            <h1>Página de descrição do pokemon</h1>

        </div>
    )
}

export default PokemonDescription
