import type { Game } from '../types/game'

interface GamesResponse {
    count: number
    next: string | null
    previous: string | null
    results: Game[]
}

export async function getGames(search?: string): Promise<GamesResponse> {
    const url = new URL(`http://localhost:3000/api/games`)

    if (search) {
        url.searchParams.set('search', search)
    }

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`failed to fetch games`)
    }

    return response.json()
}