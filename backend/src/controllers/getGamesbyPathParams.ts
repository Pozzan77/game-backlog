import { Request, Response} from 'express'
import type { IGDBGame } from '../types/igdb.ts'

export const getGamesByPathParams = async (req:Request<{id:string}>, res:Response) => {

    const { id } = req.params

    const query = `
    fields id, name, slug, rating, first_release_date, cover.url;
    where id = ${id};
`

const response = await fetch(
    'https://api.igdb.com/v4/games',
    {
        method: 'POST',
        headers: {
            'Client-ID': process.env.IGDB_CLIENT_ID!,
            'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN!}`,
            'Accept': 'application/json'
        },
        body: query
    }
)

    if (!response.ok) {
        throw new Error(`IGDDB API error ${response.status}`)
    }

    const data: IGDBGame[] = await response.json()

    res.json(data)
}
