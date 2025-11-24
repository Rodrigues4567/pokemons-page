import styles from './Home.module.css'
import { ChangeEvent, useEffect, useRef } from "react"
import Header from "../../components/Header"
import PokemonCard from "../../components/PokemonCard"
import { PokemonsType } from "../../types";

type HomeProp = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filteredPokemons: PokemonsType[];
  loadMorePokemons: () => void;
  isLoading: boolean;
  hasMore: boolean;
  input: string;
}

function Home({ handleChange, filteredPokemons, loadMorePokemons, isLoading, hasMore, input }: HomeProp) {

  const lastScrollY = useRef<number>(0);

  // Infinite scroll baseado no scroll da página
  useEffect(() => {
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      const currentY = scrollTop;
      const isScrollingDown = currentY > lastScrollY.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isScrollingDown && isAtBottom && hasMore && !isLoading && !input) {
        loadMorePokemons();
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadMorePokemons, input]);

  return (
    <div className={styles.container}>
      <Header handleChange={handleChange} />

      <PokemonCard filteredPokemons={filteredPokemons} />

      {isLoading && (
        <p className={styles.loadingText}>Carregando mais pokémons...</p>
      )}
    </div>
  )
}

export default Home;
