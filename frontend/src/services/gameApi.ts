import type { Game } from '../types/game'

export async function getGames(search?: string): Promise<Game[]> {
    const url = new URL('http://localhost:3000/api/games')

    if (search) {
        url.searchParams.set('search', search)
    }

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('failed to fetch games')
    }

    return response.json()
}