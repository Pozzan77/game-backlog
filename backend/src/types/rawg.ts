export interface RawgGame {
    id:number
    name:string
}

export interface RawgResponse {
    count:number
    next:   string | null
    previous: string | null
    results: RawgGame[]
}