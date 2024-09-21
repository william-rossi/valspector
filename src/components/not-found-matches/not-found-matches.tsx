import React from 'react'
import styles from './styles.module.scss'

interface Props {
    isComp?: boolean
}

export default function NotFoundMatches({ isComp }: Props) {
    return (
        <div className={styles.container}>
            <p>No {isComp ? "competitive" : " "} matches were found.</p>
        </div>
    )
}
