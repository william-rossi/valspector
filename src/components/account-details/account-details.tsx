'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useAccount } from '@/context/account-context'

export default function AccountDetails() {
    const { account } = useAccount()

    function getRandomNumber() {
        return Math.floor(Math.random() * 12) + 1;
    }

    return (
        <section id='account-detail' style={{ backgroundImage: `url('/images/wallpapers/${getRandomNumber()}.jpg')` }} className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.user}>
                    <div className={styles.imageArea}>
                        <img draggable={false} src={account?.data.card.small} alt='card' />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.nameAndTag}>
                            <h3>{account?.data.name}</h3>
                            <span>#{account?.data.tag}</span>
                        </div>
                        <span className={styles.lvl}>Lvl. {account?.data.account_level}</span>
                    </div>
                </div>
            </div>
            <div className={styles.overlay} />
        </section>
    )
}
