export interface RawgGame {
    id: number
    name: string
    slug: string
    released: string | null
    background_image: string | null
    rating: number
    ratings_count: number
}

export interface RawgResponse {
    count: number
    next: string | null
    previous: string | null
    results: RawgGame[]
}
export interface RawgResponse {
    count:number
    next:   string | null
    previous: string | null
    results: RawgGame[]
}
