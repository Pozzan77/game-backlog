export interface Game {
    id: number
    name: string
    slug: string
    rating: number
    first_release_date: number | null
    cover?: {
        url: string
    }
}

export interface GameSlug extends Game {
    summary?:string
    storyline?:string
    screenshots?: {
        url: string
    }[]
    artworks?: {
        url: string
        width: number
        height: number
    }[]

    genres?: {
        name: string
    }[]

    platforms?: {
        name: string
    }[]

    involved_companies?: {
        developer: boolean
        publisher: boolean
        company: {
            name: string
        }
    }[]
}