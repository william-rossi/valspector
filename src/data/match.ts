import { AccountResponse } from "@/models/account"
import { MatchProps } from "@/models/matchlist"

export class Match {
    static getCharacterName = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return player?.agent.name
    }

    static getKda = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return `${player?.stats.kills}/${player?.stats.deaths}/${player?.stats.assists}`
    }

    static getScore = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        return (player?.stats.score ?? 0).toLocaleString(window.navigator.language)
    }

    static isTeamMvp = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        const playerTeam = match.teams.find(pt => pt.team_id.toLocaleLowerCase() === player?.team_id.toLocaleLowerCase())

        const topPlayer = match.players
            .filter(p => p.team_id.toLocaleLowerCase() === playerTeam?.team_id.toLocaleLowerCase())
            .sort((a, b) => b.stats.score - a.stats.score)[0]

        const isMvp = (topPlayer?.name === account?.data.name && topPlayer?.tag === account.data.tag)
            && match.metadata.queue.id.toLocaleLowerCase() !== 'deathmatch'

        return isMvp
    }

    static isMvp = (match: MatchProps, account: AccountResponse | null) => {
        const topPlayer = match.players.sort((a, b) => b.stats.score - a.stats.score)[0]
        const isMvp = topPlayer?.name === account?.data.name && topPlayer?.tag === account.data.tag
        return isMvp
    }

    static getMatchResult = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        const playerTeam = match.teams.find(pt => pt.team_id.toLocaleLowerCase() === player?.team_id.toLocaleLowerCase())
        return `${playerTeam?.rounds.won} - ${playerTeam?.rounds.lost}`
    }

    static hasWonMatch = (match: MatchProps, account: AccountResponse | null) => {
        const player = match.players.find(p => p.name === account?.data.name && p.tag === account.data.tag)
        const playerTeam = match.teams.find(pt => pt.team_id.toLocaleLowerCase() === player?.team_id.toLocaleLowerCase())
        return playerTeam?.won === true
    }

    static getMatchDurationInMinutes = (match: MatchProps) => {
        const ms = match.metadata.game_length_in_ms
        return `${Math.floor(ms / 60000)}min`
    }

    static getMatchStartDate = (match: MatchProps) => {
        const matchDate = match.metadata.started_at
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

    static getMapImage = (match: MatchProps) => {
        const imagePath = '/images/maps'
        const src = `${imagePath}/${match.metadata.map.name.toLowerCase()}.jpg`
        return src
    }

    static getBluePlayers = (match: MatchProps) => {
        const players = match.players
            .filter(p => p.team_id.toLocaleLowerCase() === 'blue')
            .sort((a, b) => b.stats.score - a.stats.score)
        return players
    }

    static getRedPlayers = (match: MatchProps) => {
        const players = match.players
            .filter(p => p.team_id.toLocaleLowerCase() === 'red')
            .sort((a, b) => b.stats.score - a.stats.score)
        return players
    }

    static getAllPlayers = (match: MatchProps) => {
        const players = match.players.sort((a, b) => b.stats.score - a.stats.score)
        return players
    }
}