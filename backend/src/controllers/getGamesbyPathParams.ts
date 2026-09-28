import { games } from '../data/data.ts'
import { Request, Response} from 'express'

export const getGamesByPathParams = (req:Request<{id:string}>, res:Response) => {
    const gameId = Number(req.params.id)

    const filteredGames = games.filter(game => 
         game.id === gameId
    )

    res.json(filteredGames)
}
