export interface MatchlistResponse {
    status: number
    data: Array<{
        metadata: {
            match_id: string
            game_length_in_ms: number
            map: {
                id: string
                name: string
            }
            game_version: string
            started_at: string
            is_completed: boolean
            queue: {
                id: string
                name: string
                mode_type: string
            }
            season: {
                id: string
                short: string
            }
            platform: string
            party_rr_penaltys: Array<{
                party_id: string
            }>
            region: string
            cluster: string
        }
        players: Array<{
            puuid: string
            name: string
            account_level: number
            tag: string
            team_id: string
            platform: string
            party_id: string
            agent: {
                id: string
                name: string
            }
            stats: {
                damage: Record<string, unknown>
                assists: number
                bodyshots: number
                deaths: number
                headshots: number
                kills: number
                legshots: number
                score: number
            }
            ability_casts: Record<string, unknown>
            tier: {
                name: string
            }
            card_id: string
            title_id: string
            prefered_level_border: string
            behavior: {
                friendly_fire: Record<string, unknown>
            }
            economy: {
                spent: Record<string, unknown>
                loadout_value: Record<string, unknown>
            }
        }>
        observers: Array<{
            puuid: string
            name: string
            tag: string
            card_id: string
            title_id: string
            party_id: string
        }>
        coaches: Array<{
            puuid: string
            team_id: string
        }>
        teams: Array<{
            team_id: string
            rounds: {
                lost: number
                won: number
            }
            won: boolean
            premier_roster: {
                id: string
                name: string
                tag: string
                members: Array<string>
                customization: {
                    icon: string
                    image: string
                    primary_color: string
                    secondary_color: string
                    tertiary_color: string
                }
            }
        }>
        rounds: Array<{
            result: string
            ceremony: string
            winning_team: string
            plant: {
                site: string
                location: Record<string, unknown>
                player: {
                    puuid: string
                    name: string
                    tag: string
                    team: string
                }
                player_locations: Array<{
                    puuid: string
                    name: string
                    tag: string
                    team: string
                    location: Record<string, unknown>
                }>
            }
            defuse: {
                location: Record<string, unknown>
                player: {
                    puuid: string
                    name: string
                    tag: string
                    team: string
                }
                player_locations: Array<{
                    puuid: string
                    name: string
                    tag: string
                    team: string
                    location: Record<string, unknown>
                }>
            }
            stats: Array<{
                ability_casts: Record<string, unknown>
                player: {
                    puuid: string
                    name: string
                    tag: string
                    team: string
                }
                damage_events: Array<{
                    puuid: string
                    name: string
                    tag: string
                    team: string
                }>
                stats: Record<string, unknown>
                economy: {
                    weapon: {
                        id: string
                        name: string
                        type: string
                    }
                    armor: {
                        id: string
                        name: string
                    }
                }
                was_afk: boolean
                received_penalty: boolean
                stayed_in_spawn: boolean
            }>
        }>
        kills: Array<{
            killer: {
                puuid: string
                name: string
                tag: string
                team: string
            }
            victim: {
                puuid: string
                name: string
                tag: string
                team: string
            }
            assistants: Array<{
                puuid: string
                name: string
                tag: string
                team: string
            }>
            location: Record<string, unknown>
            weapon: {
                id: string
                name: string
                type: string
            }
            secondary_fire_mode: boolean
            player_locations: Array<{
                puuid: string
                name: string
                tag: string
                team: string
                location: Record<string, unknown>
            }>
        }>
    }>
}

export interface MatchProps {
    metadata: {
        match_id: string
        game_length_in_ms: number
        map: {
            id: string
            name: string
        }
        game_version: string
        started_at: string
        is_completed: boolean
        queue: {
            id: string
            name: string
            mode_type: string
        }
        season: {
            id: string
            short: string
        }
        platform: string
        party_rr_penaltys: Array<{
            party_id: string
        }>
        region: string
        cluster: string
    }
    players: Array<{
        puuid: string
        name: string
        account_level: number
        tag: string
        team_id: string
        platform: string
        party_id: string
        agent: {
            id: string
            name: string
        }
        stats: {
            damage: Record<string, unknown>
            assists: number
            bodyshots: number
            deaths: number
            headshots: number
            kills: number
            legshots: number
            score: number
        }
        ability_casts: Record<string, unknown>
        tier: {
            name: string
        }
        card_id: string
        title_id: string
        prefered_level_border: string
        behavior: {
            friendly_fire: Record<string, unknown>
        }
        economy: {
            spent: Record<string, unknown>
            loadout_value: Record<string, unknown>
        }
    }>
    observers: Array<{
        puuid: string
        name: string
        tag: string
        card_id: string
        title_id: string
        party_id: string
    }>
    coaches: Array<{
        puuid: string
        team_id: string
    }>
    teams: Array<{
        team_id: string
        rounds: {
            lost: number
            won: number
        }
        won: boolean
        premier_roster: {
            id: string
            name: string
            tag: string
            members: Array<string>
            customization: {
                icon: string
                image: string
                primary_color: string
                secondary_color: string
                tertiary_color: string
            }
        }
    }>
    rounds: Array<{
        result: string
        ceremony: string
        winning_team: string
        plant: {
            site: string
            location: Record<string, unknown>
            player: {
                puuid: string
                name: string
                tag: string
                team: string
            }
            player_locations: Array<{
                puuid: string
                name: string
                tag: string
                team: string
                location: Record<string, unknown>
            }>
        }
        defuse: {
            location: Record<string, unknown>
            player: {
                puuid: string
                name: string
                tag: string
                team: string
            }
            player_locations: Array<{
                puuid: string
                name: string
                tag: string
                team: string
                location: Record<string, unknown>
            }>
        }
        stats: Array<{
            ability_casts: Record<string, unknown>
            player: {
                puuid: string
                name: string
                tag: string
                team: string
            }
            damage_events: Array<{
                puuid: string
                name: string
                tag: string
                team: string
            }>
            stats: Record<string, unknown>
            economy: {
                weapon: {
                    id: string
                    name: string
                    type: string
                }
                armor: {
                    id: string
                    name: string
                }
            }
            was_afk: boolean
            received_penalty: boolean
            stayed_in_spawn: boolean
        }>
    }>
    kills: Array<{
        killer: {
            puuid: string
            name: string
            tag: string
            team: string
        }
        victim: {
            puuid: string
            name: string
            tag: string
            team: string
        }
        assistants: Array<{
            puuid: string
            name: string
            tag: string
            team: string
        }>
        location: Record<string, unknown>
        weapon: {
            id: string
            name: string
            type: string
        }
        secondary_fire_mode: boolean
        player_locations: Array<{
            puuid: string
            name: string
            tag: string
            team: string
            location: Record<string, unknown>
        }>
    }>
}
