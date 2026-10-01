import { Request, Response, NextFunction} from 'express'
import type { RawgResponse } from '../types/rawg.ts'


export const getGames = async (req:Request<{}, unknown, {}, {search?:string}>, res:Response, next:NextFunction) => {
    try {
        const {search} = req.query

        const url = new URL('https://api.rawg.io/api/games')

        url.searchParams.set('key', process.env.RAWG_API_KEY!)
        
        if(search) {
            url.searchParams.set('search', search)
            url.searchParams.set('search_precise', 'true')
        }

        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`RAWG API error ${response.status}`)
        }
        
        const data: RawgResponse = await response.json()

        if (search) {
            const searchText:string = search.toLowerCase().trim() 
            
            data.results.sort((a, b) => {
                const aName = a.name.toLowerCase()
                const bName = b.name.toLowerCase()

                const aExact = aName === searchText
                const bExact = bName === searchText

                if(aExact && !bExact) return -1
                if(!aExact && bExact) return 1

                const aStarts = aName.startsWith(searchText)
                const bStarts = bName.startsWith(searchText)

                if(aStarts && !bStarts) return -1
                if(!aStarts && bStarts) return 1

                const aContains = aName.includes(searchText)
                const bContains = bName.includes(searchText)

                if(aContains && !bContains) return -1
                if(!aContains && bContains) return 1

                return b.ratings_count - a.ratings_count

            })
        }

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}