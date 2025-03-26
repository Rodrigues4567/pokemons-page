import { ChangeEvent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { PokemonsType } from "./types";
import PokemonDescription from "./pages/PokemonDescription";

type AppRoutesProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    filteredPokemons: PokemonsType[];
}

function AppRoutes({ handleChange, filteredPokemons }: AppRoutesProp) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home handleChange={handleChange} filteredPokemons={filteredPokemons} />}></Route>

                <Route path="/PokemonDescription" element={<PokemonDescription handleChange={handleChange} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
