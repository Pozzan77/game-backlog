export interface Game {
    id: number
    name: string
    slug: string
    rating: number
    first_release_date: number | null
    cover?: {
        url: string
    }
    artworks?: {
        url:string
    }[]
}

export interface Search {
    search:string
    setSearch:(value:string) => void
    handleSearchSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
}