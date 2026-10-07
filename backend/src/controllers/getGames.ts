import { Request, Response, NextFunction} from 'express'
import type { IGDBGame, IGDBPopularity } from '../types/igdb.ts'


export const getGames = async (req:Request<{}, unknown, {}, {search?:string, page?:string, pageSize?:string}>, res:Response, next:NextFunction) => {
    try {
        const {search, page="1", pageSize='70'} = req.query

        const pageNumber = Number(page)
        const limit = Number(pageSize)
        const offset = (pageNumber - 1) * limit
        
        const query = search ? `
            fields id, name, slug, rating, rating_count, first_release_date, cover.url;
            sort rating_count desc;
            search "${search}";
            limit ${limit};
            offset ${offset};` : 
        `
            fields id, name, slug, rating, rating_count, first_release_date, cover.url;
            sort rating_count desc;
            limit ${limit};
            offset ${offset};
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
        
        if (search) {
            const gameIds = data.map(game => game.id)

            const popularityQuery = `
                fields game_id, popularity_type, value;
                where game_id = (${gameIds.join(',')}) & popularity_type = 1;
            `

            const popularityResponse = await fetch(
                'https://api.igdb.com/v4/popularity_primitives',
                {
                    method: 'POST',
                    headers: {
                        'Client-ID': process.env.IGDB_CLIENT_ID!,
                        'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN!}`,
                        'Content-Type': 'text/plain'
                    },
                    body: popularityQuery
                }
            )
            
            if (!popularityResponse.ok) {
                throw new Error(`IGDB popularity API error ${popularityResponse.status}`)
            }
            
            const popularityData: IGDBPopularity[] = await popularityResponse.json()

            const popularityMap = new Map(
                popularityData.map((item: { game_id: number, value: number }) => [
                    item.game_id,
                    item.value
                ])
            )
            data.sort((a, b) => {
                const popularityA = popularityMap.get(a.id) ?? 0
                const popularityB = popularityMap.get(b.id) ?? 0
            
                if (popularityB !== popularityA) {
                    return popularityB - popularityA
                }
            
                return (b.rating ?? 0) - (a.rating ?? 0)
            })
        }
        

        data.forEach(game => {
            if (game.cover) {
                game.cover.url = game.cover.url.replace(
                    't_thumb',
                    't_cover_big'
                )
            }
        })

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}