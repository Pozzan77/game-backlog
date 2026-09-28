import express from 'express'
import cors from 'cors'
import { gameRoutes } from './routes/gameRoutes.ts'

const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/games', gameRoutes)

app.listen(PORT, () => {console.log(`Running at http://localhost:${PORT}`)})