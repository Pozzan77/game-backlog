import { games } from '../data/data.ts'
import type { Game } from '../types/game.ts'
import { Request, Response} from 'express'

export const getGames = (req:Request<{}, unknown, {}, {search?:string}>, res:Response<Game[]>) => {
    const { search } = req.query

    let filteredGames:Game[] = games

    if(search) {
        filteredGames = filteredGames.filter(game =>
             game.name.toLowerCase().includes(search.toLowerCase())
            )  
    }
    
    res.json(filteredGames)
}