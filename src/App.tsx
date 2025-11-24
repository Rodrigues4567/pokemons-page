import axios from "axios";
import "./App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AppRoutes from "./routes";
import { PokemonsType } from "./types";

function App() {
  const [pokemons, setPokemons] = useState<PokemonsType[]>([]);
  const [input, setInput] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonsType[]>([]);

  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // evita que o fetch inicial rode duas vezes no modo Strict
  const initialFetchDone = useRef(false);

  // INPUT VALUE
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.toLowerCase();
    setInput(inputValue);
  }

  // FILTRAR POKÉMONS + fallback para buscar por nome na API
  useEffect(() => {
    const inputLower = input.toLowerCase().trim();

    // 1) se o input estiver vazio, mostra todos os pokémons carregados
    if (!inputLower) {
      setFilteredPokemons(pokemons);
      return;
    }

    // 2) tenta achar correspondência EXATA nos pokémons já carregados
    const exactMatches = pokemons.filter(
      (poke) => poke.name.toLowerCase() === inputLower
    );

    if (exactMatches.length > 0) {
      setFilteredPokemons(exactMatches);
      return;
    }

    // 3) se não tem exato, tenta buscar na API pelo nome
    let cancel = false;

    async function fetchPokemonByName() {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${inputLower}`
        );

        if (cancel) return;

        const singlePokemon: PokemonsType = {
          name: res.data.name,
          // mesmo formato da listagem, com barra no final
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`,
        };

        setFilteredPokemons([singlePokemon]);
      } catch (err) {
        if (cancel) return;

        // 4) se não achou na API (nome errado, etc),
        //    opcionalmente faz um filtro "solto" pelos já carregados
        const partialMatches = pokemons.filter((poke) =>
          poke.name.toLowerCase().includes(inputLower)
        );
        setFilteredPokemons(partialMatches);
      }
    }

    fetchPokemonByName();

    return () => {
      cancel = true;
    };
  }, [input, pokemons]);

  // Primeiro carregamento: busca só 30
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;

    fetchPokemons("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0");
  }, []);

  async function fetchPokemons(url: string) {
    try {
      setIsLoading(true);
      const res = await axios.get(url);

      const newPokemons: PokemonsType[] = res.data.results;

      // adiciona ao que já tinha
      setPokemons((prev) => [...prev, ...newPokemons]);
      setNextUrl(res.data.next); // próxima página (ou null se acabou)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Chamado pela Home quando o usuário chega no fim da página
  function loadMorePokemons() {
    if (!nextUrl || isLoading) return;
    fetchPokemons(nextUrl);
  }

  return (
    <>
      <AppRoutes
        handleChange={handleChange}
        filteredPokemons={filteredPokemons}
        loadMorePokemons={loadMorePokemons}
        isLoading={isLoading}
        hasMore={!!nextUrl}
        input={input}
      />
    </>
  );
}

export default App;
