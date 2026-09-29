import { Request, Response, NextFunction} from 'express'
import type { RawgResponse } from '../types/rawg.ts'

export const getGames = async (req:Request<{}, unknown, {}, {search?:string}>, res:Response, next:NextFunction) => {
    try {
        const {search} = req.query

        const url = new URL('https://api.rawg.io/api/games')

        url.searchParams.set('key', process.env.RAWG_API_KEY!)
        
        if(search) {
            url.searchParams.set('search', search)
        }

        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`RAWG API error ${response.status}`)
        }
        
        const data: RawgResponse = await response.json()

        res.json(data)
    }
    catch (error) {
        next(error)
    }
}