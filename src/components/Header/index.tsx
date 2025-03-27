import { ChangeEvent } from 'react'
import styles from './Header.module.css'
import { useLocation } from 'react-router-dom'

type HeaderProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Header({ handleChange }: HeaderProp) {

    // HIDE THE INPUT-TEXT ON PAGE PokemonDescription
    const location = useLocation()
    const hideInput = location.pathname === '/PokemonDescription'

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.images_container}>
                    <img className={styles.img_name} src="src/assets/pokemon-logo2.webp" alt="" />
                </div>

                {!hideInput && (
                    <input onChange={handleChange} type="text" placeholder='Choose your Pokemon' />
                )}
            </div>
        </div>
    )
}

export default Header
