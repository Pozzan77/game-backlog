import './gameCard.css'
import type { Game } from '../../types/game'

interface GameCardProps {
    game: Game
}

export function GameCard({game}: GameCardProps) {

    return (
        <div className='card'>
            <img src={game.background_image} alt={game.name} />
            <p>{game.name}</p>
            <p>Not Played</p>
            <p>{game.rating}</p>
        </div>
    )
}