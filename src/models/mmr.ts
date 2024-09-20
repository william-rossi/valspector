export interface MmrResponse {
    status: number
    data: {
        name: string
        tag: string
        current_data: {
            currenttier: number
            currenttierpatched: string
            images: {
                small: string
                large: string
                triangle_down: string
                triangle_up: string
            }
            ranking_in_tier: number
            mmr_change_to_last_game: number
            elo: number
            games_needed_for_rating: number
            old: boolean
        }
        highest_rank: {
            old: boolean
            tier: number
            patched_tier: string
            season: string
        }
        by_season: {
            [key: string]: {
                error: boolean
                wins: number
                number_of_games: number
                final_rank: number
                final_rank_patched: string
                act_rank_wins: {
                    patched_tier: string
                    tier: number
                }[]
                old: boolean
            }
        }
    }
}
