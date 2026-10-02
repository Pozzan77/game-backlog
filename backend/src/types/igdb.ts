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

export type IGDBResponse = IGDBGame[]