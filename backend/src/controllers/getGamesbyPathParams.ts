import { Request, Response} from 'express'

export const getGamesByPathParams = async (req:Request<{id:string}>, res:Response) => {

    const { id } = req.params

    const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`
    )

    if (!response.ok) {
        throw new Error(`RAWG API error ${response.status}`)
    }

    const data = await response.json()

    res.json(data)
}
