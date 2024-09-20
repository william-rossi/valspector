import React from 'react'
import styles from './styles.module.scss'
import { useMatches } from '@/context/matches-context'
import { MatchProps } from '@/models/matchlist'
import { useAccount } from '@/context/account-context'
import { Match } from '@/data/match'

export default function LastCompMatches() {

    const { account } = useAccount()
    const { matches, loadingMatches } = useMatches()

    const getMatches = () => {
        const compMatches = matches?.data.filter(m => m.metadata.queue.id.toLowerCase() === 'competitive')
        return compMatches?.slice(0, 10)
    }

    // const getMapName = (item: MatchProps) => {
    //     
    // }

    const getBluePlayers = (item: MatchProps) => {
        const players = item.players
            .filter(p => p.team_id.toLocaleLowerCase() === 'blue')
            .sort((a, b) => b.stats.score - a.stats.score)
        return players
    }

    const getRedPlayers = (item: MatchProps) => {
        const players = item.players
            .filter(p => p.team_id.toLocaleLowerCase() === 'red')
            .sort((a, b) => b.stats.score - a.stats.score)
        return players
    }

    const getEa = (item: MatchProps) => {
        const ea = item.metadata.season.short
        const episode = ea[1]
        const act = ea[3]

        return `Episode ${episode} Act ${act}`
    }

    return (
        <section className={styles.container}>
            <h2>Latest competitive matches</h2>

            <div className={styles.cards}>
                {
                    getMatches()?.map((item, index) => (
                        <div key={index} className={styles.expansibleArea}>
                            <div className={`${styles.card} ${Match.hasWonMatch(item, account) ? styles.won : styles.lost}`}>
                                <div className={styles.mapImage}>
                                    <img draggable={false} src={Match.getMapImage(item)} alt='map' onError={(e) => e.currentTarget.src = '/images/maps/default.jpg'} />
                                </div>
                                <div className={styles.infos}>
                                    <h5>{item.metadata.map.name}</h5>
                                    <div className={styles.kda}>
                                        <b>{Match.getCharacterName(item, account)}</b>
                                        <span>{Match.getKda(item, account)} <span className={styles.score}>• {Match.getScore(item, account)}pts</span></span>
                                    </div>
                                    <span className={styles.datetime}>{Match.getMatchDurationInMinutes(item)} - {Match.getMatchStartDate(item)}</span>
                                </div>
                                <div className={styles.result}>
                                    <h5>{Match.hasWonMatch(item, account) ? "Victory" : "Defeat"}</h5>
                                    <span>{Match.getMatchResult(item, account)}</span>
                                </div>
                            </div>
                            <div className={styles.matchData}>
                                <div className={styles.matchInfos}>
                                    <h3>{getEa(item)}</h3>
                                    <label>{item.metadata.queue.name} - {item.metadata.queue.mode_type}</label>
                                    <span>{item.metadata.cluster}</span>
                                </div>
                                <div className={styles.players}>
                                    <div className={styles.team}>
                                        <h5 className={styles.blueTitle}>BLUE</h5>
                                        <div className={styles.allPlayers}>
                                            {
                                                getBluePlayers(item).map((player, j) => (
                                                    <div title={`${j === 0 ? "(MVP)" : ""} ${player.stats.score}pts`} key={j} className={styles.player}>
                                                        <b>{j === 0 && "★"} {player.name}</b>
                                                        <i>{player.tier.name} - Lvl. {player.account_level}</i>
                                                        <span>{player.agent.name}</span>
                                                        <label>{`${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.team}>
                                        <h5 className={styles.redTitle}>RED</h5>
                                        <div className={styles.allPlayers}>
                                            {
                                                getRedPlayers(item).map((player, j) => (
                                                    <div title={`${j === 0 ? "(MVP)" : ""} ${player.stats.score}pts`} key={j} className={styles.player}>
                                                        <b>{j === 0 && "★"} {player.name}</b>
                                                        <i>{player.tier.name} - Lvl. {player.account_level}</i>
                                                        <span>{player.agent.name}</span>
                                                        <label>{`${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
