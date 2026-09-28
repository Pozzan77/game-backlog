import { Router } from 'express'
import { getGames } from '../controllers/getGames.ts'
import { getGamesByPathParams } from '../controllers/getGamesbyPathParams.ts'

export const gameRoutes = Router()


gameRoutes.get('/', getGames)

gameRoutes.get('/:id', getGamesByPathParams)