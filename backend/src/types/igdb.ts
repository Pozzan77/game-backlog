export interface IGDBGame {
    id: number
    name: string
    slug: string
    rating: number
    first_release_date: number | null
    cover?: {
        url: string
    }
}

export interface IGDBPopularity {
    game_id: number
    popularity_type: number
    value: number
}

export type IGDBResponse = IGDBGame[]