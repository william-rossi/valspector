import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useMatches } from '@/context/matches-context'
import { useAccount } from '@/context/account-context'
import CardInfo from '../match-card/card-info/card-info'
import CardDetails from '../match-card/card-details/card-details'
import LoadingMatches from '../loading-matches/loading-matches'
import NotFoundMatches from '../not-found-matches/not-found-matches'

export default function LatestMatches() {
    const { account } = useAccount()
    const { matches, loadingMatches } = useMatches()
    const [matchId, setMatchId] = useState<string>("")

    const getMatches = () => {
        const compMatches = matches?.data.filter(m => m.metadata.queue.id.toLowerCase() !== 'competitive')
        return compMatches?.slice(0, 10)
    }

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const cards = document.getElementsByClassName('match-card')

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    entry.target.classList.toggle(styles.show, entry.isIntersecting)

                    if (entry.isIntersecting)
                        observer.unobserve(entry.target)
                })
            }, {
                threshold: 0.7,
            });

            Array.from(cards).forEach(card => {
                observer.observe(card)
            })
        }
    }, [matches])

    const renderMatches = () => {
        if (loadingMatches) {
            return <LoadingMatches />
        }
        else if ((!matches || (getMatches() && getMatches()!.length < 1)) && !loadingMatches) {
            return <NotFoundMatches isComp={false} />
        }
        else {
            return (
                <div className={styles.cards}>
                    {
                        getMatches()?.map((item, index) => (
                            <div key={index} className={`${styles.expansibleArea} match-card`}>
                                <CardInfo
                                    match={item}
                                    account={account}
                                    setMatchId={setMatchId}
                                    isOpen={item.metadata.match_id === matchId}
                                />
                                {
                                    item.metadata.match_id === matchId &&
                                    <CardDetails match={item} />
                                }
                            </div>
                        ))
                    }
                </div>
            )
        }
    }

    return (
        <section className={styles.container}>
            <h2>Latest non-competitive matches</h2>
            {renderMatches()}
        </section>
    )
}
