import { Request, Response} from 'express'
import type { IGDBGame } from '../types/igdb.ts'

export const getGamesByPathParams = async (req:Request<{slug:string}>, res:Response) => {

    const { slug } = req.params

    const query = `
    fields id, name, slug, rating, first_release_date, cover.url;
    where slug = "${slug}";
`

const response = await fetch(
    'https://api.igdb.com/v4/games',
    {
        method: 'POST',
        headers: {
            'Client-ID': process.env.IGDB_CLIENT_ID!,
            'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN!}`,
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        body: query
    }
)

    if (!response.ok) {
        throw new Error(`IGDB API error ${response.status}`)
    }

    const data: IGDBGame[] = await response.json()

    if (data.length === 0) {
        res.status(404).json({ message: 'Game not found' })
        return
    }

    res.json(data[0])
}
