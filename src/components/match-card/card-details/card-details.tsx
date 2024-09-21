import React from 'react'
import styles from './styles.module.scss'
import { Match } from '@/data/match'
import { MatchProps } from '@/models/matchlist'

interface Props {
  match: MatchProps
}

export default function CardDetails(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.matchInfos}>
        <h3>{Match.getEa(props.match)}</h3>
        <label>{props.match.metadata.queue.name} - {props.match.metadata.queue.mode_type}</label>
        <span>{props.match.metadata.cluster}</span>
      </div>
      <div className={styles.teams}>
        <div className={styles.team}>
          <h5 className={styles.blueTitle}>BLUE</h5>
          <div className={styles.allPlayers}>
            {
              Match.getBluePlayers(props.match).map((player, j) => (
                <div data-title={`${j === 0 ? "(MVP)" : ""} ${player.stats.score}pts`} key={j} className={styles.player}>
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
              Match.getRedPlayers(props.match).map((player, j) => (
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
  )
}
