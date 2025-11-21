import styles from './Home.module.css'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Header from "../../components/Header"
import PokemonCard from "../../components/PokemonCard"
import { PokemonsType } from "../../types";

type HomeProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    filteredPokemons: PokemonsType[];
}

function Home({ handleChange, filteredPokemons }: HomeProp) {

    // Quantos pokémons serão exibidos na tela
    const [visibleCount, setVisibleCount] = useState<number>(10);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const lastScrollY = useRef<number>(0);

    // Sempre que o filtro mudar, voltamos para o começo (10 primeiros)
    useEffect(() => {
        setVisibleCount(10);
        lastScrollY.current = window.scrollY;
    }, [filteredPokemons]);

    const visiblePokemons = filteredPokemons.slice(0, visibleCount);

    function loadMore() {

        if (isLoadingMore || visibleCount >= filteredPokemons.length) return;

        setIsLoadingMore(true);

        // Simula um loading
        setTimeout(() => {
            setVisibleCount((prev) => {
                const next = prev + 10;
                return next > filteredPokemons.length ? filteredPokemons.length : next;
            });
            setIsLoadingMore(false);
        }, 400);
    }

    // Infinite scroll: só carrega mais quando:
    // - estiver rolando PRA BAIXO
    // - chegar REALMENTE no final da página
    useEffect(() => {
        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            const currentY = scrollTop;
            const isScrollingDown = currentY > lastScrollY.current;

            // chegou no final da página?
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            if (isScrollingDown && isAtBottom) {
                loadMore();
            }

            lastScrollY.current = currentY;
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [filteredPokemons.length, isLoadingMore]);

    return (
        <div className={styles.container}>
            <Header handleChange={handleChange} />

            <PokemonCard filteredPokemons={visiblePokemons} />

            {isLoadingMore && (
                <p className={styles.loadingText}>Carregando mais pokémons...</p>
            )}

            {!isLoadingMore && visibleCount >= filteredPokemons.length && (
                <p className={styles.endText}>Você já viu todos os pokémons! 🎉</p>
            )}
        </div>
    )
}

export default Home
