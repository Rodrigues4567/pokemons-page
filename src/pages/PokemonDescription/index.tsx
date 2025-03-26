import { ChangeEvent } from "react"
import Header from "../../components/Header"

type PokemonDescriptionProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PokemonDescription({ handleChange }: PokemonDescriptionProp) {
    return (
        <div>
            {/* Remover o input-text quando essa página for chamada */}
            <Header handleChange={handleChange} />
            <h1>Página de descrição do pokemon</h1>
        </div>
    )
}

export default PokemonDescription
