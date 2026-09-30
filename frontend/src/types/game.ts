export interface Game {
    id: number
    name: string
    slug: string
    released: string | null
    background_image: string | undefined
    rating: number
}

export interface Search {
    search:string
    setSearch:(value:string) => void
}