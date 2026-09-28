import { games } from '../data/data.ts'
import { Request, Response} from 'express'

export const getGamesByPathParams = (req:Request<{id:string}>, res:Response) => {
    const gameId = Number(req.params.id)

    const game = games.find(game => 
         game.id === gameId
    )

    if (!game) {
       return res.status(404).json({message: "no game with the corresponding id found"})
    }

    res.json(game)
}
