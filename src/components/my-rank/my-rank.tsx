'use client'

import React, { useEffect, useId, useState } from 'react'
import styles from './styles.module.scss'
import { useAccount } from '@/context/account-context'
import { useMessage } from '@/context/message/message-context'
import { ErrorResponse } from '@/models/error'
import { MatchlistResponse } from '@/models/matchlist'
import { useMatches } from '@/context/matches-context'

interface InfoProps {
    title?: string
    name: string
    data: string | number | undefined
    show?: boolean
}

export default function MyRank() {
    const { mmr, account } = useAccount()
    const { matches, setMatches, setLoadingMatches } = useMatches()
    const { showMessage } = useMessage()
    const [showStats, setShowStats] = useState<boolean>(false)
    const statsId = useId()

    const getTotalRankedGames = () => {
        let totalGames = 0;
        for (let episode = 1; episode <= new Date().getFullYear() - 1500; episode++) {
            for (let act = 1; act <= 3; act++) {
                const seasonKey = `e${episode}a${act}`
                totalGames += mmr?.data.by_season[seasonKey]?.number_of_games ?? 0
            }
        }
        return totalGames
    }

    const getTotalWinRankedGames = () => {
        let totalGames = 0;
        for (let episode = 1; episode <= new Date().getFullYear() - 1500; episode++) {
            for (let act = 1; act <= 3; act++) {
                const seasonKey = `e${episode}a${act}`
                totalGames += mmr?.data.by_season[seasonKey]?.wins ?? 0
            }
        }
        return totalGames
    }

    const getWinRate = () => {
        if (getTotalWinRankedGames() === 0)
            return 0.00
        if (getTotalRankedGames() === 0)
            return "No matches played"
        return (getTotalWinRankedGames() / getTotalRankedGames()).toFixed(2)
    }

    useEffect(() => {
        const fetchMatchlist = async () => {
            setLoadingMatches(true)
            try {
                const response = await fetch(`/api/matches/matchlist/${account?.data.region.trim()}/${account?.data.name.trim()}/${account?.data.tag.trim()}`,
                    {
                        cache: 'no-store'
                    }
                )

                if (!response.ok) {
                    const errorData = await response.json() as ErrorResponse
                    showMessage(errorData.errors[0].message, { type: 'warning' })
                    return
                }

                const data = await response.json() as MatchlistResponse

                setMatches(data)
            }
            catch (e) {
                showMessage((e as Error).message || 'Unexpected error.', { type: 'danger' })
            }
            finally {
                setLoadingMatches(false)
            }
        }

        if (!matches)
            fetchMatchlist()
    }, [statsId])

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const el = document.getElementById(statsId);

            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setShowStats(true);
                    observer.disconnect();
                }
            }, {
                threshold: window.innerWidth > window.innerHeight ? 0.7 : 0.3,
            });

            if (el) {
                observer.observe(el);
                return () => {
                    observer.unobserve(el);
                };
            }
        }
    }, [statsId])

    const infos: InfoProps[] = [
        { name: "Highest rank", data: mmr?.data.highest_rank.patched_tier ?? "N/A", title: `Episode ${mmr?.data.highest_rank.season[1]} Act ${mmr?.data.highest_rank.season[3]}` },
        { name: "Elo", data: mmr?.data.current_data.elo ?? 0 },
        { name: "Ranked matches", data: getTotalRankedGames() },
        { name: "Wins in ranked", data: getTotalWinRankedGames() },
        { name: "Win rate", data: getWinRate() },
        { name: "Last earned MMR", data: mmr?.data.current_data.mmr_change_to_last_game ?? 0 },
        { name: "Games to get rank", data: mmr?.data.current_data.games_needed_for_rating ?? 0, show: mmr?.data.current_data.games_needed_for_rating ?? 0 > 0 ? true : false },
        { name: "Current MMR", data: mmr?.data.current_data.ranking_in_tier ?? 0 },
        { name: "MMR to next tier", data: 100 - (mmr?.data.current_data.ranking_in_tier ?? 0) }
    ]

    return (
        <section id={statsId} className={styles.container}>
            <h2>Competitive</h2>
            <div className={styles.rankArea}>
                <div className={styles.imageArea}>
                    <img src={mmr?.data.current_data.images.large} draggable={false} alt='rank' />
                </div>
                <h5>{mmr?.data.current_data.currenttierpatched}</h5>
            </div>
            <div className={styles.infos}>
                {
                    infos.map((item, index) => (
                        item.show != false &&
                        <div key={index} style={{ animationDuration: (index === 0 ? 0.5 : index) * 0.07 + `s` }} className={`${styles.infoContainer} ${showStats && styles.show}`}>
                            <div data-title={item.title} className={`${styles.info}`}>
                                <span>{item.name}</span>
                                <b>{item.data}</b>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
