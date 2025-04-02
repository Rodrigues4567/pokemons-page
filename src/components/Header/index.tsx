import { ChangeEvent } from 'react'
import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/pokemon-logo2.webp'

type HeaderProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Header({ handleChange }: HeaderProp) {

    // HIDE THE INPUT-TEXT ON PAGE PokemonDescription
    const location = useLocation()
    const hideInput = location.pathname.startsWith('/PokemonDescription/')

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.images_container}>
                    <Link to='/'>
                        <img className={styles.img_name} src={logo} alt="" />
                    </Link>
                </div>

                {!hideInput && (
                    <input onChange={handleChange} type="text" placeholder='Choose your Pokemon' />
                )}
            </div>
        </div>
    )
}

export default Header
