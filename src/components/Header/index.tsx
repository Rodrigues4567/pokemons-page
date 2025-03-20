import { ChangeEvent } from 'react'
import styles from './Header.module.css'

type HeaderProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Header({ handleChange }: HeaderProp) {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.images_container}>
                    <img className={styles.img_name} src="src/assets/pokemon-logo2.webp" alt="" />
                </div>

                <input onChange={handleChange} type="text" placeholder='Choose your Pokemon' />
            </div>
        </div>
    )
}

export default Header
