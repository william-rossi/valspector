import React from 'react'
import styles from './styles.module.scss'

export default function LoadingMatches() {
    return (
        <div className={styles.container}>
            <div className={styles.ldsRipple}><div></div><div></div></div>
        </div>
    )
}
