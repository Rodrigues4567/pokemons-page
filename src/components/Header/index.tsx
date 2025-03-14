import { ChangeEvent } from 'react'
import styles from './Header.module.css'

type HeaderProp = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Header({ handleChange }: HeaderProp) {
    return (
        <div>
            <div className={styles.container}>
                <input onChange={handleChange} type="text" />
            </div>
        </div>
    )
}

export default Header
