import { Request, Response, NextFunction} from 'express'
import type { IGDBGame } from '../types/igdb.ts'


export const getGames = async (req:Request<{}, unknown, {}, {search?:string}>, res:Response, next:NextFunction) => {
    try {
        const {search} = req.query
        
        const query = `
            fields id, name, slug, rating, first_release_date, cover.url;
            search "${search}";
            limit 100;
        `

        const response = await fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': process.env.IGDB_CLIENT_ID!,
                'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN!}`,
                'Content-Type': 'text/plain'
            },
            body: query
        })

        if (!response.ok) {
            const errorText = await response.text()
        
            throw new Error(
                `IGDB API error ${response.status}: ${errorText}`
            )
        }
        

        const data: IGDBGame[] = await response.json()

        console.log(data)

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}