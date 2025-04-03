
export type PokemonsType = {
    name: string;
    url : string;
}

// used on page PokemonDescription
export type PokemonData = {
    name: string;

    sprites: {
        front_default: string;
    };

    types: {
        type: {
            name: string;
        };
    }[];

    abilities: {
        ability: {
            name: string;
        };
    }[];

    stats: {
        base_stat: number;
        stat: {
            name: string;
        }
    }[]
}
