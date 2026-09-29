import 'dotenv/config'
import express from 'express'
import { Request, Response} from 'express'
import cors from 'cors'
import { gameRoutes } from './routes/gameRoutes.ts'

const PORT = 3000
process.env.RAWG_API_KEY
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/games', gameRoutes)

app.use((req:Request, res:Response<{message:string}>) => {
    res.status(404).json({message: "unespected error in the server"})
})

app.listen(PORT, () => {console.log(`Running at http://localhost:${PORT}`)})