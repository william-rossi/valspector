export interface MmrHistoryResponse {
    status: number
    name: string
    tag: string
    data: Array<{
        currenttier: number
        currenttier_patched: string
        images: {
            small: string
            large: string
            triangle_down: string
            triangle_up: string
        }
        match_id: string
        map: {
            name: string
            id: string
        }
        season_id: string
        ranking_in_tier: number
        mmr_change_to_last_game: number
        elo: number
        date: string
        date_raw: number
    }>
}
