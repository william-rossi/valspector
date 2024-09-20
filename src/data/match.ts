import { AccountResponse } from "@/models/account"
import { MatchProps } from "@/models/matchlist"

export class Match {
    static getCharacterName = (item: MatchProps, account: AccountResponse | null) => {
        const player = item.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return player?.agent.name
    }

    static getKda = (item: MatchProps, account: AccountResponse | null) => {
        const player = item.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return `${player?.stats.kills}/${player?.stats.deaths}/${player?.stats.assists}`
    }

    static getScore = (item: MatchProps, account: AccountResponse | null) => {
        const player = item.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return (player?.stats.score ?? 0).toLocaleString(window.navigator.language)
    }

    static getMatchResult = (item: MatchProps, account: AccountResponse | null) => {
        const player = item.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        const playerTeam = item.teams.find(pt => pt.team_id === player?.team_id)
        return `${playerTeam?.rounds.won} - ${playerTeam?.rounds.lost}`
    }

    static hasWonMatch = (item: MatchProps, account: AccountResponse | null) => {
        const player = item.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        const playerTeam = item.teams.find(pt => pt.team_id === player?.team_id)
        return playerTeam?.won === true
    }

    static getMatchDurationInMinutes = (item: MatchProps) => {
        const ms = item.metadata.game_length_in_ms
        return `${Math.floor(ms / 60000)}min`
    }

    static getMatchStartDate = (item: MatchProps) => {
        const matchDate = item.metadata.started_at
        const date = new Date(matchDate)
        if (window.navigator.language === 'pt-br') {
            return date.toLocaleDateString('pt-BR')
        } else {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}/${month}/${day}`
        }
    }

    static getMapImage = (item: MatchProps) => {
        const imagePath = '/images/maps'
        const src = `${imagePath}/${item.metadata.map.name.toLowerCase()}.jpg`
        return src
    }
}