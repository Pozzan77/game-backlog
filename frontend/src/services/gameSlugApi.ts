import type { Game } from "../types/game";

export async function getGamesBySlug(slug: string):Promise<Game> {
    const response = await fetch(`http://localhost:3001/api/games/${encodeURIComponent(slug)}`)

    if (!response.ok) {
        throw new Error('Failed to fetch game')
    }

    return response.json()
}