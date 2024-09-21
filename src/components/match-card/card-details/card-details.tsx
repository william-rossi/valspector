import React from 'react'
import styles from './styles.module.scss'
import { Match } from '@/data/match'
import { MatchProps, Player } from '@/models/matchlist'
import { Helper } from '@/data/helper'

interface Props {
  match: MatchProps
}

export default function CardDetails(props: Props) {
  const renderPlayer = (player: Player, index: number, isDeathmatch?: boolean) => {
    return (
      <div data-title={`${index === 0 ? "(MVP)" : ""} ${player.stats.score}pts`} key={index} className={styles.player}>
        <div className={styles.playerName}>
          <b>{index === 0 && "★"} {isDeathmatch && index !== 0 && `${index + 1}º `}{player.name}</b>
          <span>#{player.tag}</span>
        </div>
        <i>{player.tier.name} - Lvl. {player.account_level}</i>
        <span>{player.agent.name}</span>
        <label>{`${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`}</label>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.matchInfos}>
        <h3>{Helper.getSeasonFormatted(props.match.metadata.season.short)}</h3>
        <label>{props.match.metadata.queue.name} - {props.match.metadata.queue.mode_type}</label>
        <span>{props.match.metadata.cluster}</span>
      </div>
      {
        props.match.metadata.queue.id !== 'deathmatch' ?
          <div className={styles.teams}>
            <div className={styles.team}>
              <h5 className={styles.blueTitle}>BLUE</h5>
              <div className={styles.allPlayers}>
                {
                  Match.getBluePlayers(props.match).map((player, index) => (
                    renderPlayer(player, index)
                  ))
                }
              </div>
            </div>
            <div className={styles.team}>
              <h5 className={styles.redTitle}>RED</h5>
              <div className={styles.allPlayers}>
                {
                  Match.getRedPlayers(props.match).map((player, index) => (
                    renderPlayer(player, index)
                  ))
                }
              </div>
            </div>
          </div>
          :
          <div className={styles.allPlayers}>
            {
              Match.getAllPlayers(props.match).map((player, index) => (
                renderPlayer(player, index, true)
              ))
            }
          </div>
      }
    </div>
  )
}
