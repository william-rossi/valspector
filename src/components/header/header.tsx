import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.subContainer}>
                <Link href={'/'} data-text="VALSPECTOR" className={styles.logo}>VALSPECTOR</Link>
            </div>
        </header>
    )
}
