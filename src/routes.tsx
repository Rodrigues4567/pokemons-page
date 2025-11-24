import { ChangeEvent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { PokemonsType } from "./types";
import PokemonDescription from "./pages/PokemonDescription";

type AppRoutesProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    filteredPokemons: PokemonsType[];
    loadMorePokemons: () => void;
    isLoading: boolean;
    hasMore: boolean;
    input: string;
}

function AppRoutes({ handleChange, filteredPokemons, loadMorePokemons, isLoading, hasMore, input }: AppRoutesProp) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home handleChange={handleChange} filteredPokemons={filteredPokemons} loadMorePokemons={loadMorePokemons} isLoading={isLoading} hasMore={hasMore} input={input} />}></Route>

                <Route path="/PokemonDescription/:name" element={<PokemonDescription handleChange={handleChange} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
