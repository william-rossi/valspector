import React from 'react'
import styles from './styles.module.scss'
import { Match } from '@/data/match';
import { MatchProps } from '@/models/matchlist';
import { AccountResponse } from '@/models/account';

interface Props {
    match: MatchProps
    account: AccountResponse | null
    setMatchId(e: string): void
    isOpen: boolean
}

export default function CardInfo(props: Props) {
    const renderClass = () => {
        return `${styles.container} ${Match.hasWonMatch(props.match, props.account) ? styles.won : styles.lost}`
    }
    return (
        <div style={props.isOpen ? { transform: 'none', transition: '0s' } : {}} onClick={() => props.setMatchId(props.match.metadata.match_id)} className={renderClass()}>
            <div className={styles.mapImage}>
                <img
                    style={props.isOpen ? { borderBottomLeftRadius: 0 } : {}}
                    draggable={false}
                    src={Match.getMapImage(props.match)}
                    alt='map'
                    onError={(e) => e.currentTarget.src = '/images/maps/default.jpg'}
                />
            </div>
            <div className={styles.infos}>
                <div className={styles.mapName}>
                    {
                        Match.isMvp(props.match, props.account)
                            ?
                            <span data-title="MVP" style={{ color: '#f7ef8b' }}>★</span>
                            :
                            Match.isTeamMvp(props.match, props.account)
                                ?
                                <span data-title="Team MVP">★</span>
                                :
                                <></>
                    }
                    <h5>{props.match.metadata.map.name}</h5>
                </div>
                <span className={styles.resultText}>{Match.hasWonMatch(props.match, props.account) ? "Victory" : "Defeat"} ({Match.getMatchResult(props.match, props.account)})</span>
                <div className={styles.kda}>
                    <label>{Match.getCharacterName(props.match, props.account)}</label>
                    <span>{Match.getKda(props.match, props.account)} <span className={styles.score}>• {Match.getScore(props.match, props.account)}pts</span></span>
                </div>
                <span className={styles.datetime}>{Match.getMatchDurationInMinutes(props.match)} - {Match.getMatchStartDate(props.match)}</span>
            </div>
            <div className={styles.result}>
                <h5>{Match.hasWonMatch(props.match, props.account) ? "Victory" : "Defeat"}</h5>
                <span>{Match.getMatchResult(props.match, props.account)}</span>
            </div>
        </div>
    )
}
