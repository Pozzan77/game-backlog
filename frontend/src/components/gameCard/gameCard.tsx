import './gameCard.css'
import type { Game } from '../../types/game'

interface GameCardProps {
    game: Game
    gridFilter:boolean
}

export function GameCard({game, gridFilter}: GameCardProps) {

    return (
        <div>
            {!gridFilter ? (
                <div className='card-list'>
                    <img src={game.cover?.url} alt={game.name} />
                    <p>{game.name}</p>
                    <p>Not Played</p>
                    <p>{game.rating ? (game.rating /20).toFixed(2) : 0}</p>
                </div>) : (
                <div className='card-grid'>
                    <img src={game.cover?.url} alt={game.name} />
                </div>
                )
            }
        </div>

    )
}