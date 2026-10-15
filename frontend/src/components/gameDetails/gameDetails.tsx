import './gameDetails.css'
import type { Game } from '../../types/game'

interface GameDetailsProps {
    game:Game
}

export function GameDetails({game}:GameDetailsProps) {
    return (
        <p>{game.name}</p>
    )
}