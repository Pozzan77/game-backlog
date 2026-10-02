import './gameCard.css'
import type { Game } from '../../types/game'

interface GameCardProps {
    game: Game
}

export function GameCard({game}: GameCardProps) {

    return (
        <div className='card'>
            <img src={game.cover?.url} alt={game.name} />
            <p>{game.name}</p>
            <p>Not Played</p>
            <p>{game.rating}</p>
        </div>
    )
}