'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AccountResponse } from '@/models/account'
import { useAccount } from '@/context/account-context'
import { useMessage } from '@/context/message/message-context'
import { ErrorResponse } from '@/models/error'
import { MmrResponse } from '@/models/mmr'
import { MatchlistResponse } from '@/models/matchlist'

interface OptionProps {
    title: string
    value: string
}

export default function TypeNickname() {
    const { account, mmr, setAccount, setMmr } = useAccount()
    const { showMessage } = useMessage()
    const [gamename, setGamename] = useState<string>("perequito")
    const [tagline, setTagline] = useState<string>("1234")
    const [loading, setLoading] = useState<boolean>(false)
    const [region, setRegion] = useState("");

    const options: OptionProps[] = [
        { title: "BR", value: "br" },
        { title: "NA", value: "na" },
        { title: "EU", value: "eu" },
        { title: "LATAM", value: "latam" },
        { title: "AP", value: "ap" },
        { title: "KR", value: "kr" }
    ]

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value);
    }

    const fetchUserData = async () => {
        if (!gamename || !tagline) {
            showMessage("Please, fill your Game name and tagline.", { type: 'information' })
            return
        }

        setLoading(true)

        try {
            await fetchAccount()
            await fetchMmr()
        }
        catch (e) {
            showMessage((e as Error).message || 'Unexpected error.', { type: 'danger' })
        }
        finally {
            setLoading(false)
        }
    }

    const fetchAccount = async () => {
        const response = await fetch(`/api/account/by-riot-id/${gamename}/${tagline}`)

        if (!response.ok) {
            if (response.status === 404) {
                const errorData = await response.json() as ErrorResponse
                showMessage(errorData.errors[0].message, { type: 'warning' })
                return
            }
            throw new Error(response.statusText)
        }

        const data = await response.json() as AccountResponse

        setAccount(data)
    }

    const fetchMmr = async () => {
        const response = await fetch(`/api/account/mmr/${region}/${gamename}/${tagline}`)

        if (!response.ok) {
            if (response.status === 404) {
                showMessage("If your RIOT ID and TAG are correct, please try playing any match with this account.", { type: 'information', keepOnScreen: true })
            }

            if (response.status === 500) {
                const errorData = await response.json() as ErrorResponse
                showMessage(errorData.errors[0].message, { type: 'warning' })
            }

            return
        }

        const data = await response.json() as MmrResponse

        setMmr(data)
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.navigator.language !== 'pt-BR')
            setRegion('na')
        else
            setRegion('br')
    }, [])

    useEffect(() => {
        if (tagline[0] === '#')
            setTagline(tagline.substring(1))
    }, [tagline])

    useEffect(() => {
        if (account && mmr)
            document.getElementById('account-detail')?.scrollIntoView({ behavior: 'smooth' })
    }, [account, mmr])

    return (
        <section className={styles.container}>
            <h1>Enter your Riot ID and TAG to access your VALORANT stats.</h1>
            <div className={styles.inputArea}>
                <input
                    onChange={(e) => setGamename(e.target.value)}
                    className={styles.gameName}
                    placeholder='RIOT ID'
                    disabled={loading}
                />
                <input
                    onChange={(e) => setTagline(e.target.value)}
                    className={styles.tagline}
                    placeholder='TAG'
                    disabled={loading}
                />
                <select className={styles.regions} value={region} onChange={handleChange}>
                    <optgroup label="Region">
                        {
                            options.map((item, index) => (
                                <option key={index} value={item.value}>{item.title}</option>
                            ))
                        }
                    </optgroup>
                </select>
            </div>
            <button onClick={fetchUserData} className={styles.btn} disabled={loading}>
                {loading ? 'SEARCHING...' : 'SEARCH'}
            </button>
            <p className={styles.description}>If you're entering your RIOT ID and TAG correctly but it's not being found, please try playing any match in Valorant, then search again.</p>
        </section>
    )
}
